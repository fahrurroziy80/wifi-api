const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');
const authenticateToken = require('../middleware/auth'); // ✅ Tambahkan middleware

// Semua route pelanggan diamankan dengan JWT token
router.get('/pelanggan', authenticateToken, pelangganController.getAllPelanggan);
router.get('/pelanggan/:kode_pelanggan', authenticateToken, pelangganController.getPelangganById);
router.post('/pelanggan', authenticateToken, pelangganController.createPelanggan);
router.put('/pelanggan/:kode_pelanggan', authenticateToken, pelangganController.updatePelanggan);
router.delete('/pelanggan/:kode_pelanggan', authenticateToken, pelangganController.deletePelanggan);

module.exports = router;
