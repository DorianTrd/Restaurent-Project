import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../api/ApiService'; // Assure-toi que cette API a une méthode pour récupérer et supprimer un restaurant.

const AdminDashboardPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [nom, setNom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [ville, setVille] = useState('');
    const [email, setEmail] = useState('');
    const [password, setMotDePasse] = useState(''); // Ajout du champ motDePasse pour le formulaire
    const navigate = useNavigate();

    // Récupérer la liste des restaurants
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await ApiService.getRestaurants(); // Méthode de l'API pour récupérer tous les restaurants
                setRestaurants(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants:", error);
            }
        };
        fetchRestaurants();
    }, []);

    // Ajouter un nouveau restaurant
    const handleAddRestaurant = async (e) => {
        e.preventDefault();

       // Vérifier que tous les champs sont remplis, notamment le mot de passe
        if (!nom || !adresse || !codePostal || !ville || !email || !password) {
            console.error("Tous les champs doivent être remplis, y compris le mot de passe.");
            return; // Empêcher la soumission si des champs sont manquants
        }

        const restaurantData = {
            nom,
            adresse,
            codePostal,
            ville,
            email,
            password, // Envoyer le mot de passe dans la requête
        };

        try {
            await ApiService.createRestaurant(restaurantData); // Méthode de l'API pour ajouter un restaurant
            navigate('/dashboard/restaurants'); // Rediriger vers la liste des restaurants
        } catch (error) {
            console.error("Erreur lors de l'ajout du restaurant:", error);
        }
    };

    // Supprimer un restaurant
    const handleDelete = async (restaurantId) => {
        try {
            await ApiService.deleteRestaurant(restaurantId); // Méthode de l'API pour supprimer un restaurant
            setRestaurants(restaurants.filter((restaurant) => restaurant.id !== restaurantId)); // Mettre à jour la liste après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression du restaurant:", error);
        }
    };

    return (
        <div>
            <h1>Gestion des Restaurants</h1>

            {/* Formulaire pour ajouter un restaurant */}
            <h2>Ajouter un Restaurant</h2>
            <form onSubmit={handleAddRestaurant}>
                <input
                    type="text"
                    placeholder="Nom du restaurant"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Code Postal"
                    value={codePostal}
                    onChange={(e) => setCodePostal(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setMotDePasse(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>

            {/* Liste des restaurants */}
            <div>

                <div className="restaurants-list">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className="restaurant-card">
                            <h2>{restaurant.nom}</h2>
                            <p>{restaurant.email}</p>
                            <button onClick={() => handleDelete(restaurant.id)}>Supprimer</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
