import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/MisCalendarios.css';
import FotoCalendario from '../assets/Calendario.png';
import { Link, useNavigate } from 'react-router-dom';

const MisCalendarios = () => {
    const { userID } = useContext(AuthContext);
    const navigate = useNavigate();
    const [calendarios, setCalendarios] = useState([]);
    const [nombresCalendario, setNombresCalendario] = useState(Array(4).fill(''));
    

    useEffect(() => {
        if (userID) {
            // Realizar la solicitud GET a la ruta de calendarios para el usuario específico
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/calendario/${userID}`)
                .then(response => {
                    setCalendarios(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener calendarios:', error);
                });
        }
    }, [userID]); // Ejecutar efecto cada vez que cambie el userID

    // Función para crear calendario
    const crearCalendario = async (userID, nombre) => {
        try {
            // Envia una solicitud POST al backend para crear un nuevo calendario
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/calendario/new-calendar`, {
                id_usuario: userID,
                nombre: nombre,
            });

            // Maneja la respuesta del backend según sea necesario
            console.log(response.data); // Muestra la respuesta en la consola

            // Puedes recargar la página o actualizar el estado según tus necesidades
            window.location.reload();
        } catch (error) {
            console.error('Error al crear el calendario:', error);
        }
    };

    // Renderizar hasta 4 cuadrados para los calendarios
    const renderCalendarioSquare = (index) => {
        const calendarioExistente = calendarios[index];
        const calendarioAnterior = calendarios[index - 1];

        return (
            <div key={index} className="calendario">
                <p>Calendario {index + 1}</p>
                {calendarioExistente ? (
                    <div>
                        <Link to={`/mis-eventos/${calendarioExistente.id}`}>
                        <div className="calendario-container">
                            <img src={FotoCalendario} className="imagen-landing" alt="Calendario" />
                            <p>{calendarioExistente.nombre}</p>
                        </div>
                        </Link>
                    </div>
                ) : (
                    <>
                        {calendarioAnterior ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Nombre del Calendario"
                                    value={nombresCalendario[index]}
                                    onChange={(e) => {
                                        const newNombres = [...nombresCalendario];
                                        newNombres[index] = e.target.value;
                                        setNombresCalendario(newNombres);
                                    }}
                                />
                                <button onClick={() => crearCalendario(userID, nombresCalendario[index])}>
                                    Crear Calendario
                                </button>
                            </>
                        ) : (
                            <button disabled>Crear Calendario</button>
                        )}
                    </>
                )}
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <h1>Mis calendarios</h1>
            <div className="contenedor-calendarios">
                {[0, 1, 2, 3].map(index => renderCalendarioSquare(index))}
            </div>
        </>
    );
};

export default MisCalendarios;
