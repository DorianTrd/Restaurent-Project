const Utilisateur = require('../models/Utilisateur'); // Importer le modèle Utilisateur
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour enregistrer un utilisateur
exports.register = async (req, res) => {
    const { nom, email, motDePasse, role } = req.body; // Inclure le rôle lors de l'inscription

    try {
        // Vérifiez si l'utilisateur existe déjà
        const utilisateurExist = await Utilisateur.findOne({ where: { email } });
        if (utilisateurExist) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Créez un nouvel utilisateur avec le rôle fourni ou par défaut "utilisateur"
        const utilisateur = await Utilisateur.create({
            nom,
            email,
            motDePasse: hashedPassword,
            role: role || 'utilisateur', // Rôle par défaut : utilisateur
        });

        // Générez un token pour l'utilisateur
        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role }, // Inclure le rôle dans le payload du token
            process.env.JWT_SECRET, // Utilisez une clé secrète sécurisée depuis les variables d'environnement
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            utilisateur,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur' });
    }
};

// Fonction pour connecter un utilisateur
exports.login = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        // Trouvez l'utilisateur par email
        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifiez le mot de passe
        const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // Générez un token pour l'utilisateur
        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role }, // Inclure le rôle dans le payload du token
            process.env.JWT_SECRET, // Utilisez une clé secrète sécurisée depuis les variables d'environnement
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Connexion réussie',
            utilisateur,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};
