import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
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
        <Container className='text-center'>
            <h1>Task Master</h1>
            <div id='interactiveSection'>
                <Row>
                    <Col>
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
                    <Col id='filters' className='d-flex flex-column'>
                        <h4>Filters</h4>
                        <Button>Complete</Button>
                        <Button>Incomplete</Button>
                        <Button>All</Button>
                        <br/>
                        <Button variant='danger' onClick={clearAll}>Clear All</Button>
                    </Col>

                    <Col>
                        <ListGroup>
                            {filteredTasks.map((task, index) => (
                                <ListGroup.Item key={task.id}>
                                    <input
                                        type='checkbox'
                                        checked={task.isComplete}
                                        onChange={() => toggleComplete(task.id)}
                                    />
                                    <span style={{textDecoration: task.isComplete ? "line-through" : "none",}}>
                                        {task.text}
                                    </span>
                                    <Button onClick={() => deleteTask(index)}>Delete</Button>
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
<ul>
        {filteredTasks.map((task, index) => (
            <li key={task.id} className='taskActual'>
                <input
                type='checkbox'
                checked={task.isComplete}
                onChange={() => toggleComplete(task.id)}
                />
                <span style={{textDecoration: task.isComplete ? "line-through" : "none",}}>
                    {task.text}
                </span>
                <button className='deleteBtn taskBtn' onClick={() => deleteTask(index)}>Delete</button>
            </li>
        ))}
</ul>
*/