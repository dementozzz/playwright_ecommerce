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
    const qtyItemAdded = 3;

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });

    for(let i = 0; i < qtyItemAdded; i++){
        await test.step('add item (' + (i+1) + ')', async () => {
            await checkoutPages.addItem(true)
        })
    }
    
    await test.step('navigate & check added item in cart page', async () => {
        await page.locator("xpath=//a[@id='cartur']").click({timeout: 10_000});
        
        const qtyCartItem = await checkoutPages.countCartItem();
        console.log("Qty ITEM : " + qtyCartItem)
        expect(qtyCartItem).toEqual(qtyItemAdded);
    
        await testInfo.attach("check_added_item", {
            body: await page.screenshot(),
            contentType: "image/png",
        })
        await page.locator("xpath=//button[@class='btn btn-success']").click({timeout: 10_000})
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


