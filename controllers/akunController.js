const db = require('../db');
const bcrypt = require('bcrypt');

// Ambil semua akun
exports.getAllAkun = (req, res) => {
    db.query('SELECT * FROM akun', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil akun berdasarkan ID
exports.getAkunById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM akun WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Akun tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah akun baru
exports.createAkun = async (req, res) => {
    const { username, password, kode_pelanggan, kode_paket } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        db.query(
            'INSERT INTO akun (username, password, kode_pelanggan, kode_paket) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, kode_pelanggan, kode_paket],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Akun berhasil ditambahkan', id: result.insertId });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengenkripsi password' });
    }
};
// Update akun berdasarkan ID
exports.updateAkun = (req, res) => {
    const { id } = req.params;
    const { username, password, kode_pelanggan, kode_paket } = req.body;

    db.query(
        'UPDATE akun SET username = ?, password = ?, kode_pelanggan = ?, kode_paket = ? WHERE id = ?',
        [username, password, kode_pelanggan, kode_paket, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Akun berhasil diperbarui' });
        }
    );
};

// Hapus akun berdasarkan ID
exports.deleteAkun = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM akun WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Akun berhasil dihapus' });
    });
};
