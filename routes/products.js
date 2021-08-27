const {Router} = require('express');
const { check } = require('express-validator');
const { getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct } = require('../controllers/products');
        
const { productExists, categoryExists } = require('../helpers/db-validators');
const { validateFields, validateJWT, isAdmin } = require('../middlewares');


const router = Router();

// Get all products - Public
router.get('/', getProducts);

// Get one product by id - Public
router.get('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(productExists),
    validateFields
], getProduct);

// Create product - Private (Users with token)
router.post('/', [
    validateJWT,
    check('name', 'A name must be provided').not().isEmpty(),
    check('category', 'This is not a valid ID').isMongoId(),
    check('category').custom(categoryExists),
    validateFields
], createProduct);

// Update product - Private (Users with token)
router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(productExists),
    validateFields
], updateProduct);

// Delete product - Private (Admins)
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(productExists),
    validateFields
], deleteProduct);



module.exports = router;