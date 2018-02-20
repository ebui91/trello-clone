import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reqUser, getBoards } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllBoards.css';

class AllBoards extends Component{
    constructor(props){
        super(props);

        this.createBoard= this.createBoard.bind(this);
    }
    componentWillMount(){
        this.props.reqUser();
    }

    componentDidMount(){
        this.props.getBoards();
    }

    createBoard(){
        axios.post(`/api/create/board/${this.props.user.id}`).then(response=> {
            response.data;
        })
        this.props.getBoards();
    }

    render(){
        const boards= this.props.boardsList.map((board, i)=> {
            return(
                <Link to={`/board/${board.id}`} key={i}>
                    <div className='board-container'>
                        {board.name}
                    </div>
                </Link>
            )
        });
        return(
            <div>
                <h1>{this.props.user.name}'s Boards</h1>
                <div className='all-boards-container'>
                    { boards }

                    <button onClick={()=> {this.createBoard()}}>
                        <i className="fas fa-plus"></i>
                    </button>
                    <p>Create New Board</p>
                </div>
            </div>
        )
    }
}


const mapStateToProps= (state)=> {
    const { user, logged, boardsList }= state;
    return { user, logged, boardsList };
}

export default connect(mapStateToProps, { reqUser, getBoards })(AllBoards);