import { time } from 'node:console';

class LoginPage {
    constructor(page) {
        this.page = page;

        // locator
        this.LoginAccount = page.getByRole('link', { name: 'Masuk' });
        this.buttonMasuk = page.getByRole('button', { name: 'Masuk' });
    }

    async goto() {
        await this.page.goto('https://www.cermati.com/');
    }

    async loginsession () {
        await this.LoginAccount.click();
    }
}
module.exports = { LoginPage };