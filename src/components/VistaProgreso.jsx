import React, { useState } from 'react';
import '../styles/MiProgreso.css';
import MetaEnProgreso from './MetaEnProgreso';
import MetaCompletada from './MetaCompletada';

function VistaContenido({ vista, metas }) {
  switch (vista) {
    case 'en-progreso':
      return (
        <div>
          {metas && metas.length > 0 ? (
            metas
              .filter((meta) => meta.status === 'progreso')
              .map((meta) => (
                <MetaEnProgreso key={meta.id} meta={meta} />
              ))
          ) : (
            <p>No hay metas en progreso.</p>
          )}
        </div>
      );
    case 'completados':
      return (
        <div>
          {metas && metas.length > 0 ? (
            metas
              .filter((meta) => meta.status === 'completa')
              .map((meta) => (
                <MetaCompletada key={meta.id} meta={meta} />
              ))
          ) : (
            <p>No hay metas completadas.</p>
          )}
        </div>
      );
    default:
      return <div>Selecciona qué metas quieres revisar.</div>;
  }
}

function VistaProgreso({ metas }) {
  const [vista, setVista] = useState('default');

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
  };

  return (
    <>
      <h2>Mi Progreso</h2>
      <div className="grid-container">
        <div className="grid-item1">
          <button className="elegir-vista" onClick={() => cambiarVista('en-progreso')}>
            En progreso
          </button>
        </div>
        <div className="grid-item2">
          <button className="elegir-vista" onClick={() => cambiarVista('completados')}>
            Completados
          </button>
        </div>
        <div className="grid-item4">
          <div className="vista-contenido">
            {/* Pasa las metas como propiedades a VistaContenido */}
            {vista !== 'default' && <VistaContenido vista={vista} metas={metas} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default VistaProgreso;
