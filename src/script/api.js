async function fetchDetails(location){
    const weatherDetails = await fetchWeather(location);

    if(!weatherDetails.isError){
        console.log(weatherDetails)
        const gif = await fetchGif(weatherDetails.icon);
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
        return error;
    }

}

async function fetchGif(icon) {
    const apiKey = "g7N1PdjOtPO2ChXiLc7YmVNLb58VXcr4";

    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${icon}`,{mode: 'cors'});
        const gifData = await response.json();
        const address = gifData.data.images.original.url;
        console.log(address);
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

    const TODAY = data.days[0];
    
    const weatherObject = {
        location: data.resolvedAddress,
        time: data.currentConditions.datetime,
        date: TODAY.datetime,
        desc: data.description,
        temp: F2C(data.currentConditions.temp),
        icon: data.currentConditions.icon,
    }

    return weatherObject;
}

export {fetchDetails};