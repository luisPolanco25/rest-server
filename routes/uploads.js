const {Router} = require('express');
const { check } = require('express-validator');
const { validateFields, validateFile } = require('../middlewares');
const { uploadFiles, updateImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateFile, uploadFiles)

router.put('/:collection/:id', [
    validateFile,
    check('id', 'ID should be a Mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], updateImage)



module.exports = router;