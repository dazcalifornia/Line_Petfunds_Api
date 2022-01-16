const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const moment = require('moment');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Petdonate",
});

const DASH_YMD = 'YYYY-MM-DD'

app.post("/donate", (req, res) => {
  const amount = req.body.money;
  const items = req.body.items;
  const date = req.body.date;
  const org = req.body.organize
  console.log(`organize: ${org}`)

  db.query(
    "INSERT INTO DonorData (organize, amount, needs, date) VALUES (?,?,?,?)",
    [org, amount, items, moment(date).format(DASH_YMD)],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.listen(4000, () => {
    console.log("Yey, your server is running on port 4000");
});