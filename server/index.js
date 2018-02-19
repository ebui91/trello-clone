const express= require('express');
const cors= require('cors');
const {json}= require('body-parser');


// Initialize Server
const app= express();
const port= 3001;


// Middlewares
app.use(cors());
app.use(json());


// Server Listening
app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
});