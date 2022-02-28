import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const CustomDataTable = (props: any) => {

    useEffect(() => {
        console.log(props.data)
    })

    const handleSelectRow = (selected: any) => {
        console.log('selected', selected)
        // console.log(e)

    }
    return (
        <div>
            <Row>
                {props.columns.map((el: any) => <Col key={el.name}><div className='fs-3 border-bottom'>{el.name}</div></Col>)}
            </Row>
            {props.data.map((el: any) => <Row className='custom-row' onClick={(selected) => handleSelectRow(selected)} key={el.id}>
                <Col className='col-1'>{el.id}</Col>
                <Col className='text-left'>{el.title}</Col>
                <Col>{el.author}</Col>

            </Row>)}
            {/* {props.data.map((el: any) => <Row><Col>test1</Col><Col>test2</Col></Row>)} */}
        </div>
    )

}


export default CustomDataTable;
