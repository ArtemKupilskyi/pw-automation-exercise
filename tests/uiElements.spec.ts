import { test } from '../page-object-model/PomFixtures';

test('Verify slick carousel next buttons and dots navigation', async({page, homePage}) => {
    await page.goto('/');
    await homePage.closeCookies();
    await homePage.checkHomePageSection();

    await homePage.selectCarouselNext();
    await homePage.correctCarouselContentVisible(2);

    await homePage.selectCarouselDot(1);
    await homePage.correctCarouselContentVisible(1);
})