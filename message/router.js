const express = require("express");
const Message = require("./model");

const { Router } = express;
//start here in between the router to create a router factory
function factory(stream) {
  const router = new Router();
  // old way:
  // get messages thats posted
  // router.get("/message", (request, response, next) => {
  //   Message.findAll()
  //   .then(messages => {
  //  response.send(messages);
  //  })
  // .catch(next);
  // });
  // old way:
  // create new msg make a post endpoint
  // router.post("/message", (request, response, next) => {
  // Message.create(request.body)
  // .then(message => {
  // response.send(message);
  //  })
  // .catch(next);
  // });
  // the other way:
  router.get("/message", async (request, response, next) => {
    try {
      const messages = await Message.findAll();

      response.send(messages);
    } catch (error) {
      next(error);
    }
  });

  router.post("/message", async (request, response, next) => {
    try {
      const message = await Message.create(request.body);

      const string = JSON.stringify(message);
      stream.send(string);

      response.send(message);
    } catch (error) {
      next(error);
    }
  });
  return router;
}
module.exports = factory;
