var searchBtn = document.querySelector("#searchBtn");
var city = document.querySelector("#city")
var cityName

searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    cityName=city.value.trim();
    console.log(cityName)
})