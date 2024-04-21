const webSocket = require("socket.io")

exports.CheckUserConnection = (fastify) => {
  const server = fastify.server;
  const io = webSocket(server, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN,
      methods: process.env.SOCKET_CORS_METHODS,
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connect to server: " + socket.id);

    socket.on("disconnect", () => {
      console.log("User Disconnect from server: " + socket.id);
    });
  });
};


