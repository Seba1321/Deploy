import React, {useContext, useState} from "react";
import { AuthContext } from "../auth/AuthContext";

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);
    const [msg, SetMsg] = useState('');

    const handleLogout = () => {
        logout();
        SetMsg('Sesión cerrada correctamente');
    }

    return (
        <>
            {msg.length > 0 && <div className="msg">{msg}</div>}
            <button onClick={handleLogout}>Cerrar sesión</button>
        </>
    );
}
export default LogoutButton;