const express= require('express');
const cors= require('cors');
const {json}= require('body-parser');
const massive= require('massive');
const passport= require('passport');
const Auth0Strategy= require('passport-auth0');
require('dotenv').config();


// Initialize Server
const app= express();
const port= process.env.PORT || 3001;


// Middlewares
app.use(cors());
app.use(json());


// SERVE FRONT END
// app.use(express.static(`${__dirname}/../build`));


// Massive Connection to postgreSQL database
massive(process.env.DATABASE_URL)
.then(dbInstance=> app.set('db', dbInstance))
.catch(console.log);


// Endpoints
app.get('/api/test', (req, res, next)=> {
    const dbInstance= req.app.get('db');
    dbInstance.get_users()
    .then(users=> {
        res.status(200).json(users);
    })
    .catch(()=> res.status(500).json())
});


// Server Listening
app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
});