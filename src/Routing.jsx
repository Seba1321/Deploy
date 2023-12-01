import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Instruction from './pages/Instrucciones';
import Principal from './pages/Principal';
import App from './pages/App.jsx';
import MisCalendarios from './pages/MisCalendarios';
import MiProgreso from './pages/MiProgreso';
import Ingreso from './pages/Ingreso';
import MiPerfil from './pages/MiPerfil';
import MisEventos from './pages/MisEventos';

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/instrucciones'} element={<Instruction />} />
          <Route path={'/'} element={<App />} />
          <Route path={'/principal'} element={<Principal />} />
          <Route path={'/mis-calendarios'} element={<MisCalendarios />} />
          <Route path={'/mi-progreso'} element={<MiProgreso />} />
          <Route path={'/ingreso'} element={<Ingreso />} />
          <Route path={'/mi-perfil'} element={<MiPerfil />} />
          <Route path="/mis-eventos/:calendarioID" element={<MisEventos />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routing;
