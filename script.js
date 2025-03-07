let display = document.getElementById('display');
let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.getAttribute('data-value');

        if (value === 'C') {
            clear();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else {
            handleNumber(value);
        }

        updateDisplay();
    });
});

function handleNumber(number) {
    if (waitingForSecondOperand) {
        currentInput = number;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(operator, firstOperand, inputValue);
        currentInput = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function calculate() {
    if (operator === null || waitingForSecondOperand) {
        return;
    }

    const inputValue = parseFloat(currentInput);
    if (isNaN(inputValue)) {
        return;
    }

    const result = operate(operator, firstOperand, inputValue);
    currentInput = String(result);
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function clear() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function updateDisplay() {
    display.textContent = currentInput;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    if (isNaN(a) || isNaN(b)) {
        return "Error";
    }

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                return "Error: Division by zero";
            }
            return a / b;
        default:
            return "Error: Invalid operator";
    }
}

