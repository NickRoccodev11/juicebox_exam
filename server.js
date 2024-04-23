const express = require("express");
const app = express();
const morgan = require("morgan");
const PORT = 8000;

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/index.js'))

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
