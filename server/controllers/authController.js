const Utilisateur = require('../models/Utilisateur'); // Importer le mod�le Utilisateur
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour enregistrer un utilisateur
exports.register = async (req, res) => {
    const { nom, email, motDePasse, role } = req.body; // Inclure le r�le lors de l'inscription

    try {
        // V�rifiez si l'utilisateur existe d�j�
        const utilisateurExist = await Utilisateur.findOne({ where: { email } });
        if (utilisateurExist) {
            return res.status(400).json({ message: 'L\'utilisateur existe d�j�' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Cr�ez un nouvel utilisateur avec le r�le fourni ou par d�faut "utilisateur"
        const utilisateur = await Utilisateur.create({
            nom,
            email,
            motDePasse: hashedPassword,
            role: role || 'utilisateur', // R�le par d�faut : utilisateur
        });

        // G�n�rez un token pour l'utilisateur
        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role }, // Inclure le r�le dans le payload du token
            process.env.JWT_SECRET, // Utilisez une cl� secr�te s�curis�e depuis les variables d'environnement
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Utilisateur cr�� avec succ�s',
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
            return res.status(404).json({ message: 'Utilisateur non trouv�' });
        }

        // V�rifiez le mot de passe
        const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // G�n�rez un token pour l'utilisateur
        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role }, // Inclure le r�le dans le payload du token
            process.env.JWT_SECRET, // Utilisez une cl� secr�te s�curis�e depuis les variables d'environnement
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Connexion r�ussie',
            utilisateur,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};
