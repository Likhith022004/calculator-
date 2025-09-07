let currentOperand = '0';
let previousOperand = '';
let operation = null;

const currentOperandElement = document.getElementById('currentOperand');
const previousOperandElement = document.getElementById('previousOperand');

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    if (operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = '';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

function chooseOperation(selectedOperation) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
    
    // Highlight active operator
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-operation="${selectedOperation}"]`).classList.add('active');
    
    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    
    // Remove active operator highlighting
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateDisplay();
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    
    // Remove active operator highlighting
    document.querySelectorAll('.operator').forEach(btn => {
        btn.classList.remove('active');
    });
    
    updateDisplay();
}

function clearEntry() {
    currentOperand = '0';
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    }
    
    if (event.key === '.') {
        appendNumber('.');
    }
    
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperation(event.key);
    }
    
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        compute();
    }
    
    if (event.key === 'Escape') {
        clearAll();
    }
    
    if (event.key === 'Backspace') {
        clearEntry();
    }
});

// Initialize display
updateDisplay();
