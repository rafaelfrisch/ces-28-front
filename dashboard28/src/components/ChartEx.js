import React from 'react';
import './styles/Home.css';
import img from './assets/img_ex.png'
import data from './Data.js'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Time(props){
    
    const renderLineChart = (
        <LineChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 15,
            right: 10,
            left: 10,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="lucro" stroke="red" activeDot={{ r: 7 }} />
          <Line type="monotone" dataKey="qtd" stroke="blue" activeDot={{ r: 7 }}/>
        </LineChart>
      );
    
    console.log(data)
    return(
        renderLineChart
    );
}