
// WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");

const card = document.querySelector(".card");

const apiKey = "154299918b2fb987badfaec61cce16b9";

weatherForm.addEventListener("submit",  async event => {

  // to prevent the form to be refresh after clicking the button
  event.preventDefault();

  const city = cityInput.value;
  if(city){
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInformation(weatherData);
    }
    catch(error) {
      console.error(error);
      displayError(error);
    }
  }else {
    displayError("Please enter a city..");
  }

});

 async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if(!response.ok) {
      throw new Error("Could not fetch Weather Data!");
    }
    return await response.json();
 }

 function displayWeatherInformation(data) {

  const {name: city,
        main: {temp,humidity}, 
        weather: [{description, id}],
        wind: {speed}} = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const windDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");
        
        cityDisplay.textContent = city;
// ° = Alt+ 0176
// Fahrenheit => temp (Kelvin) - 273.15 * 9 / 5 + 32
        tempDisplay.textContent = `${((temp - 273.15)).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = `${description}`;
        windDisplay.textContent = `Wind: ${speed}`;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        windDisplay.classList.add("windDisplay");
        weatherEmoji.classList.add("weatherEmoji");
        

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(windDisplay);
        card.appendChild(weatherEmoji);




  console.log(data);
 }

 function getWeatherEmoji(weatherId) {
  switch(true) {
    case (weatherId >= 200) && (weatherId < 300): 
      return "🌩️";
    case (weatherId >= 300) && (weatherId < 400): 
      return "🌧️";
    case (weatherId >= 500) && (weatherId < 600): 
      return "🌧️";
    case (weatherId >= 600) && (weatherId < 700): 
      return "❄️";
    case (weatherId >= 700) && (weatherId < 800): 
      return "🌫️";
    case (weatherId === 800): 
      return "☀️";
    case (weatherId >= 801) && (weatherId < 810): 
      return "☁️";
    default:
      return "❓";
  }
 }

 function displayError(message) {

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  // to reset the info on screen if there is any error is found
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
 }