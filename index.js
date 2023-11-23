const express = require("express");
const UserRouter = require("./Router/UserRouter");
const AppCors = require("cors");
const dotEnv = require("dotenv");
dotEnv.config()
const portNumber = process.env.port;

const App = express();

App.use(express.json());
App.use(AppCors({
    origin: "*",
}));

App.use(UserRouter);

App.listen(portNumber, () => {
    try {
        console.log("Server Started Successfully", `${portNumber}`);
    } catch (err) {
        console.log("Something Went wrong : ", err)
    }
})
