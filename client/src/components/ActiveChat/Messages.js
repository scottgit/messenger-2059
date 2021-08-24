import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const lastReadIndex = (() => {
    let index = -1;
    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      if (msg.senderId === userId && msg.hasRead) {
        index = i;
      }
    }
    return index;
  }
  )();

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");
        const lastRead = index  === lastReadIndex

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} otherUser={lastRead ? otherUser : null} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
