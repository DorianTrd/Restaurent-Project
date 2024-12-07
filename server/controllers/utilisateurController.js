const { Utilisateur } = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

// Créer un utilisateur
const createUtilisateur = async (req, res) => {
    const { nom, email, motDePasse, role } = req.body;

    // Vérification des entrées
    if (!nom || !email || !motDePasse) {
        return res.status(400).send({ message: 'Nom, email et mot de passe sont requis' });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await Utilisateur.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).send({ message: 'Utilisateur déjà existant' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        // Créer l'utilisateur
        const utilisateur = await Utilisateur.create({
            nom,
            email,
            motDePasse: hashedPassword, // Enregistrer le mot de passe haché
            role: role || 'utilisateur' // Rôle par défaut si non fourni
        });

        return res.status(201).send({ message: 'Utilisateur créé avec succès', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la création de l\'utilisateur', details: error.message });
    }
};

// Récupérer tous les utilisateurs
const getUtilisateurs = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs
        const utilisateurs = await Utilisateur.findAll();
        if (!utilisateurs || utilisateurs.length === 0) {
            return res.status(404).send({ message: 'Aucun utilisateur trouvé' });
        }
        return res.status(200).send(utilisateurs);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return res.status(500).send({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
};

// Récupérer un utilisateur
const getUtilisateur = async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

// Mettre à jour les informations d'un utilisateur
const updateUtilisateur = async (req, res) => {
    const { nom, email, motDePasse, role } = req.body;

    // Vérification des entrées (au moins un champ à modifier)
    if (!nom && !email && !motDePasse && !role) {
        return res.status(400).send({ message: 'Aucune donnée à mettre à jour' });
    }

    try {
        const utilisateur = await Utilisateur.findByPk(req.user.id); // Utilisateur à partir du token (middleware d'auth)
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }

        // Mise à jour des champs
        if (motDePasse) {
            utilisateur.motDePasse = await bcrypt.hash(motDePasse, 10); // Hasher le nouveau mot de passe
        }

        utilisateur.nom = nom || utilisateur.nom;
        utilisateur.email = email || utilisateur.email;
        utilisateur.role = role || utilisateur.role;

        await utilisateur.save();
        return res.status(200).send({ message: 'Utilisateur mis à jour avec succès', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la mise à jour de l\'utilisateur', details: error.message });
    }
};

// Supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.user.id); // Récupérer l'utilisateur à partir du token
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }

        await utilisateur.destroy();
        return res.status(200).send({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        return res.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error.message });
    }
};

module.exports = { createUtilisateur, getUtilisateurs, getUtilisateur, updateUtilisateur, deleteUtilisateur };
