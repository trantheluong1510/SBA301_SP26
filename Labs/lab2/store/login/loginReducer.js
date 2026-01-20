export const INITIAL_STATE = {
  username: "",
  password: "",
  error: "",
  validated: false,
  loading: false,
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        [action.field]: action.value,
        error: "",
      };

    case "SUBMIT_ATTEMPT":
      return {
        ...state,
        validated: true,
        loading: true, // Bắt đầu xoay loading
        error: "",
      };

    case "VALIDATION_ERROR":
      return {
        ...state,
        loading: false,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Sai username hoặc password.",
      };

    case "RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
};