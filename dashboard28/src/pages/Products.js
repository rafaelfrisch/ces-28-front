import React from 'react';
import { useState, useEffect } from 'react';
import ProductsTable from '../components/ProductsTable';
import './styles/products.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
{/* <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/> */}

function Products() {

    let urlAPI = "https://hidden-reef-28429.herokuapp.com/";
    let routeCreateProduct = "createproduct/";
    let routeCreateCategory = "createcategory/";
    let routeGetAllProducts = "getallproducts/";
    let routeGetAllCategories = "getallcategories/";
    let routeLogin = "login/";

    const [showModal, setShowModal] = useState(false);
    const [productName, setProductName] = useState(null);
    const [productCost, setProductCost] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productStock, setProductStock] = useState(null);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    //Login -> gambiarra
    useEffect(() => {
        fetch(urlAPI + routeLogin, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: "xxx@gmail.com",
            password: "1a2b3c4D",
          })
        }).then(res => {
          return res.json();
        }).then(data => {
            console.log(data)
            getAllProducts();
        })
    }, []);

    //Get all products
    async function getAllProducts(){
        fetch(urlAPI + routeGetAllProducts, {
          method: 'GET',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(res => {
          return res.json();
        }).then(data => {
            console.log(data)
        })
    }
    //Create product
    async function createProduct(){
        fetch(urlAPI + routeCreateProduct, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: productName,
            cost: productCost,
            priceToConsumer: productPrice,
            stock: productStock
          })
        }).then(res => {
          return res.json();
        }).then(data => {
            console.log(data)
        })
    }

    let dataAux = [
        {
            col1: 'Refrigerante',
            col2: 'Bebidas',
            col3: 'R$ 2,90',
            col4: 'R$ 8,90',
            col5: '100',
            col6: 'crud',
        },
        {
            col1: 'Refrigerante',
            col2: 'Bebidas',
            col3: 'R$ 2,90',
            col4: 'R$ 8,90',
            col5: '100',
            col6: 'crud',
        }
    ]
    
    let columnsAux = [
        {
            Header: 'Produto',
            accessor: 'col1',
        },
        {
            Header: 'Categoria',
            accessor: 'col2',
        },
        {
            Header: 'Custo',
            accessor: 'col3',
        },
        {
            Header: 'Preço',
            accessor: 'col4',
        },
        {
            Header: 'Estoque',
            accessor: 'col5',
        },
        {
            Header: 'Ações',
            accessor: 'col6',
        }
    ]

    useEffect(() => {
        setData(dataAux)
        setColumns(columnsAux)
    }, [])

    return (
        <div id="container">
            <div id="new-product">
                <div className="button">
                    <Button variant="primary" onClick={() => setShowModal(!showModal)}>Novo produto</Button>
                </div>
            </div>
            <div id="tableContainer">
                <ProductsTable data={data} columns={columns}/>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro de produto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Nome do produto" />
                        </Form.Group>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control type="text" placeholder="Preço do produto" />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3">
                                    <Form.Label>Custo</Form.Label>
                                    <Form.Control type="text" placeholder="Custo do produto" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col sm={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estoque</Form.Label>
                                    <Form.Control type="text" placeholder="Estoque" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(!showModal)}>Fechar</Button>
                    <Button variant="primary">Cadastrar</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Products;