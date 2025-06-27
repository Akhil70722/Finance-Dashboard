import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Card from './Card';
import Chart from './Chart';
import RecentTransactions from './RecentTransactions';
import TransactionTable from './TransactionTable';


import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaCreditCard
} from 'react-icons/fa';

import './Dashboard.css';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    revenue: 0,
    expenses: 0,
    savings: 0
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard-summary/')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error("Failed to load dashboard data:", err));
  }, []);

  return (
    <div className="dashboard-wrapper d-flex" style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <div
        className="dashboard-main flex-grow-1 d-flex flex-column"
        style={{ backgroundColor: '#0f172a', overflowY: 'auto' }}
      >
        <Header />

        <div className="container-fluid py-4 px-4">
          {/* Cards Section */}
          <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
            <Card title="Balance" amount={`₹${summary.balance}`} icon={<FaWallet color="white" />} bgColor="#10b981" />
            <Card title="Revenue" amount={`₹${summary.revenue}`} icon={<FaMoneyBillWave color="white" />} bgColor="#3b82f6" />
            <Card title="Expenses" amount={`₹${summary.expenses}`} icon={<FaCreditCard color="white" />} bgColor="#ef4444" />
            <Card title="Savings" amount={`₹${summary.savings}`} icon={<FaPiggyBank color="white" />} bgColor="#eab308" />
          </div>

          {/* Chart and Recent Transactions */}
          <div className="row mb-4">
            <div className="col-lg-8">
              <Chart />
            </div>
            <div className="col-lg-4">
              <RecentTransactions />
            </div>
          </div>

          {/* Transaction Table */}
          <div className="row">
            <div className="col-12">
              <TransactionTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
