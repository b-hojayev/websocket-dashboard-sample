const express = require("express");
const app = express();
var expressWs = require("express-ws")(app);

expressWs.getWss;

const port = 3000;

app.ws("/dashboard", function (ws, req) {
  console.log("Client connected");

  ws.on("error", (error) => {
    console.log("error...", error);
  });

  ws.on("message", (msg) => {
    console.log("message:");
    console.log(msg);
  });

  ws.on("close", (code, reason) => {
    console.log("Closed...");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});
