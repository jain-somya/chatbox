import React from "react";
import ChatMessage from "./ChatMessage";
import SignOut from "./SignOut";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

export default function Chatroom({ firestore, auth, firebase }) {
  const messagesRef = firestore.collection("messages");

  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
  };
  return (
    <div className="w-1/2">
          <div
          className="fixed w-1/2 bg-blue-400 h-16 pt-2 text-white flex justify-between shadow-md"
          style={{ top: "0px", overscrollBehavior: "none" }}
        >
          <div></div>
       
          <div className="my-3 text-white-100 font-bold text-lg tracking-wide">
            Chatbot
          </div>
          {/* 3 dots */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-dots-vertical w-8 h-8 mt-2 mr-2"
          >
            <path
              className="text-green-100 fill-current"
              fillRule="evenodd"
              d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            />
          </svg>
        </div>
        <div>
      {messages &&
        messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} auth={auth} />
        ))}
        </div>

      <div className="fixed w-1/2  bottom-2 flex justify-between bg-green-100">
        <form onSubmit={sendMessage}>
          <input
            className="flex-grow w-full  m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none"
            rows={1}
            placeholder="Message..."
            style={{ outline: "none" }}
            defaultValue={""}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit" className="m-2" style={{ outline: "none" }}>
            <svg
              className="svg-inline--fa text-blue-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="paper-plane"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
              />
            </svg>
          </button>
        </form>
      </div>
      <SignOut auth={auth} />
    </div>
  );
}
