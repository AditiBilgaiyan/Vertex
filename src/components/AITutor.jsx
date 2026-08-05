import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Alert, Badge, Icon, IconButton, SectionHeading } from './ui';
import './AITutor.css';

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const suggestions = [
  'Explain closures with a real example',
  'What is the difference between let and var?',
  'Give me 3 practice problems on CSS flexbox',
  'Summarise React hooks in plain English',
];

function AITutor() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  // Follow the conversation as it grows
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Grow the composer with its content, up to a ceiling
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [inputText]);

  async function send(text) {
    const userMessage = text.trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputText('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/free',
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        setError(data?.error?.message || 'The tutor service rejected that request.');
        return;
      }

      const aiReply = data?.choices?.[0]?.message?.content;

      if (!aiReply) {
        setError('The tutor replied with an empty message. Try rephrasing your question.');
        return;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong reaching the tutor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    send(inputText);
  }

  // Enter sends, Shift+Enter adds a newline — the convention people expect
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send(inputText);
    }
  }

  const isEmpty = messages.length === 0;
  const canSend = inputText.trim().length > 0 && !isLoading;

  return (
    <section className="tutor section" id="ai-tutor">
      <div className="container">
        <SectionHeading
          eyebrow="AI Tutor"
          title="Ask your AI tutor anything"
          description="Stuck on a concept? Ask in plain language and get a worked explanation you can follow, not a wall of text."
          align="center"
        />

        <div className="tutor__panel">
          <header className="tutor__head">
            <span className="tutor__avatar">
              <Icon name="sparkles" size={18} />
            </span>

            <div className="tutor__identity">
              <p className="tutor__name">Vertex Tutor</p>
              <p className="tutor__status">
                <span className="tutor__dot" />
                {isLoading ? 'Thinking…' : 'Online'}
              </p>
            </div>

            {messages.length > 0 ? (
              <IconButton
                icon="refresh"
                label="Clear conversation"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMessages([]);
                  setError('');
                }}
              />
            ) : null}
          </header>

          <div
            className="tutor__thread"
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with the AI tutor"
          >
            {isEmpty && !isLoading ? (
              <div className="tutor__welcome">
                <span className="tutor__welcome-icon">
                  <Icon name="message" size={26} />
                </span>
                <h3 className="tutor__welcome-title">What would you like to learn today?</h3>
                <p className="tutor__welcome-text">
                  Pick a starting point, or type your own question below.
                </p>

                <ul className="tutor__suggestions">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        className="tutor__suggestion"
                        onClick={() => send(suggestion)}
                      >
                        <Icon name="sparkles" size={14} />
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {messages.map((message, index) => (
              <article
                // Messages are append-only, so the index is a stable identity here
                key={index}
                className={`bubble bubble--${message.sender === 'user' ? 'user' : 'ai'}`}
              >
                {message.sender === 'ai' ? (
                  <span className="bubble__avatar">
                    <Icon name="sparkles" size={14} />
                  </span>
                ) : null}

                <div className="bubble__body">
                  {message.sender === 'ai' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    <p>{message.text}</p>
                  )}
                </div>
              </article>
            ))}

            {isLoading ? (
              <article className="bubble bubble--ai">
                <span className="bubble__avatar">
                  <Icon name="sparkles" size={14} />
                </span>
                <div className="bubble__body">
                  <span className="tutor__typing" aria-label="Tutor is typing">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </article>
            ) : null}
          </div>

          {error ? (
            <div className="tutor__error">
              <Alert variant="danger">{error}</Alert>
            </div>
          ) : null}

          {!API_KEY ? (
            <div className="tutor__error">
              <Alert variant="warning" title="Tutor not configured">
                Set <code>VITE_OPENROUTER_API_KEY</code> in your <code>.env.local</code> to enable
                replies.
              </Alert>
            </div>
          ) : null}

          <form className="tutor__composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="tutor-input">
              Your question
            </label>

            <textarea
              id="tutor-input"
              ref={textareaRef}
              className="tutor__input"
              rows={1}
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…  (Enter to send, Shift+Enter for a new line)"
              disabled={isLoading}
            />

            <button
              type="submit"
              className="tutor__send"
              disabled={!canSend}
              aria-label="Send message"
            >
              <Icon name="send" size={18} />
            </button>
          </form>

          <p className="tutor__disclaimer">
            <Badge variant="neutral">Beta</Badge>
            AI answers can be wrong — always double-check anything important.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AITutor;
