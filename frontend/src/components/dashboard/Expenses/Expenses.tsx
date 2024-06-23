import ExpenseItem from "./ExpenseItem";
import Card from "../../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import React, { useState } from "react";

const Expenses = (props: any) => {
  const [filteredYear, setFilteredYear] = useState("2020");
  const filterChangeHandler = (selectedYear: any) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter onChangeFilter={filterChangeHandler} />
      {}
      {props.items.map((item: any) => (
        <ExpenseItem item={item} key={item.id} />
      ))}
    </Card>
  );
};

export default Expenses;
