import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import paymentReducer from './paymentReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
  login: loginReducer,
  payment: paymentReducer,
  transactions: transactionReducer
});
