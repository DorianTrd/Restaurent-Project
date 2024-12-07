// Fonction pour valider le panier et cr�er une commande via une API
const validateOrder = async () => {
    const cart = getCart();
    const userId = 123; // ID de l'utilisateur, r�cup�r� apr�s l'authentification
    const restaurantId = 1; // ID du restaurant auquel appartient le plat
    const total = getTotal(); // Calcul du total du panier

    // Formater les d�tails de la commande
    const details = cart.map(item => ({
        platId: item.platId,
        quantite: item.quantite,
    }));

    // Pr�parer les donn�es pour l'API
    const orderData = {
        utilisateurId: userId,
        restaurantId: restaurantId,
        total: total,
        details: details,
    };

    // Faire une requ�te POST vers l'API pour cr�er la commande
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
            console.log('Commande cr��e avec succ�s:', data);
            // Optionnellement, vider le panier apr�s validation
            clearCart();
        } else {
            console.error('Erreur lors de la cr�ation de la commande:', data);
        }
    } catch (error) {
        console.error('Erreur r�seau:', error);
    }
};
