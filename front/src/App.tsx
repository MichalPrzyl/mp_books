import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import AddBookModal from './add-book';
import CustomDataTable from './my-columns';
import { IData, IRow } from './main-interfaces'
import { columns } from './main-columns'
import swal from 'sweetalert';


const App = () => {

  const [data, setData] = useState<IData[]>([])
  const [selectedRows, setSelectedRows] = useState<IData>()

  useEffect(() => {
    getData();
  }, [])

  // useEffect(() => {
  //   // getData();
    
  //   // thisOne = {...thisOne, isSelected:true}
  // }, [selectedRows])

  const getData = async () => {
    const response = await axios.get('http://localhost:8000/books')
    setData(response.data)
  }

  const handleDelete = async () => {


    // swal({
    //   title: "Are you sure?",
    //   text: "Once deleted, you will not be able to recover this imaginary file!",
    //   icon: "warning",
    //   buttons: ["Oh noez!", "Aww yiss!"],
    //   dangerMode: true,
    // })
    // .then((willDelete) => {
    //   if (willDelete) {
    //     const response = axios.delete(`http://localhost:8000/books/${selectedRows?.id}`)
    //     swal("Poof! Your imaginary file has been deleted!", {
    //       icon: "success",
    //     });
    //   } else {
    //     swal("Your imaginary file is safe!");
    //   }
    // });


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
    primary: string;
    secondary: string;
    background: string;
  }
  const colors : IColor = 
    {
      primary: '#FE938C',
      secondary: '#EDAF97',
      background: '#674642'
    }
  
  const conditionalRowStyles = [
    // {
    //   when: row => row.calories < 300,
    //   style: {
    //     backgroundColor: 'green',
    //     color: 'white',
    //     '&:hover': {
    //       cursor: 'pointer',
    //     },
    //   },
    // },
    // You can also pass a callback to style for additional customization
    {
      when: (row: IRow) => row.title.length > 0,
      style: (row: IRow) => ({background: colors.secondary})
    },
    {                          
      when: (row: IRow) => row.isSelected == true,
      // style: (row: IRow) => ({ backgroundColor: 'rgba(63, 195, 128, 0.9)', color: '#CC5803' }),
      style: (row: IRow) => ({ backgroundColor: colors.primary, color: 'black' }),
    },
  ];

  const customStyles = {
    // rows: {
    //     style: {
    //         minHeight: '72px', // override the row height
    //     },
    // },
    headCells: {
        style: {
            background: colors.background, // override the cell padding for head cells
            color: 'white'
        },
    },
    // cells: {
    //     style: {
    //         paddingLeft: '8px', // override the cell padding for data cells
    //         paddingRight: '8px',
    //     },
    // },
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
        {/* <CustomDataTable 
        data={data}
        columns={columns} */}
        <DataTable
          columns={columns}
          data={data}
          // selectableRows
          // onSelectedRowsChange={(selected) => handleRowSelected(selected.selectedRows)}
          onRowClicked={(row) => handleClick(row)}
          conditionalRowStyles={conditionalRowStyles}
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default App;
