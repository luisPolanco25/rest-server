const { response, request } = require('express');
const {Category} = require('../models');


const getCategories = async(req = request, res = response) => {
    const {from = 0, limit = 5} = req.query;
    const query = {status: true}

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        categories
    });
}

const getCategory = async(req = request, res = response) => {

    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json({
        category
    });
}

const createCategory = async(req = request, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name});
    
    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} already exists`
        });
    }

    const data = {
        name,
        user: req.user._id
    };

    const category = new Category(data);

    // Save in databatase
    await category.save();

    res.status(201).json(category);
}

const updateCategory = async(req = request, res = response) => {

    const {id} = req.params;
    let {name} = req.body;
    name = name.toUpperCase();

    const categoryDB = await Category.findOne({name});
    
    if (categoryDB) {
        return res.status(400).json({
            msg: `The category ${name} already exists`
        })
    }

    const category = await Category.findByIdAndUpdate(id, {name});
    
    res.json({
        category
    });
}

const deleteCategory = async(req = request, res = response) => {

    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false});

    res.json(category);
}



module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}