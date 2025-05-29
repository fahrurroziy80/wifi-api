const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');
const authenticateToken = require('../middleware/auth'); // <- tambahkan ini

router.get('/servers', authenticateToken, serverController.getAllServers);
router.get('/servers/:kodeServer', authenticateToken, serverController.getServerByKodeServer);
router.post('/servers', authenticateToken, serverController.createServer);
router.put('/servers/:kodeServer', authenticateToken, serverController.updateServer);
router.delete('/servers/:kodeServer', authenticateToken, serverController.deleteServer);

module.exports = router;