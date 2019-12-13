const express = require("express");
const app = express();
const port = 3000;
const routerMessage = require("./message/router");

app.get("/", (request, response) => {
  response.send("hello");
});

app.use(routerMessage);
app.listen(port, () => {
  console.log(`listening on : ${port}`);
});
