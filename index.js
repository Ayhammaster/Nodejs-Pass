const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load data
let file = fs.readFileSync("orders.txt").toString();
let obj = JSON.parse(file);
let orderlist = "";
/// make this varible for last value
let totalall = 0;
/// splite data from txt file
for (let i in obj.orders) {
  orderlist += obj.orders[i].customer + "\n";
  let address =
    obj.orders[i].address.latitude + "  " + obj.orders[i].address.longitude;
  orderlist += address + "\n";
  let dis = obj.orders[i].discount;
  let itemsize = obj.orders[i].items.length;
  orderlist += itemsize + "\n";
  let totalbdis = 0;
  let item;
  for (let q in obj.orders[i].items) {
    item =
      obj.orders[i].items[q].name +
      " " +
      obj.orders[i].items[q].count +
      " " +
      obj.orders[i].items[q].price +
      " " +
      obj.orders[i].items[q].total;

    totalbdis += obj.orders[i].items[q].total;
  }
  orderlist += item + "\n";
  let orderdet;
  let totaladis = totalbdis - (totalbdis * dis) / 100;
  orderdet = totalbdis + " " + dis + " " + totaladis;
  orderlist += orderdet + ",\n";
  totalall += totaladis;
}
orderlist += totalall;
console.log(orderlist);
const ordersen = JSON.stringify(orderlist);
// Routs
app.get("/", (req, res) => {
  res.send("App Start From Zero");
});
app.get("/orders", (req, res) => {
  res.json(ordersen);
});

app.listen(port, () => console.log(`App Port ${port}!`));
