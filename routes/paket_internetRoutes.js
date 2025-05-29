const express = require('express');
const router = express.Router();
const paketController = require('../controllers/paket_internetController');
const authenticateToken = require('../middleware/auth'); // ✅ Tambahkan middleware

// Route yang dilindungi oleh autentikasi
router.get('/paket-internet', authenticateToken, paketController.getAllPaketInternet);
router.get('/paket-internet/:kode_paket', authenticateToken, paketController.getPaketByKode);
router.post('/paket-internet', authenticateToken, paketController.createPaket);
router.put('/paket-internet/:kode_paket', authenticateToken, paketController.updatePaket);
router.delete('/paket-internet/:kode_paket', authenticateToken, paketController.deletePaket);

module.exports = router;
