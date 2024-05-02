const auth = require("../middlewares/auth");
const {
  getMessages,
  sendMessage,
  getChatRooms,
  deleteMessage,
  updateMessage,
  getChatRoom,
} = require("../controllers/MessageController");

function ChatRoomRoute(fastify, options, next) {
  fastify.post("/send/:id", {
    preHandler: [auth("user")],
    schema: {
      tags: ["Rooms"],

      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
      },

      headers: {
        type: "object",
        properties: {
          authorization: {
            type: "string",
          },
        },
      },

      body: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },

    handler: sendMessage,
  });
  fastify.get("/messages/:id", {
    preHandler: [auth("user")],
    schema: {
      tags: ["Rooms"],

      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
            default: "6625932b083cb62b7a776cdc"
          },
        },
      },

      headers: {
        type: "object",
        properties: {
          authorization: {
            type: "string",
          },
        },
      },
    },

    handler: getMessages,
  });

  fastify.delete("/messages/:id", {
    preHandler: [auth("user")],
    schema: {
      tags: ["Rooms"],

      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
      },

      headers: {
        type: "object",
        properties: {
          authorization: {
            type: "string",
          },
        },
      },
    },

    handler: deleteMessage,
  })

  fastify.put("/messages/:id", {
    preHandler: [auth("user")],
    schema: {
      tags: ["Rooms"],

      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        },
      },

      headers: {
        type: "object",
        properties: {
          authorization: {
            type: "string",
          },
        },
      },

      body: {
        type: "object",
        properties: {
          message: {
            type: "string",
            default: "test"
          },
        },
      },
    },

    handler: updateMessage
  })

  fastify.get("/chatrooms", {
    preHandler: [auth("user")],
    schema: {
      tags: ["Rooms"],
    
      headers: {
        type: "object",
        properties: {
          authorization: {
            type: "string",
          },
        },
      },
    },

    handler: getChatRooms
  })
  fastify.get("/chatroom/:id", {
    preHandler: [auth("user")],
    schema: {
      tags: ["Rooms"],

      params: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
        }
      },
    
      headers: {
        type: "object",
        properties: {
          authorization: {
            type: "string",
          },
        },
      },
    },

    handler: getChatRoom
  })

  next();
}

module.exports = ChatRoomRoute;
