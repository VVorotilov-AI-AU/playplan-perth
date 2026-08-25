import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { suburbs } from '../data/suburbs';
import { matchingSuburbs } from '../lib/suburbSearch';
import { SuburbCombobox } from './SuburbCombobox';

afterEach(cleanup);

describe('SuburbCombobox', () => {
  it('prioritizes names that start with the typed text', () => {
    const results = matchingSuburbs(suburbs, 'bay');
    expect(results[0].name).toBe('Bayswater');
    expect(results.every((item) => item.name.toLowerCase().includes('bay'))).toBe(true);
  });

  it('selects a real suburb with the keyboard', () => {
    const onSelect = vi.fn();
    render(<SuburbCombobox suburbs={suburbs} value="Subiaco" onSelect={onSelect} />);
    const input = screen.getByRole('combobox', { name: 'Starting suburb' });
    fireEvent.change(input, { target: { value: 'Two Ro' } });
    expect(screen.getByRole('option', { name: 'Two Rocks' })).toBeVisible();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('Two Rocks');
  });

  it('does not apply arbitrary text as a location', () => {
    const onSelect = vi.fn();
    render(<SuburbCombobox suburbs={suburbs} value="Subiaco" onSelect={onSelect} />);
    const input = screen.getByRole('combobox', { name: 'Starting suburb' });
    fireEvent.change(input, { target: { value: 'Not a real suburb' } });
    fireEvent.blur(input);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
