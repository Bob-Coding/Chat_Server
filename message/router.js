const express = require("express");
const Message = require("./model");
const bodyParser = require("body-parser");
const { Router } = express;
const router = new Router();
//get messages thats posted
router.get("/message", (request, response, next) => {
  Message.findAll()
    .then(messages => {
      response.send(messages);
    })
    .catch(next);
});
//create new msg make a post endpoint
router.post("/message", (request, response, next) => {
  Message.create(request.body)
    .then(message => {
      response.send(message);
    })
    .catch(next);
});
module.exports = router;
