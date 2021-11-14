import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { LineChart, Line} from 'recharts';


export default function BarPlot(props){
    
    const GenerateBarChart = (
      <BarChart
          width={1500}
          height={500}
          data={props.data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 10" stroke="white"/>
          <XAxis dataKey="name" stroke="white"/>
          <YAxis stroke="white"/>
          <Tooltip />
          
          <Bar dataKey={props.param} fill={props.color} />
        </BarChart>
      );

    return(
        GenerateBarChart
    );
}

export function MTicket(props){
    
  const GenerateLineChart = (
    <LineChart
          width={1500}
          height={500}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 10" stroke="white"/>
          <XAxis dataKey="name" stroke="white"/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="medium_ticket" stroke="yellow" activeDot={{ r: 10 }} />
        </LineChart>
    );

  return(
      GenerateLineChart
  );
}