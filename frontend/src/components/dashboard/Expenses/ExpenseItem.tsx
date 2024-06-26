import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../../UI/Card";
import React from "react";

function ExpenseItem(props: any) {
  return (
    <Card className="expense-item">
      <ExpenseDate date={props.item.date} />
      <div className="expense-item__description">
        <h2>{props.item.title}</h2>
        <button className="expense-item__price">${props.item.amount}</button>
      </div>
    </Card>
  ); 
}

export default ExpenseItem;
