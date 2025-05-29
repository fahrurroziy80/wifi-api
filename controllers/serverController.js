const db = require('../db');

// Ambil semua data server
exports.getAllServers = (req, res) => {
    db.query('SELECT * FROM server', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil data server berdasarkan kode server
exports.getServerByKodeServer = (req, res) => {
    const { kodeServer } = req.params;
    db.query('SELECT * FROM server WHERE kode_server = ?', [kodeServer], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Server tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah server baru
exports.createServer = (req, res) => {
    const { nama_server, kode_server } = req.body; // Extract kode_server from the request body
    db.query('INSERT INTO server (nama_server, kode_server) VALUES (?, ?)', 
        [nama_server, kode_server], // Include kode_server in the query
        (err, result) => {
            if (err) {   // if (err)  ini di sebut variabel alias / 
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Server berhasil ditambahkan', kode_server: kode_server }); // Return the kode_server
        }
    );
};

// Update server berdasarkan kode server
exports.updateServer = (req, res) => {
    const { kodeServer } = req.params;
    const { nama_server, kode_server } = req.body; // Extract kode_server from the request body
    db.query(
        'UPDATE server SET nama_server = ?, kode_server = ? WHERE kode_server = ?', 
        [nama_server, kode_server, kodeServer], // Update both nama_server and kode_server
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Server berhasil diperbarui' });
        }
    );
};

// Hapus server berdasarkan kode server
exports.deleteServer = (req, res) => {
    const { kodeServer } = req.params;
    db.query('DELETE FROM server WHERE kode_server = ?', [kodeServer], (err, result) => {  //result arry
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Server berhasil dihapus' });
    });
};
