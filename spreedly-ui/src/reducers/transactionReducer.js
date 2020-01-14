const initialState = [];

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'ADD_TRANSACTION':
      newState = [...state];
      newState.push(action.payload);
      return newState;
    case 'REFUND_TRANSACTION':
      newState = [...state];
      const { preauthToken, refundRes } = action.payload;
      const transaction = newState.find(
        t => t.preauthRes.transaction.token === preauthToken
      );
      if (!transaction) {
        console.log(`Cannot find refunded transaction`);
        return newState;
      }
      transaction.refundRes = refundRes;
      return newState;
    default:
      return state;
  }
};
