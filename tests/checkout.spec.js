const { test, expect } = require('@playwright/test') ;
require('dotenv').config();

test.beforeEach('Login', async({page}) => {
    //login first
    await page.goto('https://www.demoblaze.com/index.html');

    await page.locator("xpath=//div[@class='navbar-collapse']//descendant::a[@id='login2']").click();
    await page.locator("xpath=//input[@id='loginusername']").fill(process.env.CREDENTIAL_USERNAME);
    await page.locator("xpath=//input[@id='loginpassword']").fill(process.env.CREDENTIAL_PASSWORD);
    await page.locator("xpath=//div[@id='logInModal']//descendant::button[@class='btn btn-primary']").click();    

    const userWelcomeElement = page.locator("xpath=//a[@id='nameofuser']");
    await expect(userWelcomeElement).toBeVisible();
})

test('Checkout item', async({page}, testInfo) => {

    await test.step('add item to cart', async () => {
        await test.step('add 1st item', async () => {
            await page.locator("xpath=(//div[@class='col-lg-4 col-md-6 mb-4'])[3]//descendant::a[@class='hrefch']").click()
            await page.locator("xpath=//a[@class='btn btn-success btn-lg']").click()
            await page.waitForTimeout(2000);
            await testInfo.attach("add_item_1", {
                body: await page.screenshot(),
                contentType: "image/png",
            })
        })

        await test.step('add 2nd item', async () => {
            await page.locator("xpath=//a[@id='nava']").click()

            await page.locator("xpath=(//div[@class='col-lg-4 col-md-6 mb-4'])[5]//descendant::a[@class='hrefch']").click()
            await page.locator("xpath=//a[@class='btn btn-success btn-lg']").click()
            await page.waitForTimeout(2000);
            await testInfo.attach("add_item_2", {
                body: await page.screenshot(),
                contentType: "image/png",
            })
        })             
    })
    
    await test.step('navigate & check added item in cart page', async () => {
        await page.locator("xpath=//a[@id='cartur']").click()
        await page.waitForSelector("xpath=//tr[@class='success']");
        const elementItem = page.locator("xpath=//tr[@class='success']")
        const countItem = await elementItem.count()
        expect(countItem).toBeGreaterThan(0)
    
        await testInfo.attach("check_added_item", {
            body: await page.screenshot(),
            contentType: "image/png",
        })

        await page.locator("xpath=//button[@class='btn btn-success']").click()
    })
   
    await test.step('fill delivery information', async () => {
        await page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='name']").fill('andre')
        await page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='country']").fill('Malaysia')
        await page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='city']").fill('Selangor')
        await page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='card']").fill('07362736')
        await page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='month']").fill('7')
        await page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='year']").fill('2025')
    
        await page.locator("xpath=//div[@id='orderModal']//descendant::button[@class='btn btn-primary']").click()
        await page.waitForTimeout(1000);
    
        const successAlert = page.locator("xpath=//div[@class='sweet-alert  showSweetAlert visible']");
        await expect(successAlert).toBeVisible();

        await testInfo.attach("success_checkout", {
            body: await page.screenshot(),
            contentType: "image/png",
        })
    })
   
})

