import { fetchDetails } from "./script/api";

// fetchDetails("london");

const button = document.querySelector("#sub");
const inputfield = document.querySelector("#loc");



inputfield.addEventListener("input",()=>{
    if(inputfield.value){
        inputfield.setCustomValidity("");
    }
})
button.addEventListener("click",()=>{

    if(inputfield.value == ""){
        inputfield.setCustomValidity("Enter a valid address!");
        inputfield.reportValidity();
    }
    else{
        fetchDetails(inputfield.value)
        inputfield.setCustomValidity("");
    }
})
