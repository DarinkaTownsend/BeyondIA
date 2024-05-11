// puntajes consultores
const run_puntaje_años_experiencia = require('./puntaje_consultores/puntaje_industria');
const run_puntaje_satisfacción = require('./puntaje_consultores/puntaje_industria');
const run_puntaje_proyectos = require('./puntaje_consultores/puntaje_industria');
const run_puntaje_habilidades = require('./puntaje_consultores/puntaje_industria');

// 
const run_puntaje_fluidez = require('./puntaje_consultores/puntaje_idioma');
const run_puntaje_experiencia_idioma = require('./puntaje_consultores/puntaje_idioma');

const run_puntaje_zonaHoraria = require('./puntaje_consultores/puntaje_horario');
const run_puntaje_horasDisponibles = require('./puntaje_consultores/puntaje_horario');

// coeficientes 
const run_nivel_industria = require('./coeficientes_proyectos');
const run_nivel_idioma = require('./coeficientes_proyectos');
const run_nivel_disponibilidad = require('./coeficientes_proyectos');
const run_relevancia_categoria = require('./coeficiente_categoria');

// Llama a la función dentro de otra función asíncrona o utiliza await en un contexto asíncrono
async function main() {
    const coeficientesIndustria = await run_nivel_industria(descripcion_proyecto_coeficientes);
    const coeficientesIdioma = await run_nivel_idioma(descripcion_proyecto_coeficientes);
    const coeficientesDisponibilidad = await run_nivel_disponibilidad(descripcion_proyecto_coeficientes);
    const coeficientesCategoria = await run_relevancia_categoria(descripcion_proyecto_coeficientes);

    //Puntaje industria
    const puntajeAniosExperiencia = await run_puntaje_años_experiencia(perfil_consultor_puntajeIndustria, industria_consultor, descripcion_proyecto_Puntajeindustria );
    const puntajeSatisfaccion = await run_puntaje_satisfacción(perfil_consultor_puntajeIndustria, industria_consultor);
    const puntaje_proyectos = await run_puntaje_proyectos(perfil_consultor_puntajeIndustria, industria_consultor, descripcion_proyecto_Puntajeindustria);
    const puntaje_habilidades = await run_puntaje_habilidades(perfil_consultor_puntajeIndustria, industria_consultor, descripcion_proyecto_Puntajeindustria);

    //Puntaje Idioma
    const puntajeFluidezIdioma = await run_puntaje_zonaHoraria(perfil_consultor_idioma, descripcion_proyecto_horario);
    const puntajeExperienciaIdioma = await run_puntaje_experiencia_idioma(perfil_consultor_idioma, idioma_consultor, industria_consultor, descripcion_idioma);

    //Puntaje Horario
    const puntajeZonaHoraria = await run_puntaje_zonaHoraria(perfil_consultor_horario, descripcion_proyecto_horario);
    const puntajeHorasDisponibles = await run_puntaje_horasDisponibles(perfil_consultor_horario, descripcion_proyecto_horario);

    const coeficientesRelevanciaCategoria = {
        x: coeficientesCategoria[0], // El primer elemento es x
        y: coeficientesCategoria[1], // El segundo elemento es y
        z: coeficientesCategoria[2], // El segundo elemento es z
    }; 

    const coeficientes1 = {
        x: coeficientesIndustria[0], // El primer elemento es x
        y: coeficientesIndustria[1], // El segundo elemento es y
        z: coeficientesIndustria[2], // El tercer elemento es z
        w: coeficientesIndustria[3]  // El cuarto elemento es w
    };   

    industriaScore = (coeficientes1.x * puntajeAniosExperiencia) + (coeficientes1.y * puntajeSatisfaccion) + (coeficientes1.z * puntaje_proyectos) + (coeficientes1.w * puntaje_habilidades) 
    
    const coeficientes2 = {
        x: coeficientesIdioma[0], // El primer elemento es x
        y: coeficientesIdioma[1], // El segundo elemento es y
    }; 

    idiomaScore = (coeficientes2.x * puntajeFluidezIdioma) + (coeficientes2.y * puntajeExperienciaIdioma) 

    const coeficientes3 = {
        x: coeficientesDisponibilidad[0], // El primer elemento es x
        y: coeficientesDisponibilidad[1], // El segundo elemento es y
    }; 

    disponibilidadScore = (coeficientes3.x * puntajeZonaHoraria) + (coeficientes3.y * puntajeHorasDisponibles) 

    //PuntajeTotal
    puntajeFinal = (coeficientesRelevanciaCategoria.x * industriaScore) + (coeficientesRelevanciaCategoria.y * idiomaScore) + (coeficientesRelevanciaCategoria.z * disponibilidadScore) 
    console.log("El puntaje final es: ");
    console.log(disponibilidadScore);



  }

