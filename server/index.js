const express= require('express');
const cors= require('cors');
const { json }= require('body-parser');
const massive= require('massive');
const session= require('express-session');
const passport= require('passport');
const Auth0Strategy= require('passport-auth0');
const controller= require('./controller.js');
require('dotenv').config();


// Initialize Server
const app= express();
const port= 3001;


// Middlewares
app.use(cors());
app.use(json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    })
);
  
// Massive Connection to postgreSQL database
massive(process.env.DATABASE_URL)
.then(dbInstance=> app.set('db', dbInstance))
.catch(console.log);


// Auth0
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(
    new Auth0Strategy(
      {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_SECRET,
        callbackURL: '/login'
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        app.get('db')
          .get_user_by_authid([profile.id])
          .then(response=> {
            if(!response[0]) {
              const db= app.get('db')
                db.create_user_by_auth([profile.id, profile.displayName])
                .then(created=> {
                  return done(null, created[0]);
                });
            }else{
              return done(null, response[0]);
            }
          });
      }
    )
  );
  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  app.get('/login', passport.authenticate('auth0', {
      successRedirect: "http://localhost:3000/boards"
    })
  );

  app.get('/me', (req, res, next)=> {
    if(req.user){
      res.json(req.user);
    }else{ 
      res.redirect('/login');
    }
  });


// SERVE FRONT END
// app.use(express.static(`${__dirname}/../build`));


// Endpoints
app.get('/api/boards/:id', controller.getBoards);
// app.get('/api/fuck', (req, res, next)=> {
//   res.json('what the fuck bro') 
// })

app.post('/api/create/board/:id', controller.createBoard);
app.post('/api/tasks', controller.addTask);
app.get('/api/tasks/:id', controller.getTasks);

// Server Listening
app.listen(port, ()=> {
    console.log(`Server is listening on port: ${port}`);
});