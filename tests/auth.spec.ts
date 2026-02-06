import { test } from '../page-object-model/PomFixtures';
import { createUser } from '../api-calls/user/POST/createEmployee';
import { deleteUser } from '../api-calls/user/DELETE/deleteEmployee';
import { generateRandomUserData } from '../data/userDetails';
import { MenuOption } from '../page-object-model/pages/HeaderPage';

test.describe('Authorization', () => {

    test.beforeEach(async ({ page, homePage }) => {
        await page.goto('/');
        await homePage.closeCookies();
        await homePage.checkHomePageSection();
    });

    test('Verify user registration', async ({ loginPage, signupPage, headerPage, homePage }) => {
        const user = await generateRandomUserData();
        await headerPage.goToSelectedOption(MenuOption.SIGNUP_LOGIN);

        await loginPage.signup(user.name, user.email);
        await signupPage.fillAccountInformation(user);

        await homePage.checkHomePageSection();
        await headerPage.deleteAccount();
    });


    test('Verify login with correct credentials', async ({ request, headerPage, loginPage }) => {
        const user = await generateRandomUserData();
        await createUser(request, user);

        await headerPage.goToSelectedOption(MenuOption.SIGNUP_LOGIN);
        await loginPage.login(user.email, user.password);
        await headerPage.verifyUserSignedIn(user.name);

        await deleteUser(request, user);
    });


    test('Verify Login with incorrect credentials', async ({ headerPage, loginPage }) => {
        await headerPage.goToSelectedOption(MenuOption.SIGNUP_LOGIN);
        await loginPage.login('wrong@email.com', 'wrongPass');

        await loginPage.verifyError();
    });


    test('Verify create and delete user API', async ({ page, request }) => {
        const user = await generateRandomUserData();

        await createUser(request, user);
        await deleteUser(request, user);
    });

});