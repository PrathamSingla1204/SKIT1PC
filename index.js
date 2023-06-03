const express = require('express');
const app = express();
const db = require('./config/mongoose');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');  //layout for partials and layouts
 
app.set('view engine','ejs');//set view engine
app.set('views','./views');

app.set('layout extractStyles',true);//for keeping css file in head
app.set('layout extractScripts',true); //for keeping js file at bottom of body

app.use(expressLayouts);  // extract style and scripts from sub pages into the layout


app.use('/',require('./routes')); //setting up express routes

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});