const express = require("express");
const bodyParser = require("body-parser");
const pino = require("pino");
require("dotenv").config();

const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post("api/messages", (req, res) => {
    res.header("Content-Type", "application/json");

    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            content: req.body.content,
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        })
})

app.listen(PORT, (err) => {
    if (!err)
        console.log(`Server run on port ${PORT}`)
    else
        console.log(`Error occured`, err);
})
