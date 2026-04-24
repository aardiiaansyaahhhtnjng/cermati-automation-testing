class SearchingBox {
  constructor(page) {
    this.page = page;

    // Search
    this.searchBox = page.getByRole('textbox', { name: 'term' });
    this.searchButton = page.getByRole('button').nth(1);

    // Heading
    this.resultHeading = page.getByRole('heading', { name: 'Hasil Pencarian' });

    // Result text
    this.resultText = page.locator('text=Ditemukan');

    // Category locators
    this.kartuKredit = page.locator('a.btn-track[href*="tag=creditCard"]');
    this.pinjaman = page.locator('a.btn-track[href*="tag=loan"]');
    this.simpanan = page.locator('a.btn-track[href*="tag=saving"]');
    this.artikel = page.locator('a.btn-track[href*="tag=article"]');
    this.promo = page.locator('a.btn-track[href*="tag=promo"]');
  }

  async goto() {
    await this.page.goto('https://www.cermati.com/');
  }

  async search(keyword) {
    // Click on the search box to focus before filling
    await this.page.locator('header form').click();
    await this.searchBox.fill(keyword);
    await this.searchButton.click();
  }

  async getTotalResult() {
    const text = await this.resultText.textContent();
    // Extract the number from the text, e.g., "Ditemukan 100 hasil" -> 100
    return parseInt(text.match(/\d+/)[0]);
  }

  async getCategoryValue(locator) {
    const text = await locator.textContent();
    // Extract the number from the text, e.g., "Kartu Kredit (20)" -> 20
    return parseInt(text.match(/\d+/)[0]);
  }

  async getAllCategoryTotal() {
    // Get total from each category and sum them up
    const kartu = await this.getCategoryValue(this.kartuKredit);
    const pinjaman = await this.getCategoryValue(this.pinjaman);
    const simpanan = await this.getCategoryValue(this.simpanan);
    const artikel = await this.getCategoryValue(this.artikel);
    const promo = await this.getCategoryValue(this.promo);

    return kartu + pinjaman + simpanan + artikel + promo;
  }
}

module.exports = { SearchingBox };