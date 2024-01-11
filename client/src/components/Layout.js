import React from "react";
import "../style/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="slidebar">Sidebar</div>
        <div className="content">
          <div className="header">Header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
