const initialState = {
  cardTokenizationRes: null,
  preauthRes: null,
  captureRes: null,
  refundRes: null,
  paymentErrors: [],
  type: null
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'PAYMENT_TOKENIZATION':
      // start off with a brand new object
      newState = Object.assign({}, initialState);
      newState.cardTokenizationRes = action.payload.cardToken;
      newState.type = action.payload.methodType;
      return newState;
    case 'PAYMENT_PREAUTH':
      newState = { ...state };
      newState.preauthRes = action.payload;
      return newState;
    case 'PAYMENT_CAPTURE':
      newState = { ...state };
      newState.captureRes = action.payload;
      return newState;
    case 'PAYMENT_ERROR':
      newState = { ...state };
      newState.paymentErrors.push(action.payload);
      return newState;
    default:
      return state;
  }
};
