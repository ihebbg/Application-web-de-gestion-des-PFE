const express = require('express');
const router = express.Router();

const EtudiantControllers = require('../controllers/EtudiantControllers');

router.get('/etudiants', EtudiantControllers.index);
router.get('/etudiants/:idEtud', EtudiantControllers.show);
router.post('/etudiants', EtudiantControllers.store);
router.put('/etudiants/:idEtud', EtudiantControllers.update);
router.delete('/etudiants/:idEtud', EtudiantControllers.destroy);
// router.get("/espace_etudiant/:idEtud", EtudiantControllers.espace_etudiant)
router.put('/changer_password/:idEtud', EtudiantControllers.changpswd);
router.delete('/etudiants_bannir/:idEtud', EtudiantControllers.bannir_etudiant);
module.exports = router;
