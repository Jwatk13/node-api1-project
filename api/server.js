// BUILD YOUR SERVER HERE
const Model = require('./users/model');
const express = require('express');

const server = express();

server.use(express.json());

// [POST]
server.post('/api/users', (req, res) => {
    let body = req.body;
    //validation
    if(body.name == null) {
        res.status(400).json({ message: 'Please provide name and bio for the user' });
        return;
    }

    if(body.bio == null) {
        res.status(400).json({ message: 'Please provide name and bio for the user' });
        return;
    }

    Model.insert(body).then(user => {
        res.status(201).json(user);
    });
});

//[GET] all users
server.get('/api/users', (req, res) => {
    Model.find().then(users => {
        res.json(users)});
});

//[GET] user by id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Model.findById(id).then(user => {
        if(user == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(user)
        }
    });
});

//[DELETE]
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    Model.remove(id).then(user => {
        if(user == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(user)
        }
    });
});

//[PUT]
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let body = req.body;
    if(body.name == null || body.bio == null) {
        res.status(400).json({ message: "Please provide name and bio for the user" });
        return;
    }

    Model.update(id, body).then(user => {
        if(user == null) {
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        } else {
            res.json(user)
        }
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
