const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  /* title -- takes the place of the current method of displaying the "activeConversation" as just the name of the other individual; now "activeConversation" will be tracked by conversationId and the title will display in areas where a username was previously showing the chat */
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  /* initiatorId -- set on creation to indicate who started this conversation */
  initiatorId: {
    type: Sequelize.Integer,
    allowNull: false,
  },
  /* private -- set on creation to allow any other users to join the conversation if they desire (without a current member issuing an invite); once public, there is currently no way to make private (but could implement a group vote to "privatize" the conversation after the fact) */
  private: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
});

module.exports = Conversation;
