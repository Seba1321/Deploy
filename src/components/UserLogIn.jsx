import React, { useState, useContext } from 'react'
import '../styles/UserLogIn.css'
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'

const UserLogIn = () => {
    const { setToken , setUserID } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
            nombre: usuario,
            contrasena: contrasena
        })
            .then((response) => { 
                console.log(response);
                if (response.status === 200) {

                    
                    if (response.data.nombre.includes('1654')) {
                        alert('Inicio de sesión de administrador');
                        setIsAdmin(true);
                    }else{alert('Inicio de sesión exitoso');}
                    // Redirigir a otra pagina
                    window.location.href = '/mis-calendarios';


                } else {
                    // El inicio de sesión falló
                    alert('Credenciales incorrectas. Verifique sus datos.');
                }
                const access_token = response.data.access_token;
                const userID = response.data.id;
                setToken(access_token);
                setUserID(userID);
            })
            .catch((error) => {
                console.error('Error al iniciar sesión:', error);
                alert('Ocurrió un error al iniciar sesión. Inténtelo nuevamente.');
            });
    }

    return (
        <>
        <form className="formulario-login">
            <div className="container-login">
                <input
                    className="userlogs"
                    type="text"
                    id="usuario"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    className="userlogs"
                    type="password"
                    id="contrasena"
                    placeholder="Contraseña"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <div className="botones">
                    <button className="btn-login" onClick={handleLogin}>Log In</button>
                </div>
                {isAdmin && (
                    <div className="admin-message">
                        ¡Inicio de sesión de administrador!
                    </div>
                )}

            </div>
        </form>
        </>
    )
}

export default UserLogIn;
