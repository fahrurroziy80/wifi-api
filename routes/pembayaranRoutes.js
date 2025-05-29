const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaranController');
const authenticateToken = require('../middleware/auth'); // ✅ Tambahkan middleware

// Semua route pembayaran dilindungi dengan autentikasi
router.get('/pembayaran', authenticateToken, pembayaranController.getAllPembayaran);
router.get('/pembayaran/:kode_bayar', authenticateToken, pembayaranController.getPembayaranByKode);
router.post('/pembayaran', authenticateToken, pembayaranController.createPembayaran);
router.put('/pembayaran/:kode_bayar', authenticateToken, pembayaranController.updatePembayaran);
router.delete('/pembayaran/:kode_bayar', authenticateToken, pembayaranController.deletePembayaran);

module.exports = router;
