import React from 'react';
import { Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart } from 'recharts';

export default function MTicket(props) {
  return (
    <LineChart
      width={600}
      height={400}
      data={props.data}
      margin={{
        top: 20,
        right: 10,
        bottom: 5,
        left: 10,
      }}
    >
      <CartesianGrid strokeDasharray="10 10" stroke="darkcyan" />
      <XAxis dataKey={props.xlabel} stroke="darkcyan" />
      <YAxis stroke="darkcyan" />
      <Tooltip />
      <Line type="monotone" dataKey="medium_ticket" stroke="goldenrod" activeDot={{ r: 10 }} />
    </LineChart>
  );
}