// Con est intruccion logramos que se muestre el mapa en el HTML
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
})

// Habilitar busqueda de establecimientos
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () =>{
    // buscador.value regresa exactamente el caracter que hemos presionado, y con 
    // length sabemos el tamaño de la cadena. Hasta que la busqueda tenga al menos 5 caracteres comenzara a buscar
    if (buscador.value.length > 5){
        // Buscar en la API
        ui.obtenerSugerencias(buscador.value);
    } else {
        // Si no hay nada en el buscador se volveran a mostrar todos los pines nuevamente
        ui.mostrarEstablecimientos();
    }
})