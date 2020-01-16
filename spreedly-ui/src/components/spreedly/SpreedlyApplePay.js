import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

class SpreedlyApplePay extends Component {
  state = {};

  componentDidMount() {
    if (window.ApplePaySession) {
      console.log(`Apple Pay is Available...`);
      this.setUpApplePay();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <h1>Spreedly Apple Pay</h1>
        </Container>
      </React.Fragment>
    );
  }
}

export default SpreedlyApplePay;
