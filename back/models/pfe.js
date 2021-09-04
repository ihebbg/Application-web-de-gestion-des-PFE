const mongoose = require('mongoose')
const schema = mongoose.Schema
require('../models/enseignant')
require('../models/etudiant')
const pfe_schema = new schema({
    nom_pfe: {
        type: String,
        require: true,
    },
    détails: {
        type: String,
        required: true,
    },
    date_acceptation: {
        type: Date,
    },
    état: {
        type: String,
        default: 'Sans encadrement',
    },
    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'étudiants',
    },

    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enseignants',
    },
})

module.exports = mongoose.model('pfe', pfe_schema)
