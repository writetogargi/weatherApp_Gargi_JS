"use strict";
const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

///////////////////////my  8d5e966b6a2s8i9s //////////////////////
const getResultsByLatLong = async (lat, lon) => {
  console.log(lat, lon);
  const response = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`);
  const weather = await response.json();
  // console.log(weather);
  displayResults(weather);
}
const cur_loc = document.querySelector('.cur-loc');
cur_loc.addEventListener(
  'click',
  ()=>{
    if ("geolocation" in navigator) { 
      navigator.geolocation.getCurrentPosition(position => { 
          getResultsByLatLong(position.coords.latitude, position.coords.longitude)
      }); 
    }
    else { /* geolocation IS NOT available, handle it */ }
  },
  false
);
//////////////// 8d5e966b6a2s8i9s /////////////


function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}


function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then((response)=>{
      console.log(response)
      displayResults(response)});
}



function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  let wind_speed = document.querySelector('.wind .speed');
  wind_speed.innerText = weather.wind.speed;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}