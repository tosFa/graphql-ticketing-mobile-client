export const initialState = {
  loggedIn: false,
  authToken: null,

};
export const actionsTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const actions = {
  login(key) {
    return { type: actionsTypes.LOGIN, key };
  },
  logout() {
    return { type: actionsTypes.LOGOUT }
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.LOGIN:
      return { loggedIn: true, authToken: action.key };
    case actionsTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

