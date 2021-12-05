import React from 'react';
import { BarChart } from 'recharts';
import '../components/styles/Dashboards.css'
import l30data from '../components/Time30Data';
import BarPlot, {MTicket} from '../components/TimePlot';
import PieChart from '../components/PiePlots';
import piedata from '../components/PieData';

export default function Dashboards(props){
    return(
        <div className="Dashboards">
            <h1>Past Thirty Days Data</h1>
            <div>
            <BarPlot  data={l30data} param={["sales","profit"]} color={["blue","red"]}/>
            </div>
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