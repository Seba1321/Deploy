import axios from 'axios';

const obtenerObjetivos = async (metaID) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/objetivo/${metaID}`);
    
    // Ordenar los objetivos por id de menor a mayor
    const objetivosOrdenados = response.data.sort((a, b) => a.id - b.id);

    return objetivosOrdenados;
  } catch (error) {
    console.error('Error al obtener objetivos:', error);
    throw error; // Re-lanzar el error para manejarlo en el código que llama a esta función
  }
};

async function calcularProgreso(metaID, userID) {
  try {
    // Obtener la meta del backend
    const metaResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/meta/${userID}/${metaID}`);
    const metaData = metaResponse.data;

    // Calcular la diferencia de tiempo en días entre createdAt y plazo
    const tiempoTotal = Math.ceil((new Date(metaData.plazo) - new Date(metaData.createdAt)) / (1000 * 60 * 60 * 24));

    // Obtener los objetivos de la meta
    const objetivos = await obtenerObjetivos(metaID);

    // Inicializar la variable para llevar el conteo total de veces que se ha realizado cada objetivo
    let totalRealizaciones = 0;
    let totalCompletado = 0;

    // Recorrer cada objetivo y calcular la cantidad de veces que se debe realizar
    objetivos.forEach((objetivo) => {
      const recurrencia = objetivo.recurrencia;
      const tiempo = objetivo.tiempo;
      if (tiempo === 'diario') {
        var tiempoObjetivo = 1;
      } else if (tiempo === 'semanal') {
        var tiempoObjetivo = 7;
      } else if (tiempo === 'mensual') {
        var tiempoObjetivo = 30;
      } else if (tiempo === 'semestral') {
        var tiempoObjetivo = 182;
      } else if (tiempo === 'anual') {
        var tiempoObjetivo = 365;
      } else if (tiempo === 'vida') {
        var tiempoObjetivo = 100000000;
      }

      // Calcular la cantidad de veces que se debe realizar cada objetivo
      const vecesObjetivo = recurrencia * Math.ceil(tiempoTotal / tiempoObjetivo);

      // Sumar la cantidad de veces que se ha realizado cada objetivo
      totalRealizaciones += vecesObjetivo;
      totalCompletado += objetivo.progreso;
    });

    // Calcular el porcentaje de progreso de la meta
    const porcentajeProgreso = (totalCompletado / totalRealizaciones) * 100;

    // Devolver el porcentaje de progreso
    return porcentajeProgreso;

  } catch (error) {
    console.error('Error al calcular progreso:', error);
    throw error; // Re-lanzar el error para manejarlo en el código que llama a esta función
  }
}

export default calcularProgreso;