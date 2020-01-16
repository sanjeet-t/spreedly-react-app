import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCardToken, performPayment } from '../../actions';

import {
  Grid,
  Button,
  Form,
  Header,
  Segment,
  Message
} from 'semantic-ui-react';

import ErrorMessage from '../ErrorMessage';

class SpreedlyCreditCard extends Component {
  state = {
    paymentErrors: [],
    paymentProcessing: false,
    paymentCaptured: false,
    route: 'credit-card'
  };

  componentDidMount() {
    console.log(`In spreedly payment...`);
    if (window.Spreedly) {
      this.setupSpreedly();
      console.log(`Spreedly init-ed`);
    }
  }

  componentWillUnmount() {
    window.Spreedly.removeHandlers();
  }

  setupSpreedly() {
    const that = this;

    // get from config
    window.Spreedly.init('9LOCZRk9HeBm84jvnONUiFqBu0C', {
      numberEl: 'spreedly-number',
      cvvEl: 'spreedly-cvv'
    });

    window.Spreedly.on('ready', function() {
      console.log(`Spreedly ready....`);
      const submitButton = document.getElementById('submit-button');
      submitButton.disabled = false;

      window.Spreedly.setParam('allow_blank_name', true);
      window.Spreedly.setParam('allow_expired_date', true);
      // credit card number
      window.Spreedly.setPlaceholder('number', 'Card Number');
      window.Spreedly.setFieldType('number', 'text');
      window.Spreedly.setStyle('number', 'font-size: 14px; padding: 8px;');
      window.Spreedly.setNumberFormat('prettyFormat');
      // cvv
      window.Spreedly.setPlaceholder('cvv', 'CVV');
      window.Spreedly.setFieldType('cvv', 'text');
      window.Spreedly.setStyle('cvv', 'font-size: 14px; padding: 8px;');

      // testing
      window.Spreedly.setValue('number', '4111111111111111');
      window.Spreedly.setValue('cvv', '123');
      window.Spreedly.setValue('month', 11);
      window.Spreedly.setValue('year', 2020);

      document.getElementById('month').value = 10;
      document.getElementById('year').value = 2020;
    });

    window.Spreedly.on('errors', errors => {
      for (let i = 0; i < errors.length; i++) {
        var error = errors[i];
        console.log(error);
      }

      that.setState({ paymentProcessing: false });

      // refresh the form
      window.Spreedly.reload();
      document.getElementById('month').value = '';
      document.getElementById('year').value = '';

      const errorMessages = errors.map(err => err.message);
      that.setState({ paymentErrors: errorMessages });
    });

    window.Spreedly.on('paymentMethod', async (token, paymentMethod) => {
      // Set the token in the hidden form field
      console.log(`Tokenization success...`);
      this.props.setCardToken(token, 'credit-card');
      try {
        const paymentPayload = {
          preauthToken: token,
          amount: 100,
          test: true,
          currency: 'USD'
        };
        await this.props.performPayment(paymentPayload, 'credit-card');
        that.setState({ paymentCaptured: true });
        that.setState({ paymentErrors: [] });
      } catch (e) {
        console.error(`Cannot complete payment : ${e.message}`);
        that.setState({ paymentErrors: [e] });
      } finally {
        that.setState({ paymentProcessing: false });
      }
    });
  }

  submitPaymentForm = () => {
    const requiredFields = {};
    requiredFields['full_name'] = '';
    requiredFields['month'] = document.getElementById('month').value;
    requiredFields['year'] = document.getElementById('year').value;

    window.Spreedly.tokenizeCreditCard(requiredFields);
    this.setState({ paymentProcessing: true });
  };

  render() {
    const colorScheme = 'olive';
    const { paymentProcessing, paymentErrors, paymentCaptured } = this.state;
    const hasErrors = paymentErrors.length > 0;

    return (
      <React.Fragment>
        <Grid
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 400 }}>
            <Header as="h2" color={colorScheme} textAlign="center">
              Spreedly Credit Card
            </Header>
            <Form id="payment-form" size="small" loading={paymentProcessing}>
              <Segment stacked>
                <Form.Field>
                  <input
                    type="hidden"
                    name="payment_method_token"
                    id="payment_method_token"
                  />
                </Form.Field>
                <Form.Field>
                  <div
                    id="spreedly-number"
                    style={{
                      width: '100%',
                      background: 'white',
                      height: '36px',
                      border: '1px solid grey',
                      borderRadius: '4px'
                    }}
                  ></div>
                </Form.Field>
                <Form.Group widths="equal">
                  <Form.Field>
                    <input
                      id="month"
                      name="month"
                      maxLength="2"
                      placeholder="MM"
                      style={{
                        border: '1px solid grey'
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <input
                      id="year"
                      name="year"
                      maxLength="4"
                      placeholder="YYYY"
                      style={{
                        border: '1px solid grey'
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <div
                      id="spreedly-cvv"
                      type="number"
                      style={{
                        background: 'white',
                        height: '36px',
                        border: '1px solid grey',
                        borderRadius: '4px'
                      }}
                    ></div>
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <Button
                    color="olive"
                    id="submit-button"
                    type="submit"
                    fluid
                    size="large"
                    onClick={this.submitPaymentForm}
                  >
                    Pay Now
                  </Button>
                </Form.Field>
              </Segment>
            </Form>
            <ErrorMessage
              show={hasErrors}
              header="A Payment error has occured"
              content={paymentErrors}
            ></ErrorMessage>
            {paymentCaptured && (
              <Message positive>
                <Message.Header>Payment Successful</Message.Header>
                <p>The payment was captured</p>
              </Message>
            )}
          </Grid.Column>
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
})(SpreedlyCreditCard);
