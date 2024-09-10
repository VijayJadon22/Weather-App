Weather App
Overview
The Weather App is a web application that allows users to view current weather conditions for a specific city. The app retrieves weather data from an external API and displays it in a user-friendly interface. It also includes features for users to search for weather information by city name and view weather details based on their geolocation if permission is granted.

Features
Current Weather Display: Shows temperature, weather condition, precipitation, humidity, wind speed, pressure, and visibility.
City Search: Users can search for weather information by entering the name of a city.
Geolocation Support: The app can automatically fetch weather details based on the user's current location if they grant permission.
Responsive Design: The app is designed to be responsive and works on various screen sizes.
Technologies Used
HTML: Markup language for the structure of the web pages.
CSS: Styling language for the visual presentation of the web pages.
JavaScript: Programming language used for fetching weather data from the API and manipulating the DOM.
Weather API: WeatherAPI is used to fetch current weather data.

HTML Structure
The index.html file contains the structure of the web application, including the main container for displaying weather information and a search box.
CSS Styling
The style.css file is used for styling the application. It includes styles for layout, colors, and responsiveness.
JavaScript Functionality
getWeather(city, lat, long): Fetches weather data from the WeatherAPI. If latitude and longitude are provided, it uses those to get weather data; otherwise, it uses the city name.
getDayOfWeekFromDate(dateString): Converts a date string to a day of the week name.
gotlocation(position): Called if the user allows location access, retrieves weather based on the current location.
nolocation(): Called if location access is denied or unavailable, retrieves weather for a default location (Paris).
Event Listeners: Listens for page load to get the initial weather and for search button clicks to fetch weather for the entered city.