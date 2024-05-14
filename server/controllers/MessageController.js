const Message = require("../models/MessageSchema");
const ChatRoom = require("../models/ChatRoomSchema");
const { getReceiverSocketId, io } = require("../socket/UserSocket");
const User = require("../models/UserSchema");

exports.sendMessage = async (req, res) => {
  const { message, files, audio } = req.body;
  const receiverId = req.params.id;
  const senderId = req.userId;

  // Check new Created chat room
  let newCreated = false;

  if ((!message && !files) && !audio) {
    return res.status(400).send({
      error: "Data cannot be empty",
    });
  }

  try {
    let room = await ChatRoom.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!room) {
      room = await ChatRoom.create({
        members: [senderId, receiverId],
      });

      newCreated = true;
    }

    const msgObj = {
      senderId,
      receiverId,
      userId: senderId,
      message,
    }

    if (files) {
      msgObj.files = files;
    }

    if (audio) {
      msgObj.files = audio;
    }

    const newMessage = new Message(msgObj);

    if (newMessage) {
      room.messages.push(newMessage._id);
    }

    await Promise.all([room.save(), newMessage.save()]);

    let newRoom = null;
    let receiverMember = null;
    let senderMember = null;
    if (newCreated) {
      newRoom = await ChatRoom.findOne({
        members: { $all: [senderId, receiverId] },
      })
        .populate("messages")
        .populate("members");

      const members = newRoom.members;

      for (let j = 0; j < members.length; j++) {
        if (members[j]._id.toString() !== senderId.toString()) {
          receiverMember = members[j];
        }
      }

      for (let j = 0; j < members.length; j++) {
        if (members[j]._id.toString() === senderId.toString()) {
          senderMember = members[j];
        }
      }
    }

    const receiverSocketId = await getReceiverSocketId(receiverId);
    const senderSocketId = await getReceiverSocketId(senderId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit()
      io.to(receiverSocketId).emit("newMessage", {
        message: newMessage,
        chatId: room._id,
      });

      if (newCreated) {
        io.to(receiverSocketId).emit("newRoom", {
          newRoom,
          member: senderMember,
        });
      }

      io.to(receiverSocketId).emit("writeMessage", {id: senderId, typing: false});
    }

    if (senderSocketId && newCreated) {
      io.to(senderSocketId).emit("newRoom", {
        newRoom,
        member: receiverMember,
      });
    }

    res.status(200).send({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

exports.deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  const senderId = req.userId;

  try {
    const message = await Message.findById({ _id: messageId });

    if (message.senderId.toString() !== senderId.toString()) {
      return res.status(401).send({
        error: "You are not permitted to delete this message",
      });
    }

    await Message.findByIdAndDelete({ _id: messageId });

    res.status(200).send({
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

exports.updateMessage = async (req, res) => {
  const { message } = req.body;
  const messageId = req.params.id;
  const senderId = req.userId;

  if (!message) {
    return res.status(400).send({
      error: "Message cannot be empty",
    });
  }

  try {
    const newMessage = await Message.findByIdAndUpdate(
      { _id: messageId },
      { $set: { message } }
    );

    if (!newMessage) {
      return res.status(400).send({
        error: "Message not found",
      });
    }

    if (newMessage.senderId.toString() !== senderId.toString()) {
      return res.status(401).send({
        error: "You are not permitted to update this message",
      });
    }

    await newMessage.save();

    res.status(200).send({
      message: "Message updated successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.userId;

    const chatRoom = await ChatRoom.findOne({
      members: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!chatRoom)
      return res.status(200).send({ message: "No chat room found" });

    const messages = chatRoom.messages;

    return res.status(200).send({
      message: "Messages found successfully",
      data: messages,
    });
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getChatRooms = async (req, res) => {
  const senderId = req.userId;
  try {
    const chatRoom = await ChatRoom.find({ members: { $all: [senderId] } })
      .populate("messages")
      .populate("members");

    if (chatRoom.length === 0)
      res.status(200).send({ message: "Chat Not Found" });

    res.status(200).send({
      message: "Chat Rooms Found",
      data: chatRoom,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

// exports.getChatRooms = async (req, res) => {
//   try {
//     const senderId = req.userId;

//     const chatRoom = await ChatRoom.find({ members: { $all: [senderId] } })
//       .populate("messages")
//       .populate("members");

//     if (!chatRoom)
//       return res.status(200).send({ message: "No chat room found" });

//     const newChatRoom = [];

//     for (let i = 0; i < chatRoom.length; i++) {
//       const messages = chatRoom[i].messages;
//       const members = chatRoom[i].members;

//       let receiverMember = null;
//       for (let j = 0; j < members.length; j++) {
//         if (members[j]._id.toString() !== senderId.toString()) {
//           receiverMember = members[j];
//         }
//       }

//       newChatRoom.push({ messages, receiverMember });
//     }

//     return res.status(200).send({
//       message: "Chat Room found successfully",
//       data: newChatRoom,
//     });
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).send({ error: "Internal server error" });
//   }
// };

exports.getChatRoom = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.userId;

    const chatRoom = await ChatRoom.findOne({
      members: { $all: [senderId, userToChatId] },
    })
      .populate("messages")
      .populate("members");

    if (!chatRoom)
      return res.status(200).send({ message: "No chat room found" });

    return res.status(200).send({
      message: "Chat Room found successfully",
      data: chatRoom,
    });
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).send({ error: "Internal server error" });
  }
};
