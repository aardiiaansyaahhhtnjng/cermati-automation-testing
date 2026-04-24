import { test, expect } from '@playwright/test';
import { SearchingBox } from '../object/searching.page';

test("Search 'BCA' and assert the result", async ({ page }) => {
    // keyword to search, and create instance of SearchingBox
    const keyword = 'BCA';
    const searchingBox = new SearchingBox(page);

    await searchingBox.goto();

    // 📸 Screenshot homepage
    await page.screenshot({ path: 'screenshots/searching/homepage.png', fullPage: true });

    await searchingBox.search(keyword);

    await expect(searchingBox.resultHeading).toBeVisible();

    const totalResult = await searchingBox.getTotalResult();
    console.log('Total dari Ditemukan:', totalResult);

    const semuaTotal = await searchingBox.getAllCategoryTotal();
    console.log('Total dari Semua:', semuaTotal);

    expect(totalResult).toBe(semuaTotal);

    // 📸 Screenshot final (passed state)
    await page.screenshot({ path: 'screenshots/searching/final.png', fullPage: true });
});