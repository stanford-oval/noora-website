import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import getReply from "../../../scripts/get-reply";
import { PlaygroundContext } from "../Playground";
import { v4 as uuidv4 } from "uuid";

export default function InputForm() {
  const { practice } = useContext(PlaygroundContext);
  const { draft, history, historyQueue, convoState } = practice;

  let handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = draft.value;
    let userMsgId = uuidv4();
    let replyId = uuidv4();
    history.setValue([
      ...history.value,
      { id: userMsgId, fromNoora: false, text: message },
      { id: replyId, fromNoora: true, typing: true },
    ]);
    draft.setValue("");

    let reply = await getReply(
      message,
      replyId,
      convoState.value,
      convoState.setValue
    );
    console.log(reply);
    historyQueue.setValue([...historyQueue.value, reply]);
    convoState.setValue({ turn: "user-answer" });
  };

  return (
    <form className="mx-auto absolute bottom-2" id="messageBox">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-5 pointer-events-none text-slate-400 z-10">
          <FontAwesomeIcon icon={faPen} className="w-4 h-4" />
        </div>

        <input
          type="text"
          onChange={(e) => {
            draft.setValue(e.target.value);
          }}
          value={draft.value}
          placeholder={
            convoState.value.turn == "user-answer"
              ? "Send message..."
              : "Please wait for Noora..."
          }
          disabled={convoState.value.turn != "user-answer"}
          className="block p-4 pl-12 w-full border-2 focus:outline-none border-gray-400 shadow-sm sm:text-sm rounded-full text-slate-800 disabled:bg-gray-100"
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          disabled={draft.value.length == 0}
          className="text-white absolute right-2.5 bottom-3 md:bottom-2.5 bg-noora-primary-main hover:bg-noora-primary-dark disabled:bg-noora-primary-dark focus:outline-none font-medium rounded-full text-sm px-4 py-2"
        >
          Send
        </button>
      </div>
    </form>
  );
}
