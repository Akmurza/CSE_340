const express = require("express");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const static = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const asyncHandler = require("./middleware/asyncHandler");

const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(express.static("public"));
app.use(static);

app.get("/", asyncHandler(baseController.buildHome));
app.use("/inv", inventoryRoute);

// Error route for intentional 500 error
app.get("/error/500", (req, res, next) => {
  const error = new Error("Intentional Server Error");
  error.status = 500;
  next(error);
});

// 404 handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  console.error(`Error ${status}: ${message}`);
  
  // Send error response
  res.status(status).render("error", {
    title: status,
    message: message,
    status: status,
    nav: "", // Empty nav to prevent layout errors
  }, (renderErr) => {
    if (renderErr) {
      // If error view fails to render, send plain response
      res.status(status).send(`<h1>Error ${status}</h1><p>${message}</p>`);
    }
  });
});

const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});