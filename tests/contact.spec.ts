import { MenuOption } from '../page-object-model/pages/HeaderPage';
import { test } from '../page-object-model/PomFixtures';

test.describe('Contact', () => {

    test('Submit Contact Us form with valid data and verify success message', async ({ page, homePage, headerPage, contactUsPage }) => {
        await page.goto('/');
        await homePage.closeCookies();
        await homePage.checkHomePageSection();
        await headerPage.goToSelectedOption(MenuOption.CONTACT_US);

        await contactUsPage.fillForm(
            'test name',
            'test@email.com',
            'test subject',
            'test message'
        );

        await contactUsPage.uploadFile('assets/test1.txt');
        await contactUsPage.submitForm();
        await contactUsPage.verifySuccessMessage();
    });

});