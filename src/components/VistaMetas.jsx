import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import '../styles/MisMetas.css';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar'; // Importa el componente ProgressBar

const VistaMetas = () => {
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();
  const [metas, setMetas] = useState([]);
  const [nombresMetas, setNombresMetas] = useState([]);
  const [plazos, setPlazos] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);

  useEffect(() => {
    if (userID) {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}`)
        .then(response => {
          setMetas(response.data);
        })
        .catch(error => {
          console.error('Error al obtener metas:', error);
        });
    }
  }, [userID]);

  const crearMeta = async (userID, nombre, plazo, etiqueta) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/meta/new-meta`, {
        id_usuario: userID,
        nombre: nombre,
        plazo: plazo,
        etiqueta: etiqueta,
      });

      console.log(response.data);

      // Actualiza las metas después de crear una nueva
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}`)
        .then(response => {
          setMetas(response.data);
        })
        .catch(error => {
          console.error('Error al obtener metas:', error);
        });
    } catch (error) {
      console.error('Error al crear la meta:', error);
    }
  };

  const renderMetaSquare = (meta, index) => {
    const formatoFecha = { year: 'numeric', month: '2-digit', day: '2-digit' };

    return (
      <div key={index} className="meta">
        {index < metas.length ? (
          <>
            <Link to={`/mis-metas/${meta.id}`}>
              <p>{meta.nombre}</p>
            </Link>
            <p>Fecha límite: {new Date(meta.plazo).toLocaleDateString(undefined, formatoFecha)}</p>
            <ProgressBar porcentaje={meta.progreso} />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Nombre de la Meta"
              value={nombresMetas[index] || ''}
              onChange={(e) => {
                const newNombres = [...nombresMetas];
                newNombres[index] = e.target.value;
                setNombresMetas(newNombres);
              }}
            />
            <input
              type="date"
              placeholder="Plazo de la Meta"
              value={plazos[index] || ''}
              onChange={(e) => {
                const newPlazos = [...plazos];
                newPlazos[index] = e.target.value;
                setPlazos(newPlazos);
              }}
            />
            <input
              type="text"
              placeholder="Etiqueta de la Meta"
              value={etiquetas[index] || ''}
              onChange={(e) => {
                const newEtiquetas = [...etiquetas];
                newEtiquetas[index] = e.target.value;
                setEtiquetas(newEtiquetas);
              }}
            />
            <div className="botones-meta">
              <button
                className="button-agregar"
                onClick={() => crearMeta(userID, nombresMetas[index], plazos[index], etiquetas[index])}
              >
                Agregar Meta
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <h1>Mis metas</h1>
      <div className="contenedor-metas">
        {metas.map((meta, index) => renderMetaSquare(meta, index))}
        {renderMetaSquare({}, metas.length)} {/* Agrega una fila adicional al final */}
      </div>
    </>
  );
};

export default VistaMetas;