const { test, expect } = require('@playwright/test') ;
require('dotenv').config();

test('Login with valid credential', async({page}) => {
    await page.goto('https://www.demoblaze.com/index.html');

    await page.locator("xpath=//div[@class='navbar-collapse']//descendant::a[@id='login2']").click();
    await page.locator("xpath=//input[@id='loginusername']").fill(process.env.CREDENTIAL_USERNAME);
    await page.locator("xpath=//input[@id='loginpassword']").fill(process.env.CREDENTIAL_PASSWORD);
    await page.locator("xpath=//div[@id='logInModal']//descendant::button[@class='btn btn-primary']").click();    

    const userWelcomeElement = page.locator("xpath=//a[@id='nameofuser']");
    await expect(userWelcomeElement).toBeVisible();
})

test('Login with invalid credential', async({page}) => {
    await page.goto('https://www.demoblaze.com/index.html');

    await page.locator("xpath=//div[@class='navbar-collapse']//descendant::a[@id='login2']").click();
    await page.locator("xpath=//input[@id='loginusername']").fill('asas');
    await page.locator("xpath=//input[@id='loginpassword']").fill('aa');
    await page.locator("xpath=//div[@id='logInModal']//descendant::button[@class='btn btn-primary']").click(); 
    
    const userWelcomeElement = page.locator("xpath=//a[@id='nameofuser']");
    await expect(userWelcomeElement).toBeHidden();
})


