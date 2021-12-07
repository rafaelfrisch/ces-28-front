import React from 'react';
import { Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart} from 'recharts';

export default function BarPlot(props){
  return (
    <BarChart
          width={580}
          height={400}
          data={props.data}
          margin={{
            top: 20,
            right: 10,
            bottom: 5,
            left: 10,
          }}
        >
          <CartesianGrid strokeDasharray="10 1" stroke="darkcyan" />
          <XAxis dataKey={props.xlabel} stroke="darkcyan"/>
          <YAxis stroke="darkcyan" />
          <Tooltip/>
          <Bar dataKey={props.param} fill={props.color} />

      </BarChart>
  );
}