import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Metas from '../components/Metas'
import Menu from '../components/Menu'
import '../styles/Principal.css'

function Principal(){
    const [vista, setVista] = useState('vista-mensual')

    const handleChangeVista = (nuevaVista) => {
        setVista(nuevaVista);
    }

    return(
        <div className="Principal">
            <Navbar/>
            <h1>Mis calendarios</h1>
            <div className="Menuopciones">
                <Menu onChangeVista={handleChangeVista} />
            </div>
            <Metas vista={vista} />
        </div>
    )
}

export default Principal