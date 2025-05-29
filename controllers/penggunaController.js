const jwt = require('jsonwebtoken');
const db = require('../db');
const bcrypt = require('bcrypt');
const Joi = require('joi'); //tambahkan pada bagian awal kode
require('dotenv').config(); // untuk akses JWT_SECRET

// Ambil semua data pengguna
exports.getAllPengguna = (req, res) => {
    db.query('SELECT * FROM pengguna', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil pengguna berdasarkan ID
exports.getPenggunaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM pengguna WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah pengguna baru dengan validasi dan konfirmasi password
exports.createPengguna = async (req, res) => {
    const { username, password, repassword } = req.body;

    if (!username || !password || !repassword) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    if (password !== repassword) {
        return res.status(400).json({ error: 'Password dan konfirmasi password tidak cocok' });
    }

    db.query('SELECT * FROM pengguna WHERE username = ?', [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: 'Username sudah digunakan' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            db.query(
                'INSERT INTO pengguna (username, password) VALUES (?, ?)',
                [username, hashedPassword],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.status(201).json({ message: 'Pengguna berhasil ditambahkan', id: result.insertId });
                }
            );
        } catch (error) {
            res.status(500).json({ error: 'Gagal mengenkripsi password' });
        }
    });
};

// Update pengguna berdasarkan ID dengan validasi
exports.updatePengguna = async (req, res) => {
    const { id } = req.params;
    const { username, password, repassword } = req.body;

    if (!username || !password || !repassword) {
        return res.status(400).json({ error: 'Semua field harus diisi' });
    }

    if (password !== repassword) {
        return res.status(400).json({ error: 'Password dan konfirmasi password tidak cocok' });
    }

    db.query('SELECT * FROM pengguna WHERE username = ? AND id != ?', [username, id], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: 'Username sudah digunakan oleh pengguna lain' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            db.query(
                'UPDATE pengguna SET username = ?, password = ? WHERE id = ?',
                [username, hashedPassword, id],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.json({ message: 'Pengguna berhasil diperbarui' });
                }
            );
        } catch (error) {
            res.status(500).json({ error: 'Gagal mengenkripsi password' });
        }
    });
};

// Hapus pengguna berdasarkan ID
exports.deletePengguna = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM pengguna WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pengguna berhasil dihapus' });
    });
};

// Login pengguna
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cek apakah username ada
        const [rows] = await db.promise().query(
            'SELECT * FROM pengguna WHERE username = ?', 
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Username tidak ditemukan' });
        }

        const pengguna = rows[0];

        // Verifikasi password
        const passwordMatch = await bcrypt.compare(password, pengguna.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password salah' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: pengguna.id, username: pengguna.username }, // payload
            process.env.JWT_SECRET,                            // secret
            { expiresIn: '1h' }                                 // opsi
        );

        // Kirim token ke client
        res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: pengguna.id,
                username: pengguna.username
            }
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};