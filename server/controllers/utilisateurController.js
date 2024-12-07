const { Utilisateur } = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

// Cr�er un utilisateur
const createUtilisateur = async (req, res) => {
    const { nom, email, motDePasse, role } = req.body;

    // V�rification des entr�es
    if (!nom || !email || !motDePasse) {
        return res.status(400).send({ message: 'Nom, email et mot de passe sont requis' });
    }

    try {
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

        return res.status(201).send({ message: 'Utilisateur cr�� avec succ�s', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la cr�ation de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la cr�ation de l\'utilisateur', details: error.message });
    }
};

// R�cup�rer tous les utilisateurs
const getUtilisateurs = async (req, res) => {
    try {
        // R�cup�rer tous les utilisateurs
        const utilisateurs = await Utilisateur.findAll();
        if (!utilisateurs || utilisateurs.length === 0) {
            return res.status(404).send({ message: 'Aucun utilisateur trouv�' });
        }
        return res.status(200).send(utilisateurs);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration des utilisateurs:', error);
        return res.status(500).send({ error: 'Erreur lors de la r�cup�ration des utilisateurs' });
    }
};

// R�cup�rer un utilisateur
const getUtilisateur = async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        console.error('Erreur lors de la r�cup�ration de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la r�cup�ration de l\'utilisateur' });
    }
};

// Mettre � jour les informations d'un utilisateur
const updateUtilisateur = async (req, res) => {
    const { nom, email, motDePasse, role } = req.body;

    // V�rification des entr�es (au moins un champ � modifier)
    if (!nom && !email && !motDePasse && !role) {
        return res.status(400).send({ message: 'Aucune donn�e � mettre � jour' });
    }

    try {
        const utilisateur = await Utilisateur.findByPk(req.user.id); // Utilisateur � partir du token (middleware d'auth)
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouv�' });
        }

        // Mise � jour des champs
        if (motDePasse) {
            utilisateur.motDePasse = await bcrypt.hash(motDePasse, 10); // Hasher le nouveau mot de passe
        }

        utilisateur.nom = nom || utilisateur.nom;
        utilisateur.email = email || utilisateur.email;
        utilisateur.role = role || utilisateur.role;

        await utilisateur.save();
        return res.status(200).send({ message: 'Utilisateur mis � jour avec succ�s', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la mise � jour de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la mise � jour de l\'utilisateur', details: error.message });
    }
};

// Supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.user.id); // R�cup�rer l'utilisateur � partir du token
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouv�' });
        }

        await utilisateur.destroy();
        return res.status(200).send({ message: 'Utilisateur supprim� avec succ�s' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error.message });
    }
};

module.exports = { createUtilisateur, getUtilisateurs, getUtilisateur, updateUtilisateur, deleteUtilisateur };
