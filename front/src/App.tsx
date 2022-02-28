import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AddBookModal from './add-book';

interface IRow{
  id: number;
  title: string;
  author: string
}

interface IData {
  id: number;
  title: string;
  author: string;
  publication_year: number;
}

const columns = [
  {
    name: 'Tytuł',
    selector: (row: IRow) => row.title,
  },
  {
    name: 'Autor',
    selector: (row: IRow) => row.author,
  },
]

const App = () => {
  
  const [ data, setData ] = useState<IData[]>([])
  const [ selectedRows, setSelectedRows ] = useState<IData[]>([])

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
 

   const handleRowSelected = (selected: any) =>{
    setSelectedRows(selected.map((el: any) => el.id))
  }

  return (
    <div className="container-fluid text-center cont">
      <h1>Lista książek</h1>
      <div className="button-container d-flex">
        <Button onClick={getData} variant="primary">Odśwież</Button>{' '}
        <AddBookModal className="mx-3" refreshData={getData}/>      
        <Button onClick={handleDelete} variant="danger">Usuń</Button>{' '}
      </div>
      
      <DataTable 
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={(selected) => handleRowSelected(selected.selectedRows)}
        />

    </div>
  );
}

export default App;
