const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ChatRoom = require("../models/ChatRoomSchema");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).send({
      error: "Username is required",
    });
  }

  if (!password) {
    return res.status(400).send({
      error: "Password is required",
    });
  }

  try {
    const findUser = await User.find({ username });
    if (findUser.length > 0) {
      return res.status(400).send({
        error: "User already exists",
      });
    }

    const token = jwt.sign(
      {
        username,
        role: "user",
      },
      process.env.jwt_secret_key
    );

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    res.status(201).send({
      message: "User created successfully",
      token,
    });
  } catch (e) {
    res.status(500).send({
      error: e.message || "Some error occurred while creating the user",
    });
  }
};

exports.login = async (req, res) => {
  const userData = req.body;

  if (!userData?.username) {
    return res.status(400).send({
      error: "username is required",
    });
  }

  if (!userData?.password) {
    return res.status(400).send({
      error: "Password is required",
    });
  }

  try {
    const user = await User.findOne({ username: userData.username });
    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }

    const token = jwt.sign(
      {
        username: user.username,
        role: "user",
      },
      process.env.jwt_secret_key
    );

    bcrypt.compare(userData.password, user.password, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err.message,
        });
      }
      if (!result) {
        return res.status(400).send({
          error: "Invalid password",
        });
      }
      res.status(200).send({
        message: "User logged in successfully",
        token,
      });
    });
  } catch (e) {
    res.status(500).send({
      error: e.message || "Some error occurred while creating the user",
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      error: "User id is required",
    });
  }

  try {
    if (id === "me") {
      const user = await User.findById(req.userId).exec();

      if (!user) {
        return res.status(400).send({
          error: "User not found",
        });
      }

      return res.status(200).send({
        message: "User was found",
        data: user,
      });
    }

    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }

    return res.status(200).send({
      message: "User was found",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while getting users",
      description: error,
    });
  }
};

exports.usersForSidebar = async (req, res) => {
  const senderId = req.userId;

  try {
    const chatRoom = await ChatRoom.find({ members: { $all: [senderId] } })
      .populate("messages")
      .populate("members");

    if (!chatRoom)
      return res.status(200).send({ message: "No chat room found" });

    const users = [];

    for (let i = 0; i < chatRoom.length; i++) {
      const members = chatRoom[i].members;

      let receiverMember = null;
      for (let j = 0; j < members.length; j++) {
        if (members[j]._id.toString() !== senderId.toString()) {
          receiverMember = members[j];
        }
      }

      users.push(receiverMember);
    }

    return res.status(200).send({
      message: "Users found successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while getting users",
      description: error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const id = req.userId;
  try {
    const users = await User.find({ _id: { $ne: id } });

    if (!users) {
      return res.status(400).send({
        message: "Users not found",
      });
    }

    res.status(200).send({
      message: "Users found successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

exports.searchUsers = async (req, res) => {
  const { search } = req.query;
  const id = req.userId;

  if (!search) {
    return res.status(200).send({
      message: "User not found",
      data: []
    });
  }

  try {
    const regex = new RegExp(search, "i");
    const findUser = await User.find({
      _id: { $ne: id },
      fullName: { $regex: regex },
    });

    if (!findUser || findUser.length === 0) {
      return res.status(200).send({
        message: "User not found",
        data: []
      });
    }

    res.status(200).send({
      message: "Users found successfully",
      data: findUser,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.userId;
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: userData }
    );

    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(400).send({
        error: "User not found",
      });
    }
    res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

// logout

exports.logout = async (req, res) => {
  res.status(200).send({
    message: "User logged out successfully",
  });
};
