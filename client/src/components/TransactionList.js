import React, { useContext, useEffect } from "react";
import { globalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  const { transactions, getTransaction } = useContext(globalContext);

  useEffect(() => {
    getTransaction();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions.map((transaction) => (
          <Transaction transaction={transaction} key={transactions.id} />
        ))}
      </ul>
    </>
  );
};
