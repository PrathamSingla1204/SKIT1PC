const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');  //layout for partials and layouts

//set view engine 
app.set('view engine','ejs');
app.set('views','./views');


app.use('/',require('./routes')); //setting up express routes

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});