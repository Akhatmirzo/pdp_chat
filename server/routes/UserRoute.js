const {
  register,
  login,
  getUser,
  logout,
  getAllUsers,
  searchUsers,
  usersForSidebar,
} = require("../controllers/UserController");
const auth = require("../middlewares/auth");

function UserRoute(fastify, options, next) {
  fastify.post("/", {
    schema: {
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          fullName: {
            type: "string",
            default: "Akhat",
          },
          username: {
            type: "string",
            default: "akhat",
          },
          password: {
            type: "string",
            default: "123456",
          },
          profilePic: {
            type: "string",
          },
        },
      },
    },

    handler: register,
  });

  fastify.post("/login", {
    schema: {
      tags: ["User"],
      body: {
        type: "object",
        properties: {
          username: {
            type: "string",
            default: "akhat",
          },
          password: {
            type: "string",
            default: "123456",
          },
        },
      },
    },

    handler: login,
  });

  fastify.get("/:id", {
    preHandler: [auth("user")],
    schema: {
      tags: ["User"],

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
          Authorization: {
            type: "string",
          },
        },
      },
    },

    handler: getUser,
  });
  fastify.get("/all", {
    preHandler: [auth("user")],
    schema: {
      tags: ["User"],

      headers: {
        type: "object",
        properties: {
          Authorization: {
            type: "string",
          },
        },
      },
    },

    handler: getAllUsers,
  });

  fastify.get("/search", {
    preHandler: [auth("user")],
    schema: {
      tags: ["User"],
      querystring: {
        type: "object",
        properties: {
          search: {
            type: "string",
          },
        },
      },

      headers: {
        type: "object",
        properties: {
          Authorization: {
            type: "string",
          },
        },
      },
    },
    handler: searchUsers,
  });

  fastify.get("/sidebar", {
    preHandler: [auth("user")],
    schema: {
      tags: ["User"],

      headers: {
        type: "object",
        properties: {
          Authorization: {
            type: "string",
          },
        },
      },
    },
    handler: usersForSidebar,
  });

  next();
}

module.exports = UserRoute;
