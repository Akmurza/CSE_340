const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(express.static("public"));
app.use(static);

app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute);

const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});