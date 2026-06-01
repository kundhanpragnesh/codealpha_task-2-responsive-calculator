const display = document.getElementById("display");
const previousOperation = document.getElementById("previousOperation");

function appendValue(value){

    if(display.value === "Error"){
        display.value = "";
    }

    display.value += value;

    adjustFontSize();
}

function clearAll(){
    display.value = "";
    previousOperation.innerText = "";
    adjustFontSize();
}

function backspace(){

    if(display.value === "Error"){
        display.value = "";
        return;
    }

    display.value = display.value.slice(0,-1);

    adjustFontSize();
}

function calculate(){

    try{

        let expression = display.value;

        if(expression.trim() === ""){
            return;
        }

        previousOperation.innerText = expression + " =";

        let result = eval(expression);

        if(result === Infinity || result === -Infinity){
            display.value = "Error";
            return;
        }

        display.value = result;

        adjustFontSize();

    }catch(error){

        display.value = "Error";

    }
}

function adjustFontSize(){

    const length = display.value.length;

    display.classList.remove("small-text");
    display.classList.remove("smaller-text");

    if(length > 12){
        display.classList.add("small-text");
    }

    if(length > 20){
        display.classList.add("smaller-text");
    }
}

/* Keyboard Support */

document.addEventListener("keydown", (e)=>{

    const key = e.key;

    if(
        !isNaN(key) ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ){
        appendValue(key);
    }

    else if(key === "Enter"){
        calculate();
    }

    else if(key === "Backspace"){
        backspace();
    }

    else if(key === "Escape"){
        clearAll();
    }

});