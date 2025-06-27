import React, { useEffect, useState } from 'react';
import './TransactionTable.css';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/transactions/', {
      headers: {
        'Authorization': '204a15d49c7a9d2b99d81fc58655261fa06a01c6', // Replace with your actual token
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Unauthorized or API error');
        }
        return res.json();
      })
      .then(data => setTransactions(data))
      .catch(err => {
        console.error('Failed to load transactions:', err);
        setError('Failed to fetch transactions. Please check your token or backend.');
      });
  }, []);

  return (
    <div className="table-wrapper p-4">
      <h5 className="text-white mb-3">Transactions</h5>
      {error ? (
        <div className="text-danger">{error}</div>
      ) : (
        <table className="table table-dark table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">No transactions available</td>
              </tr>
            ) : (
              transactions.map(tx => (
                <tr key={tx.id}>
                  <td className="d-flex align-items-center">
                    <img
                      src={tx.user_profile || 'https://via.placeholder.com/40'}
                      alt="Profile"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <span>{tx.name || tx.user_id || 'Unknown User'}</span>
                  </td>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td className={parseFloat(tx.amount) >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                    {parseFloat(tx.amount) >= 0 ? '+' : ''}₹{parseFloat(tx.amount).toFixed(2)}
                  </td>
                  <td>
                    <span className={`badge bg-${tx.status.toLowerCase() === 'income' || tx.status.toLowerCase() === 'paid' ? 'success' : 'danger'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
