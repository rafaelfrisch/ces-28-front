import React, { useState, useEffect } from 'react';
import { BarChart } from 'recharts';
import './styles/Dashboards.css'
import l30data from '../components/data/TimeData';
import BarPlot from '../components/BarPlot';
import MTicket from '../components/MTicket';
import AverageMTicket from '../components/AverageMTicket';
import PieChart from '../components/LabelPiePlot';
import piedata from '../components/data/PieData';
import TopChart from '../components/HorBarChart';
import SideBar from '../components/SideBar';
import { baseURL } from '../constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Dashboards(props) {
    const [dateIni, setDateIni] = useState("2021-08-20");
    const [dateEnd, setDateEnd] = useState("2021-08-24");
    const [timedata, setTimeData] = useState([]);

    useEffect(() => {
        getOrdersByDate(token, dateIni, dateEnd);
        console.log(timedata)
    }, [dateIni, dateEnd])

    const token = localStorage.getItem("token");
    let routeOrderBydate = "filterordersbydate";

    function getSales(data) {
        let qtd = 0;

        for (let i = 0; i < data.length; i++) {
            qtd += data[i].quantity;
        }
        return qtd
    }

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
            let aux = []
            // console.log(data)
            for (let i = 0; i < data.length; i++) {
                var auxhour = new Date(data[i].orderDate);
                var h = auxhour.getHours();
                var m = auxhour.getMinutes();
                if(m<10){
                    m = "0" + m;
                }
                var d = auxhour.getDate();
                aux.push({
                    h: h,
                    m: m,
                    d: d,
                    time:  "Dia " + d + ", às " + h + ":" + m,
                    orderDate: data[i].orderDate,
                    products: data[i].products,
                    sales: getSales(data[i].products)
                })
            }
            // console.log(aux)
            aux.sort((a, b) => {
                return (a.d-b.d)*1000000 + (a.h-b.h)*1000 + (a.m-b.m);
            })
            setTimeData(aux)
        })
    }

    // teste de iteração
    var it = 30;
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
    averagedatanew.map((i) => i["new_medium_ticket"] = (100 * i.medium_ticket / average - 100).toFixed(2));

    const [show, setShow] = useState(false);
    const change_hover = () => show ? setShow(false) : setShow(true);
    // HTML
    return (
        <div><SideBar />
            <Form>
                <Form.Group className="mb-3 p-3" >
                    <Form.Label>Data Inicial</Form.Label>
                    <Form.Control type="date" value={dateIni} onChange={event => setDateIni(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 p-3">
                    <Form.Label>Data Final</Form.Label>
                    <Form.Control type="date" value={dateEnd} onChange={event => setDateEnd(event.target.value)} />
                </Form.Group>
            </Form>
            <div className="auxcontent">
                <div className="Dashboards">
                    <h1 id="dashboard_title">Dashboards</h1>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Sales</h1>
                            <BarPlot data={timedata} param={"sales"} color={"crimson"} xlabel={"time"}/>
                        </div>
                        <div className="auxcard">
                            <h1>Profit</h1>
                            <BarPlot data={l30datanew} param={"profit"} color={"rgb(35, 90, 255)"} xlabel={"day"} />
                        </div>
                    </div>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Medium Ticket</h1>
                            <MTicket data={l30datanew} xlabel={"day"}></MTicket>
                        </div>
                        <div className="auxcard">
                            <h1>Average medium ticket error (%)</h1>
                            <AverageMTicket data={averagedatanew} xlabel={"day"} param={"new_medium_ticket"}></AverageMTicket>
                        </div>
                    </div>
                    <div className="graph_line">
                        <div className="auxcard">
                            <h1>Most sold categories</h1>
                            <TopChart data={piedatanew} xlabel={"name"} param={"value"}></TopChart>
                        </div>
                        <div className="auxcard">
                            <h1>Categories percentage</h1>
                            <PieChart data={piedata} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

