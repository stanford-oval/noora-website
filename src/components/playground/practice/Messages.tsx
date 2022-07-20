import React, {useRef, useEffect} from 'react'
import {clsx} from "clsx"

export default function Messages({ history }: any) {
  const messagesBottom = useRef<HTMLDivElement>(null);
  // scrolling
  useEffect(() => {
    if (messagesBottom.current)
      messagesBottom.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }, [history.value]);

  return (
    <div className="bg-white border-x-2 border-gray-400 p-2" id="chat">
      <ul>
        {history.value.map((message: any, i: number) => (
          <li key={i}>
            {message && (
              <div
                className={clsx(
                  "rounded-xl w-fit px-4 py-3 mt-1.5 max-w-xs break-words",
                  message.fromNoora
                    ? "bg-gray-200 mr-auto"
                    : "bg-noora-primary-main text-white ml-auto"
                )}
              >
                {message.typing ? (
                  <div className="px-3 py-1">
                    <div className="snippet" data-title=".dot-flashing">
                      <div className="stage">
                        <div className="dot-flashing" />
                      </div>
                    </div>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="-mb-20 invisible text-xs" ref={messagesBottom}>
        .
      </div>
    </div>
  );
}