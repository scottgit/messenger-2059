import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const firstUnreadIndex = messages.findIndex((msg) => !msg.hasRead);
  const lastMessageIndex = messages.length - 1;

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");
        const lastRead =
          index + 1 === firstUnreadIndex
          ||
          (firstUnreadIndex === -1 && index === lastMessageIndex);

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
