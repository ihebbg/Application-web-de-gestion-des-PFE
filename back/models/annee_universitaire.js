const mongoose = require('mongoose');
const schema = mongoose.Schema;

const année_universitaire_schema = new schema({
    nom: {
        type: String,
        require: true,
    },
    délais_dépot_pfe: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model(
    'année_universitaire',
    année_universitaire_schema,
);
