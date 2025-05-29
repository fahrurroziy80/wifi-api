const express = require('express');
const router = express.Router();
const akunController = require('../controllers/akunController');
const authenticateToken = require('../middleware/auth'); // ✅ Tambahkan middleware auth

// Semua route diamankan dengan token
router.get('/akun', authenticateToken, akunController.getAllAkun);
router.get('/akun/:id', authenticateToken, akunController.getAkunById);
router.post('/akun', authenticateToken, akunController.createAkun);
router.put('/akun/:id', authenticateToken, akunController.updateAkun);
router.delete('/akun/:id', authenticateToken, akunController.deleteAkun);

module.exports = router;
