import {countryList} from "../codes.js";
let countryCodes = Object.keys(countryList);
let dropdowns = document.querySelectorAll(".container-converter select");

dropdowns.forEach((select) => {
    // Loop through each country code
    countryCodes.forEach((code) => {
        // Create a new option element for each country code
        let option = document.createElement("option");
        option.value = code;
        option.innerText = code;

        //here we are basically just initialising the initial country codes for excahnge
        if(select.name === 'moneyfrom' && code==='USD'){
            option.selected = 'selected';
        }
        else if(select.name === 'moneyto' && code==='PKR'){
            option.selected = 'selected';
        }
        // Append the option to the current dropdown
        select.append(option);
    });

    //changing flag according to the country selected
    select.addEventListener('change',(evt) => {
        changeflag(evt.target);
    });
});

//this function will basically convert the flag on the dropdown menu according to the country code selected 
const changeflag = (event) => {
    let currenycode = event.value;
    let countryindex = countryList[currenycode];

    let newimage = `https://flagsapi.com/${countryindex}/flat/64.png`
    let image = event.parentElement.querySelector("img");
    image.src = newimage;
}

let convertbtn = document.querySelector("button");

//extracting the input value when the convert button is clicked
convertbtn.addEventListener('click',async (evt) => {
    evt.preventDefault();
    let amountvalue = document.querySelector(".amount input");
    if(amountvalue.value < 1 || amountvalue.value === "" ){
        amountvalue.value = 1;
        amountvalue.value = "1";
    }

    let countryTo = document.querySelector(".to select");
     let countryFrom = document.querySelector(".from select");
     
     const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${countryFrom.value.toLowerCase()}.json`);
     const responseData = await response.json();

     const rate = await responseData[countryFrom.value.toLowerCase()][countryTo.value.toLowerCase()];


     let totalvalue = amountvalue.value * rate;

     let rateExchange = document.querySelector(".js-rate");
     rateExchange.innerHTML = `${amountvalue.value} ${countryFrom.value} = ${(totalvalue).toFixed(4)} ${countryTo.value}`

});





  