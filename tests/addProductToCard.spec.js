const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('add product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

// Perform login using "standard_user"
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

//Add the first product to the cart by clicking Add to Cart button
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

//Verify Shopping Cart icon contains the number of products added (equal 1)
    await page.locator('[data-test="shopping-cart-link"]').click();
    const items = page.locator('[data-test="cart-list"] [data-test="inventory-item"]');
    await expect(items).toHaveCount(1);

//Open the Shopping Cart and verify the added product is displayed (the data should be taken from the Products page and used here to as an expected result)
    await expect(page.locator('[data-test="cart-list"] [data-test="inventory-item"]')).toBeVisible();

//Remove the product by clicking Remove
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    
//Verify no products are available in the Shopping Cart
    const items1 = page.locator('[data-test="cart-list"] [class="removed_cart_item"]');
    const itemsCount = await items1.count();
    expect(itemsCount).toBe(0);
}
);