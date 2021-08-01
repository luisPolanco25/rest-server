const {Schema, model} = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'A name must be provided']
    },
    email: {
        type: String,
        required: [true, 'An email must be provided'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A password must be provided']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

}); 

UserSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    
    user.uid = _id
    
    return user;
}


module.exports = model('User', UserSchema);