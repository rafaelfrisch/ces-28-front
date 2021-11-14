import React from 'react';
import './styles/TimePlots.css'
import l7data from './Time7Data.js';
import l30data from './Time30Data';
import BarPlot, { MTicket } from './TimePlot';

export default function TimePlots(props){
    if(props.interval=="7"){
        return(
            <div className="TimeCharts">
                <h1>Past Seven Days Data</h1>
                <h2>Sales</h2>
                <BarPlot  data={l7data} param={"sales"} color={"blue"}/>
                <h2>Profit</h2>
                <BarPlot  data={l7data} param={"profit"} color={"red"}/>
                <h2>Medium Ticket</h2>
                <MTicket data={l7data}/>
            </div>
        );
    }

    return(
        <div className="TimeCharts">
            <h1>Past Thirty Days Data</h1>
            <h2>Sales</h2>
            <BarPlot  data={l30data} param={"sales"} color={"blue"}/>
            <h2>Profit</h2>
            <BarPlot  data={l30data} param={"profit"} color={"red"}/>
            <h2>Medium Ticket</h2>
            <MTicket data={l30data}/>
        </div>
    );
}
