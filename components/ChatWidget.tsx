"use client";

import dynamic from "next/dynamic";

const ShowtimeChat = dynamic(
  () => import("@showtime/chat").then((mod) => mod.ShowtimeChat),
  { ssr: false }
);

export function ChatWidget() {
  return (
    <ShowtimeChat
      apiKey="test_api_key_for_development"
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
