async function fetchDetails(location){
    const weatherDetails = await fetchWeather(location);

    // fetches gif from giffy only if fetch weather is successful
    if(!weatherDetails.isError){
        
        const gif = await fetchGif(weatherDetails.icon);
        return [weatherDetails,gif];
    }
    else{
        return weatherDetails;
        // back to the search page with popup message (error code)
    }

}

async function fetchWeather(location){
    const apiKey = "HNATZBSWKVA7UFH2PYCS2LW55";
    try{
            const response =await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`,{mode: 'cors'});
            if(!response.ok){
                const error = new Error("Bad Request");
                error.status = response.status;
                error.isError = true;
                throw error;
            }
            const weatherData = await response.json();
            const weatherObject = await cleanWeatherData(weatherData);
            return weatherObject;

            
    }
    catch(error){
        error.isError = true;
        return error;
    }

}

async function fetchGif(icon) {
    const apiKey = "g7N1PdjOtPO2ChXiLc7YmVNLb58VXcr4";

    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${icon}`,{mode: 'cors'});
        const gifData = await response.json();
        const address = gifData.data.images.original.url;
        return address;
    }
    catch(err){
        alert(err)
    }
}
function F2C(fahrenheit){
    let celsius = (((fahrenheit) - 32) * (5/9));
    celsius = Math.round(celsius*10);
    celsius = celsius / 10;
    return celsius;
}
function cleanWeatherData(data){
    console.log(data)
    const TODAY = data.days[0];
    
    const weatherObject = {
        location: data.address,
        time: data.currentConditions.datetime,
        date: TODAY.datetime,
        desc: data.description,
        condition: data.currentConditions.conditions,
        temp: F2C(data.currentConditions.temp),
        icon: data.currentConditions.icon,
    }

    return weatherObject;
}

export {fetchDetails};