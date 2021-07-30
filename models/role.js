const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'A role must be given']
    }
});


module.exports = model('Role', RoleSchema);