const db = require('../db');
const Joi = require('joi'); //tambahkan pada bagian awal kode

// Ambil semua pelanggan
exports.getAllPelanggan = (req, res) => {
    db.query('SELECT * FROM pelanggan', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Ambil pelanggan berdasarkan kode_pelanggan
exports.getPelangganById = (req, res) => {
    const { kode_pelanggan } = req.params;
    db.query('SELECT * FROM pelanggan WHERE kode_pelanggan = ?', [kode_pelanggan], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
        }
        res.json(result[0]);
    });
};

// Tambah pelanggan baru
// Tambah pelanggan baru
exports.createPelanggan = (req, res) => {
    const { kode_pelanggan, nama_pelanggan, alamat, no_hp, kode_server } = req.body;

    const schema = Joi.object().keys({
        kode_pelanggan: Joi.string().min(3).max(10).required().messages({
            'string.min': 'Kode pelanggan harus terdiri dari minimal 3 karakter',
            'string.max': 'Kode pelanggan harus terdiri dari maksimal 10 karakter',
            'any.required': 'Kode pelanggan harus diisi'
        }),
        nama_pelanggan: Joi.string().min(3).max(50).required().messages({
            'string.min': 'Nama pelanggan harus terdiri dari minimal 3 karakter',
            'string.max': 'Nama pelanggan harus terdiri dari maksimal 50 karakter',
            'any.required': 'Nama pelanggan harus diisi'
        }),
        alamat: Joi.string().min(3).max(100).required().messages({
            'string.min': 'Alamat harus terdiri dari minimal 3 karakter',
            'string.max': 'Alamat harus terdiri dari maksimal 100 karakter',
            'any.required': 'Alamat harus diisi'
        }),
        no_hp: Joi.string().min(11).max(13).pattern(/^08\d{8,12}$/).required().messages({
            'string.min': 'Nomor HP harus terdiri dari minimal 11 karakter',
            'string.max': 'Nomor HP harus terdiri dari maksimal 13 karakter',
            'string.pattern.base': 'Nomor HP harus sesuai dengan format 08xxxxxxxxxxx',
            'any.required': 'Nomor HP harus diisi'
        }),
        kode_server: Joi.string().min(3).max(10).required().messages({
            'string.min': 'Kode server harus terdiri dari minimal 3 karakter',
            'string.max': 'Kode server harus terdiri dari maksimal 10 karakter',
            'any.required': 'Kode server harus diisi'
        })
    });
		// pastikan data server ada 
    db.query('SELECT * FROM server WHERE kode_server = ?', [kode_server], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: 'Kode server tidak ditemukan di data server' });
        }
    });
		//pastikan kode pelanggan belum dipakai
    db.query('SELECT * FROM pelanggan WHERE kode_pelanggan = ?', [kode_pelanggan], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: 'Pelanggan dengan kode tersebut sudah ada' });
        }
    });


    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    db.query(
        'INSERT INTO pelanggan (kode_pelanggan, nama_pelanggan, alamat, no_hp, kode_server) VALUES (?, ?, ?, ?, ?)',
        [kode_pelanggan, nama_pelanggan, alamat, no_hp, kode_server],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Pelanggan berhasil ditambahkan', kode_pelanggan });
        }
    );
};

// Update pelanggan berdasarkan kode_pelanggan
exports.updatePelanggan = (req, res) => {
    const { kode_pelanggan } = req.params;
    const { nama_pelanggan, alamat, no_hp, kode_server } = req.body;

    db.query(
        'UPDATE pelanggan SET nama_pelanggan = ?, alamat = ?, no_hp = ?, kode_server = ? WHERE kode_pelanggan = ?',
        [nama_pelanggan, alamat, no_hp, kode_server, kode_pelanggan],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Pelanggan berhasil diperbarui' });
        }
    );
};

// Hapus pelanggan berdasarkan kode_pelanggan
exports.deletePelanggan = (req, res) => {
    const { kode_pelanggan } = req.params;

    db.query('DELETE FROM pelanggan WHERE kode_pelanggan = ?', [kode_pelanggan], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pelanggan berhasil dihapus' });
    });
};
