import { fetchDetails } from "./api";
import { createWeatherCard } from "./weatherCard";

async function createLanding() {

    const content = document.querySelector(".content");
    content.innerHTML = ""; //clearing existing contents

    
    const heading = document.createElement("div");
    heading.classList.add("heading");
    heading.textContent = "Weather App";
    content.appendChild(heading);

    
    const form = document.createElement("form");
    form.noValidate = true;
    content.appendChild(form);


    const searchBox = document.createElement("div");
    searchBox.classList.add("search-box");
    form.appendChild(searchBox);

    
    const inputfield = document.createElement("input");
    inputfield.type = "text";
    inputfield.id = "loc";
    inputfield.required = true;
    inputfield.placeholder = "Enter location";
    searchBox.appendChild(inputfield);

    
    const button = document.createElement("button");
    button.type = "button";
    button.id = "sub";
    searchBox.appendChild(button);

    
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("fluent--search-12-filled");
    button.appendChild(iconSpan);

    inputfield.addEventListener("input",()=>{
    if(inputfield.value){
        inputfield.setCustomValidity("");
    }
    })
    button.addEventListener("click",async ()=>{

    if(inputfield.value == ""){
        inputfield.setCustomValidity("Enter a valid address!");
        inputfield.reportValidity();
    }
    else{
        console.log("fetching")
        const results = await fetchDetails(inputfield.value);
        console.log(results)
        if(results.length){
            createWeatherCard(...results);
        }
        else{
            console.log("try again")
        }
        inputfield.setCustomValidity("");
    }

    
    })

}


export {createLanding}