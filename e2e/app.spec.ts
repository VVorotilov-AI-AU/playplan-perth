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

test('structured parent feedback is visible and keeps time context', async ({ page }) => {
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: /Find our best three/ }).click();
  const firstCard = page.locator('.result-card').first();
  await firstCard.getByRole('button', { name: 'Add visit note' }).click();
  await page.getByRole('button', { name: 'Weekend morning' }).click();
  await page.getByRole('button', { name: 'Easy to supervise' }).click();
  await page.getByRole('button', { name: 'Easy parking' }).click();
  await page.getByLabel('Optional note').fill('Calm before ten, clear view from the picnic table.');
  await page.getByRole('button', { name: /Save private note/ }).click();
  await expect(page.getByRole('status')).toContainText('Saved privately');
  await expect(firstCard.getByText('Your last visit')).toBeVisible();
  await expect(firstCard.getByText(/Weekend morning.*Easy to supervise.*Easy parking/)).toBeVisible();
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

test('a direct park link opens the intended detail panel', async ({ page }) => {
  await page.goto('/playplan-perth/#/park/mueller-park');
  await expect(page.getByRole('dialog', { name: 'Mueller Park' })).toBeVisible();
  await expect(page.getByText(/Roberts Road and Coghlan Road/)).toBeVisible();
});

test('invalid saved criteria cannot crash the application', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('playplan:criteria:v1', JSON.stringify({ ages: 'broken', radiusKm: 999 }));
  });
  await page.goto('/playplan-perth/#/today');
  await expect(page.getByRole('heading', { name: 'Pick a park everyone loves.' })).toBeVisible();
  await expect(page.getByRole('button', { name: '3', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: '8', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('mobile users see recommendation cards before the map', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: /Find our best three/ }).click();
  const card = await page.locator('.result-card').first().boundingBox();
  const map = await page.getByLabel('Map of matching playgrounds').boundingBox();
  expect(card).not.toBeNull();
  expect(map).not.toBeNull();
  expect(card!.y).toBeLessThan(map!.y);
});

test('suburb selection remains internally consistent after refresh', async ({ page }) => {
  await page.goto('/playplan-perth/#/today');
  await page.getByLabel('Starting suburb').fill('Bays');
  await page.getByRole('option', { name: 'Bayswater' }).click();
  await page.reload();
  await expect(page.getByLabel('Starting suburb')).toHaveValue('Bayswater');
  const saved = await page.evaluate(() => localStorage.getItem('playplan:criteria:v1'));
  expect(saved).not.toContain('"origin"');
});

test('suburb search suggests matches as the parent types', async ({ page }) => {
  await page.goto('/playplan-perth/#/today');
  const search = page.getByLabel('Starting suburb');
  await search.fill('Two Ro');
  await expect(page.getByRole('option', { name: 'Two Rocks' })).toBeVisible();
  await search.press('Enter');
  await expect(search).toHaveValue('Two Rocks');
});

test('drive-time mode filters and labels recommendations honestly', async ({ page }) => {
  await page.route('https://api.open-meteo.com/**', (route) => route.abort());
  await page.goto('/playplan-perth/#/today');
  await page.getByRole('button', { name: '~30 min' }).click();
  await page.getByRole('button', { name: /Find our best three/ }).click();
  await expect(page.locator('.result-card').first()).toContainText(/~\d+ min drive/);
  await expect(page.getByText(/without live traffic/)).toBeVisible();
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
