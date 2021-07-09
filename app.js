const key = '3fc1a8f23e237947120f14c693c7a875'
const weatherIcon = document.querySelector('#weather-image')
const cityName = document.querySelector('#city')
const scaleButton = document.querySelector('#temp-scale')
const tempRegion = document.querySelector('#temp')
const type = document.querySelector('#weather-type')

var lat
var long
var apiURL
var data
var weatherCode = '01d'
var scale = 'imperial'
var iconURL = `http://openweathermap.org/img/wn/${weatherCode}@2x.png`

function switchScales(){
    if(scale == 'metric'){
        scaleButton.innerHTML = 'Switch to Celsius'
        scale = 'imperial'
        updateWeather()
    }
    else{
        scaleButton.innerHTML = 'Switch to Fahrenheit'
        scale = 'metric'
        updateWeather()
    }
    console.log('Scale: '+ scale)
}

function celsiusUpdate(){
    tempRegion.innerHTML = data.main.temp + ' C'
}

function fahrenheitUpdate(){
    tempRegion.innerHTML = data.main.temp + ' F'
}

async function updateWeather(){
    weatherIcon.setAttribute("src", iconURL)
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async position=>{
            lat = position.coords.latitude
            long = position.coords.longitude
            apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&cnt=10&units=${scale}&appid=${key}`         
            data = await apiFetch(apiURL)
            cityName.innerHTML = data.name
            type.innerHTML = data.weather[0].main
            if(scale == 'metric') celsiusUpdate()
            else fahrenheitUpdate()
            weatherCode = data.weather[0].icon
            iconURL = `http://openweathermap.org/img/wn/${weatherCode}@2x.png`
            weatherIcon.setAttribute('src', iconURL)
        })
    }
}
async function apiFetch(url){
    const response = await fetch(url)
    return await response.json()
}

window.onload = ()=>{
    updateWeather()
    setInterval(updateWeather(), 60000)
}