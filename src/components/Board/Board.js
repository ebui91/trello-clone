import React, { Component } from 'react';
import axios from 'axios';

class Board extends Component{
    constructor(){
        super();
        
        this.state= {
            taskList: [],
            text: ""
        }
        this.addTask= this.addTask.bind(this);
        this.handleText= this.handleText.bind(this);
    }

    componentWillMount(){
        axios.get(`/api/tasks/${this.props.match.params.id}`).then(response=> {
            this.setState({ taskList: response.data });
        })
    }

    addTask(){
        axios.post('/api/tasks/', { board_id: this.props.match.params.id, task: this.state.text }).then(response=> {
            response.data;
        })
        axios.get(`/api/tasks/${this.props.match.params.id}`).then(response=> {
            this.setState({ taskList: response.data, text: "" });
        })
    }

    handleText(input){
        this.setState({ text: input })
    }

    render(){
        const tasks= this.state.taskList.map((task, i)=> {
            return(
                <p>{task.task}</p>
            )
        })
        return(
            <div>
                BOARD
                {tasks}
                <input onChange={(e)=> this.handleText(e.target.value)} type="text"></input>
                <button onClick={()=> this.addTask() }>Add Task</button>
            </div>
        )
    }
}

export default Board;