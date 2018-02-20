module.exports= {
    getBoards: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.get_boards([req.params.id]).then(boards=> res.status(200).json(boards));
    },
    createBoard: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.create_board([req.params.id, "TEST"]).then(boards=> res.status(200).json(boards));
    },
    addTask: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.add_task([req.body.board_id, req.body.task]).then(task=> res.status(200).json(task));
    },
    getTasks: (req, res, next)=> {
        const dbInstance= req.app.get('db');
        dbInstance.get_tasks([req.params.id]).then(tasks=> res.status(200).json(tasks));
    }
}