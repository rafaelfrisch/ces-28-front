import React from 'react';
import { useState, useEffect } from 'react';
import UsersTable from '../components/ProductsTable';
import SideBar from '../components/SideBar';
import {baseURL} from '../constants';
import './styles/Users.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Users() {

  const [showUserModal, setShowUserModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userLevel, setUserLevel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllUsers(token);
  }, [token])

  //Get all users
  async function getAllUsers(token){
      fetch(baseURL + 'getallusers', {
          method: 'GET',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token
          }
      }).then(res => {
        return res.json();
      }).then(data => {
          let auxData = [];
          for(let i = 0; i < data.length; i++){
            auxData.push({
              col1: data[i].name,
              col2: data[i].email,
              col3: data[i].admin ? 'Administrador' : 'Funcionário',
              col4: 'ações crud'
            });
          }
          setData(auxData);
          setLoading(false)
      })
  }

  async function createUser(event, token, userName, userEmail, userPassword, userLevel){
    event.preventDefault();
    let admin = userLevel === 'Administrador' ? true : false;
    fetch(baseURL + 'createuser', {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
      },
      body: JSON.stringify({
        name: userName.target.value,
        email: userEmail.target.value,
        password: userPassword.target.value,
        admin: admin
      })
      }).then(res => {
        return res.json();
      }).then(data => {
        console.log(data)
      })
  }
    
  const columns = [
      {
          Header: 'Usuário',
          accessor: 'col1',
      },
      {
          Header: 'E-mail',
          accessor: 'col2',
      },
      {
        Header: 'Nível de acesso',
        accessor: 'col3',
      },
      {
        Header: 'Ações',
        accessor: 'col4',
        Cell: e =><a href="http://google.com"> {e.value} </a>
      },
  ]
    
    return (
      <div><SideBar/>
        <div id="new-user">
          <div className="button">
              <Button variant="info"  onClick={() => setShowUserModal(!showUserModal)}>Novo usuário</Button>
          </div>
        </div>
        <div id="tableContainer">
          <div style={loading ? {display: 'none'} : {display: 'block'}}>
            <UsersTable data={data} columns={columns}/>
          </div>
          <div className="spinner" style={loading ? {display: 'block'} : {display: 'none'}}>
              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
          </div>
        </div>
        <Modal show={showUserModal} onHide={() => setShowUserModal(!showUserModal)}>
          <Modal.Header closeButton>
              <Modal.Title>Cadastro de usuário</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(e) => createUser(e, token, userName, userEmail, userPassword, userLevel)}>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Nome do usuário" onChange={setUserName} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="text" placeholder="E-mail do usuário" onChange={setUserEmail} required/>
              </Form.Group>
              <Row className="g-2">
                <Col sm={8}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Senha do usuário" onChange={setUserPassword} required/>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={setUserLevel} required>
                    <option value='1'>Administrador</option>
                    <option value='2'>Usuário</option>
                  </Form.Select>
                </Col>             
              </Row>
            </Modal.Body>
          <Modal.Footer>
              <Button variant="danger" onClick={() => setShowUserModal(!showUserModal)}>Fechar</Button>
              <Button type="submit" variant="info">Cadastrar</Button>
          </Modal.Footer>
          </Form>
      </Modal>
      </div>
    )
}

export default Users;