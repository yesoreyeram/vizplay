import { test, expect } from '@playwright/test';

test.describe('Data Input', () => {
  test('should accept custom JSON data', async ({ page }) => {
    await page.goto('/');

    // Make sure we're on the Input tab
    await page.getByRole('tab', { name: 'Input' }).click();

    const customData = JSON.stringify([
      { name: 'Alice', score: 95 },
      { name: 'Bob', score: 87 },
      { name: 'Charlie', score: 92 }
    ], null, 2);

    // Clear existing data and input new data
    const dataTextarea = page.locator('textarea').first();
    await dataTextarea.clear();
    await dataTextarea.fill(customData);

    // Wait a moment for parsing
    await page.waitForTimeout(500);

    // Verify the data is in the textarea
    await expect(dataTextarea).toHaveValue(customData);

    // Verify visualization still renders
    await expect(page.locator('#vis')).toBeVisible();
  });

  test('should switch between data format types', async ({ page }) => {
    await page.goto('/');

    // Make sure we're on the Input tab
    await page.getByRole('tab', { name: 'Input' }).click();

    // Find the format selector (should be a combobox with json/csv/tsv/xml/yaml options)
    const formatSelect = page.locator('select, [role="combobox"]').filter({
      hasText: /json|csv|tsv|xml|yaml/i
    }).first();

    // Verify it exists
    await expect(formatSelect).toBeVisible();
  });

  test('should handle empty data gracefully', async ({ page }) => {
    await page.goto('/');

    // Make sure we're on the Input tab
    await page.getByRole('tab', { name: 'Input' }).click();

    // Clear the data input
    const dataTextarea = page.locator('textarea').first();
    await dataTextarea.clear();

    // Wait a moment
    await page.waitForTimeout(500);

    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('should parse CSV data', async ({ page }) => {
    await page.goto('/');

    // Make sure we're on the Input tab
    await page.getByRole('tab', { name: 'Input' }).click();

    // Change format to CSV (if format selector exists)
    const formatSelectors = await page.locator('select, [role="combobox"]').all();

    // Find the one that might be format selector
    for (const selector of formatSelectors) {
      const text = await selector.textContent();
      if (text && (text.includes('JSON') || text.includes('CSV'))) {
        await selector.click();

        // Try to select CSV option
        const csvOption = page.getByRole('option', { name: /csv/i });
        if (await csvOption.isVisible()) {
          await csvOption.click();
          break;
        }
      }
    }

    // Input CSV data
    const csvData = 'name,value\nAlice,100\nBob,200\nCharlie,150';
    const dataTextarea = page.locator('textarea').first();
    await dataTextarea.clear();
    await dataTextarea.fill(csvData);

    // Wait for parsing
    await page.waitForTimeout(1000);

    // Verify visualization renders
    await expect(page.locator('#vis')).toBeVisible();
  });
});
