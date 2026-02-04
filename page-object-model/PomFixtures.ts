import { test as baseTest } from "@playwright/test";
import { HeaderPage } from "./pages/HeaderPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { CartPage } from "./pages/CartPage";
import { PaymentPage } from "./pages/PaymentPage";
import { CheckoutPage } from "./pages/CheckoutPage";

type MyFixtures = {
    headerPage: HeaderPage;
    loginPage: LoginPage;
    homePage: HomePage;
    signupPage: SignupPage;
    contactUsPage: ContactUsPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    paymentPage: PaymentPage;
    checkoutPage: CheckoutPage;
}

export const test = baseTest.extend<MyFixtures>({
    headerPage: async ({ page }, use) => {
        await use(new HeaderPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
}); 