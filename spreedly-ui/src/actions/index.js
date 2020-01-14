import httpService from '../services/httpService';

import {
  LOGIN_USER,
  LOGIN_USER_FAIL,
  PAYMENT_TOKENIZATION,
  PAYMENT_CAPTURE,
  PAYMENT_PREAUTH,
  PAYMENT_ERROR,
  ADD_TRANSACTION,
  REFUND_TRANSACTION
} from './types';

const API_URL = 'http://localhost:5001';

export const loginUser = creds => async dispatch => {
  const loginUrl = API_URL + '/login';
  try {
    const response = await httpService.post(loginUrl, {
      data: creds
    });
    dispatch({ type: LOGIN_USER, payload: response.data.userId });
  } catch (e) {
    dispatch({ type: LOGIN_USER_FAIL, payload: e.message });
    throw e;
  }
};

export const setCardToken = (cardToken, methodType) => dispatch => {
  dispatch({
    type: PAYMENT_TOKENIZATION,
    payload: {
      cardToken,
      methodType
    }
  });
};

export const performPayment = token => async (dispatch, getState) => {
  const preauthURL = API_URL + '/spreedly/preauth';
  const captureURL = API_URL + '/spreedly/capture';
  let preauthRes, captureRes;
  // preauth
  try {
    console.log(`Performing preauth...`);
    preauthRes = await httpService.post(preauthURL, {
      data: token
    });
    dispatch({ type: PAYMENT_PREAUTH, payload: preauthRes.data });
  } catch (e) {
    console.log(`Preauth error...`);
    dispatch({ type: PAYMENT_ERROR, payload: e.message });
    throw e;
  }

  // capture
  try {
    console.log(`Performing capture...`);
    const { transaction } = preauthRes.data;
    captureRes = await httpService.post(captureURL, {
      data: transaction.token
    });
    dispatch({ type: PAYMENT_CAPTURE, payload: captureRes.data });
  } catch (e) {
    console.log(`Capture error...`);
    dispatch({ type: PAYMENT_ERROR, payload: e.message });
    throw e;
  }

  const payment = getState().payment;
  dispatch({ type: ADD_TRANSACTION, payload: payment });
};

export const refundTransaction = preauthToken => async dispatch => {
  console.log(`Refunding transaction...`);
  const refundURL = API_URL + '/spreedly/refund';
  try {
    const response = await httpService.post(refundURL, {
      data: preauthToken
    });

    dispatch({
      type: REFUND_TRANSACTION,
      payload: { preauthToken, refundRes: response.data }
    });
  } catch (e) {
    dispatch({ type: PAYMENT_ERROR, payload: e.message });
  }
};
