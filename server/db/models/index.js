const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const Participant = require("./participant");

/* The Participant table is a join table between Users and Conversations to allow any number of Users to be involved in any number of conversations */
// associations
User.hasMany(Participant);
Conversation.hasMany(Participant);
Participant.belongsTo(User);
Participant.belongsTo(Conversation);
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
