import { test, expect } from '@playwright/test';
import { sahamPage } from '../object/saham.page';

test ('Verify the first saham product greater than 50%', async ({ page }) => {
    const sahampage = new sahamPage(page);

    await sahampage.goto();

    await sahampage.OpenSaham();

    const ListSaham = page.locator('.padding-bottom-16')
    await expect(ListSaham).toBeVisible();

    const productName = await page.locator('.product-name').first().textContent();
    console.log('Product Name:', productName)

    await sahampage.FirstSaham();

    const wrapper = page.locator('.margin-bottom-12').first();
    await expect(wrapper).toContainText(productName);

    const productValue = await page.locator('.product-detail-value').first().textContent();
    const productReplace = productValue.replace('+', '').replace('-', '').replace('%', '').replace('CAGR 1 Tahun', '');
    console.log('Product Value:', productReplace);

    await expect(parseFloat(productReplace)).toBeGreaterThan(50);

    await page.screenshot ({ path: 'screenshots/saham/firstsaham.png', fullPage: true });
})