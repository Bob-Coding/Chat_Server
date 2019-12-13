const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const Sse = require("json-sse");
const messageRouterFactory = require("./message/router");
const stream = new Sse();
const messageRouter = messageRouterFactory(stream);
const Message = require("./message/model");

//now that the stream is connected after putting in terminal http :4000/stream --stream it will send hi
app.get("/", (request, response) => {
  stream.send("hi");
  response.send("hello");
});
//gives the option where clients can connect and you can send multiple responses on one req
app.get("/stream", async (request, response) => {
  //show all msgs
  try {
    //get array out of database
    const messages = await Message.findAll();
    //convert array intro string = 'serialize'
    const string = JSON.stringify(messages);
    //prepare string to be send to client right after they *connect*
    stream.updateInit(string);

    //conect user to stream
    stream.init(request, response);
  } catch (error) {
    next(error); //handle any errors
  }
});
//when users connect to the stream lets them see all msgs that were there
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(messageRouter);

app.listen(port, () => {
  console.log(`listening on : ${port}`);
});
