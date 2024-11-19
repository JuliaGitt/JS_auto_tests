const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    //login
    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

    //verify visibility
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    await page.locator('[data-test="continue-shopping"]').click();

    //count items on main page >1
    const listOfitems = page.locator('[data-test="inventory-list"] [data-test="inventory-item"]');
    const itemCount = await listOfitems.count();
    expect(itemCount).toBeGreaterThan(1);
}
);