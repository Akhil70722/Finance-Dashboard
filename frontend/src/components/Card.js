// src/components/Card.js
import React from 'react';

const Card = ({ title, amount, icon, bgColor }) => {
  return (
    <div
      className="d-flex align-items-center p-4 rounded text-white"
      style={{
        flex: 1,
        minWidth: '220px',
        backgroundColor: bgColor,
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        borderRadius: '16px'
      }}
    >
      <div
        className="me-3 d-flex justify-content-center align-items-center"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{title}</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{amount}</div>
      </div>
    </div>
  );
};

export default Card;
