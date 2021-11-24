import React from 'react';
import { useTable } from 'react-table'

function Products() {

    let data = [
        {
            col1: 'Refrigerante',
            col2: 'Bebidas',
            col3: 'R$ 2,90',
            col4: 'R$ 8,90',
            col5: '100',
            col6: '10/12/2022',
            col7: 'crud',
        },
        {
            col1: 'Produto',
            col2: 'Categoria',
            col3: 'Custo',
            col4: 'Preço',
            col5: 'Estoque',
            col6: 'Validade',
            col7: 'Ações',
        }
    ]
    
    let columns = [
        {
            Header: 'Produto',
            accessor: 'col1', // accessor is the "key" in the data
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
            Header: 'Validade',
            accessor: 'col6',
        },
        {
            Header: 'Ações',
            accessor: 'col7',
        }
    ]
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <div id="productsTable">
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th
                        {...column.getHeaderProps()}
                        style={{
                        borderBottom: 'solid 3px red',
                        background: 'aliceblue',
                        color: 'black',
                        fontWeight: 'bold',
                        }}
                    >
                        {column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                            style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'papayawhip',
                            }}
                        >
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
            </table>
        </div>
      )
}

export default Products;