import React, { useState, useContext } from 'react';
import '../styles/UserLogIn.css';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const UserSignUp = () => {
    const { setToken, setUserID } = useContext(AuthContext);
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
            puntos: 0,
            nombre: usuario,
            contrasena: contrasena,
            mail: email
        })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                // Creación de usuario exitosa
                alert('Creación de usuario exitosa');

                // Iniciar sesión automáticamente después de crear la cuenta
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
                    nombre: usuario,
                    contrasena: contrasena
                })
                .then(async (loginResponse) => {
                    if (loginResponse.status === 200) {
                        alert('Inicio de sesión automático exitoso');
                        const access_token = loginResponse.data.access_token;
                        const userID = loginResponse.data.id;

                        // Crear automáticamente un calendario para el usuario recién registrado
                        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/calendario/new-calendar`, {
                            id_usuario: userID,
                            nombre: 'Mi primer calendario',
                        });

                        // Redirigir a otra página después del inicio de sesión
                        window.location.href = '/mis-calendarios';

                        // Actualizar el estado del token y el ID de usuario
                        setToken(access_token);
                        setUserID(userID);
                    } else {
                        alert('Credenciales incorrectas al iniciar sesión automáticamente. Verifique sus datos.');
                    }
                })
                .catch((loginError) => {
                    console.error('Error al iniciar sesión automáticamente:', loginError);
                    alert('Ocurrió un error al iniciar sesión automáticamente. Inténtelo nuevamente.');
                });
            } else {
                alert('Ocurrió un error al crear usuario. Verifique sus datos.');
            }
        })
        .catch((error) => {
            console.error('Error al crear usuario:', error);
            alert('Ocurrió un error al crear usuario. Inténtelo nuevamente.');
        });
    }

    return (
        <>
            <div className="formulario">
                <input 
                    type="text" 
                    id="text" 
                    placeholder="Usuario" 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    id ="contrasena" 
                    placeholder="Contraseña" 
                    value={contrasena} 
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <input 
                    type="password" 
                    id="contrasena" 
                    placeholder="Confirmar Contraseña" 
                    value={confirmarContrasena} 
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                />
                <div className="botones">
                    <button className="btn-signup" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default UserSignUp;
