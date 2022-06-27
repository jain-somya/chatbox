import React from "react";

export default function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageSent = uid === props.auth.currentUser.uid;
  return (
    <div
      className={` mt-20 mb-16  ${
        messageSent ? "justify-end" : "justify-start"
      }`}
    >
      <div className="flex flex-row ">
        {!messageSent && (
          <img className={`h-16 w-16 rounded-full `} src={photoURL}></img>
        )}

        <div
          className={`  mx-4 w-full   my-2 p-2 rounded-lg ${
            messageSent ? " bg-blue-300 text-right clearfix" : " bg-gray-300 "
          }`}
        >
          {text}
        </div>
        {messageSent && (
          <img className={`h-16 w-16 rounded-full`} src={photoURL}></img>
        )}
      </div>
    </div>
  );
}
