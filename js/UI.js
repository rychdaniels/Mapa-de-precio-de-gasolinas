class UI {
    constructor() {

        // Instanciamos la API
        this.api = new API();

        // Crear los markers con layerGroup, son parte de la documentacion de leaflet
        this.markers = new L.LayerGroup();


        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
        // Inicializar y obtener la propiedad del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map);
        return map;

    }

    mostrarEstablecimientos() {
        this.api.obtenerDatos()
            .then(datos => {
                const resultado = datos.respuestaJSON.results;

                // Ejecutar la funcion para mostrar los pines en el mapa
                this.mostrarPines(resultado);
            })
    }

    mostrarPines(datos) {
        // clearLayers es parte de leaflet y sirve para quitar todos los marcadores del mapa
        this.markers.clearLayers();

        // Recorrer los establecimientos
        datos.forEach(dato => {
            // Usando destructuring para obtener los datos que nos interesan
            const  {latitude, longitude, calle, regular, premium } = dato;

            // Creamos el popup
            const opcionesPopUp = L.popup() //Funcion de leaflet
                    .setContent(`<p>Calle: ${calle}</p>
                                 <p> <b>Regular:</b> $ ${regular}</p>
                                 <p> <b>Premium:</b> $ ${premium}</p>
                    `)

            // Aqui comenzamos a agregar los pines
            const marker = new L.marker([
                // Para saber exactamente donde colocar el marcador
                parseFloat(latitude),
                parseFloat(longitude)

            ]).bindPopup(opcionesPopUp); //Aqui agregamos el Popup
            // Agregamos el marcador a la capa, hasta aqui no se veran
            // ya que hace fata agregarlos al mapa
            this.markers.addLayer(marker);
        })

        this.markers.addTo(this.mapa)
    }

    // Buscador de gasolinerias
    obtenerSugerencias(busqueda) {
        this.api.obtenerDatos()
            .then ( datos => {
                // Obtenemos los datos
                const resultados = datos.respuestaJSON.results;

                // Enviar el JSON y la busqueda para el filtado
                this.filtrarSugerencias(resultados, busqueda);
            })
    }

    filtrarSugerencias(resultado, busqueda){
        // Filtrar los resultados con ayuda de .filter
        // indexOf recorrera el resultado y buscara si alguna palabra coincide con la busqueda
        // Cuando termine retornara -1
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        
        // Mostrar los pines
        this.mostrarPines(filtro);
    }   
}