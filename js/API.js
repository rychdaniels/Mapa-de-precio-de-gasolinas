class API {

    async obtenerDatos() {
        //Esta variable sirve para mostrar cuantos resultados deseamos que nos muestre
        const total = 1000;
         
        // Obtener los datos desde la API
        const datos  = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
        
        // Retornar los datos como JSON
        const respuestaJSON = await datos.json();

        return {
            respuestaJSON
        } 

    }
}