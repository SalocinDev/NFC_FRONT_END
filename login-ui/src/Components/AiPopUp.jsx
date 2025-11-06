import { useState, useRef, useEffect } from "react";
import { FaCommentMedical } from "react-icons/fa";
import classes from "../CSS-Folder/AiPopUp.module.css";
import { askLibraryAI } from "../api/ai";
import { IoSend } from "react-icons/io5";

function AiPopUP() {
  const [showPopup, setShowPopup] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]); // {from:'you'|'ai', text}
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    const msg = text.trim();
    if (!msg) return;

    setMessages((m) => [...m, { from: "you", text: msg }]);
    setText("");

    try {
      const data = await askLibraryAI(msg);
      const replyText = data?.reply ?? "No response from AI";
      setMessages((m) => [...m, { from: "ai", text: replyText }]);
    } catch (err) {
      // console.error(err);
      setMessages((m) => [...m, { from: "ai", text: "Error contacting server" }]);
    } finally {
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.iconButton} onClick={() => setShowPopup((v) => !v)}>
        <FaCommentMedical color="white" />
      </div>

      {showPopup && (
        <div className={classes.popup}>
          <h2>MCL AI</h2>

          <div ref={chatRef} className={classes.AiChatBot}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.from === "you" ? classes.userMessage : classes.aiMessage}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className={classes.inputWrapper}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Write your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={onKeyDown}
              className={classes.AiInput}
            />
            <button onClick={handleSend} className={classes.sendButton}>
              <IoSend size={20} color="#101540" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiPopUP;
