import axios from 'axios';

export class SpreedlyAPI {
  username: string;
  password: string;
  gatewayToken: string;
  preauthCommand: any;

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

  preauthCreditCard() {}

  preauthGooglePay() {}

  preauthApplePay() {}
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

  async fullRefund(token) {
    const refundURL = `https://core.spreedly.com/v1/transactions/${token}/credit.json`;
    return await axios.post(
      refundURL,
      {},
      {
        auth: {
          username: this.username,
          password: this.password
        }
      }
    );
  }

  async preauth(preauthToken, amount, currency) {
    const preauthURL = `https://core.spreedly.com/v1/gateways/${this.gatewayToken}/authorize.json`;

    return await axios.post(
      preauthURL,
      {
        transaction: {
          payment_method_token: preauthToken,
          amount: amount,
          currency_code: currency
        }
      },
      {
        auth: {
          username: this.username,
          password: this.password
        }
      }
    );
  }

  async capture(preauthToken) {
    const captureURL = `https://core.spreedly.com/v1/transactions/${preauthToken}/capture.json`;

    return await axios.post(
      captureURL,
      {},
      {
        auth: {
          username: this.username,
          password: this.password
        }
      }
    );
  }
}
