import { Route, Routes } from "react-router-dom";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import {HomePage} from "./HomePage/HomePage"
import { Members } from "./Members/Members";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members" element = {<Members />} />
      </Routes>
    </>
  );
};
