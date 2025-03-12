const { test, expect } = require('@playwright/test') ;
const {CheckoutPages} = require('../pages/checkout.pages');
require('dotenv').config();

test.beforeEach('Login', async({page}) => {
    //login first
    await page.goto('/');

    await page.locator("xpath=//div[@class='navbar-collapse']//descendant::a[@id='login2']").click({timeout: 2000});
    await page.locator("xpath=//input[@id='loginusername']").fill(process.env.CREDENTIAL_USERNAME);
    await page.locator("xpath=//input[@id='loginpassword']").fill(process.env.CREDENTIAL_PASSWORD);
    await page.locator("xpath=//div[@id='logInModal']//descendant::button[@class='btn btn-primary']").click({timeout: 2000});    

    const userWelcomeElement = page.locator("xpath=//a[@id='nameofuser']");
    await expect(userWelcomeElement).toBeVisible();
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
        // await page.locator("xpath=//a[@id='cartur']").click({timeout: 2000})
        // await page.waitForSelector("xpath=//tr[@class='success']");
        // const elementItem = page.locator("xpath=//tr[@class='success']")
        // const countItem = await elementItem.count()
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

