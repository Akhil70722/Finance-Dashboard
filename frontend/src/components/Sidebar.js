import React from 'react';
import {
  FaTachometerAlt,
  FaWallet,
  FaChartBar,
  FaUser,
  FaEnvelope,
  FaCog,
  FaExchangeAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="custom-sidebar">
      <div className="sidebar-header">
        <h2>🪙 Penta</h2>
      </div>
      <nav className="sidebar-nav">
        <div className="sidebar-link"><FaTachometerAlt /> <span>Dashboard</span></div>
        <div className="sidebar-link"><FaExchangeAlt /> <span>Transactions</span></div>
        <div className="sidebar-link"><FaWallet /> <span>Wallet</span></div>
        <div className="sidebar-link"><FaChartBar /> <span>Analytics</span></div>
        <div className="sidebar-link"><FaUser /> <span>Personal</span></div>
        <div className="sidebar-link"><FaEnvelope /> <span>Message</span></div>
        <div className="sidebar-link"><FaCog /> <span>Setting</span></div>
      </nav>
    </div>
  );
};

export default Sidebar;
