module.exports= {
    getBoards: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.get_boards([req.params.id]).then(boards=> res.status(200).json(boards));
    },
    createBoard: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.create_board([req.body.id, req.body.title]).then(boards=> res.status(200).json(boards));
    },
    addTask: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.add_task([req.body.board_id, req.body.name]).then(task=> res.status(200).json(task));
    },
    getTasks: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.get_tasks([req.params.id]).then(tasks=> res.status(200).json(tasks));
    },
    deleteTask: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.delete_task([req.params.id]).then(tasks=> res.status(200).json(tasks));
    },
    getList: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.get_list([req.params.id]).then(list=> res.status(200).json(list));
    },
    addToList: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.add_to_list([req.params.id, req.body.item_text]).then(list=> res.status(200).json(list));
    },
    removeFromList: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.remove_from_list([req.params.id]).then(list=> res.status(200).json(list));
    }    
}