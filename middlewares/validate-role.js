const { request, response } = require('express');


const isAdmin = (req = request, res = response, next) => {

    if (!req.user) {

        return res.status(500).json({
            msg: 'A role cannot be verified before verifying a token'
        });

    }

    const {role, name} = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an administrator`
        })
    }


    next();

}

const hasARole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.user) {

            return res.status(500).json({
                msg: 'A role cannot be verified before verifying a token'
            });
    
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `This service requires one of the following roles: ${roles}`
            })
        }
        
        next();
    }

}



module.exports = {
    isAdmin,
    hasARole
}