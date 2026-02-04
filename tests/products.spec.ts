import { MenuOption } from '../page-object-model/pages/HeaderPage';
import { test } from '../page-object-model/PomFixtures';

test.describe('Products manipulation', () => {

    test.beforeEach(async ({ page, homePage }) => {
        await page.goto('/');
        await homePage.closeCookies();
        await homePage.checkHomePageSection();
    });

    test('Search for products and verify results', async ({ headerPage, productsPage }) => {
        await headerPage.goToSelectedOption(MenuOption.PRODUCTS);

        await productsPage.searchProduct('Women');
        await productsPage.verifyProductTitle('Women');
    });

    test('Add multiple products to cart and verify cart contents', async ({ headerPage, productsPage, cartPage }) => {
        await headerPage.goToSelectedOption(MenuOption.CART);
        await cartPage.verifyCartEmpty();

        await headerPage.goToSelectedOption(MenuOption.PRODUCTS);
        await productsPage.addProductToCart(1);
        await productsPage.addProductToCart(3);

        await headerPage.goToSelectedOption(MenuOption.CART);
        await cartPage.verifyCartIsNotEmpty(2);
    });

});