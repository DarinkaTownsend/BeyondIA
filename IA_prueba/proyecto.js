const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBeQDRGwVdXWk2_XriIvHj9OiVl2iCGyEM");

async function run_nivel_industria(descripcion_industria) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Proporciona únicamente los coeficientes en orden (x,y,z,w) que representan el nivel de importancia para cada"  + 
   "uno de los siguientes factores en la contratación para el proyecto descrito" + 
   "x = Años en la industria " + 
   "y = Nivel de satisfacción " + 
   "z = Calidad de proyectos " +
   "w = Certificaciones en la industria " +
   "Estos coeficientes deben sumar 1 y pueden ser expresados con hasta 2 decimales. " + 
   "indícalos de la forma adecuada para que reflejen el nivel de relevancia" + 
   "que se debe tener en cuenta al contratar a alguien para el proyecto: " + descripcion_industria

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const nivelIndustria = await response.text();
  console.log(nivelIndustria);


  return nivelIndustria;

}

async function run_nivel_idioma(descripcion_industria) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Proporciona únicamente los coeficientes en orden (x,y,z) que representan el nivel de importancia para cada"  + 
     "uno de los siguientes factores en la contratación para el proyecto descrito" + 
     "x = Fluidez " + 
     "y = Experiencia práctica en la industria " + 
     "z = Nivel de certificaciones del idioma " +
     "Estos coeficientes deben sumar 1 y pueden ser expresados con hasta 2 decimales. " + 
     "indícalos de la forma adecuada para que reflejen el nivel de relevancia" + 
     "que se debe tener en cuenta al contratar a alguien para el proyecto: " + descripcion_industria
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const nivelIdioma = await response.text();
    console.log(nivelIdioma);
    return nivelIdioma;
  }

  async function run_nivel_disponibilidad(descripcion_industria) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Proporciona únicamente los coeficientes en orden (x,y) que representan el nivel de importancia para cada"  + 
     "uno de los siguientes factores en la contratación para el proyecto descrito" + 
     "x = Zona Horaria " + 
     "y = Horario disponible de trabajo " + 
     "Estos coeficientes deben sumar 1 y pueden ser expresados con hasta 2 decimales. " + 
     "indícalos de la forma adecuada para que reflejen el nivel de relevancia" + 
     "que se debe tener en cuenta al contratar a alguien para el proyecto: " + descripcion_industria
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const nivelDisponibilidad = await response.text();
    console.log(nivelDisponibilidad);
    return nivelDisponibilidad;
  }


const descripcion_industria = "Descripción del Proyecto: Desarrollo de Plataforma de Logística para Optimización de Rutas" +
"\n\nAlcances: Crear una plataforma web y móvil que permita a las empresas de logística optimizar sus rutas de entrega, reduciendo costos y tiempos de entrega." +
"\n\nObjetivos: Implementar algoritmos de optimización de rutas, integrar sistemas de seguimiento de vehículos en tiempo real, y desarrollar una interfaz intuitiva para usuarios finales y administradores." +
"\n\nDuración Estimada: 6 meses" +
"\n\nPresupuesto: $200,000" +
"\n\nRequisitos del Proyecto: Experiencia en desarrollo de aplicaciones web y móviles, conocimientos en algoritmos de optimización, familiaridad con sistemas de seguimiento GPS." +
"\n\nPerfil de Equipo Ideal: Desarrolladores Full-stack con experiencia en logística y sistemas de seguimiento." +
"\n\nInformación del Cliente: Industria de Logística, Ubicación: Ciudad de México, México."

const codigoEmpresa = "EM123"
const codigoProyecto = "P1EM123"

console.log(run_nivel_disponibilidad(descripcion_industria));