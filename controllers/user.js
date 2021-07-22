const {request, response} = require('express');

const usersGet = (req = request, res = response) => {

    const {q, name = 'No name', apikey} = req.query;
    
    res.json({
        msg: 'Get API - controller',
        q,
        name,
        apikey
    });
}

const usersPost = (req = request, res = response) => {

    const {name, age} = req.body;
    
    res.json({
        msg: 'Post API - controller',
        name,
        age
    });
}

const usersPut = (req = request, res = response) => {

    const {id} = req.params;
    
    
    res.status(500).json({
        msg: 'Put API - controller',
        id
    });
}


const usersDelete = (req = request, res = response) => {
    res.json({
        msg: 'Delete API - controller'
    });
}

const usersPatch = (req = request, res = response) => {
    res.json({
        msg: 'Patch API - controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}