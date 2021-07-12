const mongoose = require('mongoose')
const schema = mongoose.Schema

const enseignant_schema = new schema({
    nom: {
        type: String,
        require: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    datenaissance: {
        type: Date,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },
    cin: {
        type: Number,
        unique: true,
        required: true,
    },
    mdp: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('enseignants', enseignant_schema)
