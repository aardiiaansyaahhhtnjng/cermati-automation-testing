import { test, expect } from '@playwright/test';
import { LoginPage } from '../object/login.page';
import { log } from 'node:console';
import dotenv from 'dotenv';
dotenv.config();

test('Login with valid credentials', async ({ page }) => {
    const loginpage = new LoginPage(page);
    
    await loginpage.goto();

    await loginpage.loginsession();

    await expect(page.getByRole('heading', { 
        name: 'Masuk' 
    })).toBeVisible();

    await expect(page.locator('.container_q4Nkg')).toBeVisible();

    const textlogin = page.getByRole('textbox', { name: 'No. Handphone/Email' });
    await textlogin.type(process.env.EMAIL, { delay: 1000 });
    console.log('Email entered:', process.env.EMAIL);

    await loginpage.buttonMasuk.click();

    await expect(page.getByText('Saya bukan robot')).toBeVisible(); 

    // if (await page.getByText('Saya bukan robot').isVisible()) {
    //     await page.getByRole('checkbox', { name: 'Saya bukan robot' }).check();
    // } 


    await expect(page.getByRole('heading', { name: 'Masukkan PIN' })).toBeVisible();

});