const { Utilisateur } = require('../models/Utilisateur'); // Assurez-vous de l'import correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Inscription
const signup = async (req, res) => {
    try {
        const { email, motDePasse, nom, role } = req.body;
        console.log("Donn�es re�ues dans signup:", req.body);  // Affiche les donn�es envoy�es

        // V�rification de l'existence de l'utilisateur
        const utilisateurExist = await Utilisateur.findOne({ where: { email } });
        if (utilisateurExist) {
            return res.status(400).send({ message: 'L\'utilisateur existe d�j�' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Cr�ation de l'utilisateur
        const utilisateur = await Utilisateur.create({
            email,
            motDePasse: hashedPassword,
            nom,
            role: role || 'utilisateur',  // Par d�faut, l'utilisateur a le r�le 'utilisateur'
        });

        console.log("Utilisateur cr��:", utilisateur);  // Afficher l'utilisateur cr��

        return res.status(201).send({ message: 'Utilisateur cr�� avec succ�s' });
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
        // Recherche de l'utilisateur dans la base de donn�es
        const utilisateur = await Utilisateur.findOne({ where: { email } });

        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouv�' });
        }

        // V�rification du mot de passe
        const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!motDePasseValide) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // V�rifie si la cl� secr�te existe dans les variables d'environnement
        const secret = process.env.SECRET_KEY;
        if (!secret) {
            console.error("La cl� secr�te JWT n'est pas d�finie.");
            return res.status(500).json({ message: 'Erreur serveur : cl� secr�te manquante' });
        }

        // G�n�ration du token avec la cl� secr�te
        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role },
            secret,
            { expiresIn: '1h' }
        );

        // Envoi de la r�ponse avec token et informations de l'utilisateur
        return res.status(200).json({
            message: 'Connexion r�ussie',
            token,
            user: {
                id: utilisateur.id,
                email: utilisateur.email,
                role: utilisateur.role,
                nom: utilisateur.nom,
            },
        });
    } catch (error) {
        console.error('Erreur dans le contr�leur login :', error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};



module.exports = { signup, login };
