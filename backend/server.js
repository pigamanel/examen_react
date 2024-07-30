const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = []; // Utilisez une base de données pour une application réelle

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Nom d\'utilisateur et mot de passe requis.' });
    }

    // Vérifiez si l'utilisateur existe déjà
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris.' });
    }

    // Enregistrez l'utilisateur
    users.push({ username, password });
    res.status(200).json({ message: 'Utilisateur enregistré avec succès.' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.status(200).json({ message: 'Connexion réussie.' });
    } else {
        res.status(400).json({ message: 'Informations de connexion incorrectes.' });
    }
});

app.listen(5000, () => console.log('Serveur en cours d\'exécution sur le port 5000'));
