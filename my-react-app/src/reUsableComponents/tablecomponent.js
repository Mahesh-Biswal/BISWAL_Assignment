import React from 'react'

const TableComponent = (props) => {


    const rowClick = (row) => {
        console.log(`Selected Row ${JSON.stringify(row)}`);
        /* a selectedRow props which is a function that is
          having the row as a paramater
          When a component (parent) is using the selectedRow() function using a binding,
          the value of 'row' parameter will be passed to the component (parent)
        */
        props.selectedRow(row);
    }

    const handleDelete = (row) => {
        props.deleteRecord(row);
    };

    if (props.dataSource === undefined || props.dataSource.length === 0) {
        /* a Fallback UI, this will prevent the Component from getting crash */
        return (
            <div className='alert alert-danger'>
                <p>
                    <strong>
                        No data to show
                    </strong>
                </p>
            </div>
        );
    }

    // 1. Read all keys
    // dataSource is an array and 0th idnex in that array is the
    // object of which properties (keys) will be used
    // to generate columns for the table
    const headers = Object.keys(props.dataSource[0]);

    return (
        <div>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        {
                            headers.map((header, idx) => (
                                <th key={idx}>{header}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.dataSource.map((record, index) => (
                            <tr key={index} onClick={() => rowClick(record)}>
                                {
                                    headers.map((header, idx) => (
                                        <td key={idx}>{record[header]}</td>

                                    ))
                                }
                                {props.canDelete && (
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => handleDelete(record)}> Delete </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent
