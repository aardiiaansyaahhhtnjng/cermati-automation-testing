class MutualFundPage {
  constructor(page) {
    this.page = page;

    // locator
    this.dropdown = page.getByRole('img', { name: 'chevron-down' });
    this.mutualFundBtn = page.locator('#mutualFund').getByRole('button', { name: 'Buka' });
    this.pasarUangLink = page.getByRole('link', { name: 'Pasar Uang' });

    this.filterBtn = page.getByRole('button', { name: ' Filter' });
    this.syariahFilter = page.getByText('Syariah', { exact: true });
    this.applyFilter = page.getByRole('button', { name: 'Terapkan' });

    this.compareToggle = page.getByRole('button', { name: ' Bandingkan' });
    this.productCards = page.locator('.product-item-card');
    this.compareBtn = page.getByRole('button', { name: 'Bandingkan', exact: true });
  }

  async goto() {
    await this.page.goto('https://www.cermati.com/');
  }

  async openMutualFund() {
    // Click dropdown to reveal menu, then click mutual fund and pasar uang
    await this.dropdown.click();
    await this.mutualFundBtn.click();
    await this.pasarUangLink.click();
  }

  async applySyariahFilter() {
    // Click filter button, select syariah filter, and apply it
    await this.filterBtn.click();
    await this.syariahFilter.click();
    await this.applyFilter.click();
  }

  async enableCompare() {
    await this.compareToggle.click();
  }

  async selectProducts(count) {
    // Click on the first 'count' product cards to select them for comparison
    for (let i = 0; i < count; i++) {
      await this.productCards.nth(i).click();
    }
  }

  async clickCompare() {
    await this.compareBtn.click();
  }
}

module.exports = { MutualFundPage };