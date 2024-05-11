const fs = require('fs').promises;
const path = require('path');



function obtenerJSON(url, proyectoID) {
  return fs.readFile(url, 'utf8')
    .then(jsonData => JSON.parse(jsonData))
    .then(data => {
      const proyecto = data.proyectos.find(proyectos => proyectos.Id_proyecto === proyectoID); // Filtra el proyecto con el ID especificado
      if (!proyecto) {
        throw new Error(`No se encontró ningún proyecto con el ID ${proyectoID}`);
      }
      return proyecto;
    })
    .catch(error => {
      console.error('Error al obtener el JSON:', error);
      throw error;
    });
}


module.exports = obtenerJSON;