import Navbar from '../components/Navbar'
import svgImage from '../assets/goal_svg.svg'
import { Link } from 'react-router-dom'
import '../styles/App.css'

function App() {
  return(
      <>
      <Navbar/>
      <Link to="/ingreso">
          <img src={svgImage} alt="Logo Clear Goal" className="imagen-landing" />
      </Link>
      <h1>Bienvenid@</h1>
      <p>Haz click en el icono para comenzar</p>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <h3>Tus metas, tu plan, tu éxito: Clear Goal lo hace posible!</h3>
      </>
  )
}

export default App
