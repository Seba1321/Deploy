import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import '../styles/MisEventos.css';

function MisEventos() {
  const { calendarioID } = useParams();
  const [eventos, setEventos] = useState([]);
  const [nuevoEvento, setNuevoEvento] = useState({
    id_calendario: calendarioID,
    fecha_inicio: '',
    nombre: '',
    descripción: '',
    etiqueta: '',
    fecha_termino: '',
  });

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/evento/${calendarioID}`);
        setEventos(response.data);
      } catch (error) {
        console.error('Error al obtener eventos:', error);
      }
    };

    fetchEventos();
  }, [calendarioID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prevEvento) => ({
      ...prevEvento,
      [name]: value,
    }));
  };

  const handleCrearEvento = async () => {
    try {
      if (nuevoEvento.id_calendario) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/evento/new-event`, nuevoEvento);
        setEventos((prevEventos) => [...prevEventos, response.data]);
        setNuevoEvento({
          id_calendario: calendarioID,
          fecha_inicio: '',
          nombre: '',
          descripción: '',
          etiqueta: '',
          fecha_termino: '',
        });
      }
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  return (
    <>
      <Navbar />
      {/* Formulario para agregar eventos */}
      <div className="formulario-eventos">
        <label>
          Fecha de inicio:
          <input type="date" name="fecha_inicio" value={nuevoEvento.fecha_inicio} onChange={handleInputChange} />
        </label>
        <label>
          Nombre:
          <input type="text" name="nombre" value={nuevoEvento.nombre} onChange={handleInputChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="descripción" value={nuevoEvento.descripción} onChange={handleInputChange} />
        </label>
        <label>
          Etiqueta:
          <input type="text" name="etiqueta" value={nuevoEvento.etiqueta} onChange={handleInputChange} />
        </label>
        <label>
          Fecha de término:
          <input type="date" name="fecha_termino" value={nuevoEvento.fecha_termino} onChange={handleInputChange} />
        </label>
        <button onClick={handleCrearEvento}>Crear Evento</button>
      </div>

      {/* Lista de eventos */}
      <div className="lista-eventos">
        <h1 className="header-lista">Lista de Eventos</h1>
        <div className="eventos-grid">
          <div className="evento-header">
            <div>Fecha de inicio</div>
            <div>Nombre</div>
            <div>Descripción</div>
            <div>Etiqueta</div>
            <div>Fecha de término</div>
          </div>
          {eventos.map((evento) => (
            <div key={evento.id} className="evento-card">
              <div>{evento.fecha_inicio}</div>
              <div>{evento.nombre}</div>
              <div>{evento.descripción}</div>
              <div>{evento.etiqueta}</div>
              <div>{evento.fecha_termino}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MisEventos;
