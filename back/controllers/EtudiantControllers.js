const Etudiant = require('../models/etudiant')
const User = require('../models/user')
const { validation_etudiant } = require('../validation/validation')

//show list of etudiants
const index = async (req, res, next) => {
    try {
        const etudiants = await Etudiant.find()
        res.send(etudiants)
        //console.log("etudiants")
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//get By id
const show = async (req, res, next) => {
    try {
        const specific_etudiant = await Etudiant.findById({
            _id: req.params.idEtud,
        })
        res.json(specific_etudiant)
        //console.log(" GETSPEC successefly")
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

// Add new etduiant
const store = async (req, res, next) => {
    //validation les champs
    const { error } = validation_etudiant(req.body)
    if (error)
        return res.send({ error: error.details[0].message, type: 'error' })

    const etudiant = new Etudiant({
        nom: req.body.nom,
        prenom: req.body.prenom,
        datenaissance: req.body.datenaissance,
        année_etude: req.body.année_etude,
        cycle: req.body.cycle,
        specialité: req.body.specialité,
        email: req.body.email,
        cin: req.body.cin,
        mdp: req.body.mdp,
    })
    const user = new User({
        _id: etudiant._id,
        email: req.body.email,
        mdp: req.body.mdp,
        role: 'student',
    })
    try {
        const save_etudiant = await etudiant.save()
        await user.save()

        res.json(save_etudiant)
        //console.log(" POST successefly")
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//update etudiant
const update = async (req, res, next) => {
    try {
        const update_etudiant = await Etudiant.updateOne(
            { _id: req.params.idEtud }, //filtrage pour id
            {
                // update
                $set: {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    datenaissance: req.body.datenaissance,
                    année_etude: req.body.année_etude,
                    cycle: req.body.cycle,
                    specialité: req.body.specialité,
                    email: req.body.email,
                    cin: req.body.cin,
                    mdp: req.body.mdp,
                },
            },
        )
        const update_user = await User.updateOne(
            { _id: req.params.idEtud }, //filtrage pour id
            {
                // update
                $set: {
                    email: req.body.email,
                    mdp: req.body.mdp,
                },
            },
        )

        res.json(update_etudiant)
        res.json(update_user)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

//changer password etudiant
const changpswd = async (req, res, next) => {
    try {
        const etudiant = Etudiant.findById({ _id: req.params.idEtud })
        const user = User.findById({ _id: req.params.idEtud })
        // const actuel_pwd = etudiant.mdp
        //const nouveau_mdp = req.body.nouveau_mdp

        const update_passord_etudiant = await etudiant.updateOne({
            $set: {
                mdp: req.body.mdp,
            },
        })
        const update_passord_user = await user.updateOne({
            $set: {
                mdp: req.body.mdp,
            },
        })

        res.json(update_passord_etudiant)
        res.json(update_passord_user)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}
/* voir détail de son pfe
const detailmonpfe = async (req, res, next) => {}*/

//delete etudiant
const destroy = async (req, res, next) => {
    try {
        const etudiant_delete = await Etudiant.remove({
            _id: req.params.idEtud,
        })
        const etudiant_user_remove = await User.remove({
            _id: req.params.idEtud,
        })
        res.json(etudiant_delete)
        res.json(etudiant_user_remove)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

// banir etudiant
const bannir_etudiant = async (req, res, next) => {
    try {
        const etudiant_bannir = await User.remove({
            _id: req.params.idEtud,
        })
        res.json(etudiant_bannir)
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    bannir_etudiant,
    // espace_etudiant,
    changpswd,
}
