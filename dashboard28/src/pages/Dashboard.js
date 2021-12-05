import React from 'react';
import { BarChart } from 'recharts';
import './styles/Dashboards.css'
import l30data from '../components/Time30Data';
import BarPlot, {MTicket} from '../components/TimePlot';
import PieChart from '../components/PiePlots';
import piedata from '../components/PieData';

export default function Dashboards(props){
    // teste de iteração
    var it = 10
    var t = l30data.lenght
    console.log(t)
    var l30datanew = []
    
    for(var i = l30data.length - it; i < l30data.length; i++){
        l30datanew.push(l30data[i])
    }

    var piedatanew = [...piedata]
    piedatanew.sort((a,b)=>{return a.value - b.value})
    console.log(l30datanew)
    return(
        <div className="Dashboards">
            <h1>Past Thirty Days Data</h1>
            <div className="graph_line">
                <div className="card">
                    <BarPlot  data={l30datanew} param={"sales"} color={"blue"} xlabel={"day"}/>
                </div>
                <div className="card">
                    <BarPlot  data={l30datanew} param={"profit"} color={"red"} xlabel={"day"}/>
                </div>
            </div>
            <ul>
                <li id = "e1">Sales</li>
                <li id = "e2">Profit</li>
            </ul>
            <MTicket data={l30datanew}></MTicket>
            <ul>
                <li id = "e3">Medium Ticket</li>
            </ul>
            <h1>Análise por grupo</h1>
            <PieChart data={piedata}/>
        </div>
    );
}