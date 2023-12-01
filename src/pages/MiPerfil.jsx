import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../auth/AuthContext';
import LogoutButton from '../components/Logout';

const MiPerfil = () => {
    const { token, userID } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [newUserData, setNewUserData] = useState({
        nombre: '',
        mail: '',
        contrasena: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (token && userID) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${userID}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener la información del usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    setUserData(data);
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                    setIsLoggedIn(false);
                });
        } else {
            console.error('El token o el userID no están presentes');
            setIsLoggedIn(false);
        }
    }, [token, userID]);

    const config = {
        'headers': {
            'Authorization': `Bearer ${token}`
        }};
    

    const handleDeleteUser = () => {
        if (token && userID) {
            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/${userID}`, config)
                .then(() => {
                    alert('Usuario eliminado correctamente');
                    setUserData(null);
                    setIsLoggedIn(false);
                })
                .catch((error) => {
                    console.error('Error al eliminar el usuario:', error);
                });
        } else {
            console.error('El token o el userID no están presentes');
            setIsLoggedIn(false);
        }
    }


    
    const handleUpdateUser = () => {
        if (token && userID) {
            const updatedFields = {};

            if (newUserData.nombre) updatedFields.nombre = newUserData.nombre;
            if (newUserData.mail) updatedFields.mail = newUserData.mail;
            if (newUserData.contrasena) updatedFields.contrasena = newUserData.contrasena;

            if (Object.keys(updatedFields).length === 0) {
                alert('No se han ingresado campos para actualizar');
                return;
            }

            axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/${userID}`, updatedFields, config)
                .then(() => {
                    alert('Usuario actualizado correctamente');
                    setUserData(prevUserData => ({
                        ...prevUserData,
                        ...updatedFields
                    }));
                    setNewUserData({
                        nombre: '',
                        mail: '',
                        contrasena: ''
                    });
                })
                .catch((error) => {
                    console.error('Error al actualizar el usuario:', error);
                });
        } else {
            console.error('El token o el userID no están presentes');
            setIsLoggedIn(false);
        }
    }

    return (
        <>
            <Navbar />
            <div>
                <h1>Mi cuenta</h1>

                {isLoggedIn ? (
                    <>
                        <div>
                            <h2>Información del Usuario</h2>
                            <p>ID: {userData?.id}</p>
                            <p>Nombre: {userData?.nombre}</p>
                            <p>Email: {userData?.mail}</p>
                            <p>Puntos: {userData?.puntos}</p>
                            <input
                                type="text"
                                placeholder="Nuevo Nombre"
                                value={newUserData.nombre}
                                onChange={(e) => setNewUserData({ ...newUserData, nombre: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Nuevo Email"
                                value={newUserData.mail}
                                onChange={(e) => setNewUserData({ ...newUserData, mail: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Nueva Contraseña"
                                value={newUserData.contrasena}
                                onChange={(e) => setNewUserData({ ...newUserData, contrasena: e.target.value })}
                            />
                            <button onClick={handleUpdateUser}>Actualizar Usuario</button>
                            <button onClick={handleDeleteUser}>Eliminar Usuario</button>
                        </div>
                        <br></br>
                        <LogoutButton></LogoutButton>
                        
                    </>
                ) : (
                    <>
                        <p>Iniciar sesión para ver la información.</p>
                        <Link to="/ingreso">
                            <button>Iniciar sesión</button>
                        </Link>
                    </>
                )}
            </div>
        </>
    );
}

export default MiPerfil;
