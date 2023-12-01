import React from 'react'
import '../styles/Menu.css'

function Menu({ onChangeVista }) {
  const handleChange = (event) => {
    const nuevaVista = event.target.value;
    onChangeVista(nuevaVista);
  };

  return (
    <div className="menu-container">
      <div className="menu">
        <div className="opcion izquierda-arriba">
          <input type="text" placeholder="Búsqueda" />
        </div>
        <div className="opcion izquierda-abajo">
          <select>
            <option value="">Filtro por etiquetas</option>
            <option value="etiqueta1">Etiqueta 1</option>
            <option value="etiqueta2">Etiqueta 2</option>
            {/* Cambiar por las etiquetas del usuario */}
          </select>
        </div>
        <div className="opcion centro">
          <button className="agregar">+</button>
        </div>
        <div className="opcion derecha-arriba">
          <a href="/mi-progreso">Mi progreso</a>
        </div>
        <div className="opcion derecha-abajo">
          <label> Vista </label>
          <select onChange={handleChange}>
            <option value="vista-mensual">Mensual</option>
            <option value="vista-semanal">Semanal</option>
            <option value="vista-diario">Diario</option>
            <option value="vista-lista">Lista</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Menu
