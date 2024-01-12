import React, { useState } from "react";
import "../style/layout.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Appointments", path: "/appointments", icon: "ri-file-list-line" },
    {
      name: "Apply for Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
  ];
  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Users", path: "/users", icon: "ri-user-line" },
    { name: "Doctors", path: "/doctors", icon: "ri-hospital-line" },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
  ];

  const renderedMenu = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">TM</h1>
          </div>
          <div className="menu">
            {renderedMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className="d-flex menu-item"
              onClick={() => {
                localStorage.clear();
              }}
            >
              <i className="ri-logout-box-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <i className="ri-notification-2-line header-action-icon mr-2 px-3"></i>
              <Link className="auth-link" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
