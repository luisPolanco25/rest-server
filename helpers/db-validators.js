const Role = require('../models/role');
const User = require('../models/user');


const isRoleValid = async(role = '') => {
    const rolExists = await Role.findOne({role});

    if (!rolExists) {
        throw new Error(`The role ${role} is not registered in the Database`)
    }

}

const emailExists = async(email = '') => {

    const emailExists = await User.findOne({email});
    
    if (emailExists) {
        throw new Error(`The email ${email} is already registered`)
    }

}

const userIDExists = async(id) => {

    const userExists = await User.findById(id);
    
    if (!userExists) {
        throw new Error(`The id ${id} does not exist`)
    }

}

module.exports = {
    isRoleValid,
    emailExists,
    userIDExists
}