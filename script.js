async function getWeather(city = "gwalior") {
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=9b9b9efe03064009a9350634240109&q=${city}&aqi=no`);
    console.log(response)
    if(!response.ok){
        alert("Inavlid city name");
        return;
    }
    response = await response.json();
    // console.log(response);
    const lastUpdatedString = response.current.last_updated;
    const dateString = lastUpdatedString.split(' ')[0]; // Extract the date part "YYYY-MM-DD"
    const dayName = getDayOfWeekFromDate(dateString);

    document.querySelector(".day").innerHTML="";
    document.querySelector(".day").innerHTML=dayName;
    document.querySelector(".date").innerHTML="";
    document.querySelector(".date").innerHTML=dateString;
    document.querySelector(".location").innerHTML="";
    document.querySelector(".location").innerHTML=`${response.location.name}, ${response.location.region}, ${response.location.country}`;

    // tempertaure details section
    let image=document.createElement("img");
    image.src = response.current.condition.icon;
    document.querySelector(".temp-img").innerHTML="";
    document.querySelector(".temp-img").append(image);

    document.querySelector(".temperature").innerHTML="";
    document.querySelector(".temperature").innerHTML=`${response.current.temp_c}°C`;
    document.querySelector(".day-temperatue").innerHTML="";
    document.querySelector(".day-temperatue").innerHTML=response.current.condition.text;
    
    document.querySelector(".precipitaion-percentage").innerHTML="";
    document.querySelector(".precipitaion-percentage").innerHTML=`${response.current.precip_in} in`;
    document.querySelector(".humidity-percentage").innerHTML="";
    document.querySelector(".humidity-percentage").innerHTML=`${response.current.humidity}%`;
    document.querySelector(".wind-speed").innerHTML="";
    document.querySelector(".wind-speed").innerHTML=`${response.current.wind_kph} Km/h`;
    document.querySelector(".pressure-intensity").innerHTML="";
    document.querySelector(".pressure-intensity").innerHTML=`${response.current.pressure_mb} mb`;
    document.querySelector(".visibility-range").innerHTML="";
    document.querySelector(".visibility-range").innerHTML=`${response.current.vis_km} km`;
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

document.querySelector(".search-button").addEventListener("click",()=>{
    let city=document.querySelector(".search").value.trim();
    getWeather(city);
})
getWeather();



