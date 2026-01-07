import { test, expect } from '@playwright/test';

test.describe('VizPlay Application', () => {
  test('should load the application successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page title is correct
    await expect(page).toHaveTitle(/VizPlay/);

    // Verify main UI elements are present
    await expect(page.getByText('VizPlay')).toBeVisible();

    // Check that the visualization is rendered (vega-embed container)
    await expect(page.locator('#vis')).toBeVisible();

    // Verify default data is loaded
    await expect(page.locator('textarea').first()).toContainText('category');
  });

  test('should have all main sections visible', async ({ page }) => {
    await page.goto('/');

    // Check for data input tabs
    await expect(page.getByRole('tab', { name: 'Input' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Samples' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Upload' })).toBeVisible();

    // Check for visualization controls
    await expect(page.getByText('Visualization Type')).toBeVisible();
    await expect(page.getByText('Chart Title')).toBeVisible();
  });

  test('should display initial bar chart visualization', async ({ page }) => {
    await page.goto('/');

    // Wait for the visualization to render
    await page.waitForSelector('#vis canvas, #vis svg', { timeout: 10000 });

    // Verify visualization container exists
    const visContainer = page.locator('#vis');
    await expect(visContainer).toBeVisible();

    // Check that either canvas or SVG is rendered (Vega can use either)
    const hasCanvas = await visContainer.locator('canvas').count() > 0;
    const hasSvg = await visContainer.locator('svg').count() > 0;
    expect(hasCanvas || hasSvg).toBeTruthy();
  });
});
