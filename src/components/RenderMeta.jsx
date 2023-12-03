import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../styles/RenderMeta.css';

function RenderMeta() {
  const { userID } = useContext(AuthContext);
  const { metaID } = useParams();
  const [objetivos, setObjetivos] = useState([]);
  const [nuevoObjetivo, setNuevoObjetivo] = useState('');
  const [recurrenciaVeces, setRecurrenciaVeces] = useState('');
  const [recurrenciaTiempo, setRecurrenciaTiempo] = useState('');

  const obtenerObjetivos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/objetivo/${metaID}`);
      
      // Ordenar los objetivos por id de menor a mayor
      const objetivosOrdenados = response.data.sort((a, b) => a.id - b.id);
  
      setObjetivos(objetivosOrdenados);
    } catch (error) {
      console.error('Error al obtener objetivos:', error);
    }
  };

  useEffect(() => {
    if (userID && metaID) {
      obtenerObjetivos();
    }
  }, [userID, metaID]);

  const agregarObjetivo = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/objetivo/new-objetivo`, {
        id_meta: metaID,
        recurrencia: recurrenciaVeces || 1,
        tiempo: recurrenciaTiempo || 'diario',
        progreso: 0,
        nombre: nuevoObjetivo,
      });

      // Después de agregar un objetivo, obtener la lista actualizada
      await obtenerObjetivos();

      // Limpiar los campos después de agregar
      setNuevoObjetivo('');
      setRecurrenciaVeces('');
      setRecurrenciaTiempo('');
    } catch (error) {
      console.error('Error al agregar objetivo:', error);
    }
  };

  const incrementarProgreso = async (objetivoID) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/objetivo/${objetivoID}`);

      // Actualizar la lista de objetivos después de incrementar el progreso
      obtenerObjetivos();
    } catch (error) {
      console.error('Error al incrementar progreso:', error);
    }
  };

  return (
    <>
      <div className="contenedor-objetivos">
        {objetivos.map((objetivo) => (
          <div key={objetivo.id} className="objetivo">
            <strong>{objetivo.nombre}</strong>
            <p>Recurrencia: {objetivo.recurrencia} veces de manera {objetivo.tiempo}</p>
            <p>Progreso: {objetivo.progreso} veces</p>
            <button onClick={() => incrementarProgreso(objetivo.id)}>
              Incrementar Progreso
            </button>
          </div>
        ))}
        <div className="nuevo-objetivo">
          <input
            type="text"
            placeholder="Nuevo Objetivo"
            value={nuevoObjetivo}
            onChange={(e) => setNuevoObjetivo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Recurrencia (opcional)"
            value={recurrenciaVeces}
            onChange={(e) => setRecurrenciaVeces(e.target.value)}
          />
          <select
            value={recurrenciaTiempo}
            onChange={(e) => setRecurrenciaTiempo(e.target.value)}
          >
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="semestral">Semestral</option>
            <option value="anual">Anual</option>
            <option value="vida">En la vida</option>
          </select>
          <button onClick={agregarObjetivo}>Agregar Objetivo</button>
        </div>
      </div>
    </>
  );
}

export default RenderMeta;