const cors = require("cors");
const express = require("express");
const { body, check, param, validationResult } = require("express-validator");
const { promisPool, promisePool } = require("./PromisePool");

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

//creating a route and using a query to get there
app.get("/cars", cors(corsOptions), async (req, res) => {
  const [rows] = await promisePool.query("SELECT * FROM car");
  console.log(rows);
  res.send(rows);
});

app.get("/cars/:id", cors(corsOptions), async (req, res) => {
  const carId = req.params["id"];
  const [rows] = await promisePool.query("SELECT * from car Where car_id = ?", [
    carId,
  ]);
  console.log(rows);
  res.send(rows);
});
app.get("/cars", cors(corsOptions), async (req, res) => {
  const carMake = req.query["make"];
  const [rows] = await promisePool.query("SELECT * from car Where make= ?", [
    carMake,
  ]);
  console.log(rows);
  res.send(rows);
});

app.post("/cars/", cors(corsOptions), async (req, res) => {
  const { model, make, color, price } = req.body;
  const [rows] = await promisePool.query(
    "insert into car (model, make, color, price) values(?, ?, ?, ?)",
    [model, make, color, price]
  );
  res.status(200).json({ message: "Car inserted successfully." });
//   res.send(rows);
});

app.listen(PORT, () => {
  console.log(`Express web API running on port: ${PORT}.`);
});
