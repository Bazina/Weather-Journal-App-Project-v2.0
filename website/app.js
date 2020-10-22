/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&appid=e96de8cd3cbefa2956325873b44a58e2";

/* Icons for the outputs */
const icons = document.querySelectorAll('.entry__icon');

/* Create a new date instance dynamically with JS
* One was added beacause getMonth return months from 0 to 11
*/
let d = new Date();
let newDate = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

// Have the button ready to generate responce on click
const generate = document.getElementById("generate");
generate.addEventListener("click", geneData);

function geneData(e) {
  // Prevent default action
  e.preventDefault();
  // Get user inputs
  const content = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  const valid = document.getElementById("valid");
  const hide = document.getElementById("entryHolder");
  getWeather(baseURL,zip,apiKey)
  // Post data to server
  // This snippet was inspired by "https://github.com/tem-nik/Weather-Journal-App"
  .then(data => {
    hide.style.visibility = "visible"
    postData("/add", {date: newDate, temp: data.main.temp, content});
  })
  // Update UI data, newData will be available after the post
  .then(newData => {
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
const getWeather = async(baseURL, zip, apiKey) => {
    try { // Template literals
      const res = await fetch(
        `${baseURL}${zip}${apiKey}`
      );
      // Save data in res as json
      const data = res.json();
      console.log(data);
      return data;
    } catch(error) {
        console.log(error);
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
      const newData = await res.json();
      console.log(newData);
      return (newData);
  } catch(error) {
      console.log("Error", error);
  }
};

const updateUI = async () => {
  // Get the posted data from the server
  const request = await fetch('/all');
  try {
    const showData = await request.json();
    // Put icons before the entries
    // This snippet was inspired by "https://github.com/tem-nik/Weather-Journal-App"
    icons.forEach(icon => icon.style.opacity = '1');
    // Update the html elements with the proper data
    document.getElementById('date').innerHTML = showData.date;
    document.getElementById('temp').innerHTML = `${showData.temperature}&#8451;`;
    document.getElementById('content').innerHTML = showData.feelings;
    console.log(showData);
  } catch (error) {
    console.log("error", error);
  }
};