import { useState } from "react";
import "./AITutor.css";
import ReactMarkdown from 'react-markdown'

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

function AITutor() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!inputText.trim()) return;

    const userMessage = inputText;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openrouter/free",
            messages: [
              {
                role: "user",
                content: userMessage,
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert("API Error");
        console.log(data);
        return;
      }

      const aiReply = data.choices[0].message.content;

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiReply },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }
    setIsLoading(false);
  }

  return (
    <section className="ai-tutor">
      <h2>Ask Your AI Tutor</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "chat-bubble user-bubble"
                : "chat-bubble ai-bubble"
            }
          >
          {msg.sender === "ai" ? (
          <ReactMarkdown>{msg.text}</ReactMarkdown>
    ) : (
      msg.text
    )}
          </div>
        ))}
        {isLoading && <div className="chat-bubble ai-bubble">Typing...</div>}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your question..."
        />

        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </section>
  );
}

export default AITutor;