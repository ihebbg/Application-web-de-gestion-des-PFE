const Pfe = require('../models/pfe')
const Annee_univ = require('../models/année_universitaire')
const { validation_pfe } = require('../validation/validation')

// GET ALL PFES
const index = async (req, res, next) => {
    try {
        const PFES = await Pfe.find()
            .populate({
                path: 'etudiant',
            })
            .populate({ path: 'enseignant' })
        res.json(PFES)
        //console.log("etudiants")
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// accepter  encadrer pfe
const encadrer = async (req, res) => {
    try {
        const pfes = await Pfe.find()
        res.json(pfes)
        const pfe = await Pfe.findById({ _id: req.params.idPfe })
        const pfe_etat = await pfe.updateOne({
            $set: {
                état: req.body.état,
                date_acceptation: req.body.date_acceptation,
                enseignant: req.body.enseignant,
            },
        })

        res.json(pfe_etat)
    } catch (err) {
        console.log(err)
    }
}
// afficher les pfes a encadrer
const pfes_accepter = async (req, res, next) => {
    try {
        const pfes = await Pfe.find({ état: 'accepter' })
        res.json(pfes)
    } catch (err) {
        console.log(err)
    }
}
//GET PFE SPECIFIC BY TEACHER
const getpfe_enseignant = async (req, res, next) => {
    try {
        const pfes = await Pfe.find({ enseignant: req.params.idEns }).populate({
            path: 'etudiant',
        })
        res.json(pfes)
    } catch (err) {
        res.status(400).json({ message: error })
    }
}
// GET SPECIFIC PFE
const show = async (req, res, next) => {
    try {
        const specific_pfe = await Pfe.findById({
            _id: req.params.idPfe,
        })
            .populate({ path: 'etudiant' })
            .populate({ path: 'enseignant' })
        res.json(specific_pfe)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// GET SPECIFIC PFE BY STUDENT
const show_pfe_etud = async (req, res) => {
    try {
        const specific_pfe_etudiant = await Pfe.find({
            etudiant: req.params.idEtudPfe,
        })
        res.json(specific_pfe_etudiant)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// add pfe
const store = async (req, res, next) => {
    //validation les champs
    const { error } = validation_pfe(req.body)
    if (error)
        return res.send({ error: error.details[0].message, type: 'error' })
    try {
        const datenow = new Date()
        const anne_univ = await Annee_univ.find()
        if (
            datenow.toISOString() > anne_univ[0].délais_dépot_pfe.toISOString()
        ) {
            res.send({
                error: 'Impossible de déposer le PFE',
                type: 'délais',
            })
        } else {
            const pfe = new Pfe({
                nom_pfe: req.body.nom_pfe,
                détails: req.body.détails,
                etudiant: req.body.etudiant,
            })
            // const etudiant_pfe = Pfe.find({ etudiant: pfe.etudiant._id })
            // if (etudiant_pfe) {
            //     res.send({
            //         error: ' Vous avez déja déposé un PFE',
            //         type: 'depose',
            //     })
            // } else {
            const save_pfe = await pfe.save()
            res.json(save_pfe)
        }
    } catch (err) {
        console.log(err)
    }
}
const update = async (req, res) => {
    const { error } = validation_pfe(req.body)
    if (error)
        return res.send({ error: error.details[0].message, type: 'error' })
    try {
        const datenow = new Date()
        const anne_univ = await Annee_univ.find()
        if (
            datenow.toISOString() > anne_univ[0].délais_dépot_pfe.toISOString()
        ) {
            res.send({
                error: 'Impossible de modifier le PFE',
                type: 'délais',
            })
        } else {
            const update_pfe = await Pfe.updateOne(
                { _id: req.params.idPfe }, //filtrage pour id
                {
                    // update
                    $set: {
                        nom_pfe: req.body.nom_pfe,
                        détails: req.body.détails,
                    },
                },
            )
            res.json(update_pfe)
        }
    } catch (err) {
        res.status(400).json({ message: err })
    }
}
module.exports = {
    index,
    show,
    store,
    pfes_accepter,
    encadrer,
    update,
    show_pfe_etud,
    getpfe_enseignant,
    // show_pfe_etud,
}
