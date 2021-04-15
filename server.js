const express = require('express');
const  app = express();
const  ejs = require('ejs');
const  path = require('path');
// Using Node.js `require()`
const mongoose = require('mongoose');

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
