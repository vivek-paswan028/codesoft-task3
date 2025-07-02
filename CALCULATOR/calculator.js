const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let operand1 = null;
let operand2 = null;
let resultDisplayed = false;

function updateDisplay(value) {
    display.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'clear') {
            currentInput = '';
            operator = '';
            operand1 = null;
            operand2 = null;
            resultDisplayed = false;
            updateDisplay('0');
        } else if (button.id === 'equals') {
            if (operator && currentInput !== '') {
                operand2 = parseFloat(currentInput);
                let result = 0;
                if (operator === '+') {
                    result = operand1 + operand2;
                } else if (operator === '-') {
                    result = operand1 - operand2;
                } else if (operator === '*') {
                    result = operand1 * operand2;
                } else if (operator === '/') {
                    result = operand2 !== 0 ? operand1 / operand2 : 'Error';
                }
                updateDisplay(result);
                currentInput = '';
                operator = '';
                operand1 = result === 'Error' ? null : result;
                resultDisplayed = true;
            }
        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                operand1 = parseFloat(currentInput);
                operator = value;
                currentInput = '';
                resultDisplayed = false;
            } else if (operand1 !== null && operator) {
                operator = value; // Change operator if pressed again
            }
        } else {
            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            updateDisplay(currentInput);
        }
    });
}); 