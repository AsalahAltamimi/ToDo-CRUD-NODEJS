const express = require('express');

const app = express();

//Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//Routes
const todoRoutes = require('./routes/todos'); 
app.use('/', todoRoutes); 

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
