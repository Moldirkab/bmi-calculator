const params = new URLSearchParams(window.location.search);
const bmi = params.get("bmi");
const message = params.get("message");

const valueEl = document.getElementById("bmi-value");
const msgEl = document.getElementById("bmi-message");

valueEl.textContent = bmi;
msgEl.textContent = message;

switch (message) {
  case "underweight":
    msgEl.style.color = "red";
    break;
  case "normal weight":
    msgEl.style.color = "#0DD933";
    break;
  case "overweight":
    msgEl.style.color = "orange";
    break;
  case "obese":
    msgEl.style.color = "#DB2B20";
    break;
}
