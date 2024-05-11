// funciones 
const obtenerValoresDecimales = require('../funciones/funciones_strings');

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBeQDRGwVdXWk2_XriIvHj9OiVl2iCGyEM");

async function run_relevancia_categoria(descripcion_industria) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Proporciona únicamente los coeficientes en formato (x; y; z; w) que representan el nivel de importancia para cada"  + 
   "uno de los siguientes factores en la contratación para el proyecto descrito" + 
   "x = Experiencia en la industria requerida " + 
   "y = Nivel de idioma requerido " + 
   "z = Disponibilidad de horarios requerido " +
   "Estos coeficientes deben sumar 1 y pueden ser expresados con hasta 2 decimales. " + 
   "indícalos de la forma adecuada para que reflejen el nivel de relevancia" + 
   "que se debe tener en cuenta al contratar a alguien para el proyecto: " + descripcion_industria

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const relevanciaCategoria = await response.text();
  const lstRelevanciaCategoria = obtenerValoresDecimales(relevanciaCategoria);
  return lstRelevanciaCategoria;

}

module.exports = {
  run_relevancia_categoria
};


