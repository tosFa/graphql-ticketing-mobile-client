export const initialState = {
  errors: [],
};
export const actionsTypes = {
  REPORT_ERROR: 'REPORT_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
};

export const actions = {
  reportError(error) {
    return { type: actionsTypes.REPORT_ERROR, error };
  },
  clearErrors() {
    return { type: actionsTypes.CLEAR_ERRORS };
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.REPORT_ERROR:
      return { errors: state.errors.concat([action.error]) };
    case actionsTypes.CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
};

