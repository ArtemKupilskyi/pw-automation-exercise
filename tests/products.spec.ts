import { expect } from '@playwright/test';
import { generateRandomUserData } from '../data/userDetails';
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

    test('Add review and verify success message', async ({ headerPage, productsPage, productDetailsPage}) => {
        const user = await generateRandomUserData();
        
        await headerPage.goToSelectedOption(MenuOption.PRODUCTS);
        await productsPage.goToProductDetails(1);

        await productDetailsPage.fillReview(user.name, user.email, 'Test review');
        await productDetailsPage.submitReview();
        await productDetailsPage.verifySuccessMessage();
    })


    test('Add product to cart and verify details', async ({ headerPage, productsPage, productDetailsPage, cartPage }) => {
        await headerPage.goToSelectedOption(MenuOption.PRODUCTS);
        await productsPage.goToProductDetails(1);

        const expectedDetails = await productDetailsPage.getProductDetails();
        await productDetailsPage.addProductToCart();

        await headerPage.goToSelectedOption(MenuOption.CART);
        const cartDetails = await cartPage.getCartProductDetails(1);

        expect(cartDetails).toEqual(expectedDetails);
    })

});