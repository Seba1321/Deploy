import Navbar from '../components/Navbar';

function Instruction() {
  return (
    <>
      <Navbar />
      <div className="instruction-container">
        <h2>🌟 ¡Bienvenido a <strong>CLEAR GOAL</strong>! Aquí puedes comenzar tu jornada!</h2>

        <section className="intro-section">
          <p></p>
          <ul>
            <li><a href="/ingreso">🔐 Inicia sesión</a> para acceder a tus calendarios.</li>
            <li>
                📅 Visualiza tus <a href="/mis-calendarios"> calendarios</a> haciendo clic en nuestro logo.
            </li>
            <li>🎯 Filtra tus eventos con nuestros filtros personalizables.</li>
            <li>📆 Explora diversas vistas del calendario.</li>
            <li>🗓️ Utiliza el calendario grande para agregar eventos, metas o tareas.</li>
            <li>📈 Controla tu progreso a través de estadísticas detalladas.</li>
          </ul>
        </section>
        
        <p>⚓ Además, nuestra navegación intuitiva te permitirá explorar todo el sitio con facilidad.</p>

        <section className="instructions-section">
          <p>
            Si en la parte superior de la página presionas "Landing Page," podrás iniciar sesión. Coloca tus credenciales para ver tus calendarios. Luego, ve a la página principal presionando el logo. Ahí se mostrarán tus calendarios creados, a los cuales podrás acceder haciendo clic en la imagen del calendario. Se abrirá el calendario seleccionado, donde podrás encontrar varios botones:
          </p>
          <ul>
            <li>Filtros: Muestra un botón desplegable con los filtros creados hasta el momento (según las etiquetas que hayas creado para tus eventos).</li>
            <li>Vistas: Permite elegir si deseas ver tu planificador de forma mensual, semanal o diaria.</li>
            <li>Calendario: Permite recorrer todas las fechas para agregar eventos, metas o tareas.</li>
            <li>Mi Progreso: Muestra el avance que has tenido en las estadísticas que selecciones.</li>
          </ul>
        </section>
        
        <br></br>

        <footer>
          <p>
            <strong>Clear Goal</strong> por <a href="https://jgthms.com">Ignacia Chacón & Sebastián Azócar & Diego Valdés</a>. El código fuente está licenciado <a href="http://opensource.org/licenses/uc-license.php">UC</a>. El contenido del sitio web está licenciado <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </footer>
      </div>
    </>
  );
}

export default Instruction;