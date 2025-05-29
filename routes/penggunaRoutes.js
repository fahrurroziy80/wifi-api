const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');

// Routes Pengguna
router.get('/pengguna', penggunaController.getAllPengguna);
router.get('/pengguna/:id', penggunaController.getPenggunaById);
router.post('/pengguna', penggunaController.createPengguna);
router.put('/pengguna/:id', penggunaController.updatePengguna);
router.delete('/pengguna/:id', penggunaController.deletePengguna);
router.post('/pengguna/login', penggunaController.login);

module.exports = router;


