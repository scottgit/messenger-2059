const SET_ACTIVE_CHAT = "SET_ACTIVE_CHAT";
const SET_MESSAGES_READ = "SET_MESSAGES_READ";

export const setActiveChat = (username) => {
  return {
    type: SET_ACTIVE_CHAT,
    username
  };
};

export const markAllMessagesRead = (conversationId) => {
  return {
    type: SET_MESSAGES_READ,
    conversationId
  }
}

const reducer = (state = "", action) => {
  switch (action.type) {
    case SET_ACTIVE_CHAT: {
      return action.username;
    }
    case SET_MESSAGES_READ: {
      return action.conversationId;
    }
    default:
      return state;
  }
};

export default reducer;
