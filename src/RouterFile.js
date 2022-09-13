import React from "react";
import SignUp from "./component/Auth/SignUp";
import Log_in from "./component/Auth/LogIn";
import { Routes, Route } from "react-router-dom";
import DeskBoard from "./component/OAuth/DaskBoard";

const RouterFile = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Log_in />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Log_in />} />
        <Route exact path="/dashboard/*" element={<DeskBoard/>}/>
        <Route path ="*" element={<SignUp/>}></Route>
      </Routes>
    </>
  );
};

export default RouterFile;
