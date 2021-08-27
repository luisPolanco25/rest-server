const {Router} = require('express');
const { check } = require('express-validator');
const { createCategory,
        getCategories,
        getCategory,
        updateCategory,
        deleteCategory } = require('../controllers/categories');
        
const { categoryExists } = require('../helpers/db-validators');
const { validateFields, validateJWT, isAdmin } = require('../middlewares');


const router = Router();

// Get all categories - Public
router.get('/', getCategories);

// Get one category by id - Public
router.get('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], getCategory);

// Create category - Private (Users with token)
router.post('/', [
    validateJWT,
    check('name', 'A name must be provided').not().isEmpty(),
    validateFields
], createCategory);

// Update category - Private (Users with token)
router.put('/:id', [
    validateJWT,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(categoryExists),
    check('name', 'A name must be provided').not().isEmpty(),
    validateFields
], updateCategory);

// Delete category - Private (Admins)
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(categoryExists),
    validateFields
], deleteCategory);



module.exports = router;