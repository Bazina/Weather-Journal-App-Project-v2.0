/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "e96de8cd3cbefa2956325873b44a58e2";

/* Icons for the outputs */
const logos = document.querySelectorAll('.logo');

// User entries
const date = document.getElementById("date");
const deg = document.getElementById("temp");
const feel = document.getElementById("content");
let skycons = new Skycons({"color": "#F2921D"});
skycons.set("icon", 'clear-day');
skycons.play();

/* Create a new date instance dynamically with JS
* One was added beacause getMonth return months from 0 to 11
*/
let d = new Date();
let newDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

// Button to click on to run the server
const produce = document.getElementById("generate");
produce.addEventListener("click", geneData);

function geneData() {
  // User entries
  const userFeelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  const valid = document.getElementById("valid");
  const hide = document.getElementById("entryHolder");

  apiWeather(baseURL, zip, apiKey)
  // Post data to server and hide the shown data
    .then(data => {
      hide.style.visibility = "visible"
      postData("/add", {date: newDate, temp: data.main.temp, content: userFeelings});
  })
  // Update UI data
    .then(() =>{
      updateUI()
    })
  // Validate the zip code
    .catch(() => {
      if (zip === ""){
        valid.innerHTML = "Enter a zip code";
        hide.style.visibility = "hidden";
      } else {
        valid.innerHTML = "Please search for a US city 😩";
        hide.style.visibility = "hidden";
      }
    })
    valid.innerHTML = "";
};

// Get request data from API
const apiWeather = async(baseURL, zip, apiKey) => {
    try { // Template literals
      const res = await fetch(
        `${baseURL}${zip}&appid=${apiKey}`
      );
      // Save data in res as json
      const data = res.json();
      console.log(data);
      return data;
    } catch(error) {
        console.log(error);
    }
};

// Post data to server endpoint (projectData)
const postData = async(url = "", data = {}) => {
  const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
  });
  try { // Save the data as json
      const enrtyData = await res.json();
      console.log(enrtyData);
      return (enrtyData);
  } catch(error) {
      console.log("Error", error);
  }
};

// Update UI
const updateUI = async (url) => {
  // Get the posted data from the server
  const req = await fetch('/all');
  try {
    const result = await req.json();
    // Update HTML elements with the proper data
    date.innerHTML = `${result.date}`;
    deg.innerHTML = `${result.temperature}&#8451;`;
    feel.innerHTML = `${result.feelings}`;
    if (result.temperature < 10){
      skycons.color = "#BFCDD9";
      skycons.set("icon", 'snow');
      skycons.play();
    } else if (result.temperature < 20){
      skycons.color = "#368ABF";
      skycons.set("icon", 'rain');
      skycons.play();
    } else if (result.temperature < 25){
      skycons.color = "#7C92A6";
      skycons.set("icon", 'cloudy');
      skycons.play();
    } else {
      skycons.color = "#7C92A6";
      skycons.set("icon", 'clear-day');
      skycons.play();
    }
    // Put icons before the entries
    logos.forEach(logo => {
      logo.style.visibility = "visible"
    });
    console.log(result);
  } catch (error) {
    console.log("Error", error);
  }
};

// Get data from server
const getData = async(url = "") => {
  const res = await fetch(url);
  try {
      const data = await res.json();
      console.log(data);
  } catch {
      console.log("Error", error);
  }
};