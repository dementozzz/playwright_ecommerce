const { test, expect } = require('@playwright/test') ;
const {LoginPages} = require('../pages/login.pages');
require('dotenv').config();

test('Login with valid credential', async({page}) => {
    const loginPages = new LoginPages(page);
    
    await loginPages.goto();
    await loginPages.loginValid();
})

test('Login with invalid credential', async({page}) => {
    const loginPages = new LoginPages(page);
    
    await loginPages.goto();
    await loginPages.loginInvalid();
})


