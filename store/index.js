import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import app from "@/store/appSlice";
import ethplorer from "@/store/ethplorerSlice";

// https://stackoverflow.com/questions/70426965/how-to-use-next-redux-wrapper-with-next-js-redux-toolkit-and-typescript-p

const combinedReducer = combineReducers({
  app,
  ethplorer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

export const wrapper = createWrapper(makeStore);
