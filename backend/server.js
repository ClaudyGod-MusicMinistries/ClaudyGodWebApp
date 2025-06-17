const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("testing the backend for changes");
});

app.listen(port, () => {
  console.log("Server started on port 8080");
});
