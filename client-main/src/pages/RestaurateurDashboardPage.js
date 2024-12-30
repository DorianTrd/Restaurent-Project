import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ApiService from '../api/ApiService'; // Assurez-vous que ApiService est correctement configuré

const RestaurateurDashboardPage = () => {
    const [restaurantInfo, setRestaurantInfo] = useState({
        nom: '',
        adresse: '',
        codePostal: '',
        ville: '',
        email: '',
    });
    const [isEditing, setIsEditing] = useState(false); // Gérer le mode édition des informations
    const [dishes, setDishes] = useState([]);
    const [newDish, setNewDish] = useState({
        nom: '',
        description: '',
        prix: '',
    });

    // Récupérer les données de l'utilisateur connecté
    const { user } = useSelector((state) => state.auth);

    // Fonction pour récupérer les informations du restaurateur et ses plats
    useEffect(() => {
        const fetchRestaurateurInfo = async () => {
            // Vérifiez que l'ID utilisateur est bien disponible
            if (!user || !user.id) {
                console.error("L'ID de l'utilisateur est manquant");
                return;
            }

            try {
                // Récupérer les informations du restaurant en fonction de l'utilisateur
                const restaurantData = await ApiService.getRestaurantById(user.id);
                setRestaurantInfo(restaurantData);

                // Récupérer les plats du restaurant
                const dishesData = await ApiService.getDishesByRestaurant(user.id);
                setDishes(dishesData);
            } catch (error) {
                console.error("Erreur lors de la récupération des informations:", error);
            }
        };

        fetchRestaurateurInfo();
    }, [user]); // Recharger lorsque l'utilisateur change

    // Fonction pour gérer l'édition des informations
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            // Mise à jour des informations du restaurant
            await ApiService.updateRestaurant(user.id, restaurantInfo);
            setIsEditing(false); // Désactiver le mode édition après la sauvegarde
        } catch (error) {
            console.error("Erreur lors de la mise à jour des informations:", error);
        }
    };

    // Fonction pour ajouter un plat
    const handleAddDish = async (e) => {
        e.preventDefault();
        try {
            // Utiliser ApiService pour ajouter un plat
            await ApiService.createDish(user.id, newDish);

            // Réinitialiser les champs du formulaire
            setNewDish({ nom: '', description: '', prix: '' });

            // Recharger la liste des plats après ajout
            const updatedDishes = await ApiService.getDishesByRestaurant(user.id);
            setDishes(updatedDishes);
        } catch (error) {
            console.error("Erreur lors de l'ajout du plat:", error);
        }
    };

    return (
        <div>
            <h1>Tableau de bord du Restaurateur</h1>

            {/* Section des informations du restaurateur */}
            <section>
                <h2>Mes informations</h2>
                <div>
                    <label>Nom du Restaurant :</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={restaurantInfo.nom}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, nom: e.target.value })}
                        />
                    ) : (
                        <span>{restaurantInfo.nom}</span>
                    )}
                </div>
                <div>
                    <label>Email :</label>
                    {isEditing ? (
                        <input
                            type="email"
                            value={restaurantInfo.email}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
                        />
                    ) : (
                        <span>{restaurantInfo.email}</span>
                    )}
                </div>
                <div>
                    <label>Adresse :</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={restaurantInfo.adresse}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, adresse: e.target.value })}
                        />
                    ) : (
                        <span>{restaurantInfo.adresse}</span>
                    )}
                </div>
                <div>
                    <label>Code Postal :</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={restaurantInfo.codePostal}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, codePostal: e.target.value })}
                        />
                    ) : (
                        <span>{restaurantInfo.codePostal}</span>
                    )}
                </div>
                <div>
                    <label>Ville :</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={restaurantInfo.ville}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, ville: e.target.value })}
                        />
                    ) : (
                        <span>{restaurantInfo.ville}</span>
                    )}
                </div>
                {isEditing ? (
                    <button onClick={handleSave}>Sauvegarder</button>
                ) : (
                    <button onClick={handleEdit}>Modifier</button>
                )}
            </section>

            {/* Section des plats */}
            <section>
                <h2>Mes plats</h2>
                <div className="plats-list">
                    {dishes.length > 0 ? (
                        dishes.map((dish) => (
                            <div key={dish.id} className="plat-card">
                                <h3>{dish.nom}</h3>
                                <p>{dish.description}</p>
                                <p>Prix : {dish.prix} €</p>
                            </div>
                        ))
                    ) : (
                        <p>Aucun plat ajouté pour le moment.</p>
                    )}
                </div>

                {/* Formulaire d'ajout de plat */}
                <form onSubmit={handleAddDish}>
                    <div>
                        <label>Nom du plat :</label>
                        <input
                            type="text"
                            value={newDish.nom}
                            onChange={(e) => setNewDish({ ...newDish, nom: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Description :</label>
                        <textarea
                            value={newDish.description}
                            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label>Prix :</label>
                        <input
                            type="number"
                            value={newDish.prix}
                            onChange={(e) => setNewDish({ ...newDish, prix: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit">Ajouter un plat</button>
                </form>
            </section>
        </div>
    );
};

export default RestaurateurDashboardPage;
