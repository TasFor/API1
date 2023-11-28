document.getElementById('weather-btn').addEventListener('click', function() {
    const address = document.getElementById('address-input').value;
    getCurrentWeather(address);
    getForecast(address);
  });
  
  function getCurrentWeather(address) {
    const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}&units=metric`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    // xhr.addEventListener("load",()=>{
    //     console.log(JSON.parse(xhr.responseText))
    // })
    xhr.onload = function() {
        if (xhr.status === 200) {
            const weatherData = xhr.response;
            const currentDate = new Date().toLocaleString();
            const temp = weatherData.main.temp.toFixed(2);
            const feelsLike = weatherData.main.feels_like.toFixed(2);
            const weatherDescription = weatherData.weather[0].description;
            const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
            
            document.getElementById('current-weather').innerHTML = `
              <div class="weather-entry">
                <div class="weather-date">${currentDate}</div>
                <div class="weather-icon"><img src="${iconUrl}" alt="${weatherDescription}"></div>
                <div class="weather-temperature">Aktualna Temperatura: ${temp}°C (Odczuwalna: ${feelsLike}°C)</div>
                <div class="weather-description">${weatherDescription}</div>
              </div>
            `;
      } else {
        document.getElementById('current-weather').textContent = 'Error fetching current weather.';
      }
    };
    xhr.send();
  }
  
function getForecast(address) {
    const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${apiKey}&units=metric`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = ''; 
        data.list.forEach(entry => {
        const dateTime = new Date(entry.dt_txt).toLocaleString();
        const temp = entry.main.temp.toFixed(2);
        const feelsLike = entry.main.feels_like.toFixed(2);
        const weatherDescription = entry.weather[0].description;
        const iconUrl = `https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`;
        
        forecastElement.innerHTML += `
          <div class="weather-entry">
            <div class="weather-date">${dateTime}</div>
            <div class="weather-icon"><img src="${iconUrl}" alt="${weatherDescription}"></div>
            <div class="weather-temperature">Temperatura: ${temp}°C (Odczuwalna: ${feelsLike}°C)</div>
            <div class="weather-description">${weatherDescription}</div>
          </div>
        `;
      });
    })
      .catch(() => {
        document.getElementById('forecast').textContent = 'Error fetching forecast.';
      });
  }
  