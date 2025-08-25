const express = require("express");
const dbConnect = require('./config/database');
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const userRouter = require("./routers/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

dbConnect().then(() => {
    console.log("Database connectiom established");
    app.listen(3000, () => {
    console.log("Server is successfully listining on port 3000");
    });
})
.catch((err) => {
    console.error("Database cannot be connected");
});