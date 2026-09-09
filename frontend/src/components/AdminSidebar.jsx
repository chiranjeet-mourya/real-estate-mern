import React from "react";
import { adminSidebarStyles as s } from "../assets/dummyStyles";
import { useAuth } from "../context/AuthContext";
import Logo from "./common/Logo";

import {
  HiOutlineChatAlt2,
  HiOutlineLibrary,
  HiOutlineLogout,
  HiOutlineMail,
  HiOutlineUserCircle,
  HiOutlineUsers,
  HiOutlineViewGrid,
} from "react-icons/hi";

import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isOpen, onClose }) => {
  // Get logout from AuthContext
  const { logout } = useAuth();

  const navItems = [
    {
      name: "Overview",
      icon: HiOutlineViewGrid,
      path: "/admin-dashboard",
    },
    {
      name: "Users",
      icon: HiOutlineUsers,
      path: "/admin/users",
    },
    {
      name: "Seller Requests",
      icon: HiOutlineUserCircle,
      path: "/admin/seller-requests",
    },
    {
      name: "Properties",
      icon: HiOutlineLibrary,
      path: "/admin/properties",
    },
    {
      name: "Inquiries",
      icon: HiOutlineChatAlt2,
      path: "/admin/inquiries",
    },
    {
      name: "Contact Inbox",
      icon: HiOutlineMail,
      path: "/admin/contacts",
    },
    {
      name: "Settings",
      icon: HiOutlineMail,
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    onClose();

    if (logout) {
      logout();
    }
  };

  return (
    <>
      {/* =========================
          MOBILE BACKDROP
      ========================= */}
      {isOpen && (
        <div
          className={s.backdrop(true)}
          onClick={onClose}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className={s.sidebar(isOpen)}>
        {/* Logo */}
        <div className={s.logoContainer}>
          <Logo
            fontSize="1.25rem"
            iconSize={20}
          />
        </div>

        {/* Navigation */}
        <nav className={s.navContainer}>
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  s.navLink(isActive)
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={s.logoutContainer}>
          <button
            type="button"
            onClick={handleLogout}
            className={s.logoutButton}
          >
            <HiOutlineLogout size={20} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;