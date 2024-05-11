const puntajeIndustria = require('./puntaje_consultores/puntaje_industria');
const { run_puntaje_años_experiencia, run_puntaje_satisfacción, run_puntaje_proyectos ,run_puntaje_habilidades } = puntajeIndustria;
const puntajeIdioma = require('./puntaje_consultores/puntaje_idioma');
const { run_puntaje_experiencia_idiomas, run_puntaje_fluidez } = puntajeIdioma;
const puntajeHorario = require('./puntaje_consultores/puntaje_horario');
const { run_puntaje_zonaHoraria, run_puntaje_horasDisponibles } = puntajeHorario;


// coeficientes 
const run_nivel_industrias = require('./coeficientes/coeficientes_proyectos');
const run_nivel_idioma = require('./coeficientes/coeficientes_proyectos');
const run_nivel_disponibilidad = require('./coeficientes/coeficientes_proyectos');
const run_relevancia_categoria = require('./coeficientes/coeficiente_categoria');

//archivos
const fs = require('fs').promises;
const path = require('path');
const proyectosJSON = path.join(__dirname, '..', 'Datos', 'proyectos.json');
const consultoresJSON = path.join(__dirname, '..', 'Datos', 'consultores.json');
const proyectoID = 1; // Define el ID del proyecto que deseas obtener
const consultorID = 1; // Define el ID del consultor que deseas obtener
const obtenerJSON = require('./funciones/peticionesProyectos');
const obtenerConsultorJSON = require('./funciones/peticionesConsultores');


// Llama a la función dentro de otra función asíncrona o utiliza await en un contexto asíncrono
async function main(proyectoID, consultorID ) {

    // info coeficientes
    let descripcion_proyecto_coeficientes;
    
    obtenerJSON(proyectosJSON, proyectoID)
    .then(async data_proyecto => { // Agrega async aquí para poder usar await dentro del bloque then
      //info coeficientes
      const descripcion_proyecto_coeficientesJSON = data_proyecto;

      const descripcion_proyecto_coeficientes = JSON.stringify(descripcion_proyecto_coeficientesJSON).replace(/"/g, '');
      

      //Coeficientees
      const coeficientesIndustria = await run_nivel_industrias.run_nivel_industrias(descripcion_proyecto_coeficientesJSON);
      const coeficientesIdioma = await run_nivel_idioma.run_nivel_idioma(descripcion_proyecto_coeficientes);
      const coeficientesDisponibilidad = await run_nivel_disponibilidad.run_nivel_disponibilidad(descripcion_proyecto_coeficientes);
      const coeficientesCategoria = await run_relevancia_categoria.run_relevancia_categoria(descripcion_proyecto_coeficientes);

      //contextoIndustria
      const descripcion_proyecto_PuntajeindustriaJSON = {
        nombreProyecto: data_proyecto.nombre_proyecto,
        duracion: data_proyecto.Duracion,
        objetivo: data_proyecto.Objetivo,
        habilidadesPorObjetivo: data_proyecto.Habilidad_por_objetivo,
        experienciaNecesaria: data_proyecto.Experiencia_necesaria,
        certificacionesNecesarias: data_proyecto.Certificaciones_necesarias,
        precio: data_proyecto.Precio,
        tipo: data_proyecto.tipo,
        descripcion: data_proyecto.descripcion
      };

      const descripcion_proyecto_Puntajeindustria = JSON.stringify(descripcion_proyecto_PuntajeindustriaJSON);

      //contexto idioma
      const descripcion_idiomaJSON = {
        idiomasNecesarios: data_proyecto.Idiomas_necesarios
      };

      const descripcion_idioma = JSON.stringify(descripcion_idiomaJSON).replace(/"/g, '');

      //contexto horario
      const descripcion_proyecto_horarioJSON = {
        zonaHoraria: data_proyecto.Zona_horaria,
        disponibilidad: data_proyecto.Disponibilidad
      };

      const descripcion_proyecto_horario = JSON.stringify(descripcion_proyecto_horarioJSON);

      
        obtenerConsultorJSON(consultoresJSON, consultorID) 
        .then(async data_consultor => {
            // Datos consultor industria
            const { Area_de_interes, cant_trabajos, experiencia } = data_consultor;

            const perfil_consultor_puntajeIndustriaJSON = {
                Area_de_interes,
                cant_trabajos,
                experiencia
            };

            const perfil_consultor_puntajeIndustria = JSON.stringify(perfil_consultor_puntajeIndustriaJSON);

            const industria_consultorJSON = data_consultor.Area_de_interes;
            const industria_consultor = JSON.stringify(industria_consultorJSON).replace(/"/g, '');

            // datos consultor idiomas
            const { skills, idioma } = data_consultor;
            const perfil_consultor_idiomaJSON = {
                skills,
                idioma
            };
            const perfil_consultor_idioma = JSON.stringify(perfil_consultor_idiomaJSON).replace(/"/g, '');

            const idioma_consultorJSON = data_consultor.idioma.tipo;
            const idioma_consultor = JSON.stringify(idioma_consultorJSON).replace(/"/g, '');

            // datos consultor horario

            const perfil_consultor_horarioJSON = data_consultor.horario;  
            const perfil_consultor_horario = JSON.stringify(perfil_consultor_horarioJSON);   
            
            //Puntaje industria
            const puntajeAniosExperiencia = await run_puntaje_años_experiencia(perfil_consultor_puntajeIndustria, industria_consultor, descripcion_proyecto_Puntajeindustria );
            const puntajeSatisfaccion = await run_puntaje_satisfacción(perfil_consultor_puntajeIndustria, industria_consultor);
            const puntaje_proyectos = await run_puntaje_proyectos(perfil_consultor_puntajeIndustria, industria_consultor, descripcion_proyecto_Puntajeindustria);
            const puntaje_habilidades = await run_puntaje_habilidades(perfil_consultor_puntajeIndustria, industria_consultor, descripcion_proyecto_Puntajeindustria);

            //Puntaje Idioma
            const puntajeFluidezIdioma = await run_puntaje_fluidez(perfil_consultor_idioma, descripcion_proyecto_horario);
            let puntajeExperienciaIdioma = await run_puntaje_experiencia_idiomas(perfil_consultor_idioma, idioma_consultor, industria_consultor, descripcion_idioma);
            if (isNaN(puntajeExperienciaIdioma)) {
              puntajeExperienciaIdioma = 2;
            } 
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
            console.log("La compatibilidad (sobre 10) entre el consultor y el proyecto es de:", puntajeFinal + "/10");
            })
        .catch(error => {
            console.error('Error al obtener el otro JSON:', error);
            });
    })
    .catch(error => {
      console.error('Error al obtener el proyecto JSON:', error);
    });
  
    
    



    


  }

//main(proyectoID, consultorID );
module.exports = { main };

