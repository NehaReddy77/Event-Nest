const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Event = require("./models/event");

const app = express();
//mongodb+srv://nehareddy:EObnusCJGfZM9wR7@cluster0.qmwndgr.mongodb.net/
//1F7nXZo6QoEZzQgA
//mongodb+srv://new-user-me:NewMe2024@cluster0.qmwndgr.mongodb.net/test7"
mongoose
  .connect(
    "mongodb+srv://new-user-me:NewMe2024@cluster0.qmwndgr.mongodb.net/DataCollection"
    //"mongodb+srv://nehareddy:1F7nXZo6QoEZzQgA@cluster0.qmwndgr.mongodb.net/test7"
    )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/events", (req, res, next) => {
  const event = new Event({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    formatted_address : req.body.formatted_address,
    latitude : req.body.latitude,
    longitude : req.body.longitude
  });
  event.save().then(createdEvent => {
    res.status(201).json({
      message: "Event added successfully",
      eventId: createdEvent._id
    });
  });
});

app.get("/api/events", (req, res, next) => {
  Event.find().then(documents => {
    res.status(200).json({
      message: "Events fetched successfully!",
      events: documents
    });
  });
});

app.delete("/api/events/:id", (req, res, next) => {
  Event.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Event deleted!" });
  });
});

module.exports = app;
