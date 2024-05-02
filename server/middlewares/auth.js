const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const auth = (permissions) => {
  return (req, res, done) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({ error: "Token was not found" });
    }

    jwt.verify(
      token,
      process.env.jwt_secret_key,
      async function (err, decoded) {
        if (err) {
          res.code(400).send({
            error: "Invalid token",
            description: err,
          });
          return;
        }

        const role = decoded.role;

        if (role === "user" && permissions.includes(role)) {
          const { username } = decoded;

          const user = await User.findOne({ username }).exec();

          if (!user) {
            return res.code(401).send({ error: "Unauthorized user" });
          }

          req.userId = user._id;

          done();
          return;
        }

        return res
          .status(401)
          .send({ message: "This user is not permitted to get data!" });
      }
    );
  };
};

module.exports = auth;
