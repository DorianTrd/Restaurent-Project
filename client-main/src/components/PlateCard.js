import React from "react";
import { Link } from "react-router-dom";
import "../style.css"; // Import des styles globaux

const PlateCard = ({ restaurant, plate }) => {
    return (
        <Link
            to={`/dashboard/restaurants/${restaurant?._id}/plates/${plate?._id}`}
            className="plate-card"
            style={{ backgroundImage: `url(${plate?.image})` }}
        >
            <div className="plate-card-infos">
                <h2 className="plate-card-title">{plate?.name}</h2>
                <p className="plate-card-price">{plate?.price}€</p>
            </div>
        </Link>
    );
};

export default PlateCard;
