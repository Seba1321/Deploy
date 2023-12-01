import React from 'react'
import '../styles/Formulario.css'

function Formulario() {
  return (
    <form>
      <div>
        <label htmlFor="titulo">Título:</label>
        <input type="text" id="titulo" />
      </div>
      <div>
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" />
      </div>
      <div>
        <label htmlFor="fechaFin">Fecha de Fin:</label>
        <input type="date" id="fechaFin" />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion"></textarea>
      </div>
      <div>
        <label htmlFor="etiquetas">Etiquetas:</label>
        <input type="text" id="etiquetas" />
      </div>
      <div>
        <label htmlFor="progreso">Medidor de Progreso:</label>
        <input type="range" id="progreso" min="0" max="100" />
      </div>
      <button type="submit">Guardar</button>
    </form>
  )
}

export default Formulario
