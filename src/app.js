const express = require("express");

const app = express();

app.use("/test",(req, res) => {
    res.send("Hello from the server");
})

app.use("/srinath",(req, res) => {
    res.send("Hello from the srinath server");
})

app.listen(3000, () => {
    console.log("Server is successfully listining on port 3000");
});