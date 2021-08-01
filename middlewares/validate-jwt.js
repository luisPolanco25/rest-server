const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'This request has no token'
        });
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);

        
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'This user does not exist'
            }); 
        }

        // Verify if user has a true state
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token not valid'
            });
        }
        
        req.user = user;

        next();

    } catch (error) {
        console.log(error);

        res.status(401).json({
            msg: 'Token not valid'
        });
    }




}


module.exports = {
    validateJWT
}