import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function AverageMTicket(props) {

    const dataMax = Math.max(...props.data.map((i) => (i.err_rel_ticket_medio)));
    const dataMin = Math.min(...props.data.map((i) => (i.err_rel_ticket_medio)));

    const gradientOffset = () => {
        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }
        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <AreaChart
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
            <CartesianGrid strokeDasharray="20 2" stroke="darkcyan" />
            <XAxis dataKey={props.xlabel} stroke="darkcyan" />
            <YAxis stroke="darkcyan" domain={[Math.round(dataMin)-1,Math.round(dataMax)+1]}/>
            <Tooltip />
            <defs>
                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset={off} stopColor="green" stopOpacity={1} />
                    <stop offset={off} stopColor="red" stopOpacity={1} />
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey={props.param} stroke="#000" fill="url(#splitColor)" />
        </AreaChart>
    );
}
