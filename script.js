const apiKey = '16709ad92a434762f91069cd475c0fab'; 
const searchBtn = document.getElementById('searchBtn');  
const locateBtn = document.getElementById('locateBtn');  
const weatherResult = document.getElementById('weatherResult');  

searchBtn.addEventListener('click', () => {  
    const city = document.getElementById('cityInput').value;  
    if (city) {  
        getWeatherByCity(city);  
    }  
});  

locateBtn.addEventListener('click', () => {  
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(position => {  
            const lat = position.coords.latitude;  
            const lon = position.coords.longitude;  
            getWeatherByLocation(lat, lon);  
        });  
    } else {  
        alert("Geolocation không khả dụng.");  
    }  
});  

function getWeatherByCity(city) {  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)  
        .then(response => response.json())  
        .then(data => displayWeather(data))  
        .catch(() => alert("Không tìm thấy thông tin thời tiết."));  
}  

function getWeatherByLocation(lat, lon) {  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)  
        .then(response => response.json())  
        .then(data => displayWeather(data))  
        .catch(() => alert("Không tìm thấy thông tin thời tiết."));  
}  

function displayWeather(data) {  
    if (data.cod === 200) {  
        const { name, sys } = data;  
        const { temp, feels_like, humidity } = data.main;  
        const { description, icon } = data.weather[0];  

        weatherResult.innerHTML = `  
            <div class="weather-icon">  
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">  
            </div>  
            <div class="temp">${temp}°C</div>  
            <div class="description">${description}</div>  
            <div class="location">🌐 ${name}, ${sys.country}</div>  
            <div class="feels-like">🌡️ ${feels_like}°C Feels like</div>  
            <div class="humidity">💧 ${humidity}% Humidity</div>  
        `;  
        weatherResult.style.display = 'block'; 
    } else {  
        console.error(data); 

        weatherResult.innerHTML = "";  
        weatherResult.style.display = 'none';  
        alert("Không tìm thấy thông tin thời tiết cho thành phố này.");  
    }  
}
