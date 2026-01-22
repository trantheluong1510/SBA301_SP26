export const INITIAL_STATE = {
  username: "",
  password: "",
  error: "",
  validated: false,
  loading: false,
  isAuthenticated: false,
  user: null, // Thêm cái này để lưu thông tin account (role, id...)
};

export const authReducer = (state, action) => {
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
        loading: true,
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
        isAuthenticated: true,
        user: action.payload, // Lưu thông tin user tìm được
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload || "Sai username hoặc password.", // Nhận message lỗi động
        isAuthenticated: false,
        user: null
      };

    case "RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
};