import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', income: 400, expense: 240 },
  { month: 'Feb', income: 300, expense: 139 },
  { month: 'Mar', income: 200, expense: 980 },
  { month: 'Apr', income: 278, expense: 390 },
  { month: 'May', income: 189, expense: 480 },
  { month: 'Jun', income: 239, expense: 380 },
  { month: 'Jul', income: 349, expense: 430 },
  { month: 'Aug', income: 600, expense: 300 },
  { month: 'Sep', income: 750, expense: 400 },
  { month: 'Oct', income: 500, expense: 600 },
  { month: 'Nov', income: 620, expense: 350 },
  { month: 'Dec', income: 700, expense: 500 },
];

const Chart = () => {
  return (
    <div className="p-3" style={{ backgroundColor: '#1e1e2f', borderRadius: '12px', height: '430px' }}>
      <h5 style={{ color: 'white' }}>Overview</h5>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#00e676" strokeWidth={2} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="expense" stroke="#ffc107" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
