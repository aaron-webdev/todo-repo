import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React, { useState, useRef } from "react";



export default function TaskManager()
{
    let [taskList, setTaskList]=useState([]);
    let [userInput, setUserInput]=useState('');
    let userInputFieldRef = useRef();
    let [filter, setFilter] = useState('all');


    function addNewTask()
    {
        if(userInput.trim().length === 0)
        {
            alert("Be sure to input a task prior to clicking the add button.");
            return 0;
        }
        const myNewTask = {id:new Date().getTime(), text: userInput, isComplete: false}
        setTaskList([myNewTask,...taskList]);
        setUserInput('');
        userInputFieldRef.current.focus();
    }


    const toggleComplete = (taskId) => {
        let updatedTasks = taskList.map((task) =>
            task.id === taskId ? {...task, isComplete: !task.isComplete} : task
        );
    setTaskList(updatedTasks);
    }


    const deleteTask = (index) => {
        let updatedTasks = taskList.filter((_,i) => i !== index);
        setTaskList(updatedTasks);
    }


    const filteredTasks = taskList.filter((task) => {
        if (filter === "completed") return task.isComplete;
        if (filter === "incomplete") return !task.isComplete;
        return true;
    });

    const clearAll = () => {
        setTaskList([]);
    };

    return(
    <>
        <Container className='text-center border border-5 rounded-4 m-5'>
            <h1>Task Master</h1>
            <div id='interactiveSection'>
                <Row className='d-flex text-center m-5'>
                    <Col className='mx-auto'>
                        <Form>
                            <Form.Control 
                                type='text'                        
                                maxLength={25}
                                className='userInputField'
                                value={userInput}
                                placeholder='Type tasks here'
                                onChange={(e) => setUserInput(e.target.value)}
                                ref={userInputFieldRef}
                                id='userInputFieldId'
                            />
                        </Form>
                    </Col>
                    <Col>
                        <Button onClick={addNewTask}>Add Task</Button>
                    </Col>
                </Row>
                
                <Row>
                    <Col id='filters' className='d-flex flex-column border border-3 rounded-3 m-5'>
                        <h4>Filters</h4>
                       
                        <Button className='my-1 mx-auto w-50 'onClick={() => setFilter("incomplete")}>Incomplete</Button>
                        <Button className='my-1 mx-auto w-50'onClick={() => setFilter("all")}>All</Button>
                        <Button className='my-1 mx-auto w-50'onClick={() => setFilter("completed")}>Complete</Button>
                        <br/>
                        <Button className='my-1 mx-auto w-50'variant='danger' onClick={clearAll}>Clear All</Button>
                    </Col>

                    <Col>
                        <ListGroup className='m-3'>
                            {filteredTasks.map((task, index) => (
                                <ListGroup.Item key={task.id}>
                                    <input
                                        className='m-1'
                                        type='checkbox'
                                        checked={task.isComplete}
                                        onChange={() => toggleComplete(task.id)}
                                    />
                                    <span className='fw-bold fs-3 m-5'style={{textDecoration: task.isComplete ? "line-through" : "none",}}>
                                        {task.text}
                                    </span>
                                    <Button variant='outline-danger' className='m-1' onClick={() => deleteTask(index)}><i className="bi bi-eraser"></i></Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>

            </div>
        </Container>
    </>

    )
}

/*
style={{border-style: solid; border-width: 5px; border-radius: 5px}}
*/