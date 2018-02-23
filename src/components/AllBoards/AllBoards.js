import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reqUser, getBoards, toggleBoardModal } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AllBoards.css';

import BoardModal from '../BoardModal/BoardModal';

class AllBoards extends Component{
    constructor(props){
        super(props);

        this.state= {
            modal: false
        }
        this.toggleModal= this.toggleModal.bind(this);
        this.createBoard= this.createBoard.bind(this);
    }
    componentWillMount(){
        this.props.reqUser();
    }

    componentDidMount(){
        this.props.getBoards();
    }

    toggleModal(){
        this.setState({ modal: !this.state.modal });
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

                    {   
                        !this.props.createBoardModal ? 
                        <div onClick={()=> {this.props.toggleBoardModal()}} className="create-board-container">
                            <p><span><i className="fas fa-plus"></i>&nbsp;</span> Create new board...</p>
                        </div>    
                        :
                        <BoardModal style={{ zIndex:"9" }} />
                    }
                </div>

                
            </div>
        )
    }
}


const mapStateToProps= (state)=> {
    const { user, logged, boardsList, createBoardModal }= state;
    return { user, logged, boardsList, createBoardModal };
}

export default connect(mapStateToProps, { reqUser, getBoards, toggleBoardModal })(AllBoards);