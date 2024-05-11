// funciones 
const obtenerValoresDecimales = require('../funciones/funciones_strings');

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBeQDRGwVdXWk2_XriIvHj9OiVl2iCGyEM");

async function run_nivel_industrias(descripcion_industria) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Proporciona únicamente los coeficientes en formato (x; y; z; w) que representan el nivel de importancia para cada"  + 
   "uno de los siguientes factores en la contratación para el proyecto descrito" + 
   "x = Años en la industria " + 
   "y = Nivel de satisfacción " + 
   "z = Calidad de proyectos " +
   "w = Certificaciones en la industria " +
   "coeficientes: <fill>" +
   "Estos coeficientes deben sumar 1 y pueden ser expresados con hasta 2 decimales. " + 
   "indícalos de la forma adecuada para que reflejen el nivel de relevancia" + 
   "que se debe tener en cuenta al contratar a alguien para el proyecto: " + descripcion_industria

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const nivelIndustria = await response.text();
  const lstNivelIndustria = obtenerValoresDecimales(nivelIndustria);
  return lstNivelIndustria;

}

async function run_nivel_idioma(descripcion_industria) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Proporciona únicamente los coeficientes en formato (x; y; z) que representan el nivel de importancia para cada"  + 
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
    const lstNivelIdioma = obtenerValoresDecimales(nivelIdioma);
    return lstNivelIdioma;
  }

  async function run_nivel_disponibilidad(descripcion_industria) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "Proporciona únicamente los coeficientes en formato (x; y) que representan el nivel de importancia para cada"  + 
     "uno de los siguientes factores en la contratación para el proyecto descrito" + 
     "x = Zona Horaria " + 
     "y = Horario disponible de trabajo " + 
     "Estos coeficientes deben sumar 1 y pueden ser expresados con hasta 2 decimales. " + 
     "indícalos de la forma adecuada para que reflejen el nivel de relevancia" + 
     "que se debe tener en cuenta al contratar a alguien para el proyecto: " + descripcion_industria
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const nivelDisponibilidad = await response.text();
    const lstNivelDisponibilidad = obtenerValoresDecimales(nivelDisponibilidad);
    return lstNivelDisponibilidad;
  }

// Exporta las funciones como un objeto
module.exports = {
  run_nivel_industrias,
  run_nivel_idioma,
  run_nivel_disponibilidad,
};



