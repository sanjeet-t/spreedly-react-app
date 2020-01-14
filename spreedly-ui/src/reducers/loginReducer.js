const initialState = {
  loginUser: null,
  loginError: null
};

export default (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'LOGIN_USER':
      newState = { ...state };
      newState.loginError = null;
      newState.loginUser = action.payload;
      return newState;
    case 'LOGIN_USER_FAIL':
      newState = { ...state };
      newState.loginError = action.payload;
      return newState;

    default:
      return state;
  }
};
