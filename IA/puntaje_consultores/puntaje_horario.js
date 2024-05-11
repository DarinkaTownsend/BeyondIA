const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBeQDRGwVdXWk2_XriIvHj9OiVl2iCGyEM");

async function run_puntaje_zonaHoraria(perfil_consultor, descripcion_proyecto_horario) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
     "1: Zona horario muy distante a la del cliente. " + 
     "Mientras que 10: Misma zona horaria del cliente" +
     " Califica el nivel de compatibilidad (en un dígito que puede ser expresado con hasta 2 decimales) de zonas horarias de la siguiente persona: " + 
     perfil_consultor + ". En relación con las necesidades del siguiente proyecto: " + descripcion_proyecto_horario 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const puntajezonaHoraria = await response.text();
    const valorPuntajeZonaHoraria = parseFloat(puntajezonaHoraria.trim().replace(",", "."));
    return valorPuntajeZonaHoraria;
  }

async function run_puntaje_horasDisponibles(perfil_consultor, descripcion_proyecto_horario) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
     "1:  No calza para nada con las horas del cliente. Mientras que 10: Calza 100% con las horas del cliente." + 
     " Califica el nivel de compatibilidad (en un dígito que puede ser expresado con hasta 2 decimales) de la disponibilidad de franja horaria de la siguiente persona: " + 
     perfil_consultor + ". En relación con las necesidades del siguiente proyecto: " + descripcion_proyecto_horario 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const puntajeHoras = await response.text();
    const valorPuntajeHoras = parseFloat(puntajeHoras.trim().replace(",", "."));
    return valorPuntajeHoras;
  }

module.exports = run_puntaje_zonaHoraria;
module.exports = run_puntaje_horasDisponibles;