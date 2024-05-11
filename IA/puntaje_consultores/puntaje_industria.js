const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBeQDRGwVdXWk2_XriIvHj9OiVl2iCGyEM");

async function run_puntaje_años_experiencia(perfil_consultor, industria_consultor, descripcion_proyecto) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
     "1: Menor experiencia. ej. baja cantidad de tiempo trabajado,  baja cantidad de proyectos en relación con " + 
     "el tiempo trabajado, poco tiempo de graduación, baja responsabilidad, titulo bajo " + 
     "para la industria, pocas contribuciones en la industria." + 
     "Mientras que 10: Mayor experiencia. ej.  tiempo de trabajo considerable para la industria,  cantidad de" +
     "proyectos en relación con el tiempo trabajado, alto cargo en un puesto, título alto para las industrias, altas contribuciones. " + 
     "escala: <fill>" +
     "[Los ejemplos se adaptarán a la industria], califica la experiencia (en un dígito que puede ser expresado con hasta 2 decimales) en la industria"+ industria_consultor +"de la siguiente persona: " + 
     perfil_consultor + ". En relación con las nececsidades del siguiente proyecto: " + descripcion_proyecto 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const puntajeExperiencia = await response.text();
    const valorPuntajeExperiencia = parseFloat(puntajeExperiencia.trim().replace(",", "."));
    return valorPuntajeExperiencia;
  }


async function run_puntaje_satisfacción(perfil_consultor, industria_consultor) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "En una escala del 1 al 10, donde "  + 
     "1: Menor satisfacción. ej. Experiencia Laboral Limitada, Falta de Reconocimiento, Ambiente de trabajo Hostil, Falta de desarrollo " + 
     "profesional, sobrecarga de trabajo, insastisfacción con cultura organizacional, Falta de equilibrio entre trabajo y vida personal.  " + 
     "Mientras que 10: Mayor experiencia. ej. Experiencia duradera, Responsabilidad y liderazgo significativo, Ambiente laboral positivo y colaborativo, Oportunidades continuas" + 
     "escala: <fill>" +
     " de crecimiento y desarrollo, Equilibrio saludable entre trabajo y vida personal, Pasión y motivación por el trabajo, perspecticas prometedoras de futuro" +
     "[Los ejemplos se adaptarán a la industria], califica el puntaje de satisfacción (en un dígito que puede ser expresado con hasta 2 decimales) en la industria"+ industria_consultor +"de la siguiente persona: " + 
     perfil_consultor 

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const puntajeSatisfaccion = await response.text();
  const valorPuntajeSatisfaccion = parseFloat(puntajeSatisfaccion.trim().replace(",", "."));
  return valorPuntajeSatisfaccion;

}


async function run_puntaje_proyectos(perfil_consultor, industria_consultor, descripcion_proyecto) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
    "1: Proyecto de menor calidad. ej. Objetivos incumplidos, Producto o servicio de baja calidad, Insatisfacción del cliente, " + 
    "Incumplimiento de requisitos, Gestión deficiente de riesgos y problemas, Uso ineficiente de recursos, Falta de innovación, Impacto limitado y documentación incompleta. "+
    "Mientras que 10: Proyecto de mayor calidad. ej. Objetivos cumplidos con éxito, Producto o servicio de alta calidad, Alta satisfacción del cliente, Cumplimiento completo de requisitos, " + 
    "Gestión efectiva de riesgos y problemas, Uso eficiente de recursos, Innovación destacada, Impacto significativo y documentación exhaustiva. " +
    "escala: <fill>" +
    "[Los ejemplos se adaptarán a la industria], califica el nivel de calidad de los proyectos (en un dígito que puede ser expresado con hasta 2 decimales) en la industria"+ industria_consultor +"de la siguiente persona: " + 
    perfil_consultor + ". En relación con las nececsidades del siguiente proyecto: " + descripcion_proyecto 
 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const puntajeProyectos = await response.text();
    const valorPuntajeProyectos = parseFloat(puntajeProyectos.trim().replace(",", "."));
    return valorPuntajeProyectos;
  }

async function run_puntaje_habilidades(perfil_consultor, industria_consultor, descripcion_proyecto) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = "En una escala del 1 al 10, donde "  + 
    "1: Manejo bajo de herramientas en la industria. ej. Poca cantidad de software manejados, pocas certificaciones, etc "+
    "Mientras que 10: Alto manejo de herramientas en la industria. ej. Gran cantidad de conocimiento en herramientas, proyectos utilizando herramientas de la industria, etc " +
    "escala: <fill>" +
    "[Los ejemplos se adaptarán a la industria], califica el nivel de habilidades (en un dígito que puede ser expresado con hasta 2 decimales) en la industria"+ industria_consultor +"de la siguiente persona: " + 
    perfil_consultor + ". En relación con las nececsidades del siguiente proyecto: " + descripcion_proyecto 
 
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const nivelHabilidades = await response.text();
    const valorNivelHabilidades = parseFloat(nivelHabilidades.trim().replace(",", "."));
    return valorNivelHabilidades;
  }




module.exports = {
  run_puntaje_años_experiencia,
  run_puntaje_satisfacción,
  run_puntaje_proyectos,
  run_puntaje_habilidades
};