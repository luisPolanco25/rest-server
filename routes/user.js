const {Router} = require('express');
const { check } = require('express-validator');
const { isRoleValid, emailExists, userIDExists } = require('../helpers/db-validators');
const {validateFields} = require('../middlewares/validate-fields');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('email', 'This email is not valid').isEmail(),       
    check('email').custom(emailExists),       
    check('name', 'A name must be provided').not().isEmpty(),
    check('password', 'Should have more than 5 characters').isLength({min: 6}),
    check('role').custom(isRoleValid),
    validateFields
], usersPost);

router.put('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(userIDExists),
    check('role').custom(isRoleValid),
    validateFields
], usersPut);

router.delete('/:id', [
    check('id', 'This is not a valid ID').isMongoId(),
    check('id').custom(userIDExists),
    validateFields    
], usersDelete);

router.patch('/', usersPatch);


module.exports = router;