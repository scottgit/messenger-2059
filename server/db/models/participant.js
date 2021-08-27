const Sequelize = require("sequelize");
const db = require("../db");

const Participant = db.define("participant", {
  /* conversationId -- Link one conversation to the user */
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  /* userId -- Link one user to the conversation */
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  /* numPosts -- This tracks how active the user is in posting to the converation; it is also used for determining invite status, as a conversation is considered in the "invite" stage when this user has not yet posted themselves (i.e. numPosts === 0) */
  numPosts: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  /* lastRead -- This tracks the messageId of the last posted message of a conversation when this user is inside the Active Chat window for that conversation; all messages in the conversation after this message are "unread" for that conversation */
  lastRead: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  /* blocked -- Any open conversation (by invite or public) can be voluntarily blocked by this user to not give updates on that conversation and for filtering */
  block: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

module.exports = Participant;
