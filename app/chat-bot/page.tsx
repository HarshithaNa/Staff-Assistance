import ChatInterface from "@/components/client/chat-interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Assistant | AI Chat-Bot",
  description: "Ask me any thing to assist staff.",
};

const ChatBot = () => {
  return <ChatInterface />;
};

export default ChatBot;
