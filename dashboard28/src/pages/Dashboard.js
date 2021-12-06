import React from 'react';
import { BarChart } from 'recharts';
import './styles/Dashboards.css'
import l30data from '../components/data/TimeData';
import BarPlot from '../components/BarPlot';
import MTicket from '../components/MTicket';
import AverageMTicket from '../components/AverageMTicket';
import PieChart from '../components/LabelPiePlot';
import piedata from '../components/data/PieData';
import TopChart from '../components/HorBarChart';

export default function Dashboards(props) {
    // teste de iteração
    var it = 20;
    var l30datanew = [];
    var average = 0;

    for (var i = l30data.length - it; i < l30data.length; i++) {
        l30datanew.push(l30data[i])
        average += l30data[i].medium_ticket;
    }
    average = average / l30datanew.length


    var piedatanew = [...piedata]
    var averagedatanew = l30datanew.slice()

    piedatanew.sort((a, b) => { return a.value - b.value }).reverse()
    averagedatanew.map((i) => i["new_medium_ticket"] = (100*i.medium_ticket/average - 100).toFixed(2));

    // HTML
    return (
        <div className="Dashboards">
            <div className="graph_line">
                <div className="card">
                    <BarPlot data={l30datanew} param={"sales"} color={"blue"} xlabel={"day"} />
                </div>
                <div className="card">
                    <BarPlot data={l30datanew} param={"profit"} color={"red"} xlabel={"day"} />
                </div>
            </div>
            <div className="graph_line">
                <div className="card">
                    <MTicket data={l30datanew} xlabel={"day"}></MTicket>
                </div>
                <div className="card">
                    <TopChart data={piedatanew} xlabel={"name"} param={"value"}></TopChart>
                </div>
            </div>
            <div className="graph_line">
                <div className="card">
                    <PieChart data={piedata} />
                </div>
                <div className="card">
                    <AverageMTicket data={averagedatanew} xlabel={"day"} param={"new_medium_ticket"}></AverageMTicket>
                </div>
            </div>
        </div>
    );
}