
var latt;
var long;
// make a get request to url

fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=toronto,ca&units=imperial&APPID=a812584800c73c0eb9e12320bd5b45ea'
  )
    .then(function(response) {   //callback function
      return response.json(); //response converted to json
    })
    .then(function(data) {  //
      console.log(data);
      displayCrntWeather(data);
    });



   function displayCrntWeather(data){

    var cityName = data.name;
    console.log(cityName);
    var weatherSymbol = data.weather[0].icon;
    //Left TO DO: enter the icon.
    document.querySelector('#city').textContent="City Name : "+cityName + " " + weatherSymbol;
   
    var tempCity = data.main.temp;
    console.log(tempCity);
    
    document.querySelector('#temp').textContent="Temperature : "+tempCity+" °F";

    var humCity =data.main.humidity;
    document.querySelector('#humdty').textContent="Humidity : "+humCity +" %";
    console.log(humCity);

    var windCity = data.wind.speed;
    document.querySelector('#wind').textContent="Wind Speed : "+windCity +" MPH";
    console.log(windCity);

    var latt = data.coord.lat;
    var long = data.coord.lon;
    console.log( latt);
    console.log( long);
   } 

   //getting UV index and printing onto screen
    fetch(
        'http://api.openweathermap.org/data/2.5/uvi?lat=51.5085&lon=-0.1257&appid=a812584800c73c0eb9e12320bd5b45ea'
      )
        .then(function(response) {   //callback function
          return response.json(); //response converted to json
        })
        .then(function(uvdatah) {  //
          console.log(uvdatah);
          displayCrntUv(uvdatah);
        });  

  function displayCrntUv(uvdatah){
    var uvData = uvdatah.value;
    document.querySelector('#uv').textContent=uvData;
    console.log( latt); //to get the latt into the search
    console.log( long); //to get the latt into the search
   if(uvData<=2){
       document.getElementById("uv").style.backgroundColor="green";
   }else if(uvData>8){
    document.getElementById("uv").style.backgroundColor="red";
   } else {
       document.getElementById("uv").style.backgroundColor="yellow";
   }
  }

   //getting 5 day forecast

fetch(
    'https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=current,minutely,hourly,alerts&units=imperial&appid=a812584800c73c0eb9e12320bd5b45ea'
  )
    .then(function(response) {   //callback function
      return response.json(); //response converted to json
    })
    .then(function(forecastdata) {  //
      displayFrcstWeather(forecastdata);
    });
function displayFrcstWeather(forecastdata){
    console.log(forecastdata);
    
    for(i=1; i<6; i++){
        var dateOfForecast = forecastdata.daily[i].weather[0].icon;
        var temOfForecast =forecastdata.daily[i].temp.day;
        var humOfForecast =forecastdata.daily[i].humidity;
        console.log(dateOfForecast);
        console.log(temOfForecast);
        console.log(humOfForecast); 
    }
}
