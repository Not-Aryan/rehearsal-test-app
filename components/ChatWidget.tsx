"use client";

import { ShowtimeChat } from "@showtime/chat";

export function ChatWidget() {
  return (
    <ShowtimeChat
      apiKey="your-api-key"
      baseUrl="https://showtime-dev.ngrok.io"
      userName="User"
      appName="THE STORE"
      suggestions={[
        "What products do you have?",
        "How do I place an order?",
        "Show me my cart",
      ]}
      position="bottom-right"
      primaryColor="#e4f222"
    />
  );
}
