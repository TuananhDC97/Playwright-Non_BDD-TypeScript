import { LoginInfo } from '@models/business-models/book/login-info';
import { BasePage } from '@core/page/base.page';

export class LoginPage extends BasePage {
    constructor(page, endpoint) {
        super(page, endpoint);
        this.screenshotMaskedLocator = [];
    }

    public get usernameTextbox() { return this.page.locator('#userName'); }
    public get passwordTextbox() { return this.page.locator('#password'); }
    public get loginButton() { return this.page.locator('#login'); }
    public get errorMessage() { return this.page.locator('#name'); }

    async login(loginInfo: LoginInfo) {
        await this.typeText(this.usernameTextbox, loginInfo.Username);
        await this.typeText(this.passwordTextbox, loginInfo.Password);
        await this.click(this.loginButton);
    }
}
