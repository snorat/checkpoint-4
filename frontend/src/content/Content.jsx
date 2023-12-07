import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Explore from "../pages/Explore";
import Post from "../pages/Post";
import EditProfile from "../components/EditProfile";

export default function Content() {
  return (
    <section className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profileedit" element={<EditProfile />} />
      </Routes>
    </section>
  );
}
