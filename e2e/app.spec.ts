import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('primary flow returns explainable recommendations', async ({ page }) => {
  await page.addInitScript(() => {
    const browserFetch = window.fetch.bind(window);
    window.fetch = (input, init) => String(input).includes('open-meteo')
      ? Promise.reject(new Error('Weather offline for test'))
      : browserFetch(input, init);
  });
  await page.goto('/playplan-perth/#/today');
  await expect(page.getByRole('heading', { name: 'Pick a park everyone loves.' })).toBeVisible();
  await page.getByRole('button', { name: /Find our best three/ }).click();
  await expect(page.getByRole('heading', { name: /Three strong choices/ })).toBeVisible();
  await expect(page.locator('.result-card')).toHaveCount(3);
  await expect(page.getByText('Weather unavailable, ranking still works')).toBeVisible();
});

test('visit notes survive refresh and influence future use', async ({ page }) => {
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: /Find our best three/ }).click();
  await page.locator('.result-card').first().getByRole('button', { name: 'Add visit note' }).click();
  await page.getByRole('button', { name: 'Visit again' }).click();
  await page.getByLabel('Optional note').fill('Easy parking before nine.');
  await page.getByRole('button', { name: /Save private note/ }).click();
  await page.reload();
  const stored = await page.evaluate(() => localStorage.getItem('playplan:visits:v1'));
  expect(stored).toContain('Easy parking before nine.');
});

test('location refusal keeps suburb search usable', async ({ context, page }) => {
  await context.clearPermissions();
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: 'Use my location' }).click();
  await expect(page.getByText(/Location was unavailable/)).toBeVisible();
  await expect(page.getByLabel('Starting suburb')).toHaveValue('Subiaco');
});

test('core path has no serious accessibility violations', async ({ page }) => {
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: /Find our best three/ }).click();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((item) => ['critical', 'serious'].includes(item.impact ?? ''))).toEqual([]);
});

test('party and explore modes expose their complete journeys', async ({ page }) => {
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('tab', { name: /Plan a party/ }).click();
  await expect(page.getByRole('heading', { name: 'What will make the gathering work?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'BBQ on site' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('tab', { name: /Explore Perth/ }).click();
  await expect(page.getByRole('heading', { name: 'Explore the collection' })).toBeVisible();
  await expect(page.locator('.result-card')).toHaveCount(39);
});

test('app shell and recommendation cards reopen offline', async ({ context, page }) => {
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: /Find our best three/ }).click();
  await page.evaluate(async () => navigator.serviceWorker.ready);
  await context.setOffline(true);
  await page.reload();
  await page.getByRole('button', { name: /Find our best three/ }).click();
  await expect(page.locator('.result-card')).toHaveCount(3);
});
