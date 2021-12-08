import React from 'react';
import { useState, useEffect } from 'react';
import UsersTable from '../components/ProductsTable';
import SideBar from '../components/SideBar';
import {baseURL} from '../constants';
import './styles/Users.css';

function Users() {

  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllUsers(token);
    console.log("oi")
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
          console.log(data)
      })
  }

    /* let data = [
        {
            col1: 'fernando',
            col2: 'email',
            col3: 'senha',
            col4: 'admin',
            col5: 'ações crud'
        },
    ] */
    
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
          Header: 'Senha',
          accessor: 'col3',
        },
        {
          Header: 'Nível de acesso',
          accessor: 'col4',
        },
        {
          Header: 'Ações',
          accessor: 'col5',
          Cell: e =><a href="http://google.com"> {e.value} </a>
        },
    ]
    
    return (
      <div><SideBar/>
        <div id="tableContainer">
          <UsersTable data={data} columns={columns}/>
        </div>
      </div>
    )
}

export default Users;