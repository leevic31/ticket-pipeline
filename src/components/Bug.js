import React from 'react';
import Button from 'react-bootstrap/Button'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

export default function Bug({rows, setRow, setBug}) {

    const priorityFormatter = (cell) => {
        if (cell === "low") {
            return (
                <p style={{ color: "#1CBF02" }}>
                {cell}
                </p>
            )
        }
        if (cell === "medium") {
            return (
                <p style={{ color: "yellow" }}>
                {cell}
                </p>
            )
        }
        if (cell === "high") {
            return (
                <p style={{ color: "red" }}>
                {cell}
                </p>
            )
        }
    }

    const statusFormatter = (cell) => {
        if (cell === "complete") {
            return (
                <p style={{ color: "#1CBF02" }}>
                {cell}
                </p>
            )
        }
        if (cell === "inprogress") {
            return (
                <p style={{ color: "yellow" }}>
                {cell}
                </p>
            )
        }
        if (cell === "incomplete") {
            return (
                <p style={{ color: "red" }}>
                {cell}
                </p>
            )
        }
    }

    const data = rows.map(row => ({
        id: row.id,
        subject: row.subject,
        priority: row.priority,
        status: row.status
    }));

    const columns = [{
        dataField: 'id',
        text: "ID",
        headerStyle: (colum, colIndex) => {
            return { width: '10px',};
          }
    }, {
        dataField: 'subject',
        text: "Subject",
        headerStyle: (colum, colIndex) => {
            return { width: '2000px',};
          }
        
    }, {
        dataField: 'priority',
        text: "Priority",
        formatter: priorityFormatter,
        editor: {
            type: Type.SELECT,
            options: [{
              value: 'low',
              label: 'low',
            }, {
              value: 'medium',
              label: 'edium'
            }, {
              value: 'high',
              label: 'high'
            }]
          },        
        headerStyle: (colum, colIndex) => {
            return { width: '100px',};
          }
    }, {
        dataField: 'status',
        text: "Status",
        formatter: statusFormatter,
        editor: {
            type: Type.SELECT,
            options: [{
              value: 'incomplete',
              label: 'incomplete',
            }, {
              value: 'in progress',
              label: 'in progress'
            }, {
              value: 'complete',
              label: 'complete'
            }]
          },  
        headerStyle: (colum, colIndex) => {
            return { width: '100px',};
          }
    }];

    let rowsToDelete = [];

    const selectRow = {
        mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                rowsToDelete.push(row.id);
            }
            if (!isSelect) {
                const index = rowsToDelete.indexOf(row.id);
                if (index > -1) {
                    rowsToDelete.splice(index, 1);
                }
            }
        },
        // onSelectAll: (isSelect, rows, e) => {
        //     if (isSelect) {
        //         for (const row of rows) {
        //             rowsToDelete.push(row.id);
        //         }
        //         setButtonDisabled(false);
        //     }
        //     if (!isSelect) {
        //         rowsToDelete = [];
        //         setButtonDisabled(true);
        //     }
        // }
    };

    const handleDelete = () => {
        for (const id of rowsToDelete) {
            fetch ('/delete/' + id, {
                method: 'DELETE'
            });
        }
        fetch('/bugs').then(res => res.json()).then(data => {
            setBug(data);
        });
    }

    return (
        <div>
            <Button className="Submit-bug-button" href="/add-bug" variant="outline-primary">Submit Bug</Button>
            <Button className="Delete-bug-button" variant="outline-danger" onClick={handleDelete}>Delete</Button>
            <hr></hr>
            <BootstrapTable condensed hover striped keyField='id' 
                data={ data }
                columns={ columns } 
                bordered={ false }
                selectRow={ selectRow }
                cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }       
            />
        </div>
    );
}
