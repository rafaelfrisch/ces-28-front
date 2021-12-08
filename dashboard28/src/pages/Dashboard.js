import React, { useState, useEffect } from 'react';
import { BarChart } from 'recharts';
import './styles/Dashboards.css'
import BarPlot from '../components/BarPlot';
import MTicket from '../components/MTicket';
import AverageMTicket from '../components/AverageMTicket';
import PieChart from '../components/LabelPiePlot';
import piedata from '../components/data/PieData';
import TopChart from '../components/HorBarChart';
import SideBar from '../components/SideBar';
import { baseURL } from '../constants';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function Dashboards(props) {
    const [dateIni, setDateIni] = useState("2021-08-20");
    const [dateEnd, setDateEnd] = useState("2021-08-31");
    const [timedata, setTimeData] = useState([]);
    console.log(timedata)
    useEffect(() => {
        getOrdersByDate(token, dateIni, dateEnd);
    }, [dateIni, dateEnd])

    const token = localStorage.getItem("token");
    let routeOrderBydate = "getorderreportbydate";

    async function getOrdersByDate(token, dateIni, dateEnd) {
        fetch(baseURL + routeOrderBydate + "?initialDateParam=" + dateIni + "&finalDateParam=" + dateEnd, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            let aux = [];
            let average = 0;
            for(let i = 0; i< data.length; i++){
                average += data[i].dayReport.mediumticket/data.length;
            }
            for(let i = 0; i< data.length; i++){
                aux.push({...data[i],
                    metric: (data[i].dayReport.mediumticket - average)/average*100
                })
            }
            setTimeData(aux)
        })
    }

    // teste de iteração
    var it = 30;
    var piedatanew = [...piedata]
    piedatanew.sort((a, b) => { return a.value - b.value }).reverse()

    // HTML
    return (
        <div><SideBar />
            <Row>
            <Form>
                    <Form.Group className="mb-3 p-1">
                    <Form.Label><h1 className="dashboardlabel">Selecione a data inicial</h1></Form.Label>
                    <Form.Control type="date" value={dateIni} onChange={event => setDateIni(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 p-1">
                    <Form.Label><h1 className="dashboardlabel">Selecione a data final</h1></Form.Label>
                    <Form.Control type="date" value={dateEnd} onChange={event => setDateEnd(event.target.value)} />
                </Form.Group>
            </Form>
            </Row>
            <div className="auxcontent">
                <div className="Dashboards">
                    <h1 id="dashboard_title">Dashboards</h1>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Quantidade Vendida</h1>
                            <BarPlot data={timedata} param={"dayReport.sales"} color={"crimson"} xlabel={"date"}/>
                        </div>
                        <div className="auxcard">
                            <h1>Lucro</h1>
                            <BarPlot data={timedata} param={"dayReport.profit"} color={"rgb(35, 90, 255)"} xlabel={"date"} />
                        </div>
                    </div>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Ticket Médio</h1>
                            <MTicket data={timedata} param={"dayReport.mediumticket"} xlabel={"date"}></MTicket>
                        </div>
                        <div className="auxcard">
                            <h1>Faturamento</h1>
                            <AverageMTicket data={timedata} param= {"metric"} xlabel={"date"}></AverageMTicket>
                        </div>
                    </div>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Categorias mais vendidas</h1>
                            <TopChart data={piedatanew} xlabel={"name"} param={"value"}></TopChart>
                        </div>
                        <div className="auxcard">
                            <h1>Porcentagem por categoria</h1>
                            <PieChart data={piedata} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

