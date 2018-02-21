import axios from 'axios';

// Initial State
const initialState= {
    user: {},
    logged: false,
    boardsList: [],
    taskList: []
}


// Action Types
const REQ_USER= "REQ_USER";
const LOGIN= "LOGIN";
const GET_BOARDS= "GET_BOARDS";
// const CREATE_BOARD= "CREATE_BOARD";
const DELETE_TASK= "DELETE_TASK";


// Reducer
export default function reducer(state= initialState, action){
    console.log('ACTION TYPE', action.type);
    switch(action.type){
        case REQ_USER + "_PENDING": 
            return Object.assign({}, state, { isLoading: true });
        case REQ_USER + "_FULFILLED":
            return Object.assign({}, state, { isLoading: false, user: action.payload, logged: true });
        case LOGIN:
            return Object.assign({}, state);
        case GET_BOARDS + "_PENDING": 
            return Object.assign({}, state, { isLoading: true });
        case GET_BOARDS + "_FULFILLED":
            return Object.assign({}, state, { isLoading: false, boardsList: action.payload });
        case DELETE_TASK + "_PENDING": 
            return Object.assign({}, state, { isLoading: true });
        case DELETE_TASK + "_FULFILLED":
            return Object.assign({}, state, { isLoading: false, taskList: action.payload });
        default:
            return state;
    }
}


// Action Creators
export function reqUser(){
    return {
        type: REQ_USER,
        payload: axios.get('/me').then(response=> response.data)
    }
}

export function login(){
    return{
        type: LOGIN,
        payload: window.location.href= "http://localhost:3001/login"
    }
}

export function getBoards(){
    return{
        type: GET_BOARDS,
        payload: axios.get(`/api/boards/5`).then(response=> response.data)
    }
}

// export function createBoard(){
//     return{
//         type: CREATE_BOARD,
//         payload: axios.post('/api/create-board')
//     }
// }

export function deleteTask(id){
    return{
        type: DELETE_TASK,
        payload: axios.delete(`/api/tasks/${id}`).then(response=> response.data)
    }
}

