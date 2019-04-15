const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true
    },
    dbUrl: 'mongodb://localhost/todolist'
}