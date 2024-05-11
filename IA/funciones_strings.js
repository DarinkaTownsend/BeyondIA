function obtenerValoresDecimales(texto) {
    // Inicializar una lista para almacenar los valores decimales
    const valoresDecimales = [];

    // Remover los paréntesis de inicio y final del texto
    const textoLimpio = texto.slice(1, -1);

    // Inicializar un índice para recorrer el texto
    let indiceInicio = 0;

    // Iterar sobre cada carácter del texto
    for (let i = 0; i < textoLimpio.length; i++) {
        // Si encontramos un punto y coma o hemos llegado al final del texto
        if (textoLimpio[i] === ';' || i === textoLimpio.length - 1) {
            // Extraer el valor desde el índice donde comenzó la parte hasta el índice actual
            const parte = textoLimpio.slice(indiceInicio, i + 1);
            // Convertir la parte a decimal y agregarla a la lista de valores decimales
            const valorDecimal = parseFloat(parte.trim().replace(",", "."));
            valoresDecimales.push(valorDecimal);
            // Actualizar el índice de inicio para la próxima parte
            indiceInicio = i + 1;
        }
    }

    // Devolver la lista de valores decimales
    return valoresDecimales;
}

module.exports = obtenerValoresDecimales;