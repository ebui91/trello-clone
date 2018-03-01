import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTask } from '../../redux/reducer';
import ListItem from '../ListItem/ListItem';
import axios from 'axios';
import './Task.css';

class Task extends Component{
    constructor(props){
        super(props);

        this.state= {
            itemList: [],
            text: "",
            hidden: true
        }
        this.getList= this.getList.bind(this);
        this.addToList= this.addToList.bind(this);
        this.submit= this.submit.bind(this);
    }

    componentWillMount(){
        this.getList()
    }

    componentDidUpdate(){
        this.getList()
    }

    getList(){
        axios.get(`/api/list/${this.props.taskID}`).then(response=> {
            this.setState({ itemList: response.data });
        });
    }

    addToList(){
        this.setState({ hidden: !this.state.hidden });
    }

    handleTextInput(input){
        this.setState({ text: input });
    }

    submit(){
        axios.post(`/api/list/${this.props.taskID}`, { item_text: this.state.text });
        this.setState({ hidden: true });
        // this.getList();
    }

    render(){
        const items= this.state.itemList.map((item, i)=> {
            return(
                <ListItem key={i} item_id={item.id} text={item.item_text} />
            )
        });

        return(
            <div className='task-container'>
                <div className='task-header'>
                    <h3>{this.props.taskName}</h3>
                    <div className='task-btns-container'>
                        <button className='add-task-btn' onClick={()=> this.addToList()}>
                            <i style={{ color: "#FFF" }}className="fas fa-plus"></i>
                        </button>
                        <button className='delete-task-btn' onClick={()=> this.props.deleteTask(this.props.taskID)}>DELETE TASK</button>
                    </div> 
                </div>

                <div className='items-container'>
                    {items}   
                </div>

                {
                    this.state.hidden ? null : (
                        <div className='list-item-container'>
                            <input type="text" onChange={(e)=> this.handleTextInput(e.target.value)} placeholder="Enter task..."></input>
                            <button onClick={()=> this.submit()}>ADD ITEM</button>
                        </div>
                    )
                }
            </div>
        )
    }
}


const mapStateToProps= (state)=> {
    const { taskList }= state;
    return { taskList };
}

export default connect(mapStateToProps, { deleteTask })(Task);

