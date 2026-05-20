class sahamPage {
    constructor(page) {
        this.page = page;

        // locator
        this.dropdown = page.getByRole('img', { name: 'chevron-down' });
        this.ReksaDana = page.locator('#mutualFund').getByRole('button', { name: 'Buka' });
        this.sahamLink = page.locator('a.fund-type-item[href*="/reksadana/saham"]');

        this.firstSaham = page.locator('.product-item-card').first();

        this.startInvest = page.getByRole('button', { name: 'Mulai Investasi' });
    }


    async goto() {
        await this.page.goto('https://www.cermati.com/');
    }

    async OpenSaham () {
        await this.dropdown.click();
        await this.ReksaDana.click();
        await this.sahamLink.click();
    }

    async FirstSaham () {
        await this.firstSaham.click();
    }

    async StartInvest () {
        await this.startInvest.click();
    }
}

module.exports = {sahamPage};
