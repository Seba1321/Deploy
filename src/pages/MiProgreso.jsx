import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/MiProgreso.css';

function VistaContenido({ vista }) {
  switch (vista) {
    case 'en-progreso':
      return <div>Contenido de En Progreso</div>;
    case 'completados':
      return <div>Contenido de Completados</div>;
    case 'estadisticas':
      return <div>Contenido de Estadísticas</div>;
    default:
      return <div>Contenido por defecto</div>;
  }
}

function MiProgreso() {
  const [vista, setVista] = useState('default');

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
  };

  return (
    <>
      <Navbar />
      <h2>Mi Progreso</h2>
      <h2>Aquí el usuario podrá ver el progreso actual de sus objetivos en marcha, además de aquellos que ya cumplió.</h2>
      <div className="grid-container">
        <div className="grid-item1">
          <button className="elegir-vista" onClick={() => cambiarVista('en-progreso')}>En progreso</button>
        </div>
        <div className="grid-item2">
          <button className="elegir-vista" onClick={() => cambiarVista('completados')}>Completados</button>
        </div>
        <div className="grid-item3">
          <button className="elegir-vista" onClick={() => cambiarVista('estadisticas')}>Estadísticas</button>
        </div>
        <div className="grid-item4">
          <div className="vista-contenido">
            <VistaContenido vista={vista} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MiProgreso;