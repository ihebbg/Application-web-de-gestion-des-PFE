const mongoose = require('mongoose');
const schema = mongoose.Schema;
require('../models/etudiant');
require('../models/pfe');
require('../models/enseignant');
const encadrement_schema = new schema({
    date_acceptation: {
        type: Date,
        require: true,
    },

    etudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'étudiants',
    },

    enseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enseignants',
    },
    pfe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pfe',
    },
});

module.exports = mongoose.model('encadrement', encadrement_schema);
