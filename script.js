const addBtn = {
    element: document.querySelector(".add"),
    active: false
};
const subtractBtn = {
    element: document.querySelector(".subtract"),
    active: false
};
const multiplyBtn = {
    element: document.querySelector(".multiply"),
    active: false
};
const divideBtn = {
    element: document.querySelector(".divide"),
    active: false
};

const equalsBtn = document.querySelector(".equals");
const percentBtn = document.querySelector(".percent");
const periodBtn = document.querySelector(".period");
const negativeBtn = document.querySelector(".negative");
const removeBtn = document.querySelector(".result-container");
const clear = document.querySelector(".AC");
const nums = document.querySelectorAll(".num");
const result = document.querySelector(".result-text");
const calculation = document.querySelector(".calculation-text");
const symbols = [addBtn, subtractBtn, multiplyBtn, divideBtn];

let firstCalc = "0";
let secondCalc = "";
let currentSymbol = "";

nums.forEach(element => {
    element.onclick = () => {
        if(currentSymbol == ""){
            if(firstCalc == "0" || firstCalc == "")
                firstCalc = element.textContent;
            else
                firstCalc += element.textContent;

            result.textContent = firstCalc;        
        }
        else {
            if(secondCalc == "" || secondCalc == "0")
                secondCalc = element.textContent;
            else
                secondCalc += element.textContent;

            if(secondCalc != "")
                result.textContent = secondCalc;
        }

        calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;
    }
});

clear.onclick = () => {
    result.textContent = "0";
    calculation.textContent = "";
    firstCalc = "0";
    secondCalc = "";
    currentSymbol = "";
    resetSymbols();
    changeColor();
};

symbols.forEach(element => {
    element.element.onclick = () => {
        if(secondCalc != "0" && secondCalc != ""){
            tempResult = equals();
            clear.onclick();
            firstCalc = tempResult;
        }

        currentSymbol = element.element.textContent;
        resetSymbols();
        element.active = true;
        changeColor();
        calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;
    }
});

equalsBtn.onclick = () => {
    equals();

    resetSymbols();
    changeColor();

};

percentBtn.onclick = () => {
    if(currentSymbol == ""){
        if(firstCalc != "0" && firstCalc != "")
            firstCalc = (parseFloat(firstCalc) / 100).toString();

        result.textContent = firstCalc;        
    }
    else {
        if(secondCalc != "" && secondCalc != "0")
            secondCalc = (parseFloat(secondCalc) / 100).toString();

        if(secondCalc != "")
            result.textContent = secondCalc;
    }
    calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;

}

periodBtn.onclick = () => {
    if(currentSymbol == ""){
        if(firstCalc[firstCalc.length - 1] != ".")
            firstCalc += periodBtn.textContent;

        result.textContent = firstCalc;        
    }
    else {
        if(secondCalc[firstCalc.length - 1] != ".")
            secondCalc += periodBtn.textContent;

        if(secondCalc != "")
            result.textContent = secondCalc;
    }

    calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;
};

negativeBtn.onclick = () => {
    if(currentSymbol == "" && firstCalc != "0" && firstCalc != ""){
        if(firstCalc[0] != "-")
            firstCalc = "-" + firstCalc;
        else
            firstCalc = firstCalc.slice(1);

        result.textContent = firstCalc;        
    }
    else if(secondCalc != "" && secondCalc != "0"){
        if(secondCalc[0] != "-")
            secondCalc = "-" + secondCalc;
        else
            secondCalc = secondCalc.slice(1);

        if(secondCalc != "")
            result.textContent = secondCalc;
    }

    calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;
};

removeBtn.onclick = () => {
    if(currentSymbol == "" && firstCalc != ""){
        firstCalc = firstCalc.slice(0, -1);

        if(firstCalc == "" || firstCalc == "-")
            firstCalc = "0";

        result.textContent = firstCalc;        
    }
    else if(secondCalc != ""){
        secondCalc = secondCalc.slice(0, -1);

        if(secondCalc == "" || secondCalc == "-")
            secondCalc = "0";

        if(secondCalc != "")
            result.textContent = secondCalc;
    }

    calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;
};



function changeColor() {
    symbols.forEach(element => {
        if(element.active){
            element.element.style.backgroundColor = "rgb(230, 230, 230)";
            element.element.style.color = "#e68600";
        }
        else{
            element.element.style.backgroundColor = null;
            element.element.style.color = null;
        }
    });
};

function resetSymbols() {
    symbols.forEach(element => {
        element.active = false;
    });
}



// Calculator Functions
function add(num1, num2) {
	return num1 + num2;
};

function subtract(num1, num2) {
	return num1 - num2;
};

function divide(num1, num2) {
    return num1 / num2;
}

function multiply(num1, num2) {
    return num1 * num2;
};

function equals() {
    if(currentSymbol != ""){
        if(secondCalc == "" || secondCalc == ".")
            secondCalc = "0";
        if(firstCalc == "" || firstCalc == ".")
            firstCalc = "0";
        calculation.textContent = firstCalc + " " + currentSymbol + " " + secondCalc;
    }
    switch (currentSymbol){
        case "+":
            result.textContent = add(parseFloat(firstCalc), parseFloat(secondCalc));
            break;
        case "-":
            result.textContent = subtract(parseFloat(firstCalc), parseFloat(secondCalc));
            break;
        case "x":
            result.textContent = multiply(parseFloat(firstCalc), parseFloat(secondCalc));
            break;
        case "÷":
            result.textContent = divide(parseFloat(firstCalc), parseFloat(secondCalc));
            break;
        default:
            result.textContent = firstCalc;
            break;
    }

    return result.textContent;
}


console.log(add);
console.log(subtract);
console.log(multiply);
console.log(divide);
console.log(result);
console.log(calculation);