// info coeficientes
const descripcion_proyecto_coeficientes = "Descripción del Proyecto: Desarrollo de Plataforma de Logística para Optimización de Rutas" +
"\n\nAlcances: Crear una plataforma web y móvil que permita a las empresas de logística optimizar sus rutas de entrega, reduciendo costos y tiempos de entrega." +
"\n\nObjetivos: Implementar algoritmos de optimización de rutas, integrar sistemas de seguimiento de vehículos en tiempo real, y desarrollar una interfaz intuitiva para usuarios finales y administradores." +
"\n\nDuración Estimada: 6 meses" +
"\n\nPresupuesto: $200,000" +
"\n\nRequisitos del Proyecto: Experiencia en desarrollo de aplicaciones web y móviles, conocimientos en algoritmos de optimización, familiaridad con sistemas de seguimiento GPS." +
"\n\nPerfil de Equipo Ideal: Desarrolladores Full-stack con experiencia en logística y sistemas de seguimiento." +
"\n\nInformación del Cliente: Industria de Logística, Ubicación: Ciudad de México, México."

// info puntaje industria
const perfil_consultor_puntajeIndustria = "María Fernández. Experiencia en la Industria: Logística, Retail. Años de Experiencia: 9 años." +
"\n\nIdiomas: Español (nativo), Inglés (avanzado), Francés (intermedio). Zona Horaria:" +
"\n\nGMT-4 (hora estándar del Atlántico). Horas Disponibles: 9:00 am - 6:00 pm (hora local) . Certificaciones: PMP (Project Management Professional)" +
"\n\n, Six Sigma Green Belt, Certified Scrum Master." +
"\n\nDeveloper Skills: Python, Django, SQL, Power BI, SAP " 

const descripcion_proyecto_Puntajeindustria = "Descripción de la Industria: Desarrollo de Plataforma de Logística para Optimización de Rutas" +
"\n\nAlcances: Crear una plataforma web y móvil que permita a las empresas de logística optimizar sus rutas de entrega, reduciendo costos y tiempos de entrega." +
"\n\nObjetivos: Implementar algoritmos de optimización de rutas, integrar sistemas de seguimiento de vehículos en tiempo real, y desarrollar una interfaz intuitiva para usuarios finales y administradores." +
"\n\nRequisitos del Proyecto: Experiencia en desarrollo de aplicaciones web y móviles, conocimientos en algoritmos de optimización, familiaridad con sistemas de seguimiento GPS." +
"\n\nPerfil de Equipo Ideal: Desarrolladores Full-stack con experiencia en logística y sistemas de seguimiento." +
"\n\nInformación del Cliente: Industria de Logística"

industria_consultor = "Logística"

//info idioma
const perfil_consultor_idioma = "Industria: Logística, Retail." +
"\n\nIdiomas: Español (nativo), Inglés (Avanzado), Francés (intermedio)." +
"\n\nCertificaciones: PMP (Project Management Professional)" +
"\n\nDeveloper Skills: Python, Django, SQL, Power BI, SAP. Proyectos realizados en el idioma inglés: NULL" 

idioma_consultor = "Inglés"

const descripcion_idioma = "Descripción de la Industria: Desarrollo de Plataforma de Logística para Optimización de Rutas" +
"\n\nAlcances: Crear una plataforma web y móvil que permita a las empresas de logística optimizar sus rutas de entrega, reduciendo costos y tiempos de entrega." +
"\n\nObjetivos: Implementar algoritmos de optimización de rutas, integrar sistemas de seguimiento de vehículos en tiempo real, y desarrollar una interfaz intuitiva para usuarios finales y administradores." +
"\n\nNivel de inglés: Intermedio B2 con certificaciones"

//info horario
const perfil_consultor_horario = "Industria: Logística, Retail." +
"\n\nZona Horaria: GMT-4 (hora estándar del Atlántico). Disponibilidad: Lunes a Viernes de 11am a 3pm ."

const descripcion_proyecto_horario = "Descripción de la Industria: Desarrollo de Plataforma de Logística para Optimización de Rutas" +
"\n\nZona Horaria: GMT-4 (hora estándar del Atlántico). Horas Disponibles: 9:00 am - 6:00 pm (hora local) ." +
"\n\nDisponibilidad: Lunes a Viernes de 9am a 6pm."

  
// Llama a la función main para iniciar el proceso
main();

