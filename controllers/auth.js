const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req = request, res = response) => {

    const {email, password} = req.body;

    try {

        // Verify if email exists
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                msg: 'User/password is not valid'
            });
        }

        // Verify if user is active
        if (!user.state) {
            return res.status(400).json({
                msg: 'This user is no longer active'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/password is not valid'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);
        
        

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something has gone wrong'
        });
    }

}

const googleSignin = async(req = request, res = response) => {

    const {id_token} = req.body;

    
    try {
        
        const {email, name, img} = await googleVerify(id_token);

        let user = await User.findOne({email});

        if (!user) {
            const data = {

                name,
                email,
                password: '._.',
                img,
                google: true

            };
            user = new User(data);
            await user.save();
        }

        if (!user.state) {
            return res.status(401).json({
                'msg': 'This user is no longer active'
            })
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user, 
            token
        })
        
    } catch (error) {
        res.status(400).json({
            msg: 'This is not a valid google token'
        })
    }


}


module.exports = {
    login,
    googleSignin
}