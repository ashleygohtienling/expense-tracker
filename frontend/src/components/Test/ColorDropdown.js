import React, { useState, createContext, useContext } from "react";

export default function ColorDropdown() {
  const colours = ["Red", "Blue", "Green"];
  const [chosenColor, setChosenColor] = useState("Red");
  const clickHandler = (e) => {
    setChosenColor(e.target.value);
  };
  return (
    <>
      <select onChange={clickHandler}>
        {colours.map((colour) => (
          <option value={colour}>{colour}</option>
        ))}
      </select>
      <p>You have selected: {chosenColor}</p>
    </>
  );
}
