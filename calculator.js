// ======= CALCULATOR JS ======= //

// Grab DOM elements
const display = document.getElementById("calc-display");
const buttons = document.querySelectorAll(".calc-btn");
const clearBtn = document.getElementById("calc-clear");
const equalsBtn = document.getElementById("calc-equals");
const historyList = document.getElementById("calc-history");

// Track input expression
let currentExpression = "";

// ===== Update Display =====
function updateDisplay(value) {
  display.value = value;
}

// ===== Append Value =====
function appendValue(val) {
  currentExpression += val;
  updateDisplay(currentExpression);
}

// ===== Clear Calculator =====
clearBtn.addEventListener("click", () => {
  currentExpression = "";
  updateDisplay("");
});

// ===== Evaluate Expression =====
equalsBtn.addEventListener("click", () => {
  try {
    // Evaluate safely
    let result = eval(currentExpression);

    // Handle invalid results
    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid Calculation");
    }

    // Round to 2 decimals if financial
    result = Math.round((result + Number.EPSILON) * 100) / 100;

    // Update display & history
    updateDisplay(result);
    addToHistory(currentExpression, result);

    // Store last result as base for new expression
    currentExpression = result.toString();
  } catch (err) {
    updateDisplay("Error");
    currentExpression = "";
  }
});

// ===== Add to History =====
function addToHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);

  // Limit history to last 5 entries
  if (historyList.children.length > 5) {
    historyList.removeChild(historyList.lastChild);
  }
}

// ===== Button Click Events =====
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.dataset.value;
    appendValue(val);
  });
});

// ===== Keyboard Support =====
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || ["+", "-", "*", "/", ".", "%"].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter") {
    equalsBtn.click();
  } else if (e.key === "Backspace") {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay(currentExpression);
  } else if (e.key === "Escape") {
    clearBtn.click();
  }
});
