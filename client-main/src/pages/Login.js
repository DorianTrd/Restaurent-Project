import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice"; // Assurez-vous d'importer l'action correctement
import AuthService from "../api/AuthService";
import { login } from "../store/features/auth/authActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = { email, motDePasse };
        dispatch(login(data))
        
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
                        required
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
                        required
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                    }}
                >
                    Se connecter
                </button>
            </form>
            <p style={{ marginTop: 20 }}>
                Pas encore de compte ?{" "}
                <button
                    onClick={() => navigate("/register")}  // Utilisation de navigate pour la redirection
                    style={{ color: "#007bff", border: "none", background: "none", cursor: "pointer" }}
                >
                    S'inscrire
                </button>
            </p>
        </div>
    );
};

export default Login;
