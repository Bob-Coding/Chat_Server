const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const routerMessage = require("./message/router");

app.get("/", (request, response) => {
  response.send("hello");
});

const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(routerMessage);

app.listen(port, () => {
  console.log(`listening on : ${port}`);
});
