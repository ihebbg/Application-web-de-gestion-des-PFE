const joi = require("@hapi/joi") /// chargement joi
joi.objectId = require("joi-objectid")(joi)

// validation les champs pour les matiers
const validation_user = (data) => {
    const schema_user = {
        email: joi.string().required().email(),
        mdp: joi.string().required(),
    }
    return joi.validate(data, schema_user)
}
const validation_etudiant = (data) => {
    const schema_etudiant = {
        nom: joi.string().required(),
        prenom: joi.string().required(),
        datenaissance: joi.string().required(),
        année_etude: joi.string().required(),
        cycle: joi.string().required(),
        specialité: joi.string().required(),
        email: joi.string().required().email(),
        cin: joi.number().required(),
        mdp: joi.string().required().min(8),
    }
    return joi.validate(data, schema_etudiant)
}
const validation_enseignant = (data) => {
    const schema_enseignant = {
        nom: joi.string().required(),
        prenom: joi.string().required(),
        datenaissance: joi.string().required(),
        email: joi.string().required().email(),
        cin: joi.number().required(),
        mdp: joi.string().required().min(8),
    }
    return joi.validate(data, schema_enseignant)
}

const validation_année_univ = (data) => {
    const schema_annéeuniv = {
        nom: joi.string().required(),
        délais_dépot_pfe: joi.string().required(),
    }
    return joi.validate(data, schema_annéeuniv)
}
const validation_pfe = (data) => {
    const schema_pfe = {
        nom_pfe: joi.string().required(),
        détails: joi.string().required(),
        etudiant: joi.objectId(),
    }
    return joi.validate(data, schema_pfe)
}
module.exports = {
    validation_user,
    validation_etudiant,
    validation_enseignant,
    validation_année_univ,
    validation_pfe,
}
