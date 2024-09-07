async function getWeather(city, lat = null, long = null) {
    let url;
    if (lat && long) {
        url =`http://api.weatherapi.com/v1/current.json?key=9b9b9efe03064009a9350634240109 &q=${lat},${long}&aqi=yes`;  /*if user allows access to location and we get the latitude and longitude values from gotloaction function then the url will calculate according to the lat and long values */
    } else {
        url =`http://api.weatherapi.com/v1/current.json?key=9b9b9efe03064009a9350634240109 &q=${city}&aqi=yes`;
        /*else the default city will be loaded which we have passed as paris in nolocation function as default*/
    }

    try {
        let response = await fetch(url);
        // console.log(response);
        if (!response.ok) {
            document.querySelector("#input-search").value="";
            alert("Inavlid city name");
            throw new Error("Invalid city name or other error");
        }

        response = await response.json();
        console.log(response);
        const lastUpdatedString = response.current.last_updated;
        const dateString = lastUpdatedString.split(' ')[0]; // Extract the date part "YYYY-MM-DD"
        const dayName = getDayOfWeekFromDate(dateString);

        document.querySelector(".day").innerHTML = "";
        document.querySelector(".day").innerHTML = dayName;
        document.querySelector(".date").innerHTML = "";
        document.querySelector(".date").innerHTML = dateString;
        document.querySelector(".location").innerHTML = "";
        document.querySelector(".location").innerHTML = `${response.location.name}, ${response.location.region}, ${response.location.country}`;

        // tempertaure details section
        let image = document.createElement("img");
        image.src = response.current.condition.icon;
        document.querySelector(".temp-img").innerHTML = "";
        document.querySelector(".temp-img").append(image);

        document.querySelector(".temperature").innerHTML = "";
        document.querySelector(".temperature").innerHTML = `${response.current.temp_c}°C`;
        document.querySelector(".day-temperatue").innerHTML = "";
        document.querySelector(".day-temperatue").innerHTML = response.current.condition.text;

        document.querySelector(".precipitaion-percentage").innerHTML = "";
        document.querySelector(".precipitaion-percentage").innerHTML = `${response.current.precip_in} in`;
        document.querySelector(".humidity-percentage").innerHTML = "";
        document.querySelector(".humidity-percentage").innerHTML = `${response.current.humidity}%`;
        document.querySelector(".wind-speed").innerHTML = "";
        document.querySelector(".wind-speed").innerHTML = `${response.current.wind_kph} Km/h`;
        document.querySelector(".pressure-intensity").innerHTML = "";
        document.querySelector(".pressure-intensity").innerHTML = `${response.current.pressure_mb} mb`;
        document.querySelector(".visibility-range").innerHTML = "";
        document.querySelector(".visibility-range").innerHTML = `${response.current.vis_km} km`;
    }catch(err){
        console.error(err);
    }
}

function getDayOfWeekFromDate(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Array of day names
    const daysOfWeek = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'
    ];

    // Get the day of the week from the Date object
    const dayIndex = date.getDay();

    // Return the name of the day
    return daysOfWeek[dayIndex];
}

/* function to access the location and get the latitude and longitude of the current location if user allows us otherwise it will display the default loaction */

async function gotlocation(position) {
    getWeather("paris",position.coords.latitude, position.coords.longitude);
}

function nolocation() {
    getWeather("paris");
}

window.addEventListener("load", async () => {
    navigator.geolocation.getCurrentPosition(gotlocation, nolocation); 
    /*as this getCurrentPosition(()=>{},()=>{}) aspects two call backs when if we get location and 2nd if it fails but we have passed the call backs as making separtae 2 functions that are getlocation, no location also the callback in the event listner will be of async type as it will take some time to get the location*/
})




document.querySelector(".search-button").addEventListener("click", () => {
    let city = document.querySelector(".search").value.trim();
    getWeather(city);
})




