import { Route, Routes } from "react-router-dom";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import {HomePage} from "./HomePage/HomePage"
import { Members } from "./Members/Members";
import { Messages } from "./Messages/Messages";
import { Users } from "./Users/Users";
import { Packages } from "./Packages/Packages";
import { SupplementStore } from "./SupplementStore/SupplementStore";
import { MemberProfile } from "./MemberProfile/MemberProfile";
import { Admins } from "./Admins/Admins";
import { Trainers } from "./Trainers/Trainers";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/admins" element = {<Admins />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members" element = {<Members />} />
        <Route path="/messages" element = {<Messages />} />
        <Route path="/users" element = {<Users />} />
        <Route path="/packages" element = {<Packages />} />
        <Route path="/memberProfile/:memberId" element = {<MemberProfile />} />
        <Route path="/supplementStore" element = {<SupplementStore />} />
        <Route path="/trainers" element = {<Trainers />} />
      </Routes>
    </>
  );
};
