import axios from 'axios';

export class SpreedlyAPI {
  username: string;
  password: string;
  gatewayToken: string;
  preauthHandler: any;

  constructor(config) {
    this.username = config.SPREEDLY_USERNAME;
    this.password = config.SPREEDLY_PASSWORD;
    this.gatewayToken = config.SPREEDLY_GATEWAY_TOKEN;
    this.preauthHandler = {
      'credit-card': this.preauthCreditCard,
      'google-pay': this.preauthGooglePay,
      'apple-pay': this.preauthApplePay
    };
  }

  async showCreatedGateways() {
    const gatewaysUrl = `https://core.spreedly.com/v1/gateways.json`;

    const response = await axios.get(gatewaysUrl, {
      auth: {
        username: this.username,
        password: this.password
      },
      params: {
        order: 'desc'
      }
    });

    const { gateways } = response.data;
    const testGateways = gateways.filter(g => g.gateway_type === 'test');

    return testGateways;
  }

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

  async executePreauth(payload, method) {
    const preauthFn = this.preauthHandler[method];
    if (!preauthFn) {
      throw 'Preauth handler not found';
    }
    console.log(`Executing preauth for : ${method}`);
    return await preauthFn(payload);
  }

  preauthApplePay = async payload => {};

  preauthGooglePay = async payload => {
    const { googleToken, amount, currency, test } = payload;
    const preauthURL = `https://core.spreedly.com/v1/gateways/${this.gatewayToken}/authorize.json`;

    console.log(`Preauth for google pay`);
    // console.log(googleToken);
    // const parsedToken = JSON.parse(googleToken);
    // console.log(parsedToken);
    // console.log(parsedToken['signature']);
    // console.log(parsedToken['protocolVersion']);
    // console.log(parsedToken['signedMessage']);

    const data = {
      transaction: {
        amount: 1000,
        currency_code: 'USD',
        google_pay: {
          payment_data: {
            signature: googleToken.signature,
            protocolVersion: googleToken.protocolVersion,
            signedMessage: googleToken.signedMessage
          }
        },
        test_card_number: '4111111111111111'
      }
    };

    console.log(JSON.stringify(data));

    return await axios.post(preauthURL, data, {
      auth: {
        username: this.username,
        password: this.password
      }
    });
  };

  preauthCreditCard = async payload => {
    const { preauthToken, amount, currency } = payload;
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
  };

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
