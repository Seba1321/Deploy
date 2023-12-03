import React from "react"
import '../styles/Navbar.css'

function Navbar(){
   return(
    <nav className="navbar">
        <ul className = "menu-nav">
            <li>
                <a href= "/">Principal</a>
            </li>
            <li>
                <a href= '/mis-calendarios'>Mis Calendarios</a>
            </li>
            <li>
                <a href='/instrucciones'>Instrucciones</a>
            </li>
            <li>
                <a href= "/mi-progreso">Mi Progreso</a>
            </li>
            <li>
                <a href= "/mi-perfil">Mi Perfil</a>
            </li>
        </ul>
    </nav>
   ) 
}

export default Navbar
