import React from 'react';
import '../styles/MetaContainer.css'; 

function MetaCompletada({ meta }) {
  return (
    <div className="meta-container meta-completada">
      <h3>{meta.nombre}</h3>
      <p>Estado: Completada</p>
      <p>Fecha de finalización: {meta.updatedAt}</p>
    </div>
  );
}

export default MetaCompletada;