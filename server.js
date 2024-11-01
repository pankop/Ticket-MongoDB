const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json());

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tickets", require("./routes/tickets"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
