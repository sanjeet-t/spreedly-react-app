import React, { Component } from 'react';
import Navbar from '../Navbar';
import SpreedlyCreditCard from './SpreedlyCreditCard';
import SpreedlyGooglePay from './SpreedlyGooglePay';
import SpreedlyAppePay from './SpreedlyApplePay';
import Transactions from './Transactions';

import { connect } from 'react-redux';
import { refundTransaction } from '../../actions';

class SpreedlyShell extends Component {
  state = {
    activeItem: 'creditCard'
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  signOut() {
    console.log(`Sign out`);
  }

  handleRefund = payment => {
    const preauthToken = payment.preauthRes.transaction.token;
    console.log(`Executing refund for ${preauthToken}`);
    this.props.refundTransaction(preauthToken);
  };

  render() {
    const { activeItem } = this.state;
    const creditCardPage = activeItem === 'creditCard';
    const googlePayPage = activeItem === 'googlePay';
    const applePayPage = activeItem === 'applePay';
    const transactionsPage = activeItem === 'transactions';
    const numOfTransactions = this.props.transactions.length;

    return (
      <React.Fragment>
        <Navbar
          activeItem={activeItem}
          handleItemClick={this.handleItemClick}
          signOut={this.signOut}
          numOfTransactions={numOfTransactions}
        ></Navbar>
        {creditCardPage && <SpreedlyCreditCard payment={this.props.payment} />}
        {googlePayPage && <SpreedlyGooglePay />}
        {applePayPage && <SpreedlyAppePay />}
        {transactionsPage && (
          <Transactions
            payments={this.props.transactions}
            handleRefund={this.handleRefund}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { transactions: state.transactions, payment: state.payment };
};

export default connect(mapStateToProps, {
  refundTransaction
})(SpreedlyShell);
