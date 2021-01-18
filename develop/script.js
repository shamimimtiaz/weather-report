var latt;
var long;
//Get user input
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#cityname");

userFormEl.addEventListener("submit", function(event){
    
   event.preventDefault();
  
    // get value from input element
    var usrChnCity = nameInputEl.value.trim();
    localStorage.setItem('name', usrChnCity);
    if (usrChnCity) {
        getUserCity(usrChnCity);
  
    } else {
      alert('Please enter a city name');
    }
});

function getUserCity(usrChnCity){
 
    var apiUrl ='https://api.openweathermap.org/data/2.5/weather?q='+usrChnCity+'&units=imperial&APPID=a812584800c73c0eb9e12320bd5b45ea';
    fetch(apiUrl)
        .then(function(response) {   //callback function
        return response.json(); //response converted to json
        })
        .then(function(data) {  //
        displayCrntWeather(data);
        });
    }

//displays the current weather
   function displayCrntWeather(data){
            var cityName = data.name;
            const image = document.createElement('img');
            var weatherSymbol = data.weather[0].main;
            var currImageSource = imageSource(weatherSymbol);
            image.src =currImageSource;
            document.querySelector('#currentIcon').appendChild(image);

            document.querySelector('#city').textContent=cityName + " " +"(" +moment().format('MM/DD/YYYY')+") ";
            var tempCity = data.main.temp;
            document.querySelector('#temp').textContent="Temperature : "+tempCity+" °F";

            var humCity =data.main.humidity;
            document.querySelector('#humdty').textContent="Humidity : "+humCity +" %";
        
            var windCity = data.wind.speed;
            document.querySelector('#wind').textContent="Wind Speed : "+windCity +" MPH";

            var latt = data.coord.lat;
            var long = data.coord.lon;
            
            getUvData(latt,long);
            displayFutWthr(latt,long);
   } 

   //getting UV index and printing onto screen
   function getUvData(latt,long) {
       var uvurl = 'https://api.openweathermap.org/data/2.5/uvi?lat='+latt+'&lon='+long+'&appid=a812584800c73c0eb9e12320bd5b45ea';
        fetch(uvurl)
            .then(function(response) {   
            return response.json(); 
            })
            .then(function(uvdatah) {  
            displayCrntUv(uvdatah);
            });  
        }

  function displayCrntUv(uvdatah){
    var uvData = uvdatah.value;
    document.querySelector('#uv').textContent=uvData;
   if(uvData<=2){
       document.getElementById("uv").style.backgroundColor="green";
   }else if(uvData>8){
    document.getElementById("uv").style.backgroundColor="red";
   } else {
       document.getElementById("uv").style.backgroundColor="yellow";
   }
  }

   //getting 5 day forecast
function displayFutWthr(latt,long){
    var fturl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latt+'&lon='+long+'&exclude=current,minutely,hourly,alerts&units=imperial&appid=a812584800c73c0eb9e12320bd5b45ea';
    fetch(fturl)
    .then(function(response) {   
      return response.json(); 
    })
    .then(function(forecastdata) {  
      displayFrcstWeather(forecastdata);
    }); 
}
    function displayFrcstWeather(forecastdata){
        document.querySelector('#day1Date').textContent=moment().add(1, 'days').format('L');
        document.querySelector('#day1Temp').textContent="Temp: "+forecastdata.daily[1].temp.day+" °F";
        document.querySelector('#day1Hum').textContent="Humidity: "+forecastdata.daily[1].humidity+" %";

        document.querySelector('#day2Date').textContent=moment().add(2, 'days').format('L');
        document.querySelector('#day2Temp').textContent="Temp: "+forecastdata.daily[2].temp.day+" °F";
        document.querySelector('#day2Hum').textContent="Humidity: "+forecastdata.daily[2].humidity+" %";

        document.querySelector('#day3Date').textContent=moment().add(3, 'days').format('L');
        document.querySelector('#day3Temp').textContent="Temp: "+forecastdata.daily[3].temp.day+" °F";
        document.querySelector('#day3Hum').textContent="Humidity: "+forecastdata.daily[3].humidity+" %";

        document.querySelector('#day4Date').textContent=moment().add(4, 'days').format('L');
        document.querySelector('#day4Temp').textContent="Temp: "+forecastdata.daily[4].temp.day+" °F";
        document.querySelector('#day4Hum').textContent="Humidity: "+forecastdata.daily[4].humidity+" %";

        document.querySelector('#day5Date').textContent=moment().add(5, 'days').format('L');
        document.querySelector('#day5Temp').textContent="Temp: "+forecastdata.daily[5].temp.day+" °F";
        document.querySelector('#day5Hum').textContent="Humidity: "+forecastdata.daily[5].humidity+" %";
        
        const image1 = document.createElement('img');
        const image2 = document.createElement('img');
        const image3 = document.createElement('img');
        const image4 = document.createElement('img');
        const image5 = document.createElement('img');
       
        iconDescription1 = forecastdata.daily[1].weather[0].main;
        var image1Source = imageSource(iconDescription1);
        image1.src =image1Source;
        document.querySelector('#day1Icon').appendChild(image1);
       
        iconDescription2 = forecastdata.daily[2].weather[0].main;
        var image2Source = imageSource(iconDescription2);
        image2.src =image2Source;
        document.querySelector('#day2Icon').appendChild(image2);
        
        iconDescription3 = forecastdata.daily[3].weather[0].main;
        var image3Source = imageSource(iconDescription3);
        image3.src =image3Source;
        document.querySelector('#day3Icon').appendChild(image3);

        iconDescription4 = forecastdata.daily[4].weather[0].main;
        var image4Source = imageSource(iconDescription4);
        image4.src =image4Source;
        document.querySelector('#day4Icon').appendChild(image4);

        iconDescription5 = forecastdata.daily[5].weather[0].main;
        var image5Source = imageSource(iconDescription5);
        image5.src =image5Source;
        document.querySelector('#day5Icon').appendChild(image5);
        
    }
function imageSource(iconDescription){
    if(iconDescription==="Clouds"){
        return "./develop/images/03d@2x.png";
    }else if(iconDescription==="Clear"){
        return "./develop/images/01d@2x.png";
    }else if(iconDescription==="Rain"){
        return "./develop/images/10d@2x.png";
    }else if(iconDescription==="Thunderstorm"){
        return "./develop/images/11d@2x.png";
    }else if(iconDescription==="Snow"){
        return "./develop/images/13d@2x.png";
    }else {return "./develop/images/50d@2x.png"}
   
}

localStorage.setItem ('name', getUserCity );
