const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const LoginRoute = require("./routes/login");
const SignupRoute = require("./routes/signup");
const UserRoute = require("./routes/user");
const mongoose = require("mongoose");

let users = [];

mongoose
  .connect(
    "mongodb+srv://user:user@cluster0.alhah.mongodb.net/userChat?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected successfully"))
  .catch((e) => console.log(e));

app.use(bodyParser.json());

app.use(cors());

app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Headers", "x-token");
  next();
});

io.on("connection", (socket) => {
  socket.on("online", (user) => {
    users.push({ user, id: socket.id });
    console.log(users);
    io.emit("users", users);
  });
  socket.on("send-message", (data) => {
    socket.broadcast.emit("receive-message", data);
  });
  socket.on("disconnect", () => {
    users = users.filter((userItem) => userItem.id != socket.id);
    io.emit("users", users);
    console.log(users);

    console.log("Disconnected");
  });
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.use("/login", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/user", UserRoute);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server started on port 5000"));
