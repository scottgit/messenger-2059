import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setMessagesAsRead
} from "./store/conversations";
import { markAllMessagesRead } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    // Determine active conversation to determine if message enters unread status or not
    const { user, activeConversation } = store.getState();

    // Only dispatch if receiver (since the sender already saved to store)
    if(data.recipientId === user.id) {
      store.dispatch(setNewMessage(data.message, data.recipientId, activeConversation, data.sender));
    }

    // Check if unread status needs immediate removal because of active conversation
    if (activeConversation === data.senderName) {
      store.dispatch(markAllMessagesRead({
        conversationId: data.message.conversationId,
        userId: user.id,
      }));
    }
  });

  socket.on("read-messages", (data) => {
    // Other user has read this user's messages, so mark them as read in the store
    store.dispatch(setMessagesAsRead(data.conversationId, data.userReadingId));
  });
});

export default socket;
