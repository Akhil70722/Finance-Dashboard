import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import './Overview.css'; // Add this for custom styles
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Overview = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    revenue: 0,
    expenses: 0,
    savings: 0
  });

  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard-summary/')
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error('Failed to fetch dashboard summary', err));
  }, []);

  return (
    <div className="overview-wrapper">
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="overview-card bg-primary text-white">
            <div className="title">Balance</div>
            <div className="value">₹ {summary.balance}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="overview-card bg-success text-white">
            <div className="title">Revenue</div>
            <div className="value">
              <FaArrowUp className="icon" /> ₹ {summary.revenue}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="overview-card bg-danger text-white">
            <div className="title">Expenses</div>
            <div className="value">
              <FaArrowDown className="icon" /> ₹ {summary.expenses}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="overview-card bg-warning text-dark">
            <div className="title">Savings</div>
            <div className="value">₹ {summary.savings}</div>
          </div>
        </div>
      </div>

      {/* Chart Component */}
      <Chart />
    </div>
  );
};

export default Overview;
