const express = require('express');

const Task = require('../models/Task');
const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;


const myMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'No such user!'});

    }
    req.user = user;
    next();
};

const router = express.Router();

router.get('/', myMiddleware, (req, res) => {
    Task.find({user: req.user})
        .then(tasks => res.send(tasks))
        .catch(()=>res.sendStatus(500))
});

router.put('/:id', myMiddleware, (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task.user.equals(req.user._id)) {
                task.title = req.body.title;
                task.description = req.body.description;
                task.status = req.body.status;
                task.save()
                return res.send({task});
            }
            return res.sendStatus(404);
        })
        .catch(()=>res.sendStatus(500))
});

router.delete('/:id', myMiddleware, (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task.user.equals(req.user._id)) {
                task.delete()
                return res.send({message: 'Deleted'});
            }
            return res.sendStatus(404);
        })
        .catch(()=>res.sendStatus(500))
});

router.post('/', myMiddleware, (req, res) => {
    const taskData = req.body;
    const userId = taskData.user;
    if (!req.user._id.equals(userId)) return res.sendStatus(404);
    const task = new Task(taskData);
    task.save()
        .then(result => res.send(result))
        .catch((error) => res.sendStatus(400).send(error));

});



module.exports = router;
