const { test, expect } = require('@playwright/test') ;
const {CheckoutPages} = require('../pages/checkout.pages');
const {LoginPages} = require('../pages/login.pages');
require('dotenv').config();

test.beforeEach('Login', async({page}) => {
    //login first
    const loginPages = new LoginPages(page);
    
    await loginPages.goto();
    await loginPages.loginValid();
})

test('Checkout item', async({page}, testInfo) => {
    const checkoutPages = new CheckoutPages(page, testInfo)

    await test.step('add item to cart', async () => {
        await test.step('add 1st item', async () => {
            await checkoutPages.addItem(true)
        })

        await test.step('add 2nd item', async () => {
            await checkoutPages.addItem(true)
        })             
    })
    
    await test.step('navigate & check added item in cart page', async () => {
        const qtyCartItem = await checkoutPages.countCartItem();
        expect(qtyCartItem).toBeGreaterThan(0);
    
        await testInfo.attach("check_added_item", {
            body: await page.screenshot(),
            contentType: "image/png",
        })
        await page.locator("xpath=//button[@class='btn btn-success']").click({timeout: 2000})
    })
   
    await test.step('fill delivery information', async () => {
        const data = {
            name : "andreas maulana",
            country : "malaysia",
            city : "selangor",
            cardnumber : "4433221",
            month : "7",
            year : "2025"
        }

        await checkoutPages.fillDeliveryInformation(data, true);
    })
})

