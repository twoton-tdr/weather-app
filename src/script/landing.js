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

    const loadIcon = document.createElement("span");
    loadIcon.classList.add("eos-icons--loading");
    form.appendChild(loadIcon);
    loadIcon.style.display = "none"

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
        loadIcon.style.display = "Block";
        const results = await fetchDetails(inputfield.value);
        loadIcon.style.display = "none";

        if(!results.isError){    
            createWeatherCard(...results);
        }
        else if(results.status == 400){
            inputfield.setCustomValidity("Address not found");
            inputfield.reportValidity();
        }
        else{
            alert("Something went wrong");
            createLanding();
        }
    }
    })

}


export {createLanding}