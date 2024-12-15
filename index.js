const express = require("express");
const mongoose = require("mongoose");
const { userModel } = require("./Schema");

const app = express();
const port = 3000;

async function connect() {
  await mongoose.connect("mongodb://localhost:27017/myapp1");
  console.log("connected");
}

connect();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hello");
});

app.post("/createuser", async (req, res) => {
  // const username = req.body.username
  // const password = req.body.password

  const { username, password } = req.body;

  if (password.length < 6) {
    return res.json({ msg: "too small password" });
  }

  const response1 = await userModel.findOne({
    username,
  });

  if (response1) {
    return res.json({ msg: "user already exists" });
  } else {
    const response = await userModel.create({
      username,
      password,
    });

    return res.json({ msg: "user created successfully" });
  }
});

app.post("/addtodo", async (req, res) => {
  const { username, todo } = req.body;

  const response1 = await userModel.findOne({
    username,
  });

  if (!response1) {
    return res.json({ msg: "user does not exist" });
  } else {
    const response = await userModel.updateOne(
      { username },
      { $push: { todos: todo } }
    );

    return res.json({ msg: "todo has been added " });
  }
});

app.get("/getdata", async (req, res) => {
  const username = req.body.username;

  const data = await userModel.findOne({
    username,
  });

  if (!data) {
    return res.json({ msg: "user does not exist" });
  } else {
    return res.json({ todos: data.todos });
  }
});

app.listen(port, () => {
  console.log("running on " + port);
});
