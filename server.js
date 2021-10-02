const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const testss = require('./testss');

const app = express();

//Body Parser Middleware

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
    .connect(process.env.MONGO_URI, {useUnifiedTopology: true}, { useNewUrlParser: true })
    .then(() => console.log('Connected to database successfully!!'))
    .catch((e) => console.log('Error in connection', e));


app.use('/api/users', users);    
app.use('/api/profile', profile);    
app.use('/api/posts', posts);   
app.use('/testss', testss)

if(process.env.NODE_ENV == 'production'){
    //static assets for use in production
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}else{
    res.send('hellooooooooooooooooo')
}

//Passport middleware

app.use(passport.initialize());

//Passport config

require('./config/passport')(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Connected on port ${port}`)});