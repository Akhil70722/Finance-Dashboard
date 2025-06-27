import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <h4>Dashboard</h4>
      <div className="d-flex align-items-center">
        <input type="text" className="form-control me-3" placeholder="Search..." style={{ width: '200px', background: '#1e1e2f', color: 'white', border: 'none' }} />
        <i className="bi bi-bell me-3" style={{ fontSize: '1.2rem' }}></i>
        <img
          src="https://i.pravatar.cc/300"
          alt="Profile"
          style={{ width: '35px', height: '35px', borderRadius: '50%' }}
        />
      </div>
    </div>
  );
};

export default Header;
