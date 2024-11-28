import React, { useState } from 'react';

const ProfilePage = () => {
    const [user, setUser] = useState({ name: '', email: '' });

    const handleSubmit = () => {
        // API call pour mettre à jour les informations de l'utilisateur
        console.log('Informations mises à jour :', user);
    };

    return (
        <div>
            <h1>Mon Profil</h1>
            <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Nom"
            />
            <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />
            <button onClick={handleSubmit}>Mettre à jour</button>
        </div>
    );
};

export default ProfilePage;
