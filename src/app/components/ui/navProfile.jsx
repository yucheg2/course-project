import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(p => !p);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img src={currentUser.img}
                    height="40"
                    alt=""
                    className="img-responsive rouded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link to={"/users/" + currentUser._id} className="dropdown-item">
                    Profile
                </Link>
                <Link to="/logout" className="dropdown-item">
                    logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
