// controllers/authController.js
const { Utilisateur } = require('../models/Utilisateur'); // Assurez-vous de l'import correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription
const signup = async (req, res) => {
    try {
        const { email, motDePasse, nom, role } = req.body;
        console.log("Data received:", req.body);  // Affichage des données reçues

        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Vérifiez que l'objet Utilisateur est correctement défini
        console.log("Utilisateur model:", Utilisateur);

        if (!Utilisateur) {
            return res.status(500).send({ error: "Utilisateur model is undefined" });
        }

        const utilisateur = await Utilisateur.create({
            email,
            motDePasse: hashedPassword,
            nom,
            role: role || 'utilisateur',
        });

        console.log("Utilisateur créé:", utilisateur);

        return res.status(201).send({ message: 'Utilisateur créé avec succès', utilisateur });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);  // Capture complète de l'erreur
        return res.status(500).send({ error: 'Erreur lors de l\'inscription', details: error.message });
    }
};

// Connexion
const login = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;
        const utilisateur = await Utilisateur.findOne({ where: { email } });

        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }

        const match = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!match) {
            return res.status(400).send({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: utilisateur.id }, 'SECRET_KEY', { expiresIn: '1h' });
        return res.status(200).send({ message: 'Connexion réussie', token });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return res.status(500).send({ error: 'Erreur lors de la connexion', details: error.message });
    }
};

module.exports = { signup, login };
