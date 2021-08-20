import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
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

    store.dispatch(setNewMessage(data.message, data.recipientId, activeConversation, data.sender));

    // Check if unread status needs immediate removal because of active conversation
    if (activeConversation === data.senderName) {
      store.dispatch(markAllMessagesRead({
        conversationId: data.message.conversationId,
        userId: user.id,
      }));
    }
  });
});

export default socket;
