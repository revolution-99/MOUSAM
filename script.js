let loc = document.getElementById("location");
let temp = document.getElementById("temperature");
let weather = document.getElementById("summary");
let icon = document.getElementById("icon");
let humid = document.getElementById("humidity");
let windSpeed = document.getElementById("wind");
let min_max = document.getElementById("min&max");
let feelsLike = document.getElementById("feels_like");
let time = document.getElementById("time");
let date = document.getElementById("date");
let week = document.getElementById("week");

const minsWithZeros = function (dt){
  return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

var today = new Date();

// Array of months 
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// Array of weeks
var weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const apiKey = "b4acd9fb9a65e10bfa74530906905140";

btn.addEventListener("click", function city(){
  let city1 = document.getElementById("searchBar").value;
  const mode = `http://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apiKey}`;
  fetch(mode).then(res => {
    return res.json();
  })
  .then(data => {
    console.log(data);
    let kelvin = 273;
    loc.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> Weather in ${data.name},${data.sys.country}`;
    temp.innerText = Math.floor(data.main.temp) - kelvin + "°";
    feelsLike.textContent = `Feels like: ${Math.floor(data.main.feels_like) - kelvin}°C`;
    weather.textContent = data.weather[0].main;
    humid.textContent = `Humidity: ${data.main.humidity} %`;
    windSpeed.textContent = `Wind Speed: ${Math.floor(3.6 * data.wind.speed)} km/h`;
    let icon1 = data.weather[0].icon;
    icon.src = `http://openweathermap.org/img/w/${icon1}.png`;
    time.innerHTML = `${today.getHours()}:${minsWithZeros(today)}`;
    date.innerHTML = `${today.getDate()}th ${month[today.getMonth()]} ${today.getFullYear()}`
    week.innerHTML = `${weeks[today.getDay()]}`
  })
  .catch(
    err => alert('You entered wrong city name')
  )
})
window.addEventListener("load" , () =>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      let longi = position.coords.longitude;
      let lati = position.coords.latitude;
      const mode = `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}`;
      fetch(mode).then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data);
            let kelvin = 273;
            loc.innerHTML = `<i class="fa fa-map-marker" aria-hidden="true"></i> Weather in ${data.name},${data.sys.country}`;
            temp.innerText = Math.floor(data.main.temp) - kelvin + "°";
            feelsLike.textContent = `Feels like: ${Math.floor(data.main.feels_like) - kelvin}°C`;
            weather.textContent = data.weather[0].main;
            humid.textContent = `Humidity: ${data.main.humidity} %`;
            windSpeed.textContent = `Wind Speed: ${Math.floor(3.6 * data.wind.speed)} km/h`;
            let icon1 = data.weather[0].icon;
            icon.src = `http://openweathermap.org/img/w/${icon1}.png`;
            time.innerHTML = `${today.getHours()}:${minsWithZeros(today)}`;
            date.innerHTML = `${today.getDate()}th ${month[today.getMonth()]} ${today.getFullYear()}`
            week.innerHTML = `${weeks[today.getDay()]}`
          })
    })
  }
})