import React from "react";
import "../style/layout.css";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
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
    { name: "Logout", path: "/logout", icon: "ri-login-box-line" },
  ];

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="slidebar">
          <div className="sidebar-header">
            <h1>TM</h1>
          </div>
          <div className="menu">
            {userMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">Header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
