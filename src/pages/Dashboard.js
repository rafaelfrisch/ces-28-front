import React, { useState, useEffect } from 'react';
import { BarChart } from 'recharts';
import './styles/Dashboards.css'
import BarPlot from '../components/BarPlot';
import MTicket from '../components/MTicket';
import AverageMTicket from '../components/AverageMTicket';
import PieChart from '../components/LabelPiePlot';
import TopChart from '../components/HorBarChart';
import SideBar from '../components/SideBar';
import { baseURL } from '../constants';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function Dashboards(props) {
    const [loading, setLoading] = useState(true);
    const [dateIni, setDateIni] = useState("2021-08-20");
    const [dateEnd, setDateEnd] = useState("2021-08-31");
    const [timedata, setTimeData] = useState([]);
    const [piedata, setPieData] = useState([]);

    console.log(timedata)
    useEffect(() => {
        getOrdersByDate(token, dateIni, dateEnd);
    }, [dateIni, dateEnd])

    const token = localStorage.getItem("token");
    let routeOrderBydate = "getorderreportbydate";

    async function getOrdersByDate(token, dateIni, dateEnd) {
        setLoading(true)
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
            let aux2 = [];
            let average = 0;
            for(let i = 0; i< data.dayReportsArray.length; i++){
                average += data.dayReportsArray[i].dayReport.mediumticket/data.dayReportsArray.length;
            }
            for(let i = 0; i< data.dayReportsArray.length; i++){
                aux.push({...data.dayReportsArray[i],
                    prod_vendidos: data.dayReportsArray[i].dayReport.sales,
                    lucro: parseFloat(data.dayReportsArray[i].dayReport.profit.toFixed(2)),
                    ticket_medio: parseFloat(data.dayReportsArray[i].dayReport.mediumticket.toFixed(2)),
                    x: data.dayReportsArray[i].date.split('/').reverse().join('/'),
                    err_rel_ticket_medio: ((data.dayReportsArray[i].dayReport.mediumticket - average)/average*100).toFixed(2)
                })
            }
            for (const categoryName in data.categoryReport) {
                aux2.push(
                    {
                        name: categoryName,
                        vendas: data.categoryReport[categoryName].sales
                    }
                )
            }
            setLoading(false)
            setTimeData(aux)
            setPieData(aux2)
        })
    }

    var piedatanew = [...piedata]
    piedatanew.sort((a, b) => { return a.vendas - b.vendas }).reverse()

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
                            <div style={loading ? {display: 'none'} : {display: 'block'}}>
                                <BarPlot data={timedata} param={"prod_vendidos"} color={"crimson"} xlabel={"x"}/>
                            </div>
                            <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                        <div className="auxcard">
                            <h1>Lucro</h1>
                            <div style={loading ? {display: 'none'} : {display: 'block'}}>
                                <BarPlot data={timedata} param={"lucro"} color={"rgb(35, 90, 255)"} xlabel={"x"} />
                            </div>
                            <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                    </div>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Ticket Médio</h1>
                            <div style={loading ? {display: 'none'} : {display: 'block'}}>
                                <MTicket data={timedata} param={"ticket_medio"} xlabel={"x"}></MTicket>
                            </div>
                            <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                        <div className="auxcard">
                            <h1>Erro relativo do Ticket Médio</h1>
                            <div style={loading ? {display: 'none'} : {display: 'block'}}>
                                <AverageMTicket data={timedata} param= {"err_rel_ticket_medio"} xlabel={"x"}></AverageMTicket>
                            </div>
                            <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                    </div>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Categorias mais vendidas</h1>
                            <div style={loading ? {display: 'none'} : {display: 'block'}}>
                                <TopChart data={piedatanew} xlabel={"name"} param={"vendas"}></TopChart>
                            </div>
                            <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                        <div className="auxcard">
                            <h1>Porcentagem por categoria</h1>
                            <div style={loading ? {display: 'none'} : {display: 'block'}}>
                                <PieChart data={piedata} />
                            </div>
                            <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

