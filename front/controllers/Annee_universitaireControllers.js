const Annee_univ = require('../models/année_universitaire');
const { validation_année_univ } = require('../validation/validation');

//show list of années_universitaires
const index = async (req, res, next) => {
    try {
        const annees_univ = await Annee_univ.find();
        res.json(annees_univ);
        //console.log("étudiants")
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

//get By id//Détails de annee universitaire
const show = async (req, res, next) => {
    try {
        const specific_annee_univ = await Annee_univ.findById({
            _id: req.params.idAnn,
        });
        res.json(specific_annee_univ);
        //console.log(" GETSPEC successefly")
    } catch (error) {
        res.status(400).json({ message: error });
    }
};
// Add new année universitaire
const store = async (req, res, next) => {
    const { error } = validation_année_univ(req.body);
    if (error)
        return res.send({ error: error.details[0].message, type: 'error' });
    const anne_univ = new Annee_univ({
        nom: req.body.nom,
        délais_dépot_pfe: req.body.délais_dépot_pfe,
    });
    try {
        const anne_univ_save = await anne_univ.save();
        res.json(anne_univ_save);
        //console.log(" POST successefly")
    } catch (error) {
        res.status(400).json({ message: error });
    }
};

//update annéé_universiataire
const update = async (req, res, next) => {
    try {
        const update_annee_univ = await Annee_univ.updateOne(
            { _id: req.params.idAnn }, //filtrage pour id
            {
                // update
                $set: {
                    délais_dépot_pfe: req.body.délais_dépot_pfe,
                },
            },
        );
        res.json(update_annee_univ);
        //console.log("UPDATE successefly")
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

module.exports = {
    index,
    show,
    store,
    update,
};
