import { test as baseTest } from "@playwright/test";
import { LoginPage } from '../pages/prebuy-frontend/login.page';
import { HomePage } from '../pages/prebuy-frontend/home.page';
import { GalleryProductsPage } from 'pages/prebuy-frontend/galleryProducts.page';
import { ProductsPage } from 'pages/prebuy-frontend/products.page';
import { CardPage } from '../pages/prebuy-frontend/card.page';
import { OrdersPage } from "pages/prebuy-frontend/orders.page";

type pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    galetyProductsPage: GalleryProductsPage;
    productsPage: ProductsPage;
    cardPage: CardPage;
    ordersPage: OrdersPage;
}

const testPages = baseTest.extend<pages>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    galetyProductsPage: async ({ page }, use) => {
        await use(new GalleryProductsPage(page));
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },
    cardPage: async ({ page }, use) => {
        await use(new CardPage(page));
    },
    ordersPage: async ({ page }, use) => {
        await use(new OrdersPage(page));
    }
});

export const test = testPages;
export const expect = testPages.expect;