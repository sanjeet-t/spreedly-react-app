import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Grid, Header, Loader, Segment, Message } from 'semantic-ui-react';
import GooglePayService from '../../services/googlePayService';

import ErrorMessage from '../ErrorMessage';
import { setCardToken, performPayment } from '../../actions';

class SpreedlyGooglePay extends Component {
  state = {
    buttonAdded: false,
    processing: false,
    googlePayError: null
  };

  componentDidMount() {
    this.googlePayService = new GooglePayService();
  }

  setupGooglePay = async () => {
    this.paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST'
    });

    // google-pay button
    try {
      const { buttonAdded } = this.state;
      const isGoogleReady = await this.paymentsClient.isReadyToPay(
        this.googlePayService.getReadyToPayRequest()
      );
      if (isGoogleReady.result && !buttonAdded) {
        const button = this.paymentsClient.createButton({
          onClick: this.handleGooglePay
        });
        document.getElementById('container').appendChild(button);
        this.setState({ buttonAdded: true });
      }
    } catch (e) {
      console.error(`Google pay not ready : ${e}`);
    }
  };

  handleGooglePay = async () => {
    console.log(`Handle Google Pay....`);
    try {
      this.setState({ processing: true });
      this.setState({ googlePayError: null });

      const paymentRequest = this.googlePayService.createPaymentRequest();
      const paymentData = await this.paymentsClient.loadPaymentData(
        paymentRequest
      );

      console.log(paymentData);

      console.log(`Tokenized via google pay`);
      const paymentToken = JSON.parse(
        paymentData.paymentMethodData.tokenizationData.token
      );
      console.log(paymentToken);
      this.props.setCardToken(paymentToken, 'google-pay');

      // send to back-end
      const paymentPayload = {
        googleToken: paymentToken,
        amount: 10,
        currency: 'USD',
        test: true
      };
      await this.props.performPayment(paymentPayload, 'google-pay');
    } catch (e) {
      console.error(`Cannot tokenize google pay : ${e}`);
      this.setState({ googlePayError: e.message });
    } finally {
      this.setState({ processing: false });
    }
  };

  handleOnLoad = e => {
    const { buttonAdded } = this.state;
    setTimeout(() => {
      const shouldAddButton =
        window.google && window.google.payments.api && !buttonAdded;
      if (shouldAddButton) {
        console.log(`Google pay loaded in component`);
        this.setupGooglePay();
      }
    }, 300);
  };

  render() {
    const { processing, googlePayError } = this.state;
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
            <Loader active={processing} inverted></Loader>
            <div id="container"></div>
          </Grid.Row>
          <Grid.Row>
            <ErrorMessage
              show={googlePayError}
              header="Google Pay Error"
              content={googlePayError}
            ></ErrorMessage>
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
