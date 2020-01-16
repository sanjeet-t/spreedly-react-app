export default class GooglePayService {
  constructor() {
    this.baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0
    };

    this.tokenizationSpecification = {
      type: 'PAYMENT_GATEWAY',
      parameters: {
        gateway: 'spreedly',
        gatewayMerchantId: '9LOCZRk9HeBm84jvnONUiFqBu0C'
      }
    };

    this.allowedCardNetworks = [
      'AMEX',
      'DISCOVER',
      'INTERAC',
      'JCB',
      'MASTERCARD',
      'VISA'
    ];

    this.allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    this.baseCardPaymentMethod = {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: [
          'AMEX',
          'DISCOVER',
          'INTERAC',
          'JCB',
          'MASTERCARD',
          'VISA'
        ]
      }
    };
  }

  getReadyToPayRequest() {
    const readyToPayReq = Object.assign({}, this.baseRequest);
    readyToPayReq.allowedPaymentMethods = [this.baseCardPaymentMethod];

    return readyToPayReq;
  }

  createPaymentRequest() {
    const cardPaymentMethod = Object.assign(
      { tokenizationSpecification: this.tokenizationSpecification },
      this.baseCardPaymentMethod
    );

    const paymentDataRequest = Object.assign({}, this.baseRequest);
    paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];

    paymentDataRequest.transactionInfo = {
      totalPriceStatus: 'FINAL',
      totalPrice: '123.45',
      currencyCode: 'USD',
      countryCode: 'US'
    };

    paymentDataRequest.merchantInfo = {
      merchantName: 'Ready',
      merchantId: 'READY'
    };

    return paymentDataRequest;
  }
}
