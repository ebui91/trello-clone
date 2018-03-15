import React, { Component } from 'react';
import axios from 'axios';
import Task from '../Tasks/Task';
import Navbar from '../Navbar/Navbar';
import './Board.css';

class Board extends Component{
    constructor(){
        super();
        
        this.state= {
            taskList: [],
            text: "",
            imageList: [],
            background: "",
            selectedImg: "",
            drawerHidden: true,
            drawerClosed: "0px",
            drawerOpen: "325px"
        }
        this.getTasks= this.getTasks.bind(this);
        this.addTask= this.addTask.bind(this);
        this.handleText= this.handleText.bind(this);
        this.toggleDrawer= this.toggleDrawer.bind(this);
        this.getImages= this.getImages.bind(this);
        this.selectImg= this.selectImg.bind(this);
        this.getBackground = this.getBackground.bind(this);
    }

    componentDidMount(){
        this.getBackground();
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
    
    toggleDrawer(){
        this.setState({ drawerHidden: !this.state.drawerHidden });
    }

    getImages(){
        axios.get('https://picsum.photos/list').then(images=> {
            var randoms= [];

            for(let i=0; i<=25; i++){
                randoms.push(images.data[Math.floor(Math.random()*(images.data.length))]);
            }
            this.setState({ imageList: randoms });
        });
    }

    getBackground(){
        axios.get(`/api/background/${this.props.match.params.id}`).then(response => {console.log(response.data); this.setState({ background: response.data[0].background_url })});
    }

    selectImg(img){
        axios.post('/api/background', { board_id: this.props.match.params.id, url: img });
        this.getBackground();
    }

    render(){
        const tasks= this.state.taskList.map((task, i)=> {
            return(
                <Task key={i} taskID={task.id} taskName={task.name} />
            )
        });

        const images= this.state.imageList.map((image, i)=> {
            return(
                <div onClick={()=> this.selectImg(`https://picsum.photos/1920/1200/?image=${image.id}`) } className="image-preview-container" key={i} style={{
                    backgroundImage: `url(https://picsum.photos/150/150/?image=${image.id})`,
                    height: "150px",
                    width: "150px",
                    margin: "5px"
                }}>
                    <div className="select-img">
                        <p>Select Image</p>
                    </div>
                </div>
            )
        });

        return(
            <div className='board-main-container' style={{ height:"100vh", width:"100%", backgroundImage:`url(${this.state.background})`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat" }}>
                <Navbar />

                <div>
                    <h1>BOARD NAME HERE</h1>
                    {
                        this.state.drawerHidden ? 
                        <div>
                        <p onClick={()=> this.toggleDrawer()}>Change Background</p>
                        
                        <div className="images-container" style={{ width:`${this.state.drawerClosed}` }}>
                            <p onClick={()=> this.toggleDrawer()}>Hide</p>                
                            { images }
                        </div></div>
                        :
                        <div className="images-container" style={{ width:`${this.state.drawerOpen}` }}>
                            <p onClick={()=> this.toggleDrawer()}>Hide</p>                
                            { images }
                        </div>
                    }
                </div>

                <input className='task-input'onChange={(e)=> this.handleText(e.target.value)} type="text"></input>
                <button className='task-submit-btn' onClick={()=> this.addTask() }>Add Task</button>

                <div className='board-tasks-container'>
                    { tasks }
                </div>
            </div>
        )
    }
}

export default Board;