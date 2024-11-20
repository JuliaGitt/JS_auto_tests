const credentials = require('../credentials.json');
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('login', async ({ page }) => {

    //login
    await page.getByPlaceholder('Username').fill(credentials.standard_user.username);
    await page.getByPlaceholder('Password').fill(credentials.standard_user.password);
    await page.getByTestId('login-button').click();

    //Products (1) title is displayed
    const products =  page.getByText('Products');
    await expect(products).toBeVisible();

    //Check that shopping cart is displayed
    const shoppingCart = page.getByTestId('shopping-cart-link');
    await expect(shoppingCart).toBeVisible();

    //More than 1 product (3) is displayed
    const listOfitems = page.getByTestId('inventory-list').getByTestId('inventory-item');
    const itemCount = await listOfitems.count();
    expect(itemCount).toBeGreaterThan(1);
});