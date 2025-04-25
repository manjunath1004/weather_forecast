const API_KEY = 'bd91ad2900e285b007dd1d7e1ce828e4'; // Replace with your actual OpenWeather API key

// Function to fetch weather by user input (village/city)
function fetchWeatherByLocation() {
  const location = document.getElementById("location").value.trim();

  if (!location) {
    alert("Please enter a location!");
    return;
  }

  // Fetch weather data using OpenWeather API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert("Location not found. Please try again.");
        return;
      }

      const weatherInfo = data.weather[0];
      const mainInfo = data.main;
      const weatherLocation = `${data.name}, ${data.sys.country}`;

      document.getElementById("weather-location").innerText = `Location: ${weatherLocation}`;
      document.getElementById("weather-temperature").innerText = `Temperature: ${mainInfo.temp}°C`;
      document.getElementById("weather-description").innerText = `Description: ${weatherInfo.description}`;

      document.getElementById("weather-info").style.display = "block";
    })
    .catch(error => console.error("Error fetching weather:", error));
}

// Function to fetch weather by current geolocation
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Fetch weather data using OpenWeather API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = data.weather[0];
        const mainInfo = data.main;
        const weatherLocation = `${data.name}, ${data.sys.country}`;

        document.getElementById("weather-location").innerText = `Location: ${weatherLocation}`;
        document.getElementById("weather-temperature").innerText = `Temperature: ${mainInfo.temp}°C`;
        document.getElementById("weather-description").innerText = `Description: ${weatherInfo.description}`;

        document.getElementById("weather-info").style.display = "block";
      })
      .catch(error => console.error("Error fetching weather:", error));
  }

  function error() {
    alert("Unable to retrieve your location.");
  }
}
