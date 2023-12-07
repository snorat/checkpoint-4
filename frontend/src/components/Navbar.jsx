import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdNotificationsNone } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="navbar">
      <li>
        <NavLink to="/" className="logo">
          <img src="https://x.sammi.app/images/logo.svg" alt="logo" />
        </NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/">
          <GoHome className="icon" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/notifications">
          <MdNotificationsNone className="icon" />
          Notifications
        </NavLink>
      </li>
      <li>
        <NavLink to="/myprofile">
          <RxAvatar className="icon" /> Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/explore">
          <IoSearch className="icon" /> Explore
        </NavLink>
      </li>
      <div className="post_btn">
        <button type="button">
          <NavLink to="/post">POST</NavLink>
        </button>
      </div>
    </div>
  );
}
