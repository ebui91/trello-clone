import React, { Component } from 'react';
import axios from 'axios';
import Task from '../Tasks/Task';
import './Board.css';

class Board extends Component{
    constructor(){
        super();
        
        this.state= {
            taskList: [],
            text: ""
        }
        this.getTasks= this.getTasks.bind(this);
        this.addTask= this.addTask.bind(this);
        this.handleText= this.handleText.bind(this);
    }

    componentWillMount(){
        this.getTasks();
    }

    componentDidUpdate(){
        this.getTasks();
    }

    getTasks(){
        axios.get(`/api/tasks/${this.props.match.params.id}`).then(response=> {
            this.setState({ text: "", taskList: response.data });
        })
    }

    addTask(){
        axios.post('/api/tasks/', { board_id: this.props.match.params.id, name: this.state.text }).then(response=> {
            response.data;
        });
        this.getTasks();
    }

    handleText(input){
        this.setState({ text: input })
    }

    render(){
        const tasks= this.state.taskList.map((task, i)=> {
            return(
                <Task key={i} taskID={task.id} taskName={task.name} />
            )
        })
        return(
            <div className='board-main-container'>
                <h1>BOARD NAME HERE</h1>
                <input className='task-input'onChange={(e)=> this.handleText(e.target.value)} type="text"></input>
                <button className='task-submit-btn' onClick={()=> this.addTask() }>Add Task</button>

                <div className='board-tasks-container'>
                    {tasks}
                </div>
            </div>
        )
    }
}

export default Board;