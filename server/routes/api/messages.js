const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId, hasRead } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, hasRead } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, hasRead });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      hasRead,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects {conversationId, userId} in body
router.patch("/read-status", async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;
    const convo = await Conversation.findByPk(conversationId);

    if (!req.user || (convo?.user1Id !== userId && convo?.user2Id !== userId)) {
      return res.sendStatus(401);
    }

    // udpate returns an array, the first element is number updated
    const results = await Message.update({hasRead: true}, {
      where: {
        conversationId,
        [Op.not]: { senderId: userId },
        hasRead: false,
      },
    });
    return results[0] ? res.sendStatus(204) : res.sendStatus(422);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
