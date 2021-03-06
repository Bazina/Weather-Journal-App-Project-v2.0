# Weather Journal App Project

## Table of Contents

- [Used-Languages](#Used-Languages)
- [Instructions](#instructions)
- [Operate](#operate)
- [ES6](#es6)
- [Structure](#structure)

### Used-Languages

- HTML
- CSS
- Javascript (Vanilla)
- ES6

### Instructions

This project was about working with Web APIs and asynchronous code, creating a web app that uses OpenWeatherMap API to get weather based on user's location, and dynamically update UI.

### Operate

- Firstly, write these commands in terminal to install packages:

1. install express `npm install express`.
2. install cors `npm install cors`.
3. install body-parser `npm install body-parser`.

- Secondly, start the server, write in terminal:

- Server is the name of the file used for server, can be anything `node server.js`.

### ES6

I used many ES6 methods
- `arrow functions`
- `const & let` declaration
- `IntersectionObserver`

These thing are working with the latest browsers except IE 11, IE 10.

### Structure
To get the project up and running I followed these steps:

- Installed `node` and `packages`, and included in my `server.js` file.
- Added `POST` and `GET` routes to oost & get data.
- Got API credentials from OpenWeatherMap page.
- Created `async` functions to `fetch` weather data from `API` and store it on my local server. 
- Built a function that update `UI` dynamically.
- Validate zip code.
- UI/UX for good experience.