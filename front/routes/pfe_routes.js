const express = require('express')
const router = express.Router()

const PFEControllers = require('../controllers/PfeControllers')

router.get('/pfes', PFEControllers.index)
router.get('/pfes/:idPfe', PFEControllers.show)
router.get('/pfes/etudiant/:idEtudPfe', PFEControllers.show_pfe_etud)
router.put('/pfes/:idPfe', PFEControllers.update)
router.post('/pfe', PFEControllers.store)
router.put('/encadrerpfe/:idPfe', PFEControllers.encadrer)
router.get('/pfes_accepter', PFEControllers.pfes_accepter)
router.get('/pfe_enseignant/:idEns', PFEControllers.getpfe_enseignant)

module.exports = router
