const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.post('/login',[
    check('email', 'An email must be provided').isEmail(),
    check('password', 'A password must be provided').not().isEmpty(),
    validateFields
], login);

router.post('/google',[
    check('id_token', 'An id_token must be provided').not().isEmpty(),
    validateFields
], googleSignin);

module.exports = router;