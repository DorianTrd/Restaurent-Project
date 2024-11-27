const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

// Créer un utilisateur
const createUtilisateur = async (req, res) => {
    try {
        const { nom, email, motDePasse, role } = req.body;

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

        res.status(201).send({ message: 'Utilisateur créé avec succès', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la création de l\'utilisateur', details: error.message });
    }
};

// Récupérer les informations d'un utilisateur
const getUtilisateur = async (req, res) => {
    try {
        // Utilisation de l'id utilisateur depuis la session (ajouté par le middleware auth)
        const utilisateur = await Utilisateur.findByPk(req.user.id);
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).send(utilisateur);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la récupération des informations de l\'utilisateur' });
    }
};

// Mettre à jour les informations d'un utilisateur
const updateUtilisateur = async (req, res) => {
    try {
        const { nom, email, motDePasse, role } = req.body;

        // Recherche de l'utilisateur par son id
        const utilisateur = await Utilisateur.findByPk(req.user.id);
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }

        // Si un mot de passe est fourni, le hasher avant de l'enregistrer
        if (motDePasse) {
            utilisateur.motDePasse = await bcrypt.hash(motDePasse, 10);
        }

        utilisateur.nom = nom || utilisateur.nom;
        utilisateur.email = email || utilisateur.email;
        utilisateur.role = role || utilisateur.role;

        await utilisateur.save();  // Sauvegarder les changements dans la base de données
        res.status(200).send({ message: 'Utilisateur mis à jour avec succès', utilisateur });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
};

// Supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.user.id);
        if (!utilisateur) {
            return res.status(404).send({ message: 'Utilisateur non trouvé' });
        }

        await utilisateur.destroy();  // Supprimer l'utilisateur de la base de données
        res.status(200).send({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        res.status(500).send({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};

module.exports = { createUtilisateur, getUtilisateur, updateUtilisateur, deleteUtilisateur };
