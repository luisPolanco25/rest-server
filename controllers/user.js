const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async(req = request, res = response) => {

    const {from = 0, limit = 5} = req.query;
    const query = {state: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        users
    });
}

const usersPost = async(req = request, res = response) => {
    
    const {name, email, password, role} = req.body;

    const user = new User({name, email, password, role});
    
    // Hash password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save information in database
    
    await user.save();

    res.json(user);

}

const usersPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;

    // Validate in database
    if (password) {
        // Hash password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);
    
    res.json({
        user
    });
}


const usersDelete = async(req = request, res = response) => {

    const {id} = req.params;
    
    // Delete user
    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        user
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