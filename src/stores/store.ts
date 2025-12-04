import { combineReducers, configureStore, type Reducer } from "@reduxjs/toolkit";

// Sẽ import reducer user sau
import authenReducer from '../stores/authenSlice';
import userReducer from '../stores/userSlice';
import chatReducer from '../stores/chatSlice';

const appReducer = combineReducers({
  authen: authenReducer,
  user: userReducer,
  chat: chatReducer,
  // ...
});

const rootReducer: Reducer = (state, action) => {
  // Kiểm tra nếu action là Logout (bạn có thể check theo string type)
  if (action.type === 'auth/logout/fulfilled' || action.type === 'auth/resetAuth') {
    // Gán state = undefined -> Tất cả các slice sẽ tự reset về initialState
    state = undefined;
  }

  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// Typings cho useDispatch & useSelector
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
