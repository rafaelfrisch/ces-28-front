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
import utils from '../utils/utils';
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Users() {

  const [showUserModal, setShowUserModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userLevel, setUserLevel] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);
  const [level, setLevel] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    utils.getUserByToken(token).then(data => {
      console.log(data)
      if(data.admin)
        getAllUsers(token);
      else
        setLevel(false);
    })
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
          setLoading(false);
      })
  }

  async function createUser(event, token, userName, userEmail, userPassword, userLevel){
    event.preventDefault();
    let admin = userLevel === 'Administrador' ? true : false;
    let password = userPassword.target.value;
    console.log(password)
    if(password.length < 8 || password.toLowerCase() == password || password.toUpperCase() == password || !(/\d/.test(password))){
      setIsCorrectPassword(false);
      return;
    }

    setShowUserModal(false);
    setLoading(true);

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
        window.location.reload(true)
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
        Cell: e =><span><a href="http://google.com" style={{marginRight: 30}}><FiEdit size={22} color="black"/></a><a href="http://google.com"><FiTrash2 size={22} color="red"/></a></span>
      },
  ]
    
    return (
      <div><SideBar/>
        {level ?
          <div> 
            <div id="new-user">
              <div className="button">
                  <Button variant="info"  onClick={() => {setShowUserModal(!showUserModal); setIsCorrectPassword(true)}}>Novo usuário</Button>
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
            <Modal show={showUserModal} onHide={() => {setShowUserModal(!showUserModal); setIsCorrectPassword(true)}}>
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
                      <Form.Control type="email" placeholder="E-mail do usuário" onChange={setUserEmail} required/>
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
                        <option value='2'>Funcionário</option>
                      </Form.Select>
                    </Col>             
                  </Row>
                  <p style={isCorrectPassword ? {display: 'none'} : {color: 'red', fontSize: 12, textAlign: 'center'}}>A senha deve possuir ao menos 8 caracteres e ao menos um número, uma letra maiúscula e uma letra minúscula.</p>
                </Modal.Body>
              <Modal.Footer>
                  <Button variant="danger" onClick={() => {setShowUserModal(!showUserModal); setIsCorrectPassword(true)}}>Fechar</Button>
                  <Button type="submit" variant="info">Cadastrar</Button>
              </Modal.Footer>
              </Form>
            </Modal>
          </div>
        :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: 300, fontSize: 25}}>Você não possui acesso a este ambiente!</div>
        }
        </div>
    )
}

export default Users;