const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route d'inscription
app.post('/register', (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Lecture des utilisateurs existants
    const usersFilePath = path.join(__dirname, 'db', 'users.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    // Vérification si l'utilisateur existe déjà
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
    }

    // Ajout de l'utilisateur
    const newUser = { email, password, role };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');

    res.status(201).json({ user: newUser });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
