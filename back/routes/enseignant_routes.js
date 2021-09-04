const express = require('express');
const router = express.Router();
const EnseignantControllers = require('../controllers/EnseignantControllers');

router.get('/enseignants', EnseignantControllers.index);
router.get('/enseignants/:idEns', EnseignantControllers.show);
router.post('/enseignants', EnseignantControllers.store);
router.put('/enseignants/:idEns', EnseignantControllers.update);
router.delete('/enseignants/:idEns', EnseignantControllers.destroy);
router.put('/changer_mdp/:idEns', EnseignantControllers.changpswd);

module.exports = router;
