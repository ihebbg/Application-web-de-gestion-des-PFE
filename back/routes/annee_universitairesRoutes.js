const express = require('express');
const router = express.Router();
const Annee_univ = require('../controllers/Annee_universitaireControllers');

router.get('/annees_universitaires', Annee_univ.index);
router.get('/annees_universitaires/:idAnn', Annee_univ.show);
router.post('/annees_universitaires', Annee_univ.store);
router.put('/annees_universitaires/:idAnn', Annee_univ.update);
module.exports = router;
