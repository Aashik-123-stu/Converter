const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select")
const btn  = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for (let select of dropdowns){
   for(currcode in countryList){
    let newOption = document.createElement("option")
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name === "From" && currcode === "USD" ){
        newOption.selected = "selected";
    }else if (select.name === "to" && currcode === "INR" ){
         newOption.selected = "selected";   
    }
    select.append(newOption);
   }

   select.addEventListener("change", (evt) =>{
      updatflag(evt.target);   //target means -> wherever change occur pass it to update
   })
}

   const updateExchangerate = async ()=>{
    let amount = document.querySelector(".amount input");   // the input taken by user in amount class
    let amtVal = amount.value;
     if(amtVal == "" || amtVal<1){
        amtVal = 1;
        amount.value = "1";
     }
    const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;  // customize the url
    let response = await fetch(URL);
    let data = await response.json();  
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalamt = (amtVal * rate).toFixed(2);
    // data = API response JSON.
    // fromCurr.value.toLowerCase() = base currency (e.g., "usd").
    // toCurr.value.toLowerCase() = target currency (e.g., "inr").
    // data["usd"]["inr"] = 82.81 (rate of 1 USD to INR).

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamt} ${toCurr.value}`
    
}

const updatflag = (element) =>{    // the new selected element pass here via  target
    let currcode = element.value;
     let countryCode = countryList[currcode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");   // accesss kiya
     img.src= newSrc;
}

btn.addEventListener("click" , (evt) =>{
    evt.preventDefault();                  //  prevent default refresh pr any action on click to button 
    updateExchangerate();

})

window.addEventListener("load" ,()=>{
   updateExchangerate();
})

