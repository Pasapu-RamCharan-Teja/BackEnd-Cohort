const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDB = require("./config/db");
const groceryRoutes = require("./routes/groceryRoutes");
const ErrorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "working"
    });
});

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
});

app.use("/groceries", groceryRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Page not found"
    });
});

app.use(ErrorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server listening on " + PORT);
    });
});