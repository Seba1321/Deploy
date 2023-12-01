import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import UserLogIn from '../components/UserLogIn';
import UserSignUp from '../components/UserSignUp';
import '../styles/Ingreso.css';

function Ingreso () {
    const [vista, setVista] = useState('ingresar'); // Establece el estado inicial a 'ingresar'

    const cambiarVista = (nuevaVista) => {
        setVista(nuevaVista);
    }

    return (
        <>
        <Navbar />
        <div className={`recuadro ${vista==='registrarse' ? 'registrarse' : (vista === 'ingresar' ? 'volver-ingresar' : '')}`}>
            <div className="dentro">
                <div className="switcher">
                    <label className={`ingreso ${vista==='registrarse' ? 'registrarse' : (vista === 'ingresar' ? 'volver-ingresar' : '')}`}>Log In</label>
                    <label className="switch">
                        <input type="checkbox" checked={vista === 'registrarse'} onChange={() => cambiarVista(vista === 'ingresar' ? 'registrarse' : 'ingresar')} />
                        <span className="slider round"></span>
                    </label>
                    <label className={`registro ${vista==='registrarse' ? 'registrarse' : (vista === 'ingresar' ? 'volver-ingresar' : '')}`}>Sign Up</label>
                </div>
                <div className="contenido">
                    {vista === 'ingresar' ? <UserLogIn className="formulario-log" /> : <UserSignUp className="formulario-log" />}
                </div>
            </div>
        </div>
        </>
    );
}

export default Ingreso;
