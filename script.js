const input = document.querySelectorAll(".js-input");
const outsideInput = document.querySelectorAll(".js-inp");
const textInput = document.querySelectorAll(".js-text-inp");
const radio = document.querySelectorAll(".js-radio");
const clearButton = document.querySelector(".js-clear-button");
const submitButton = document.querySelector(".js-submit-button");
const error = document.querySelectorAll(".js-error");
const radioError = document.querySelector(".js-radio-error");

const empty = document.querySelector(".js-empty");
const complete = document.querySelector(".js-complete");

const formatter = new Intl.NumberFormat("en-US");
const validInput = [false, false, false];
let radioValid = false;

// Input Active

function inputActive() {
    for (let i = 0; i < input.length; i++) {
        input[i].addEventListener("focus", () => {
            outsideInput[i].style.borderColor = "hsl(61, 70%, 52%)";
            textInput[i].style.backgroundColor = "hsl(61, 70%, 52%)";
            textInput[i].style.color = "hsl(202, 55%, 16%)"
        });

        input[i].addEventListener("blur", () => {
            outsideInput[i].style.borderColor = "hsla(200, 24%, 40%, 0.8)";
            textInput[i].style.backgroundColor = "hsl(202, 86%, 94%)";
            textInput[i].style.color = "hsl(200, 26%, 54%)"
        });

        input[i].addEventListener("mouseover", () => {
            if (input[i] !== document.activeElement) {
                outsideInput[i].style.borderColor = "hsl(202, 55%, 16%)";
            }
        });

        input[i].addEventListener("mouseout", () => {
            if (input[i] !== document.activeElement) {
                outsideInput[i].style.borderColor = "hsla(200, 24%, 40%, 0.8)";
            }
        });
    }
}

// Radio Button Active

function radioButtonActive() {
    const options = document.querySelectorAll(".js-opt");

    for (let i = 0; i < radio.length; i++) {
        radio[i].addEventListener("change", () => {
            if (radio[i].checked) {
                options[i].style.borderColor = "hsl(61, 70%, 52%)";
                options[i].style.backgroundColor = "hsla(61, 70%, 52%, 0.1)";
                for (let j = 0; j < radio.length; j++) {
                    if (j !== i) {
                        options[j].style.borderColor = "hsl(200, 26%, 54%)";
                        options[j].style.backgroundColor = "hsl(0, 0%, 100%)";
                    }
                }
            }
        });

        if (!this.checked) {
            options[i].style.borderColor = "hsl(200, 26%, 54%)";
            options[i].style.backgroundColor = "hsl(0, 0%, 100%)";
        }
    }
}

// Clear Button

clearButton.addEventListener("click", () => {
    for (let i = 0; i < input.length; i++) {
        input[i].value = "";
        outsideInput[i].style.borderColor = "hsla(200, 24%, 40%, 0.8)";
        textInput[i].style.backgroundColor = "hsl(202, 86%, 94%)";
        textInput[i].style.color = "hsl(200, 26%, 54%)"
        error[i].style.display = "none";
        empty.style.display = "flex";
        complete.style.display = "none";
    }

    for (let i = 0; i < radio.length; i++) {
        radio[i].checked = false;
        radioError.style.display = "none";
        radioButtonActive();
    }
});

// Submit Button

function repayment(amount, term, rate) {
    const r = (rate / 100) / 12;
    const n = term * 12;

    return amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function interestOnly(amount, rate) {
    const r = rate / 100;
    
    return (r * amount) / 12;
}

submitButton.addEventListener("click", () => {
    for (let i = 0; i < input.length; i++) {
        if ((String(input[i].value).trim() === "") || (isNaN(input[i].value))) {
            error[i].style.display = "block";
            outsideInput[i].style.borderColor = "hsl(4, 69%, 50%)";
            textInput[i].style.backgroundColor = "hsl(4, 69%, 50%)";
            textInput[i].style.color = "hsl(0, 0%, 100%)";
            empty.style.display = "flex";
            complete.style.display = "none";
            validInput[i] = false;
        } else {
            error[i].style.display = "none";
            outsideInput[i].style.borderColor = "hsla(200, 24%, 40%, 0.8)";
            textInput[i].style.backgroundColor = "hsl(202, 86%, 94%)";
            textInput[i].style.color = "hsl(200, 26%, 54%)";
            validInput[i] = true;
        }
    }

    if (!radio[0].checked && !radio[1].checked) {
        radioError.style.display = "block";
        radioValid = false;
    } else {
        radioError.style.display = "none";
        radioValid = true;
    }

    if (validInput[0] && validInput[1] && validInput[2] && radioValid) {
        const amount = Number(document.querySelector(".js-amount").value);
        const term = Number(document.querySelector(".js-term").value);
        const rate = Number(document.querySelector(".js-rate").value);

        let payment, total;

        if (document.querySelector(".js-repay").checked) {
            payment = repayment(amount, term, rate);
        } else {
            payment = interestOnly(amount, rate);
        }

        total = payment * term * 12;

        payment = formatter.format(payment.toFixed(2));
        total = formatter.format(total.toFixed(2));

        document.querySelector(".js-monthly-amount").innerHTML = `£${payment}`;
        document.querySelector(".js-total-amount").innerHTML = `£${total}`;

        empty.style.display = "none";
        complete.style.display = "flex";
    }
});

inputActive();
radioButtonActive();