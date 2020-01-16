"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class SpreedlyAPI {
    constructor(config) {
        this.username = config.SPREEDLY_USERNAME;
        this.password = config.SPREEDLY_PASSWORD;
        this.gatewayToken = config.SPREEDLY_GATEWAY_TOKEN;
        this.preauth = {
            'credit-card': this.preauthCreditCard,
            'google-pay': this.preauthGooglePay,
            'apple-pay': this.preauthApplePay
        };
    }
    preauthCreditCard() { }
    preauthGooglePay() { }
    preauthApplePay() { }
    // async getGatewayToken() {
    //   const gatewayURL = `https://core.spreedly.com/v1/gateways.json`;
    //   return await axios.post(
    //     gatewayURL,
    //     {},
    //     {
    //       auth: {
    //         username: this.username,
    //         password: this.password
    //       }
    //     }
    //   );
    // }
    fullRefund(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const refundURL = `https://core.spreedly.com/v1/transactions/${token}/credit.json`;
            return yield axios_1.default.post(refundURL, {}, {
                auth: {
                    username: this.username,
                    password: this.password
                }
            });
        });
    }
    preauth(preauthToken, amount, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            const preauthURL = `https://core.spreedly.com/v1/gateways/${this.gatewayToken}/authorize.json`;
            return yield axios_1.default.post(preauthURL, {
                transaction: {
                    payment_method_token: preauthToken,
                    amount: amount,
                    currency_code: currency
                }
            }, {
                auth: {
                    username: this.username,
                    password: this.password
                }
            });
        });
    }
    capture(preauthToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const captureURL = `https://core.spreedly.com/v1/transactions/${preauthToken}/capture.json`;
            return yield axios_1.default.post(captureURL, {}, {
                auth: {
                    username: this.username,
                    password: this.password
                }
            });
        });
    }
}
exports.SpreedlyAPI = SpreedlyAPI;
//# sourceMappingURL=spreedlyAPI.js.map