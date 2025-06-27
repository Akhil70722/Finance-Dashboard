import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RecentTransactions.css';

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/transactions/?ordering=-date')
      .then(res => setTransactions(res.data.slice(0, 5))) // Show only 5 most recent
      .catch(err => console.error('Failed to fetch recent transactions', err));
  }, []);

  return (
    <div className="recent-transactions">
      <h5 className="section-title">Recent Transactions</h5>
      <ul className="transactions-list">
        {transactions.map(tx => (
          <li className="transaction-item" key={tx.id}>
            <img
              src={tx.user_profile}
              alt="profile"
              className="avatar"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
            />
            <div className="transaction-info">
              <div className="transaction-name">{tx.name || "Unnamed Transaction"}</div>
              <div className="transaction-date">{new Date(tx.date).toLocaleDateString()}</div>
            </div>
            <div className="transaction-amount">
              <span className={parseFloat(tx.amount) >= 0 ? 'amount income' : 'amount expense'}>
                {parseFloat(tx.amount) >= 0 ? '+' : '-'}₹{Math.abs(parseFloat(tx.amount)).toFixed(2)}
              </span>
              <span className={`status-badge ${tx.status.toLowerCase()}`}>{tx.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
