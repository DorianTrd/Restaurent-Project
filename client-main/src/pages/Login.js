import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = { email, motDePasse };

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Sauvegarde le token et le rôle dans localStorage
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role); // Sauvegarde du rôle dans localStorage

                // Rediriger vers le bon tableau de bord en fonction du rôle
                if (result.role === "admin") {
                    navigate("/admin/dashboard");
                } else if (result.role === "restaurateur") {
                    navigate("/restaurant/dashboard");
                } else if (result.role === "utilisateur") {
                    navigate("/utilisateur/dashboard");
                }
            } else {
                setError(result.message || "Erreur de connexion");
            }
        } catch (err) {
            setError("Une erreur s'est produite, veuillez réessayer plus tard.");
            console.error("Erreur de connexion:", err);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
            <h2>Connexion</h2>
            {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
            <form onSubmit={handleLogin}>
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
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input
                        type="password"
                        id="motDePasse"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        style={{ width: "100%", padding: 8, marginTop: 5 }}
                    />
                </div>
                <button type="submit" style={{ width: "100%", padding: 10, backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: 5 }}>
                    Se connecter
                </button>
            </form>
            <p style={{ marginTop: 20 }}>
                Pas encore de compte ? <a href="/register">S'inscrire</a>
            </p>
        </div>
    );
};

export default Login;
