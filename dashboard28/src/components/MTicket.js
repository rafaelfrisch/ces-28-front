import React from 'react';
import { Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart} from 'recharts';

export  default function MTicket(props){
  return (
    <LineChart
    width={600}
    height={400}
    data={props.data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="10 10" stroke="white" />
    <XAxis dataKey={props.xlabel} stroke="white"/>
    <YAxis stroke="white"/>
    <Tooltip />
    <Line type="monotone" dataKey="medium_ticket" stroke="yellow" activeDot={{ r: 10 }} />
  </LineChart>
  );
}