// defining all global variables
var today = moment().format('L'); 
var searchBtn = document.querySelector("#searchBtn");
var city = document.querySelector("#city");
var userCity = document.querySelector("#userCity");
var userIcon = document.querySelector("#icon")
var userTemp = document.querySelector("#temp")
var userWind = document.querySelector("#wind")
var userHumidity = document.querySelector("#humidity")
var userUv = document.querySelector("#uv")
var cityName;
var h5El = document.getElementsByTagName("h5")
var iconEl = document.querySelectorAll(".cardIcon")
var humidityEl = document.querySelectorAll(".cardHumidity")
var tempEl = document.querySelectorAll(".cardTemp")
var windEl = document.querySelectorAll(".cardWind")

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
            if(response===404||response===400){
                alert("Please enter valid city")
            }
            return response.json();
        })
        .then(function (data) {
            var lat = data.coord.lat
            var lon = data.coord.lon
            var officialCity = data.name
            var nowIcon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
            userIcon.setAttribute("src", nowIcon);
            var cityTitle = officialCity + " " + today;
            var secondRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon +'&units=imperial&APPID=cae8444643fe0b52a066739e6b318cbd'

            fetch(secondRequest)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    userCity.textContent = cityTitle;
                    userTemp.textContent = "Temp: " + data.current.temp + "ºF";
                    userWind.textContent = "Wind: " + data.current.wind_speed + " MPH";
                    userHumidity.textContent = "Humidity: " + data.current.humidity + "%";
                    userUv.textContent = "UV Index: " + data.current.uvi;
                    for (let i = 0; i < h5El.length; i++) {
                        var cardDates = data.daily[i+1].dt;
                        var differentDates = moment(cardDates, "X").format("L");
                        h5El[i].textContent = differentDates;
                        var iconCard = 'http://openweathermap.org/img/wn/' + data.daily[i+1].weather[0].icon + '@2x.png';
                        iconEl[i].setAttribute("src", iconCard);
                        var humidCard = data.daily[i+1].humidity;
                        humidityEl[i].textContent = "Humidity: " + humidCard + "%";
                        var tempCard = data.daily[i+1].temp.max
                        tempEl[i].textContent = "Temp: " + tempCard + "ºF"
                        var windCard = data.daily[i+1].wind_speed;
                        windEl[i].textContent = "Wind: " + windCard + " MPH"
                    }
                });
        });
}