import React from 'react';
import { useState, useEffect } from 'react';
import ProductsTable from '../components/ProductsTable';
import './styles/products.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SideBar from '../components/SideBar';
import {baseURL} from '../constants';
{/* <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/> */}

function Products() {

    let routeCreateProduct = "createproduct/";
    let routeCreateCategory = "createcategory/";
    let routeGetAllProducts = "getallproducts/";
    let routeGetAllCategories = "getallcategories/";
    let routeGetAllProductsInCategory = "getallproductsincategory/";
    let routeLogin = "login/";

    const [showProductsModal, setShowProductsModal] = useState(false);
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);
    const [productName, setProductName] = useState('');
    const [productCost, setProductCost] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);
    const [productCategory, setProductCategory] = useState(null);
    const [categoryInput, setCategoryInput] = useState(null);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);

    let products = [];
    const token = localStorage.getItem("token");

    //Login -> gambiarra
    useEffect(() => {
        fetch(baseURL + routeLogin, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: "xxx@gmail.com",
            password: "1a2b3c4D",
          })
        }).then(res => {
          return res.json();
        }).then(data => {
            getAllCategories(token);
        })
    }, []);

    //Get all categories
    async function getAllCategories(token){
        products = [];
        fetch(baseURL + routeGetAllCategories, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(res => {
        return res.json();
        }).then(data => {
            let aux = [];
            for(let i = 0; i < data.length; i++){
                getAllProductsInCategory(token, data[i].id, data[i].name);
                aux.push({
                    name: data[i].name,
                    id: data[i]._id
                });
            }
            setCategories(aux);
        })
    }

    //Get all products in category
    async function getAllProductsInCategory(token, categoryId, categoryName){
        fetch(baseURL + routeGetAllProductsInCategory + categoryId, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(res => {
        return res.json();
        }).then(resData => {
            for(let i = 0; i < resData.products.length; i++)
                products.push({
                    col1: resData.products[i].name,
                    col2: categoryName,
                    col3: "R$ " + parseFloat(resData.products[i].priceToConsumer).toFixed(2).replace('.', ','),
                    col4: "R$ " + parseFloat(resData.products[i].cost).toFixed(2).replace('.', ','),
                    col5: resData.products[i].stock.toString(),
                    col6: 'crud options', 
                })
            setData(data.concat(products));
        })
    }

    //Create product
    async function createProduct(token, productName, productPrice, productCost, productStock, productCategory){
        console.log(productName)
        fetch(baseURL + routeCreateProduct + productCategory, {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
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
            if(data.message == "Product created succefully"){
                setShowProductsModal(!showProductsModal);
                window.location.reload(true);
            }

        })
    }

    //Create category
    async function createCategory(token, categoryName){
        if(categoryName !== null && categoryName != "")
            fetch(baseURL + routeCreateCategory, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
            body: JSON.stringify({
                name: categoryName,
            })
            }).then(res => {
            return res.json();
            }).then(data => {
                if(data.message == "Category created succefully"){
                    setShowCategoriesModal(!showCategoriesModal);
                    window.location.reload(true);
                }
            })
    }

    let columns = [
        {
            Header: 'Produto',
            accessor: 'col1',
        },
        {
            Header: 'Categoria',
            accessor: 'col2',
        },
        {
            Header: 'Preço',
            accessor: 'col3',
        },
        {
            Header: 'Custo',
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

    return (
        <div><SideBar/>
            <div id="container">
                <div id="new-product">
                    <div className="button">
                        <Button variant="primary" onClick={() => setShowProductsModal(!showProductsModal)}>Novo produto</Button>
                    </div>
                    <div className="button">
                        <Button variant="primary" onClick={() => setShowCategoriesModal(!showCategoriesModal)}>Nova categoria</Button>
                    </div>
                </div>
                <div id="tableContainer">
                    <ProductsTable data={data} columns={columns}/>
                </div>
                <Modal show={showProductsModal} onHide={() => setShowProductsModal(!showProductsModal)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de produto</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Nome do produto" onChange={setProductName}/>
                            </Form.Group>
                            <Row className="g-2">
                                <Col md>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Preço</Form.Label>
                                        <Form.Control type="text" placeholder="Preço do produto" onChange={setProductPrice}/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Custo</Form.Label>
                                        <Form.Control type="text" placeholder="Custo do produto" onChange={setProductCost}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="g-2">
                                <Col sm={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Estoque</Form.Label>
                                        <Form.Control type="text" placeholder="Estoque" onChange={setProductStock}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Label>Categoria</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={setProductCategory}>
                                        {categories.map(function(obj){
                                            return <option value={obj.id}>{obj.name}</option>;
                                        })}
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowProductsModal(!showProductsModal)}>Fechar</Button>
                        <Button variant="primary" onClick={() => createProduct(token, productName.target.value, productPrice.target.value, productCost.target.value, productStock.target.value, productCategory.target.value)}>Cadastrar</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showCategoriesModal} onHide={() => setShowCategoriesModal(!showCategoriesModal)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro de categoria</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Nova categoria</Form.Label>
                                <Form.Control type="text" placeholder="Categoria" onChange={setCategoryInput} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCategoriesModal(!showCategoriesModal)}>Fechar</Button>
                        <Button variant="primary" onClick={() => createCategory(token, categoryInput.target.value)} >Cadastrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Products;