import React from 'react';
import { useTable } from 'react-table';
import './styles/Products.css';

function ProductsTable(props) {

    let columns = props.columns
    let data = props.data
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <div id="productsTable">
            <table {...getTableProps()} style={{ border: 'solid 1px darkcyan' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th
                        {...column.getHeaderProps()}
                        style={{
                        borderBottom: 'solid 3px darkcyan',
                        background: 'aliceblue',
                        color: 'rgb(0, 78, 78)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        minWidth: 200,
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
                            background: 'white',
                            textAlign: 'center',
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

export default ProductsTable;