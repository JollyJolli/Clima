document.addEventListener('DOMContentLoaded', function() {
    const weatherDiv = document.getElementById('weather');

    // Función para obtener la ubicación del usuario
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherByLocation, handleError);
        } else {
            weatherDiv.textContent = 'Geolocalización no soportada por tu navegador.';
        }
    }

    // Función para obtener y mostrar la temperatura según la ubicación
    function getWeatherByLocation(position) {
        const { latitude, longitude } = position.coords;
        const url = `https://wttr.in/${latitude},${longitude}?format=%t`;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                weatherDiv.textContent = `${data.trim()} °C`; // Mostrar solo los grados Celsius
            })
            .catch(error => {
                console.error('Error al obtener la temperatura:', error);
                weatherDiv.textContent = 'No se pudo obtener la temperatura.';
            });
    }

    // Función para manejar errores en la geolocalización
    function handleError(error) {
        console.error('Error al obtener la ubicación:', error);
        weatherDiv.textContent = 'No se pudo obtener la ubicación para obtener la temperatura.';
    }

    // Solicitar la ubicación al cargar la página
    getLocation();
});
