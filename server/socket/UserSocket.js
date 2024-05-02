const webSocket = require("socket.io");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const fastify = require("fastify")();

const server = fastify.server;
const io = webSocket(server, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", async (socket) => {
  const token = socket.handshake.query.authorization;
  let userId = null;

  await jwt.verify(token, process.env.jwt_secret_key, async function (err, decoded) {
    if (err) {
      return;
    }

    const { username } = decoded;

    const user = await User.findOne({ username }).exec();

    if (user) {
      userId = user._id.toString();

      if (userId != "undefined") userSocketMap[userId] = socket.id;
    }
  });


  console.log("a user connected", socket.id);

  // io.emit()
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("writeMessage", (data) => {
    console.log(data);
    const receiverSocketId = getReceiverSocketId(data.receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit()
      
      if (data?.message) {
        io.to(receiverSocketId).emit("writeMessage", {id: data.senderId, typing: true});
      }else {
        io.to(receiverSocketId).emit("writeMessage", {id: data.senderId, typing: false});
      }
    }
  })

  // socket.on()
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { fastify, io, server, getReceiverSocketId };
