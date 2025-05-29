const db = require('../db');

// Ambil semua data pembayaran
exports.getAllPembayaran = (req, res) => {
    db.query('SELECT * FROM pembayaran', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil satu pembayaran berdasarkan kode_bayar
exports.getPembayaranByKode = (req, res) => {
    const { kode_bayar } = req.params;
    db.query('SELECT * FROM pembayaran WHERE kode_bayar = ?', [kode_bayar], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Data pembayaran tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambahkan data pembayaran baru
exports.createPembayaran = (req, res) => {
    const { kode_bayar, jumlah_bayar, bulan, tahun, kode_pelanggan } = req.body;
    db.query(
        'INSERT INTO pembayaran (kode_bayar, jumlah_bayar, bulan, tahun, kode_pelanggan) VALUES (?, ?, ?, ?, ?)',
        [kode_bayar, jumlah_bayar, bulan, tahun, kode_pelanggan],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Data pembayaran berhasil ditambahkan' });
        }
    );
};

// Update data pembayaran
exports.updatePembayaran = (req, res) => {
    const { kode_bayar } = req.params;
    const { jumlah_bayar, bulan, tahun, kode_pelanggan } = req.body;

    db.query(
        'UPDATE pembayaran SET jumlah_bayar = ?, bulan = ?, tahun = ?, kode_pelanggan = ? WHERE kode_bayar = ?',
        [jumlah_bayar, bulan, tahun, kode_pelanggan, kode_bayar],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Data pembayaran berhasil diperbarui' });
        }
    );
};

// Hapus data pembayaran
exports.deletePembayaran = (req, res) => {
    const { kode_bayar } = req.params;
    db.query('DELETE FROM pembayaran WHERE kode_bayar = ?', [kode_bayar], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data pembayaran berhasil dihapus' });
    });
};
