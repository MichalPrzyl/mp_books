import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AddBookModal from './add-book';
import { IData, IRow } from './main-interfaces'
import { columns } from './main-columns'
import swal from 'sweetalert';


const App = () => {

  const [data, setData] = useState<IData[]>([])
  const [selectedRows, setSelectedRows] = useState<IData>()

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get('http://localhost:8000/books')
    setData(response.data)
  }

  const handleDelete = async () => {
    if(await swal({title: "Jesteś pewien?",text: "Tej operacji nie da się cofnąć. Rekord zostanie usunięty",icon: "warning",buttons: ["Anuluj", "Usuń"],dangerMode: true}))
    {
      await axios.delete(`http://localhost:8000/books/${selectedRows?.id}`)
      swal("Poof! Your imaginary file has been deleted!", {icon: "success",})
    }
    getData();
  }

  const handleClick = (row: any) =>{
    const copy = data.map(el => ({...el, isSelected: false}))
    const index = data.indexOf(row)
    row.isSelected = true;
    copy[index] = row
    setData(copy)
    setSelectedRows(row)
  }


  interface IColor{
    selected: string;
    tableBackground: string;
    backgroundHeader: string;
  }
  const colors : IColor = 
    {
      selected: '#6D3B47',
      tableBackground: '#453A49',
      backgroundHeader: '#6D3B47'
    }
  
  const conditionalRowStyles = [
    {
      when: (row: IRow) => row.title.length > 0,
      style: (row: IRow) => ({background: colors.tableBackground, 
        color: 'white',
        borderRadius: '5px'})
    },
    {                          
      when: (row: IRow) => row.isSelected == true,
      style: (row: IRow) => ({ backgroundColor: colors.selected, color: 'white' }),
    },
  ];

  const customStyles = {
    rows: {
        style: {
            cursor: 'pointer'
        },
    },
    headCells: {
        style: {
            background: colors.backgroundHeader,
            color: 'white',
        },
    },
};
  return (
    <div className="container-fluid cont">
      <h1>Lista książek</h1>
      <div className="button-container d-flex">
        <Button onClick={getData} variant="primary">Odśwież</Button>{' '}
        <AddBookModal className="mx-3" refreshData={getData} />
        <Button onClick={handleDelete} variant="danger">Usuń</Button>{' '}
      </div>


      {/* HERE IS THE MAGIC */}

      <div className='table'>
        <DataTable
          columns={columns}
          data={data}
          onRowClicked={(row) => handleClick(row)}
          conditionalRowStyles={conditionalRowStyles}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default App;
