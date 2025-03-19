import {expect} from '@playwright/test'

export class CheckoutPages{
    constructor(page, testInfo){
        this.page = page;
        this.testInfo = testInfo;
    }

    async goto(){
        await this.page.goto('/');
    }

    async addItem(captureImage){
        const captureImages = captureImage ? captureImage : false;

        await this.page.locator("xpath=//a[@id='nava']").click({timeout: 10_000});
        const randomSelectedItem = Math.floor(Math.random() * 9) + 1;

        await this.page.locator("xpath=(//div[@class='col-lg-4 col-md-6 mb-4'])[" + randomSelectedItem + "]//descendant::a[@class='hrefch']").click({timeout: 10_000});
        await this.page.locator("xpath=//a[@class='btn btn-success btn-lg']").click({timeout:10_000});
        await this.page.waitForLoadState("networkidle");

        captureImages ? 
        await this.testInfo.attach("add_item_1", {
            body: await this.page.screenshot(),
            contentType: "image/png",
        }) : null;
    }

    async countCartItem(){
        await this.page.waitForLoadState("networkidle")
        
        const isItemCartExist = await this.page.locator("xpath=//tr[@class='success']").last().isVisible();
        if(isItemCartExist){
            const elementItem = this.page.locator("xpath=//tr[@class='success']");
            const countItem = await elementItem.count();
    
            return countItem;
        }else{
            return 0;
        }     
    }

    async fillDeliveryInformation(objData, captureImage){
        const captureImages = captureImage ? captureImage : false;

        await this.page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='name']").fill(objData.name);
        await this.page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='country']").fill(objData.country);
        await this.page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='city']").fill(objData.city);
        await this.page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='card']").fill(objData.cardnumber);
        await this.page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='month']").fill(objData.month);
        await this.page.locator("xpath=//div[@id='orderModal']//descendant::input[@id='year']").fill(objData.year);

        await this.page.locator("xpath=//div[@id='orderModal']//descendant::button[@class='btn btn-primary']").click({timeout:10_000});
    
        const successAlert = this.page.locator("xpath=//div[@class='sweet-alert  showSweetAlert visible']");
        await expect(successAlert).toBeVisible();

        captureImages ? 
        await this.testInfo.attach("success_checkout", {
            body: await this.page.screenshot(),
            contentType: "image/png",
        }) : null;
    }
}