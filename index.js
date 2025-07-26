const apiKey = 'a7bf94854c37c02ea569ed87541200f2';

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('City not found');
  }
  const data = await response.json();
  return data;
}

function displayWeather(data) {
  const temp = Math.round(data.main.temp - 273.15);
  const weatherDiv = document.getElementById('weather-display');
  weatherDiv.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Description: ${data.weather[0].description}</p>
  `;
}

function displayError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('fetch-weather').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
      displayError('Please enter a city name');
      return;
    }
    try {
      const data = await fetchWeatherData(city);
      displayWeather(data);
    } catch (error) {
      displayError(error.message);
    }
  });
});

module.exports = { fetchWeatherData, displayWeather, displayError };