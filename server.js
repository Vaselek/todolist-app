const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const users = require('./app/users');
const tasks = require('./app/tasks');

const port = 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/users', users);
    app.use('/tasks', tasks);
    app.listen(port, () => {
        console.log(`Server started on ${port} port`)
    })
})