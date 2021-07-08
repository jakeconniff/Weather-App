const key = '3fc1a8f23e237947120f14c693c7a875'
const weatherIcon = document.querySelector('#weather-image')
const cityName = document.querySelector('#city')

var lat
var long
var data
var weatherCode = '01d'
var scale = 'F'
var iconURL = `http://openweathermap.org/img/wn/${weatherCode}@2x.png`

function switchScales(){
    if(scale == 'F'){
        scale = 'C'
    }
    else{
        scale = 'F'
    }
    console.log(scale)
}

function celsiusUpdate(){

}

function farenheitUpdate(){

}

function updateWeather(){
    weatherIcon.setAttribute("src", iconURL)
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.latitude
            long = position.coords.longitude
            let apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&cnt=10&appid=${key}`
            fetch(apiURL).then(response=>{
                response.json().then(returnedVal=>{
                    console.log(returnedVal)
                    data = returnedVal
                })
            })
        })
    }
     let name = data.name
    // cityName.innerHTML = name
}

window.onload = ()=>{
    updateWeather()
    setInterval(updateWeather(), 60000)
}