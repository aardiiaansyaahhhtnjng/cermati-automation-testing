import { test, expect } from '@playwright/test';
import { MutualFundPage } from '../object/comparing.page';

test('Compare 2 Syariah products from Reksa Dana Pasar Uang', async ({ page }) => {
    const mfPage = new MutualFundPage(page);

    await mfPage.goto();
    await expect(page.getByRole('link', { 
        name: 'cermati.com', 
        exact: true 
    })).toBeVisible();

    await mfPage.openMutualFund();
    await expect(page.getByRole('heading', { 
        name: 'Reksa Dana Pasar Uang' 
    })).toBeVisible(); 

    await expect(page.locator('.padding-bottom-16')).toBeVisible();

    // Screenshot final (passed state)
    await page.screenshot({ path: 'screenshots/comparing/reksa-dana.png', fullPage: true });

    await mfPage.applySyariahFilter();

    await mfPage.enableCompare();
    // Click on the first 2 product cards to select them for comparison
    await mfPage.selectProducts(2);
    await expect(page.getByRole('button', { 
        name: 'Bandingkan', 
        exact: true 
    })).toBeEnabled();

    await mfPage.clickCompare();
    await expect(page.locator('.point-legends')).toBeVisible(); 

    // Screenshot final (passed state)
    await page.screenshot({ path: 'screenshots/comparing/compare-result.png', fullPage: true });
});

test('Compare more than 3 products', async ({ page }) => {
    const mfPage = new MutualFundPage(page);

    await mfPage.goto();

    await mfPage.openMutualFund();

    await mfPage.applySyariahFilter();

    await mfPage.enableCompare();
    await mfPage.selectProducts(4);

    await expect(page.getByText('Maksimal 3 reksa dana yang bisa dipilih.')).toBeVisible();

    await page.screenshot({ path: 'screenshots/comparing/compare-error.png' });
});

test('Compare without selecting products or only one product', async ({ page }) => {
    const mfPage = new MutualFundPage(page);

    await mfPage.goto();

    await mfPage.openMutualFund();

    await mfPage.applySyariahFilter();

    await mfPage.enableCompare();
    
    await mfPage.selectProducts(0);
    await expect(page.getByRole('button', { 
        name: 'Bandingkan', 
        exact: true 
    })).toBeDisabled();

    await mfPage.selectProducts(1);
    await expect(page.getByRole('button', { 
        name: 'Bandingkan', 
        exact: true 
    })).toBeDisabled();

    await page.screenshot({ path: 'screenshots/comparing/compare-disabled.png' });
});

test('Filter by return tertinggi', async ({ page }) => {
    const mfPage = new MutualFundPage(page);

    await mfPage.goto();

    await mfPage.openMutualFund();

    await mfPage.applySyariahFilter();

    // Click return tertinggi
    await page.getByRole('button', { name: ' Urutkan' }).click();
    await page.getByText('Return Tertinggi', { exact: true }).click();
    await page.getByText('1 Tahun', { exact: true }).click();
    await page.getByRole('button', { name: 'Terapkan' }).click();

    // Validate sorting by return tertinggi
    const firstProductReturn = await page.locator('.product-return').nth(0).textContent();
    const secondProductReturn = await page.locator('.product-return').nth(1).textContent();

    // Remove non-numeric characters and convert to float for comparison
    const first = firstProductReturn.replace('%', '').replace('+', '').replace('-', '').replace('Return 1 Tahun', '');
    const second = secondProductReturn.replace('%', '').replace('+', '').replace('-', '').replace('Return 1 Tahun', '');

    console.log('Return produk pertama:', first);
    console.log('Return produk kedua:', second);

    await expect(parseFloat(first)).toBeGreaterThanOrEqual(parseFloat(second));

    await expect(page.getByRole('heading', { 
        name: 'Reksa Dana Pasar Uang' 
    })).toBeVisible();

    await page.screenshot({ path: 'screenshots/comparing/sorted-return.png', fullPage: true });
});