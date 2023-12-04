import React from 'react';
import '../styles/MetaContainer.css'; 

function MetaEnProgreso({ meta }) {
  return (
    <div className="meta-container meta-en-progreso">
      <h3>{meta.nombre}</h3>
      <p>Estado: En Progreso</p>
      <p>Fecha de inicio: {meta.createdAt}</p>
    </div>
  );
}

export default MetaEnProgreso;