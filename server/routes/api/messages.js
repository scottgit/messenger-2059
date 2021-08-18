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
router.patch("/:msgId/markRead", async (req, res, next) => {
  const msgId = req.params.msgId;
  try {
    const message = await Message.findByPk(msgId);
    if (!message) {
      return res.sendStatus(404);
    }
    const { conversationId, userId } = req.body;
    // Check for valid information before marking as read
    if (message.conversationId === conversationId && message.senderId !== userId) {
      message.hasRead = true;
      await message.save();
      return res.sendStatus(200);
    }
    else {
      return res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
}

// expects {conversationId, userId} in body
router.patch("/markAllRead", async (req, res, next) => {
  try {
    const { conversationId, userId } = req.body;
    await Message.update({hasRead: true}, {
      where: {
        conversationId,
        [Op.not]: { senderId: userId },
        hasRead: false,
      },
    });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
