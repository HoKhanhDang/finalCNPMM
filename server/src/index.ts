import express from "express";
import ShipperStatusManager from "./sockets/socketManager";
const app = express();
const port = 5000;
// const initRoutes = require("./route");
import initRoutes from "./route-main";
import connectDB from "./config/mongodb.config";

app.use(express.json());
require("dotenv").config();
const cors = require("cors");

app.use(
    cors({
        origin:[ "*","http://localhost:8080", "http://localhost:3000", "http://13.250.97.51"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

initRoutes(app);
const manager = new ShipperStatusManager();
manager.start(5001);    
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
