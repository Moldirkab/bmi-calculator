const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post("/bmi-calculator", (req, res) => {
  console.log("Form submitted!", req.body); 

  let height = parseFloat(req.body.height);
  let weight = parseFloat(req.body.weight);
  const unit = req.body.unit;

  if (!unit || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.send("Invalid input!");
  }

  if (unit === "American") {
    height = height * 0.0254;
    weight = weight * 0.453592;
  } else if (unit === "Traditional") {
    height = height / 100;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  let message;

  if (bmi < 18.5) message = "underweight";
  else if (bmi < 24.9) message = "normal weight";
  else if (bmi < 29.9) message = "overweight";
  else message = "obese";

  res.redirect(`/result.html?bmi=${bmi}&message=${encodeURIComponent(message)}`);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
