import { BasePage } from "../base-page";

export class HomePage  extends BasePage {

  async goToProductDetailPage(productName: string) {
    await this.page
      .locator('[data-test="product-name"]')
      .getByText(productName, { exact: true })
      .click();
  }

}