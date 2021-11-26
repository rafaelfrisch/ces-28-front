import React from 'react';
import { Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart} from 'recharts';

export default function BarPlot(props){
  const Barchart = (<BarChart
          width={1500}
          height={500}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
            left: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 10" stroke="white" />
          <XAxis dataKey="name" stroke="white"/>
          <YAxis yAxisId="left" orientation="left" stroke="white" />
          <YAxis yAxisId="right" orientation="right" stroke="white" />
          <Tooltip />
          <Bar yAxisId="left" dataKey={props.param[0]} fill={props.color[0]} />
          <Bar yAxisId="right" dataKey={props.param[1]} fill={props.color[1]} />
        </BarChart>);
  return (
    Barchart
  );
}

export  function MTicket(props){
  const Linechart = (<LineChart
    width={1200}
    height={500}
    data={props.data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="10 10" stroke="white" />
    <XAxis dataKey="name" stroke="white"/>
    <YAxis stroke="white"/>
    <Tooltip />
    <Line type="monotone" dataKey="medium_ticket" stroke="yellow" activeDot={{ r: 10 }} />
  </LineChart>);
  return (
    Linechart
  );
}