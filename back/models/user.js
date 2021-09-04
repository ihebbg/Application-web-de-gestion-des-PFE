const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user_schema = new schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mdp: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model('user', user_schema);
