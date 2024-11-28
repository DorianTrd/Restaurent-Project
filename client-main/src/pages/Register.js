import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [nom, setNom] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { email, motDePasse, nom, role: "utilisateur" }; // Le r�le est fix� � "utilisateur"

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Redirige vers la page de login apr�s l'inscription
                navigate("/login");
            } else {
                setError(result.message || "Erreur lors de l'inscription");
            }
        } catch (err) {
            setError("Une erreur s'est produite, veuillez r�essayer plus tard.");
            console.error("Erreur d'inscription:", err);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
            <h2>Cr�er un compte</h2>
            {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: "100%", padding: 8, marginTop: 5 }}
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        style={{ width: "100%", padding: 8, marginTop: 5 }}
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input
                        type="password"
                        id="motDePasse"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        style={{ width: "100%", padding: 8, marginTop: 5 }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: 5 }}>
                    S'inscrire
                </button>
            </form>
            <p style={{ marginTop: 20 }}>
                D�j� un compte ? <a href="/login">Se connecter</a>
            </p>
        </div>
    );
};

export default Register;
