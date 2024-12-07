// Fonction pour valider le panier et créer une commande via une API
const validateOrder = async () => {
    const cart = getCart();
    const userId = 123; // ID de l'utilisateur, récupéré après l'authentification
    const restaurantId = 1; // ID du restaurant auquel appartient le plat
    const total = getTotal(); // Calcul du total du panier

    // Formater les détails de la commande
    const details = cart.map(item => ({
        platId: item.platId,
        quantite: item.quantite,
    }));

    // Préparer les données pour l'API
    const orderData = {
        utilisateurId: userId,
        restaurantId: restaurantId,
        total: total,
        details: details,
    };

    // Faire une requête POST vers l'API pour créer la commande
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Commande créée avec succès:', data);
            // Optionnellement, vider le panier après validation
            clearCart();
        } else {
            console.error('Erreur lors de la création de la commande:', data);
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
    }
};
