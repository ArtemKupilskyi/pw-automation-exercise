import { test } from '../page-object-model/PomFixtures';
import { createUser } from '../api-calls/user/POST/createEmployee';
import { deleteUser } from '../api-calls/user/DELETE/deleteEmployee';
import { generateRandomUserData } from '../data/userDetails';
import { MenuOption } from '../page-object-model/pages/HeaderPage';

test.describe('Checkout', () => {

    test('Place order as new user', async ({ page, request, homePage, loginPage, headerPage, productsPage, cartPage, checkoutPage, paymentPage }) => {
        await page.goto('/');
        await homePage.closeCookies();
        await homePage.checkHomePageSection();

        const user = await generateRandomUserData();
        await createUser(request, user);
        await headerPage.goToSelectedOption(MenuOption.SIGNUP_LOGIN);
        await loginPage.login(user.email, user.password);

        await headerPage.goToSelectedOption(MenuOption.PRODUCTS);
        await productsPage.addProductToCart(1);

        await headerPage.goToSelectedOption(MenuOption.CART);
        await cartPage.proceedToCheckout();

        await checkoutPage.placeOrder();

        await paymentPage.fillCardDetails();
        await paymentPage.confirmAndPay();

        await paymentPage.verifyOrderPlaced();

        await deleteUser(request, user);
    });

});