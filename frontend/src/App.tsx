import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React, { FC, useState } from "react";
import { Login, Home } from "components/views";
import { ExpenseTracker } from "components/dashboard/ExpenseTracker";

const App: FC = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //     id: "root",
  //     children: [
  //       {
  //         index: true,
  //         path: "/login",
  //         element: <Login />,
  //       },
  //       {
  //         path: "/expenses",
  //         element: <ExpenseTracker />,
  //       },
  //     ],
  //   },
  // ]);
  // return <RouterProvider router={router} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
      </Routes>
    </Router>
  );
};

export default App;
