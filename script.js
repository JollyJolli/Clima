document.addEventListener('DOMContentLoaded', function() {
    const weatherDiv = document.getElementById('weather');

    // Función para obtener la ubicación del usuario y mostrar la temperatura actual
    function getLocationAndWeather() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeatherByLocation, handleError);
        } else {
            weatherDiv.textContent = 'Geolocalización no soportada por tu navegador.';
        }
    }

    // Función para obtener y mostrar la temperatura según la ubicación
    function getWeatherByLocation(position) {
        const { latitude, longitude } = position.coords;
        const url = `https://wttr.in/${latitude},${longitude}?format=j1&lang=es`; // URL con formato j1 y lang=es

        fetch(url)
            .then(response => response.json())
            .then(weatherData => {
                const temperature = `${weatherData.current_condition[0].temp_C} °C`; // Obtener temperatura en Celsius
                weatherDiv.textContent = temperature; // Mostrar solo los grados Celsius

                // Agregar evento click para mostrar información detallada
                weatherDiv.addEventListener('click', () => {
                    showDetailedWeather(weatherData.current_condition[0]);
                });
            })
            .catch(error => {
                console.error('Error al obtener la temperatura:', error);
                weatherDiv.textContent = 'No se pudo obtener la temperatura.';
            });
    }

    // Función para mostrar información detallada del clima
    function showDetailedWeather(weatherData) {
        const detailedInfo = `
            Sensación térmica: ${weatherData.FeelsLikeC} °C
            Nubosidad: ${weatherData.cloudcover} %
            Humedad: ${weatherData.humidity} %
            Condiciones: ${weatherData.lang_es[0].value}
            Fecha y hora local: ${weatherData.localObsDateTime}
            Presión: ${weatherData.pressure} mb
            Precipitación: ${weatherData.precipMM} mm
            Índice UV: ${weatherData.uvIndex}
            Visibilidad: ${weatherData.visibility} km
            Código del tiempo: ${weatherData.weatherCode}
            Dirección del viento: ${weatherData.winddir16Point} (${weatherData.winddirDegree}°)
            Velocidad del viento: ${weatherData.windspeedKmph} km/h
        `;
        alert(detailedInfo); // Mostrar la información detallada en un cuadro de alerta
    }

    // Función para manejar errores en la geolocalización
    function handleError(error) {
        console.error('Error al obtener la ubicación:', error);
        weatherDiv.textContent = 'No se pudo obtener la ubicación para obtener la temperatura.';
    }

    // Solicitar la ubicación al cargar la página
    getLocationAndWeather();
});
