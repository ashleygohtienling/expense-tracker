import React, { FC } from "react";
import h from "Home.module.css";

export const Home: FC = () => {
  return (
    <>
      <a className="link" href="/expenses">
        Dashboard
      </a>
      <a className="link" href="/login">
        Login
      </a>
    </>
  );
};
