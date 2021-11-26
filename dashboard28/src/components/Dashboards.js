import React from 'react';
import { BarChart } from 'recharts';
import './styles/Dashboards.css'
import l30data from './Time30Data';
import BarPlot, {MTicket} from './TimePlot';
import PieChart from './PiePlots';
import piedata from './PieData';

export default function Dashboards(props){
    return(
        <div className="Dashboards">
            <h1>Past Thirty Days Data</h1>
            <BarPlot  data={l30data} param={["sales","profit"]} color={["blue","red"]}/>
            <ul>
                <li id = "e1">Sales</li>
                <li id = "e2">Profit</li>
            </ul>
            <MTicket data={l30data}></MTicket>
            <ul>
                <li id = "e3">Medium Ticket</li>
            </ul>
            <h1>Análise por grupo</h1>
            <PieChart data={piedata}/>
        </div>
    );
}
