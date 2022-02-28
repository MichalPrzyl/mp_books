import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AddBookModal from './add-book';
import CustomDataTable from './my-columns';
import { IData }  from './main-interfaces'
import { columns } from './main-columns'


const App = () => {

  const [data, setData] = useState<IData[]>([])
  const [selectedRows, setSelectedRows] = useState<IData[]>([])

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const response = await axios.get('http://localhost:8000/books')
    setData(response.data)
  }

  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:8000/books/${selectedRows[0]}`)
    getData();
  }


  const handleRowSelected = (selected: any) => {
    setSelectedRows(selected.map((el: any) => el.id))
  }

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
        <CustomDataTable 
        data={data}
        columns={columns}
        />
      </div>
    </div>
  );
}

export default App;
