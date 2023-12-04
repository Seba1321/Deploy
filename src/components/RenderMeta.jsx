import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import '../styles/RenderMeta.css';
import ProgressBar from './ProgressBar';

function RenderMeta() {
  const { userID } = useContext(AuthContext);
  const { metaID } = useParams();
  const [meta, setMeta] = useState({
    status: '',
    progreso: 0,
  });
  const [objetivos, setObjetivos] = useState([]);
  const [nuevoObjetivo, setNuevoObjetivo] = useState('');
  const [recurrenciaVeces, setRecurrenciaVeces] = useState('');
  const [recurrenciaTiempo, setRecurrenciaTiempo] = useState('');
  const [porcentajeProgreso, setPorcentajeProgreso] = useState(0);

  const obtenerMeta = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/show/${userID}/${metaID}`);
      setMeta(response.data);
    } catch (error) {
      console.error('Error al obtener la meta:', error);
    }
  };

  const obtenerObjetivos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/objetivo/${metaID}`);
      const objetivosOrdenados = response.data.sort((a, b) => a.id - b.id);
      setObjetivos(objetivosOrdenados);
    } catch (error) {
      console.error('Error al obtener objetivos:', error);
    }
  };

  const calcularYActualizarProgreso = async () => {
    try {
      const progreso = await calcularProgreso();
      setPorcentajeProgreso(progreso);

      // Verificar si se ha alcanzado el 100% de progreso
      if (progreso === 100) {
        // Realizar la llamada para actualizar el status a 'completa'
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}/${metaID}`, {
          status: 'completa',
        });
      }
    } catch (error) {
      console.error('Error al calcular y actualizar progreso:', error);
    }
  };

  const calcularProgreso = async () => {
    try {
      const metaResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}/${metaID}`);
      
      const metaData = metaResponse.data;
      const tiempoTotal = Math.ceil((new Date(metaData.plazo) - new Date(metaData.createdAt)) / (1000 * 60 * 60 * 24));
  
      let totalRealizaciones = 0;
      let totalCompletado = 0;
  
      objetivos.forEach((objetivo) => {
        const recurrencia = objetivo.recurrencia;
        const tiempo = objetivo.tiempo;
        let tiempoObjetivo;
  
        if (tiempo === 'diario') {
          tiempoObjetivo = 1;
        } else if (tiempo === 'semanal') {
          tiempoObjetivo = 7;
        } else if (tiempo === 'mensual') {
          tiempoObjetivo = 30;
        } else if (tiempo === 'semestral') {
          tiempoObjetivo = 182;
        } else if (tiempo === 'anual') {
          tiempoObjetivo = 365;
        } else if (tiempo === 'vida') {
          tiempoObjetivo = 100000000;
        } else {
          console.warn(`Advertencia: Tiempo no reconocido - ${tiempo}`);
          return; // Ignorar el objetivo si el tiempo no es reconocido
        }
  
        const vecesObjetivo = recurrencia * Math.ceil(tiempoTotal / tiempoObjetivo);
  
        // Verificar si vecesObjetivo es un número válido
        if (isNaN(vecesObjetivo)) {
          console.warn('Advertencia: vecesObjetivo no es un número válido:', vecesObjetivo);
          return;
        }
  
        totalRealizaciones += vecesObjetivo;
        totalCompletado += objetivo.progreso;
      });
  
      // Manejar división por cero y valores no numéricos
      if (isNaN(totalCompletado) || isNaN(totalRealizaciones) || totalRealizaciones === 0) {
        console.warn('Advertencia: TotalCompletado o TotalRealizaciones es NaN o TotalRealizaciones es 0');
        return 0;
      }
  
      const porcentajeProgreso = (totalCompletado / totalRealizaciones) * 100;
      console.log('Porcentaje de progreso calculado:', porcentajeProgreso);
      return porcentajeProgreso;
    } catch (error) {
      console.error('Error al calcular progreso:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userID && metaID) {
        await obtenerMeta();
        await obtenerObjetivos();
        await calcularYActualizarProgreso();
      }
    };

    fetchData();
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

      setNuevoObjetivo('');
      setRecurrenciaVeces('');
      setRecurrenciaTiempo('');
      await obtenerObjetivos();  // Llama a obtenerObjetivos después de agregar un objetivo
      await calcularYActualizarProgreso();
    } catch (error) {
      console.error('Error al agregar objetivo:', error);
    }
  };

  const incrementarProgreso = async (objetivoID) => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/objetivo/${objetivoID}`);
      await obtenerObjetivos();
      await calcularYActualizarProgreso();

      // Actualizar el valor de progreso de la meta
      const metaResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}/${metaID}`);
      setMeta(metaResponse.data);

      // Verificar si se ha alcanzado el 100% de progreso
      if (metaResponse.data.progreso >= 100) {
        // Realizar la llamada para actualizar el status a 'completa'
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}/${metaID}`, {
          status: 'completa',
        });
      }
    } catch (error) {
      console.error('Error al incrementar progreso:', error);
    }
  };

  return (
    <>
      {/* Renderiza el título de la meta */}
      <h2>{meta.nombre}</h2>

      {/* Renderiza la barra de progreso */}
      <ProgressBar porcentaje={porcentajeProgreso} />
  
      {/* Espacio entre la barra de progreso y la lista de objetivos */}
      <div style={{ marginBottom: '20px' }}></div>
  
      <div className="contenedor-objetivos">
        {/* Renderiza la lista de objetivos */}
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
  
        {/* Espacio entre la lista de objetivos y la sección para agregar un nuevo objetivo */}
        <div style={{ marginBottom: '20px' }}></div>
  
        {/* Sección para agregar un nuevo objetivo */}
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

        {/* Texto que indica el Status de la Meta y el Progreso */}
        <div style={{ marginTop: '20px' }}>
          <p>Status de la Meta: {meta.status}</p>
        </div>
      </div>
    </>
  );
}

export default RenderMeta;
