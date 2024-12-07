const { Utilisateur } = require('../models/Utilisateur'); // Assurez-vous de l'import correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Inscription
const signup = async (req, res) => {
    try {
        const { email, motDePasse, nom, role } = req.body;
        console.log("Données reçues dans signup:", req.body);  // Affiche les données envoyées

        // Vérification de l'existence de l'utilisateur
        const utilisateurExist = await Utilisateur.findOne({ where: { email } });
        if (utilisateurExist) {
            return res.status(400).send({ message: 'L\'utilisateur existe déjà' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Création de l'utilisateur
        const utilisateur = await Utilisateur.create({
            email,
            motDePasse: hashedPassword,
            nom,
            role: role || 'utilisateur',  // Par défaut, l'utilisateur a le rôle 'utilisateur'
        });

        console.log("Utilisateur créé:", utilisateur);  // Afficher l'utilisateur créé

        return res.status(201).send({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return res.status(500).send({ error: 'Erreur lors de l\'inscription', details: error.message });
    }
};

// Connexion
// Connexion
const login = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données
        const utilisateur = await Utilisateur.findOne({ where: { email } });

        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!motDePasseValide) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Vérifie si la clé secrète existe dans les variables d'environnement
        const secret = process.env.SECRET_KEY;
        if (!secret) {
            console.error("La clé secrète JWT n'est pas définie.");
            return res.status(500).json({ message: 'Erreur serveur : clé secrète manquante' });
        }

        // Génération du token avec la clé secrète
        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role },
            secret,
            { expiresIn: '1h' }
        );

        // Envoi de la réponse avec token et informations de l'utilisateur
        return res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: {
                id: utilisateur.id,
                email: utilisateur.email,
                role: utilisateur.role,
                nom: utilisateur.nom,
            },
        });
    } catch (error) {
        console.error('Erreur dans le contrôleur login :', error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};



module.exports = { signup, login };
