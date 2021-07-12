const mongoose = require('mongoose');
const schema = mongoose.Schema;
const etudiant_schema = new schema({
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
    année_etude: {
        type: String,
        required: true,
    },
    cycle: {
        type: String,
        required: true,
    },
    specialité: {
        type: String,
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
    // pfe: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "pfe",
    // },
});

module.exports = mongoose.model('étudiants', etudiant_schema);
