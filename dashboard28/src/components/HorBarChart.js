import React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function HorBarChart(props) {
    return (
        <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={props.data}
            margin={{
                top: 10,
                right: 50,
                bottom: 5,
                left: 50,
            }}
        >

            <XAxis type="number" stroke="darkcyan" />
            <YAxis dataKey={props.xlabel} type="category" scale="band" stroke="darkcyan" />
            <Tooltip />
            <Bar dataKey={props.param} barSize={20} fill= "steelblue" />
        </ComposedChart>
    );
}