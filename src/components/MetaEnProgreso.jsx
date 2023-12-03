import React from 'react';

function MetaEnProgreso({ meta }) {
  return (
    <div>
      <h3>{meta.nombre}</h3>
      <p>Estado: En Progreso</p>
      <p>Fecha de inicio: {meta.createdAt}</p>
    </div>
  );
}

export default MetaEnProgreso;