import React, { useContext, useEffect } from "react";
import { PlaygroundContext } from "../Playground";
import MessageBox from "./MessageBox";

export default function Practice() {
  const { practice } = useContext(PlaygroundContext);
  const { history, historyQueue } = practice;

  useEffect(() => {
    // on queue change, update the right element
    historyQueue.value.forEach((reply: any) => {
      console.log(historyQueue);
      const newHistory: any[] = history.value.map((r: any) => {
        if (r.id == reply.id) return reply;
        else return r;
      });

      history.setValue(newHistory);

      historyQueue.setValue([]); // empty queue
    });
  }, [historyQueue.value]);

  return (
    <div className="bg-gray-100">
      <div className="pt-16 container">
        <div
          className="bg-white rounded-md border-2 border-gray-400 max-w-2xl mx-auto h-3/4 relative p-2 m-2"
          id="chat"
        >
          <ul>
            {history.value.map((message: any, i: number) => (
              <li key={i}>
                {message && (
                  <div>
                    <span className="text-gray-600">
                      {message.fromNoora ? "Noora: " : "You: "}
                    </span>
                    {message.typing ? (
                      <span className="text-gray-600">
                        <i>(typing animation)</i>
                      </span>
                    ) : (
                      message.text
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <MessageBox />
        </div>
      </div>
    </div>
  );
}
