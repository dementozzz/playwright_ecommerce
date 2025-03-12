import {expect} from '@playwright/test'

export class LoginPages {
    constructor(page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('/');
    }
    
    async loginValid(){
        await this.page.locator("xpath=//div[@class='navbar-collapse']//descendant::a[@id='login2']").click();
        await this.page.locator("xpath=//input[@id='loginusername']").fill(process.env.CREDENTIAL_USERNAME);
        await this.page.locator("xpath=//input[@id='loginpassword']").fill(process.env.CREDENTIAL_PASSWORD);
        await this.page.locator("xpath=//div[@id='logInModal']//descendant::button[@class='btn btn-primary']").click();    

        const userWelcomeElement = this.page.locator("xpath=//a[@id='nameofuser']");
        await expect(userWelcomeElement).toBeVisible();
    }

    async loginInvalid(){
        await this.page.locator("xpath=//div[@class='navbar-collapse']//descendant::a[@id='login2']").click();
        await this.page.locator("xpath=//input[@id='loginusername']").fill('asas');
        await this.page.locator("xpath=//input[@id='loginpassword']").fill('aa');
        await this.page.locator("xpath=//div[@id='logInModal']//descendant::button[@class='btn btn-primary']").click(); 
        
        const userWelcomeElement = this.page.locator("xpath=//a[@id='nameofuser']");
        await expect(userWelcomeElement).toBeHidden();
    }
}