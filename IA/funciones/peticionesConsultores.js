const fs = require('fs').promises;
const path = require('path');



function obtenerConsultorJSON(url, consultorID) {
  return fs.readFile(url, 'utf8')
    .then(jsonData => JSON.parse(jsonData))
    .then(data => {
      const consultor = data.consultores.find(consultores => consultores.Id_consultor === consultorID); // Filtra el proyecto con el ID especificado
      if (!consultor) {
        throw new Error(`No se encontró ningún proyecto con el ID ${consultorID}`);
      }
      return consultor;
    })
    .catch(error => {
      console.error('Error al obtener el JSON:', error);
      throw error;
    });
}


module.exports = obtenerConsultorJSON;
