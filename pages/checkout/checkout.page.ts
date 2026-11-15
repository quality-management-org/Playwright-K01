import { Page, Locator, expect } from "@playwright/test";
import address from "../../test-data/address.json";
import payment from "../../test-data/payment.json";

export class CheckoutPage {
    readonly page: Page;
    readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator("//a[@aria-label='cart']//*[@data-icon='cart-shopping']");
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async removeProduct(productName: string) {
    await this.page
      .locator("//table[@class='table table-hover']//*[@class='ng-star-inserted']")
      .filter({ hasText: productName })
      .locator("//a[@class='btn btn-danger']//*[@data-icon='xmark']")
      .click();
      
    const toastMsg = this.page.getByRole('alert', {name: 'Product deleted.'});
    await expect(toastMsg).toBeVisible();  
  }

  async proceedToCheckout() {
    await this.page.getByRole("button", {name: "Proceed to checkout"}).click();
    await this.page.getByRole("button", {name:"Proceed to checkout"}).click();

    await this.page.selectOption("#country", {label:address.address.country});
    await this.page.getByLabel("Postal code").fill(address.address.postalCode);
    await this.page.getByLabel("House number").fill(address.address.houseNumber);
    await this.page.getByLabel("Street").fill(address.address.street);
    await this.page.getByLabel("City").fill(address.address.city);
    await this.page.getByLabel("State").fill(address.address.state);
    await this.page.getByRole("button", {name: "Proceed to checkout"}).click();
  }

  async payment() {
    await this.page.selectOption("#payment-method", {label:payment.payment});
    await this.page.getByRole("button", {name: "Check payment" }).click();
    await expect(this.page.locator("//*[@data-test='payment-success-message']")).toBeVisible();
    await this.page.getByRole("button", {name: "Confirm"}).click();
    await expect(this.page.locator("//*[@id='order-confirmation']")).toBeVisible();
  }
}