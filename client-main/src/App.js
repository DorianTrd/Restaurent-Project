import React from 'react';
import { useLocation } from 'react-router';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import des modules de routage
import { useSelector, useDispatch } from 'react-redux';  // Import de Redux pour accéder au store
import Cart from './components/Cart';  // Import du composant Cart
import Dashboard from './pages/Dashboard';  // Import de la page Dashboard
import AdminDashboard from './pages/AdminDashboard';  // Import de la page Dashboard

import LoginPage from './pages/Login';  // Exemple de page de connexion
import { logout } from './store/authSlice';  // Action de déconnexion
import { getUser } from './store/features/auth/authActions';
import * as Restaurant from '../../server/models/Restaurant';
import Orders from './pages/Orders';
import ProfilePage from './pages/Profile';
import * as Plat from '../../server/models/Plat';

const RequireAuth = ({ children }) => {

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch()

    if (!user?.role && isAuthenticated) {
        return null
    }



    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

const RequireAnonymous = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!user?.role && isAuthenticated) {
        return null
    }


    if (!isAuthenticated) {
        return children

    }

    if (!user?.role && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role == 'utilisateur') {
        return <Navigate to="/app" replace />

    }
    if (user?.role == "admin" || user?.role == "restaurateur") {
        return <Navigate to="/dashboard" replace />

    }



};

const RequireRole = ({ role, roles = [], children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    if (!user?.role && isAuthenticated) {
        return null
    }


    if (roles.includes(user.role)) {
        return children;
    }

    return <Navigate to="/" replace />
};


const App = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);  // Accès à l'état d'authentification
    const dispatch = useDispatch();

    // Action de déconnexion (si vous souhaitez ajouter un bouton de déconnexion globalement)
    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <Router>
            <div>
                {/* Si l'utilisateur est authentifié, afficher un bouton de déconnexion */}
                {isAuthenticated && (
                    <button onClick={handleLogout}>Se déconnecter</button>
                )}

                <Routes>
                    {/* Route pour la page de connexion */}
                    <Route
                        path="/login"
                        element={<RequireAnonymous><LoginPage /></RequireAnonymous>}
                    />

                    <Route path="/dashboard" element={<RequireAuth>
                        <RequireRole roles={["admin", 'restaurateur']}><AdminDashboard /></RequireRole></RequireAuth>}>
                        <Route path="restaurants" element={<RequireRole roles={["admin"]}><Restaurant /></RequireRole>} />
                        <Route path="restaurants/create" element={<RequireRole roles={['admin']}><Restaurant /></RequireRole>} />
                        {/* <Route path="my-restaurant" element={<RequireRole roles={['restaurateur']}><MyRestaurant /></RequireRole>} /> */} 

                        {/* Modification des routes de plats */}
                        <Route path="restaurant/:restaurantId/plates" element={<RequireRole roles={['restaurateur']}><Plat /></RequireRole>} />
                        <Route path="restaurant/:restaurantId/plates/:dishId/edit" element={<RequireRole roles={['restaurateur']}><AppDashboardEditPlate /></RequireRole>} />
                        <Route path="restaurant/:restaurantId/plates/create" element={<RequireRole roles={['restaurateur']}><AppDashboardEditPlate /></RequireRole>} />

                        <Route path="orders" element={<RequireRole roles={['restaurateur']}><AppDashboardOrders /></RequireRole>} />
                    </Route>
                    <Route
                        path="/app"
                        element={
                            <RequireAuth>
                                <RequireRole roles={['utilisateur']}>
                                    <Dashboard />
                                </RequireRole>

                            </RequireAuth>
                        }
                    >
                         <Route path="restaurants" element={<Restaurant />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="orders" element={<Orders />} />

                        {/* Modification des routes de restaurant avec gestion des plats */}
                        <Route path="restaurants/:restaurantId" element={<Restaurant />} />
                        <Route path="restaurants/:restaurantId/plates/:dishId" element={<PlateDetails />} />
                    </Route>

                 

                    {/* Redirection par défaut vers la page de connexion */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;