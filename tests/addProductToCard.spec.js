const credentials = require('../credentials.json');
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('add product to cart', async ({ page }) => {

// Perform login using "standard_user"
    await page.getByPlaceholder('Username').fill(credentials.standard_user.username);
    await page.getByPlaceholder('Password').fill(credentials.standard_user.password);
    await page.getByTestId('login-button').click();

//Add the first product to the cart by clicking Add to Cart button
    await page.getByTestId('add-to-cart-sauce-labs-backpack').click();

//Verify Shopping Cart icon contains the number of products added (equal 1)
    await page.getByTestId('shopping-cart-link').click();
    const items = page.getByTestId('cart-list').getByTestId('inventory-item');
    await expect(items).toHaveCount(1);

//Open the Shopping Cart and verify the added product is displayed (the data should be taken from the Products page and used here to as an expected result)
    const openShoopingCart = page.getByTestId('cart-list').getByTestId('inventory-item');
    await expect(openShoopingCart).toBeVisible();

//Remove the product by clicking Remove
    await page.getByTestId('remove-sauce-labs-backpack').click();

//Verify no products are available in the Shopping Cart
    const items1 = page.getByTestId('cart-list').getByTestId('removed_cart_item');
    const itemsCount = await items1.count();
    expect(itemsCount).toBe(0);
}
);