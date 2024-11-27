import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';

function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
    });

    useEffect(() => {
        ApiService.getProfile().then(setProfile);
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.updateProfile(profile);
            alert('Profil mis à jour avec succès!');
        } catch (err) {
            alert('Erreur: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Mon Profil</h1>
            <input type="text" name="name" value={profile.name} onChange={handleChange} />
            <input type="email" name="email" value={profile.email} onChange={handleChange} />
            <button type="submit">Mettre à jour</button>
        </form>
    );
}

export default Profile;
