import React from 'react';
import Button from 'react-bootstrap/Button'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

export default function Bug({rows, setRow}) {

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
        headerStyle: (colum, colIndex) => {
            return { width: '100px',};
          }
    }, {
        dataField: 'status',
        text: "Status",
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
            setRow(data);
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
            />
        </div>
    );
}
