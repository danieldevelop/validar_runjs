const message = document.querySelector('#message');

const validarRun = (run) => {
    // Despejamos (quitamos) los puntos y el guión del run
    let runSinPuntosYGuion = run.value.replace(/\./g, '');
    runSinPuntosYGuion = runSinPuntosYGuion.replace(/\-/g, '');

    let cuerpo = runSinPuntosYGuion.slice(0, -1); // Aislamos el cuerpo del run

    // Si no cumple con el mínimo de dígitos, mostramos un mensaje. Ejemplo 12.345.678-9 o 1.234.567-8
    if (cuerpo.length > 8) {
        // run.setCustomValidity('El run debe tener entre 7 y 8 dígitos');
        message.innerHTML = 'El run debe tener entre 7 y 8 dígitos';
        return; 
    }
    
    let digitoVerificador = runSinPuntosYGuion.slice(-1).toUpperCase(); // Aislamos el dígito verificador

    run.value = `${cuerpo}-${digitoVerificador}`; // Formateamos el run

    // Calculamos el dígito verificador
    let suma = 0;
    let multiplicador = 2;

    // Recorremos el cuerpo del run de derecha a izquierda
    for (let i = 1; i <= cuerpo.length; i++) {
        // Obtenemos el producto del dígito por el multiplicador y lo sumamos
        let indice = multiplicador * parseInt(runSinPuntosYGuion.charAt(cuerpo.length - i));
        suma += indice;

        // Incrementamos el multiplicador en 1, si corresponde (entre 2 y 7)
        multiplicador = (multiplicador === 7) ? multiplicador = 2 : multiplicador + 1;
    }

    let digitoEsperado = 11 - (suma % 11); // Calculamos el dígito verificador como el módulo de la suma por 11

    // Casos especiales para el dígito verificador (K y 0)
    digitoVerificador = (digitoVerificador === 'K') ? 10 : digitoVerificador === '0' ? 11 : parseInt(digitoVerificador);

    // Si el dígito verificador no coincide, mostramos un mensaje
    if (digitoEsperado !== digitoVerificador) {
        message.innerHTML = 'El run ingresado no es válido';
        message.classList.add('text-danger');
        return;
    }

    // El setCustomValidity() es función de HTML5 que permite definir un mensaje de error personalizado para un campo de entrada.
    // run.setCustomValidity('El run Ingresado es correcto'); 
    message.innerHTML = 'El run es correcto';
    message.classList.remove('text-danger');
    message.classList.add('text-success');
};