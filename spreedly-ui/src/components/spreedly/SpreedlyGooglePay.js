import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Grid, Header } from 'semantic-ui-react';
import GooglePayService from '../../services/googlePayService';

import { setCardToken, performPayment } from '../../actions';

class SpreedlyGooglePay extends Component {
  componentDidMount() {
    this.googlePayService = new GooglePayService();
  }

  setupGooglePay = async () => {
    this.paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST'
    });

    // google-pay button
    try {
      const isGoogleReady = await this.paymentsClient.isReadyToPay(
        this.googlePayService.getReadyToPayRequest()
      );
      if (isGoogleReady.result) {
        const button = this.paymentsClient.createButton({
          onClick: this.handleGooglePay
        });
        document.getElementById('container').appendChild(button);
      }
    } catch (e) {
      console.error(`Google pay not ready : ${e}`);
    }
  };

  handleGooglePay = async () => {
    console.log(`Handle Google Pay....`);
    const paymentRequest = this.googlePayService.createPaymentRequest();
    try {
      const paymentData = await this.paymentsClient.loadPaymentData(
        paymentRequest
      );
      console.log(`Tokenized via google pay`);
      const paymentToken = JSON.parse(
        paymentData.paymentMethodData.tokenizationData.token
      );
      console.log(paymentToken);
      this.props.setCardToken(paymentToken, 'google-pay');

      await this.props.
    } catch (e) {
      console.error(`Cannot tokenize google pay : ${e}`);
    }
  };

  handleOnLoad = e => {
    setTimeout(() => {
      if (window.google && window.google.payments.api) {
        console.log(`Google pay loaded in component`);
        this.setupGooglePay();
      }
    }, 200);
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <script
            async
            src="https://pay.google.com/gp/p/js/pay.js"
            onload={this.handleOnLoad()}
          ></script>
        </Helmet>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Row>
            <Header as="h2" color="olive" textAlign="center">
              Spreedly Google Pay
            </Header>
          </Grid.Row>

          <Grid.Row>
            <div id="container"></div>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { payment: state.payment, transactions: state.transactions };
};

export default connect(mapStateToProps, {
  setCardToken,
  performPayment
})(SpreedlyGooglePay);
