import React, { Component } from 'react';
import axios from 'axios';
import Task from '../Tasks/Task';
import './Board.css';

class Board extends Component{
    constructor(){
        super();
        
        this.state= {
            taskList: [],
            text: "",
            imageList: [],
            selectedImg: ""
        }
        this.getTasks= this.getTasks.bind(this);
        this.addTask= this.addTask.bind(this);
        this.handleText= this.handleText.bind(this);
        this.getImages= this.getImages.bind(this);
        this.selectImg= this.selectImg.bind(this);
    }

    componentDidMount(){
        this.getTasks();
        this.getImages();
        this.setState({ text: "" });
    }

    componentDidUpdate(){
        this.getTasks();
    }

    getTasks(){
        axios.get(`/api/tasks/${this.props.match.params.id}`).then(response=> {
            this.setState({ taskList: response.data });
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

    getImages(){
        axios.get('https://picsum.photos/list').then(images=> {
            var randoms= [];
            for(let i=0; i<=25; i++){
                randoms.push(images.data[i]);
            }
            this.setState({ imageList: randoms });
        });
    }

    selectImg(img){
        this.setState({ selectedImg: img });
    }

    render(){
        const tasks= this.state.taskList.map((task, i)=> {
            return(
                <Task key={i} taskID={task.id} taskName={task.name} />
            )
        });

        const images= this.state.imageList.map((image, i)=> {
            return(
                <div onClick={()=> this.selectImg(`https://picsum.photos/1280/800/?image=${image.id}`) } className="image-preview-container" key={i} style={{
                    backgroundImage: `url(https://picsum.photos/150/150/?image=${image.id})`,
                    height: "150px",
                    width: "150px",
                    margin: "5px"
                }}></div>
            )
        });

        return(
            <div className='board-main-container' style={{ height:"100vh", width:"100%", backgroundImage:`url(${this.state.selectedImg})`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat" }}>
                <h1>BOARD NAME HERE</h1>
                <input className='task-input'onChange={(e)=> this.handleText(e.target.value)} type="text"></input>
                <button className='task-submit-btn' onClick={()=> this.addTask() }>Add Task</button>

                <div className='board-tasks-container'>
                    {tasks}
                </div>

                <div className="images-container">
                    { images }
                </div>
            </div>
        )
    }
}

export default Board;