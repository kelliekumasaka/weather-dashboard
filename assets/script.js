// defining all global variables
var today = moment().format('L'); 
var searchBtn = document.querySelector("#searchBtn");
var city = document.querySelector("#city");
var userCity = document.querySelector("#userCity");
var userTemp = document.querySelector("#temp")
var userWind = document.querySelector("#wind")
var userHumidity = document.querySelector("#humidity")
var userUv = document.querySelector("#uv")
var cityName;

userCity.textContent = userCity.innerHTML + " " + today;

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    cityName=city.value.trim();
    getCoordinates();
})

function getCoordinates(){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&APPID=cae8444643fe0b52a066739e6b318cbd';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.coord.lat
            var lon = data.coord.lon
            var officialCity = data.name
            userCity.textContent=officialCity + " " + today;
            var secondRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&units=imperial&APPID=cae8444643fe0b52a066739e6b318cbd'

            fetch(secondRequest)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    userTemp.textContent = "Temp: " + data.current.temp + "ºF";
                    userWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    userHumidity.textContent = "Humidity: " + data.current.humidity + "%";
                    userUv.textContent = "UV Index: " + data.current.uvi;
                });

        });
    
}

