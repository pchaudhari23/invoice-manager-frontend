import React from "react";
import { Link } from "react-router-dom";
import "./SideDrawer.css";

const SideDrawer = () => {
  return (
    <aside id="app-sidebar" className="app-sidebar">
      <Link to="/invoices">Invoices</Link>
      <Link to="/clients">Clients</Link>
      <Link to="/estimates">Estimates</Link>
      <Link to="/payments">Payments</Link>
      <Link to="/expenses">Expenses</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings & Privacy</Link>
      <Link to="/help">Help & Support</Link>
      <Link to="/logout">Logout</Link>
    </aside>
  );
};

export default SideDrawer;
