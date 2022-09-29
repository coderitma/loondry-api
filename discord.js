const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);
const axios = require("axios");
const BarangModel = require("./models/barang.model");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/halo.html");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("general", (pesan) => {
    console.log("pesan diterima " + pesan);
    io.emit("general", pesan);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("get:barang", async (data) => {
    const { phone, message } = data;
    const payload = JSON.stringify({
      phone,
      message,
    });

    axios
      .post(`http://13.250.65.146:8081/send`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        io.emit("get:barang", response);
      })
      .catch(function (error) {
        console.log("error", error);
        io.emit("get:barang", error);
      });
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
