import React, { useState } from 'react'
import '../styles/Metas.css'
import Calendar from 'react-calendar'
import Modal from 'react-modal'
import Formulario from './Formulario'

function Metas({ vista }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const tileContent = ({ date }) => (
    <div className="custom-day">
      <button className="add-button" onClick={openModal}>
        +
      </button>
    </div>
  );

  return (
    <>

    <div>
      {vista === 'vista-mensual' && <Calendar tileContent={tileContent} />}

      {vista === 'vista-semanal' && <div>Contenido Semanal</div>}

      {vista === 'vista-diario' && <div>Contenido Diario</div>}

      {vista === 'vista-lista' && <div>Contenido Lista</div>}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Evento"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          },
          content: {
            background: 'rgba(255, 255, 255, 0.8)',
            width: '400px',
            margin: 'auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            textAlign: 'center',
          },
        }}
      >
        <Formulario />
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </div>
    </>
  );
}

export default Metas
