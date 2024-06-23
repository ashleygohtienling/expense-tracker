import React from "react";
import "./ExpensesFilter.css";

const ExpensesFilter = (props:any) => {
  const years = ["2019", "2020", "2021", "2022", "2023"];
  const dropdownChangeHandler = (event: any) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select onChange={dropdownChangeHandler}>
          {years.map((year) => {
            return <option value={year}>{year}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
