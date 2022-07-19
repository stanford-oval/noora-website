import React, { Fragment, createContext, useState, useMemo } from "react";
import AskNoora from "../components/playground/noora-replies/AskNoora";
import Page from "../components/utility/Page";
import { Tab } from "@headlessui/react";

const PlaygroundContext = createContext<any>({
  askNoora: {
    query: {
      value: "",
      updateValue: () => {},
    },
    results: {
      value: [],
      updateValue: () => {},
    },
    resultsQueue: {
      value: [],
      updateValue: () => {},
    },
  },
});

export default function index() {
  const [query, updateQuery] = useState("");
  const [results, updateResults] = useState([
    {
      id: -1,
      statement: "I just finished a really good book!",
      good_replies: [
        {
          category: "curious",
          reasoning: "You want to know more about the good book I read.",
          reply:
            "“What book did you read? What was your favorite part of the book?”",
          rating: "Good answer.",
          explanation:
            "You showed me you are interested in my experiences and you asked about my book.",
        },
      ],
      bad_replies: [
        {
          category: "know-it-all",
          reasoning:
            "You feel the need to tell me the benefits of reading and why it's important.",
          reply:
            "“Reading is good for your brain and helps you understand the world better. You should read more.”",
          rating: "Bad answer.",
          explanation:
            "To be a good friend, you should not say that because you do not acknowledge my happiness and tell me what to do.",
        },
      ],
    },
  ]);
  const [resultsQueue, updateResultsQueue] = useState<any[]>([]);

  const value = useMemo(
    () => ({
      askNoora: {
        query: {
          value: query,
          updateValue: updateQuery,
        },
        results: {
          value: results,
          updateValue: updateResults,
        },
        resultsQueue: {
          value: resultsQueue,
          updateValue: updateResultsQueue,
        },
      },
    }),
    [query, updateQuery]
  );

  return (
    <Page
      title="Playground"
      desc="Experiment with Noora, a conversational AI designed to improve the social skills of individuals with ASD."
    >
      <PlaygroundContext.Provider value={value}>
        <div className="pt-16"></div>
        <Tab.Group>
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={
                    selected ? "bg-blue-500 text-white" : "bg-white text-black"
                  }
                >
                  Tab 1
                </button>
              )}
            </Tab>
            <Tab>Tab 2</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <AskNoora />
            </Tab.Panel>
            <Tab.Panel>X</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </PlaygroundContext.Provider>
    </Page>
  );
}
