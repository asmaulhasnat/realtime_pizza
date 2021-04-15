require('dotenv').config();
const express = require('express');
const  app = express();
const  ejs = require('ejs');
const  path = require('path');

// Using Node.js `require()`
const mongoose = require('mongoose');
 const  session = require('express-session');
 const flash = require('express-flash');
 const MongoDbStore = require('connect-mongo');

//Database connection
const url= 'mongodb://127.0.0.1:27017/pizza';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});


//session store
// Session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// });

//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    store:MongoDbStore.create({mongoUrl:url,dbName: 'pizza'}),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))
 app.use(flash());



const expressLayout = require('express-ejs-layouts');
// use assets
app.use(express.static('public'));

// set template enginge
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


const PORT = process.env.PORT || 3000;
 // add web route
require('./routes/web')(app);



app.listen(PORT,()=>{
    console.log('listening on port' + PORT);
})
