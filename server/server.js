const { CheckUserConnection } = require("./socket/UserSocket")
const path = require("path");
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
fastify.register(cors);
fastify.register(multipart);
require("dotenv").config();
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "PDP Chat API",
      description: "This is my Chat Application",
      version: "2.0",
    },
    tags: [{ name: "API", description: "Test related end-points" }],
  },
});

// * Fastify routes
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.get("/", { schema: { tags: ["API"] } }, (req, res) => {
  res.send("Welcome to the Chat application")
  // res.sendFile("index.html");
});

//* MongoDb Connection
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Global db connected");
});

// * Fastify close hooks
fastify.addHook("onClose", async () => {
  await mongoose.connection.close();
});

// * fastify listeners
fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});

// Socket io
CheckUserConnection(fastify)