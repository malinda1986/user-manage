//@ts-nocheck
import React from "react";
import Action from "./actions";

const initialState = {};

export const GlobalContext = React.createContext(initialState);

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case Action.UPDATE_STATE:
        return { ...state, ...action.payload };
      default:
        return initialState;
    }
  }, initialState);

  return (
    <GlobalContext.Provider
      // @ts-ignore
      value={{ state, dispatch }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
