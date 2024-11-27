const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

// Cr�er un utilisateur
const createUtilisateur = async (req, res) => {
    try {
        const { nom, email, motDePasse, role } = req.body;

        // V�rifier si l'utilisateur existe d�j�
        const existingUser = await Utilisateur.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: 'Utilisateur d�j� existant' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Cr�er l'utilisateur
        const utilisateur = await Utilisateur.create({
            nom,
            email,
            motDePasse: hashedPassword, // Enregistrer le mot de passe hach�
            role: role || 'utilisateur' // R�le par d�faut si non fourni
        });

        res.status(201).send({ message: 'Utilisateur cr�� avec succ�s', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la cr�ation de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la cr�ation de l\'utilisateur', details: error.message });
    }
};

// R�cup�rer les informations d'un utilisateur
const getUtilisateur = async (req, res) => {
    try {
        // Utilisation de l'id utilisateur depuis la session (ajout� par le middleware auth)
        const utilisateur = await Utilisateur.findByPk(req.user.id);
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouv�' });
        }
        res.status(200).send(utilisateur);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la r�cup�ration des informations de l\'utilisateur' });
    }
};

// Mettre � jour les informations d'un utilisateur
const updateUtilisateur = async (req, res) => {
    try {
        const { nom, email, motDePasse, role } = req.body;

        // Recherche de l'utilisateur par son id
        const utilisateur = await Utilisateur.findByPk(req.user.id);
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouv�' });
        }

        // Si un mot de passe est fourni, le hasher avant de l'enregistrer
        if (motDePasse) {
            utilisateur.motDePasse = await bcrypt.hash(motDePasse, 10);
        }

        utilisateur.nom = nom || utilisateur.nom;
        utilisateur.email = email || utilisateur.email;
        utilisateur.role = role || utilisateur.role;

        await utilisateur.save();  // Sauvegarder les changements dans la base de donn�es
        res.status(200).send({ message: 'Utilisateur mis � jour avec succ�s', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la mise � jour de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la mise � jour de l\'utilisateur' });
    }
};

// Supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.user.id);
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouv�' });
        }

        await utilisateur.destroy();  // Supprimer l'utilisateur de la base de donn�es
        res.status(200).send({ message: 'Utilisateur supprim� avec succ�s' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

module.exports = { createUtilisateur, getUtilisateur, updateUtilisateur, deleteUtilisateur };
