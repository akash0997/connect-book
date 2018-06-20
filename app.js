const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const db = require("./server/config/keys").mongoURI;
const users = require("./server/routes/api/users");
const profiles = require("./server/routes/api/profiles");
const posts = require("./server/routes/api/posts");

var app = express();
// Connect to database
mongoose
  .connect(db)
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});

// Use routes

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// Start server
app.listen(port, (err, server) =>
  console.log(`server started in port ${port}`)
);
