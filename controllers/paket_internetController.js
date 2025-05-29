const db = require('../db');

// Ambil semua data paket internet
exports.getAllPaketInternet = (req, res) => {
    db.query('SELECT * FROM paket_internet', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil satu data paket berdasarkan kode_paket
exports.getPaketByKode = (req, res) => {
    const { kode_paket } = req.params;
    db.query('SELECT * FROM paket_internet WHERE kode_paket = ?', [kode_paket], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Paket tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah paket internet baru
exports.createPaket = (req, res) => {
    const { kode_paket, nama_paket, waktu_penggunaan, Harga_paket } = req.body;

    db.query(
        'INSERT INTO paket_internet (kode_paket, nama_paket, waktu_penggunaan, Harga_paket) VALUES (?, ?, ?, ?)',
        [kode_paket, nama_paket, waktu_penggunaan, Harga_paket],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Paket berhasil ditambahkan', kode_paket });
        }
    );
};

// Update paket berdasarkan kode_paket
exports.updatePaket = (req, res) => {
    const { kode_paket } = req.params;
    const { nama_paket, waktu_penggunaan, Harga_paket } = req.body;

    db.query(
        'UPDATE paket_internet SET nama_paket = ?, waktu_penggunaan = ?, Harga_paket = ? WHERE kode_paket = ?',
        [nama_paket, waktu_penggunaan, Harga_paket, kode_paket],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Paket berhasil diperbarui' });
        }
    );
};

// Hapus paket berdasarkan kode_paket
exports.deletePaket = (req, res) => {
    const { kode_paket } = req.params;

    db.query('DELETE FROM paket_internet WHERE kode_paket = ?', [kode_paket], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Paket berhasil dihapus' });
    });
};
