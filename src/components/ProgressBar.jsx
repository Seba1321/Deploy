import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProgressBar.css';

function ProgressBar({ porcentaje }) {
  const porcentajeValido = isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100 ? 0 : porcentaje;

  return (
    <div className="barra-progreso">
      <div className="progreso" style={{ width: `${porcentajeValido}%` }}></div>
    </div>
  );
}

ProgressBar.propTypes = {
  porcentaje: PropTypes.number.isRequired,
};

export default ProgressBar;