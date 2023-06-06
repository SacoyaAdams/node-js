const cors = require("cors");
const express = require("express");
const { body, check, param, validationResult } = require("express-validator");

const PORT = 80;
const app = express();
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

// Middleware...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your endpoints here..

app.get("/message", cors(corsOptions), async (req, res) => {
  res.send({ message: "Hello coya!" });
});

app.listen(PORT, () => {
  console.log(`Express web API running on port: ${PORT}.`);
});
