import { test, expect } from '@playwright/test';

test.describe('Visualization Types', () => {
  test('should change visualization type to line chart', async ({ page }) => {
    await page.goto('/');

    // Wait for initial render
    await page.waitForSelector('#vis', { timeout: 10000 });

    // Find and click the visualization type select
    const vizTypeSelect = page.getByRole('combobox').filter({ hasText: /bar|line|scatter|pie|area|heatmap/i }).first();
    await vizTypeSelect.click();

    // Select line chart from dropdown
    await page.getByRole('option', { name: /line/i }).click();

    // Wait for visualization to update
    await page.waitForTimeout(1000);

    // Verify visualization is still visible
    await expect(page.locator('#vis')).toBeVisible();
  });

  test('should change visualization type to scatter plot', async ({ page }) => {
    await page.goto('/');

    // Wait for initial render
    await page.waitForSelector('#vis', { timeout: 10000 });

    // Find and click the visualization type select
    const vizTypeSelect = page.getByRole('combobox').filter({ hasText: /bar|line|scatter|pie|area|heatmap/i }).first();
    await vizTypeSelect.click();

    // Select scatter from dropdown
    await page.getByRole('option', { name: /scatter/i }).click();

    // Wait for visualization to update
    await page.waitForTimeout(1000);

    // Verify visualization is still visible
    await expect(page.locator('#vis')).toBeVisible();
  });

  test('should change visualization type to pie chart', async ({ page }) => {
    await page.goto('/');

    // Wait for initial render
    await page.waitForSelector('#vis', { timeout: 10000 });

    // Find and click the visualization type select
    const vizTypeSelect = page.getByRole('combobox').filter({ hasText: /bar|line|scatter|pie|area|heatmap/i }).first();
    await vizTypeSelect.click();

    // Select pie from dropdown
    await page.getByRole('option', { name: /pie/i }).click();

    // Wait for visualization to update
    await page.waitForTimeout(1000);

    // Verify visualization is still visible
    await expect(page.locator('#vis')).toBeVisible();
  });

  test('should update chart title', async ({ page }) => {
    await page.goto('/');

    // Find the chart title input
    const titleInput = page.getByRole('textbox', { name: /chart title/i });

    // Clear and enter new title
    await titleInput.clear();
    await titleInput.fill('My Custom Chart Title');

    // Wait for update
    await page.waitForTimeout(500);

    // Verify the input has the new value
    await expect(titleInput).toHaveValue('My Custom Chart Title');
  });
});
