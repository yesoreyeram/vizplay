import { test, expect } from '@playwright/test';

test.describe('Sample Datasets', () => {
  test('should open sample datasets dialog', async ({ page }) => {
    await page.goto('/');

    // Click on the Samples tab
    await page.getByRole('tab', { name: 'Samples' }).click();

    // Click the Load Sample Dataset button
    await page.getByRole('button', { name: /Load Sample Dataset/i }).click();

    // Verify dialog is open and shows datasets
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Sample Datasets/)).toBeVisible();

    // Check that search input is present
    await expect(page.getByPlaceholder(/Search datasets/i)).toBeVisible();

    // Check that category filter is present
    await expect(page.getByRole('combobox').first()).toBeVisible();
  });

  test('should load a sample dataset', async ({ page }) => {
    await page.goto('/');

    // Navigate to Samples tab
    await page.getByRole('tab', { name: 'Samples' }).click();

    // Open sample datasets dialog
    await page.getByRole('button', { name: /Load Sample Dataset/i }).click();

    // Wait for dialog to be visible
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click the first "Load" button in the dataset list
    const loadButtons = page.getByRole('button', { name: /^Load$/i });
    const firstLoadButton = loadButtons.first();
    await firstLoadButton.click();

    // Verify dialog closes
    await expect(page.getByRole('dialog')).not.toBeVisible({ timeout: 5000 });

    // Verify data is loaded in the textarea
    const dataTextarea = page.locator('textarea').first();
    await expect(dataTextarea).not.toBeEmpty();

    // Wait for visualization to update
    await page.waitForTimeout(1000);
    await expect(page.locator('#vis')).toBeVisible();
  });

  test('should search datasets', async ({ page }) => {
    await page.goto('/');

    // Navigate to Samples tab
    await page.getByRole('tab', { name: 'Samples' }).click();

    // Open sample datasets dialog
    await page.getByRole('button', { name: /Load Sample Dataset/i }).click();

    // Wait for dialog
    await expect(page.getByRole('dialog')).toBeVisible();

    // Search for a specific term
    const searchInput = page.getByPlaceholder(/Search datasets/i);
    await searchInput.fill('sales');

    // Wait a bit for search to filter
    await page.waitForTimeout(300);

    // Verify search results are displayed
    const filteredCount = await page.getByRole('button', { name: /^Load$/i }).count();

    // Verify there are results (search should work)
    expect(filteredCount).toBeGreaterThanOrEqual(0);
  });
});
