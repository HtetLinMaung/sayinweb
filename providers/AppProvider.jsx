import { createContext, useReducer } from "react";

export const appContext = createContext(null);

const map = {
  Category: [],
  Product: [],
  Invoice: [],
  Sale: [],
  User: [],
  Role: [],
};

const initialState = {
  sortItems: { ...map },
  moduleheaders: { ...map },
  loading: false,
  token: "",
  modulepermissions: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default function AppProvider({ children }) {
  return (
    <appContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </appContext.Provider>
  );
}
