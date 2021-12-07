import React from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function HorBarChart(props) {
    return (
        <ComposedChart
            layout="vertical"
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

            <XAxis type="number" stroke="darkcyan" />
            <YAxis dataKey={props.xlabel} type="category" scale="band" stroke="darkcyan" />
            <Tooltip />
            <Bar dataKey={props.param} barSize={20} fill="#413ea0" />
        </ComposedChart>
    );
}