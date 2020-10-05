import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { axios } from "axios";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

export const globalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransaction() {
    try {
      const res = await axios.get("/api/version1/transactions");
      console.log("HI");
      console.log(res.data);
      dispatch({
        type: "GET_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response,
      });
    }
  }
  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/version1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response,
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(transaction.text);
    try {
      const res = await axios.post(
        "/api/version1/transactions",
        transaction,
        config
      );

      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response,
      });
    }
  }

  return (
    <globalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransaction,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
