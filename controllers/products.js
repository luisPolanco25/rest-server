const { response, request } = require('express');
const {Product, Category} = require('../models');


const getProducts = async(req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    const query = {status: true}

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        products
    });
}

const getProduct = async(req = request, res = response) => {

    const {id} = req.params;
    const product = await Product.findById(id)
                                 .populate('user', 'name')
                                 .populate('category', 'name');

    console.log(product);

    res.json({
        product
    });
}

const createProduct = async(req = request, res = response) => {

    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `The product ${ productDB.name } already exists`
        });
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }

    const product = new Product( data );

    await product.save();

    res.status(201).json(product);

}

const updateProduct = async(req = request, res = response) => {

    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if( data.name ) {
        data.name  = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    res.json( product );
    
}

const deleteProduct = async(req = request, res = response) => {

    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true });

    res.json(product);
    
}



module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}