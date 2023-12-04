import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MiProgreso.css';
import VistaProgreso from '../components/VistaProgreso';
import VistaMetas from '../components/VistaMetas';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';


function MiProgreso() {
  const [metas, setMetas] = useState([]);
  const { userID } = useContext(AuthContext);

  useEffect(() => {
    // Obtener las metas y establecerlas en el estado
    const obtenerMetas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}`);
        setMetas(response.data);
      } catch (error) {
        console.error('Error al obtener metas:', error);
      }
    };

    // Llamar a la función para obtener metas
    obtenerMetas();
  }, []); // El segundo parámetro [] significa que useEffect se ejecutará solo una vez al montar el componente

  return (
    <>
      <div className="pagina-progreso">
        <Navbar />
        <VistaProgreso metas={metas} />
        <VistaMetas />
      </div>
    </>
  );
}

export default MiProgreso;