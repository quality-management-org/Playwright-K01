import { test, expect } from "@playwright/test";
test("Set timeout cho ham Click, Fill",async ({page})=>{
 await page.goto("https://practicesoftwaretesting.com/");
 await page.getByRole("link", {name: "Sign in"}).click({timeout:3000});
 await page.getByRole("textbox",{name:"Email address *"}).fill("customer@practicesoftwaretesting.com",{timeout:3000});
 await page.getByRole("textbox",{name:"Password *"}).fill("welcome01",{timeout:3000});
 await page.getByRole("button",{name:"Login"}).click({timeout:1000});


});
test("Search Product", async({page})=>{
 await page.goto("https://practicesoftwaretesting.com/");
 await page.getByRole("textbox",{name:"Search"}).fill("Pliers",{timeout:2000});
 await page.getByRole("textbox",{name:"Search"}).press('Enter',{timeout:3000});
 const listPliers:string[]= await page.locator('[data-test="product-name"]').allTextContents();
 const notPliers =  listPliers.filter(name=> !name.toLowerCase().includes("pliers"));
 expect(notPliers).toHaveLength(0);
 
});
test("Search keyword", async({page})=>{
await page.goto("https://practicesoftwaretesting.com/");
const keyWord= "Pliers";
const search= page.getByRole("textbox",{name:"Search"})
await search.fill(keyWord,{timeout:1000});
await search.click({timeout: 2000});
const product= await page.locator('[data-test="product-name"]').allTextContents();
for ( let i =0; i<product.length;i++)
{
expect(product[i]).toContain(keyWord.toLowerCase());
}
});
test("Check toBeChecked", async({page})=> {
await page.goto("https://practicesoftwaretesting.com/");
const hammerChecked=  page.getByRole("checkbox",{name:"Hammer"});
await hammerChecked.click({timeout:2000});
await expect(hammerChecked).toBeChecked();
});