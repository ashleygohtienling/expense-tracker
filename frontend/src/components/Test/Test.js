import React, { useState, createContext, useContext } from "react";
import useArray from "./useArray";

export default function Test() {
  const initialValue = [];
  const { value, push, removeByIndex } = useArray(["initial", "Value"]);

  push("Red");
  push("Blue");
  push("Green");

  return <div>value</div>;
}
