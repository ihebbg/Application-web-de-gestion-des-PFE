const Enseignant = require('../models/enseignant')
const Pfe = require('../models/pfe')
const User = require('../models/user')
const { validation_enseignant } = require('../validation/validation')

//show list of Enseignants
const index = async (req, res, next) => {
    try {
        const enseignants = await Enseignant.find()
        res.json(enseignants)
    } catch (error) {
        console.log(err)
    }
}

//get By id
const show = async (req, res, next) => {
    try {
        const specific_enseignant = await Enseignant.findById({
            _id: req.params.idEns,
        })
        res.json(specific_enseignant)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}
// Add new enseignant
const store = async (req, res, next) => {
    //validation les champs
    const { error } = validation_enseignant(req.body)
    if (error)
        return res.send({ error: error.details[0].message, type: 'error' })
    const enseignant = new Enseignant({
        nom: req.body.nom,
        prenom: req.body.prenom,
        datenaissance: req.body.datenaissance,
        email: req.body.email,
        cin: req.body.cin,
        mdp: req.body.mdp,
    })
    const user = new User({
        _id: enseignant._id,
        email: req.body.email,
        mdp: req.body.mdp,
        role: 'teacher',
    })

    try {
        const save_enseignant = await enseignant.save()
        await user.save()

        res.json(save_enseignant)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

//update enseignant

const update = async (req, res, next) => {
    try {
        const update_enseignant = await Enseignant.updateOne(
            { _id: req.params.idEns }, //filtrage pour id
            {
                // update
                $set: {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    datenaissance: req.body.datenaissance,
                    email: req.body.email,
                    cin: req.body.cin,
                    mdp: req.body.mdp,
                },
            },
        )
        const update_user = await User.updateOne(
            { _id: req.params.idEns }, //filtrage pour id
            {
                // update
                $set: {
                    email: req.body.email,
                    mdp: req.body.mdp,
                },
            },
        )
        res.json(update_user)
        res.json(update_enseignant)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

//delete enseignant
const destroy = async (req, res, next) => {
    try {
        const enseignant_delete = await Enseignant.remove({
            _id: req.params.idEns,
        })
        const enseignant_user_remove = await User.remove({
            _id: req.params.idEns,
        })
        res.json(enseignant_delete)
        res.json(enseignant_user_remove)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

//changer password enseignant
const changpswd = async (req, res, next) => {
    try {
        const enseignant = Enseignant.findById({ _id: req.params.idEns })
        const user = User.findById({ _id: req.params.idEns })

        // const actuel_pwd = enseignant.mdp
        //const nouveau_mdp = req.body.nouveau_mdp

        const update_passord = await enseignant.updateOne({
            $set: {
                mdp: req.body.mdp,
            },
        })
        const update_passord_user = await user.updateOne({
            $set: {
                mdp: req.body.mdp,
            },
        })
        res.json(update_passord_user)
        res.json(update_passord)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
    changpswd,
}
