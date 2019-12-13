const express = require("express");
const Message = require("./model");

const { Router } = express;
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
  const message = await Message.create(request.body);
  try {
    response.send(message);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
