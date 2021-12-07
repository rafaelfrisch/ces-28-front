import React from 'react';
import { useTable } from 'react-table';
import UsersTable from '../components/ProductsTable';
import SideBar from '../components/SideBar';
import {baseURL} from '../constants';

function Users() {

    let data = [
        {
            col1: 'fernando',
            col2: 'email',
            col3: 'senha',
            col4: 'admin',
            col5: 'ações crud'
        },
    ]
    
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