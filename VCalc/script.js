const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".calc-button");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");

const opers = document.querySelectorAll(".oper");

const equals = document.querySelector(".equals");

let num1 , operation , num2;
let state = "num1";
let solved = false;

buttons.forEach(button => {
    if (!button.classList.contains("clear") && !button.classList.contains("backspace") && !button.classList.contains("equals") && !button.classList.contains("oper")) {
        button.addEventListener("click", () => {
            if (solved) {
                display.value = "";
                solved = false;
            }
            display.value += button.textContent;
        });
    }
});

clear.addEventListener("click", () => {
    display.value = "";
    state = "num1";
});

backspace.addEventListener("click", () => {
    display.value = display.value.slice(0, -1);
});

opers.forEach(button => {
    button.addEventListener("click", () => {
        if (!num1) {
            num1 = parseFloat(display.value);
        } else if (display.value !== "") {
            num2 = parseFloat(display.value);
            num1 = solve(num1, operation, num2);
        }
        operation = button.textContent;
        display.value = "";
    });
});

equals.addEventListener("click", () => {
    if (num1 !== undefined && operation && display.value !== "") {
        num2 = parseFloat(display.value);
        display.value = solve(num1, operation, num2);
        num1 = undefined;
        operation = undefined;
    }
});

function solve(num1, operation, num2) {
    let result;
    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "/":
            if (num1 == 0 || num2 == 0) {
                result = "Can't divide by 0!";
                solved = true;
                return result;
            }
            result = num1 / num2;
            break;
        case "*":
            result = num1 * num2;
            break;
    }
    if (result === undefined || isNaN(result)) result = "Error!";
    solved = true;
    return result;
}
