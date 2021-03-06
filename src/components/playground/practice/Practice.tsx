import React, { useContext } from "react";
import { PlaygroundContext } from "../Playground";
import NooraChat from "../../chat-interface/chat/NooraChat";
import Menu from "../../chat-interface/menu/Menu";
import Summary from "../../chat-interface/summary/Summary";

export default function Practice() {
  const { practice } = useContext(PlaygroundContext);
  const { history, convoState } = practice;

  // prop drilling beyond this point is intentional (for the re-usability of components)

  return (
    <div className="bg-gray-100 pt-14">
      <div className="py-4 container flex items-stretch flex-col md:flex-row justify-center md:space-x-2 space-y-2 md:space-y-0">
        <div className="basis-auto md:basis-7/12  lg:basis-3/4 w-full mx-auto">
          {convoState.value.turn == "summary" ? (
            <Summary history={history} convoState={convoState} />
          ) : (
            <NooraChat history={history} convoState={convoState} />
          )}
        </div>
        <div className="basis-auto md:basis-5/12 lg:basis-1/4 w-full mx-auto md:min-h-full">
          <Menu convoState={convoState} />
        </div>
      </div>
    </div>
  );
}
