const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const serverRoutes = require('./routes/serverRoutes');
const pelangganRoutes = require('./routes/pelangganRoutes'); //tambakan baris 
const akunRoutes = require('./routes/akunRoutes');
const paket_internetRoutes = require('./routes/paket_internetRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');
const penggunaRoutes = require('./routes/penggunaRoutes');


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', serverRoutes);
app.use('/api', pelangganRoutes); //tambahkan baris ini
app.use('/api', akunRoutes);
app.use('/api', paket_internetRoutes);
app.use('/api', pembayaranRoutes);
app.use('/api', penggunaRoutes);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
