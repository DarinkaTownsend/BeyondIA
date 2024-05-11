const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBeQDRGwVdXWk2_XriIvHj9OiVl2iCGyEM");

async function run_puntaje_fluidez(perfil_consultor, idioma_consultor, industria_consultor, descripcion_proyecto_idioma) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
     "1: Menor fluidez del idioma. " + 
     "Mientras que 10: Mayor fluidez del idioma. " +
     " Califica el nivel de fuidez (en un dígito que puede ser expresado con hasta 2 decimales) en el idioma " + idioma_consultor +  "en la industria "+
     industria_consultor +" de la siguiente persona: " + 
     perfil_consultor + ". En relación con las necesidades del siguiente proyecto: " + descripcion_proyecto_idioma 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const puntajeFluidez = await response.text();
    const valorPuntajeFluidez = parseFloat(puntajeFluidez.trim().replace(",", "."));
    return valorPuntajeFluidez;
  }

async function run_puntaje_experiencia_idioma(perfil_consultor, idioma_consultor, industria_consultor, descripcion_proyecto_idioma) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
     "1: Menor experiencia del idioma en la industria. Ej: Baja o nula cantidad de proyectos de la industria realizados en el idioma, pocas certificaciones " + 
     "Mientras que 10: Mayor experiencia del idioma en la industria. Ej: Cantidad considerable de proyectos de la industria realizados en el idioma , certificaciones de calidad." +
     " Califica el nivel de experiencia (en un dígito que puede ser expresado con hasta 2 decimales) en el idioma " + idioma_consultor +  "en la industria "+
     industria_consultor +" de la siguiente persona: " + 
     perfil_consultor + ". En relación con las necesidades del siguiente proyecto: " + descripcion_proyecto_idioma 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const puntajeExperienciaIdioma = await response.text();
    const valorPuntajeExperienciaIdioma = parseFloat(puntajeExperienciaIdioma.trim().replace(",", "."));
    return valorPuntajeExperienciaIdioma;
  }

module.exports = run_puntaje_fluidez;
module.exports = run_puntaje_experiencia_idioma;

