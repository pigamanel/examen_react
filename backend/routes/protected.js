
const express = require('express');
const verifyRole = require('../middleware/verifyRole');
const router = express.Router();

router.get('/admin-data', verifyRole(['admin']), (req, res) => {
    res.json({ message: 'Données accessibles uniquement aux admins' });
});

router.get('/user-data', verifyRole(['admin', 'simple']), (req, res) => {
    res.json({ message: 'Données accessibles aux admins et aux utilisateurs simples' });
});

module.exports = router;
