import express from "express";
var app = express();
var PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.listen(PORT, function () {
    console.log("API is listening on port ".concat(PORT));
});