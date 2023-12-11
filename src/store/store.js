import { applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { emailListReducer, selectedEmailReducer } from "./emailReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  emailList: emailListReducer,
  selectedEmail: selectedEmailReducer
});

export const store = configureStore(
  {reducer: rootReducer},
  composeWithDevTools(applyMiddleware(thunk))
);