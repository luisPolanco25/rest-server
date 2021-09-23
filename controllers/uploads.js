const path = require('path');
const fs = require('fs');
const { uploadFile } = require('../helpers');
const { request, response } = require('express');
const { User, Product } = require('../models');

const uploadFiles = async(req = request, res = response) => {
      
    // Images
    try {
        const fileName = await uploadFile(req.files, undefined, 'imgs');
        
        res.json({
            fileName
        })
    } catch (msg) {
        res.status(400).json({msg})
    }
}

const updateImage = async(req = request, res = response) => {

    const {id, collection} = req.params;
    
    let model;

    switch(collection) {
        case 'users':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `There's not a user with the id ${id}`
                });
            }
        break;
        
        case 'products':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `There's not a product with the id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({msg: 'Internal error'})
    }

    // Clean previous images
    if (model.img) {
        // Delete image from server
        const imgPath = path.join(__dirname, '../uploads', collection, model.img);

        if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
        }
    }
    
    
    const fileName = await uploadFile(req.files, undefined, collection);
    model.img = fileName;

    await model.save();

    res.json(model);

}



module.exports = {
    uploadFiles,
    updateImage
}