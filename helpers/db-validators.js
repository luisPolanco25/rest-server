const { Category, Role, User, Product } = require('../models');


const isRoleValid = async(role = '') => {
    const roleExists = await Role.findOne({role});

    if (!roleExists) {
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

const categoryExists = async(id) => {

    const category = await Category.findById(id);
    
    if (!category) {
        throw new Error(`There is not a category with the id ${id}`)
    }

}

const productExists = async(id) => {

    const product = await Product.findById(id);
    
    if (!product) {
        throw new Error(`There is not a product with the id ${id}`)
    }

}

const allowedCollections = (collection = '', collections = []) => {

    const included = collections.includes(collection);

    if (!included) {
        throw new Error(`The collection ${collection} is not allowed`);
    }

    return true;

}

module.exports = {
    isRoleValid,
    emailExists,
    userIDExists,
    categoryExists,
    productExists,
    allowedCollections
}