import React from "react";
import "../global.css";
import {  GlobalContextProvider } from "../context/GlobalContext";
import MainLayout from "./MainLayout";

const RootLayout = () => {
  return (
    <GlobalContextProvider>
      <MainLayout />
    </GlobalContextProvider>
  );
};

export default RootLayout;
