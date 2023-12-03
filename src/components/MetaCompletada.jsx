import React from 'react';

function MetaCompletada({ meta }) {
  return (
    <div>
      <h3>{meta.nombre}</h3>
      <p>Estado: Completada</p>
      <p>Fecha de finalización: {meta.updatedAt}</p>
    </div>
  );
}

export default MetaCompletada;