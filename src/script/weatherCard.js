function createWeatherCard(weatherObject,gif) {
    console.log(weatherObject,gif)
    const content = document.querySelector(".content");
    content.innerHTML = ""; //clearing existing

    const card = document.createElement("div");
    card.classList.add("card");
    content.appendChild(card);

    const placeHolder = document.createElement("div");
    placeHolder.id = "place-holder";
    placeHolder.textContent = weatherObject.location;
    card.appendChild(placeHolder);

    const img = document.createElement("img");
    img.src = gif;
    img.alt = "";
    card.appendChild(img);

    const weatherDetails = document.createElement("div");
    weatherDetails.classList.add("weather-details");
    card.appendChild(weatherDetails);

    const conditionHolder = document.createElement("div");
    conditionHolder.id = "condition-holder";
    conditionHolder.textContent = weatherObject.condition;
    weatherDetails.appendChild(conditionHolder);

    const tempHolder = document.createElement("div");
    tempHolder.id = "temp-holder";
    tempHolder.textContent = weatherObject.temp+"°C";
    weatherDetails.appendChild(tempHolder);

    const descHolder = document.createElement("div");
    descHolder.id = "desc-holder";
    descHolder.textContent = weatherObject.desc;
    weatherDetails.appendChild(descHolder);
}

export {createWeatherCard}