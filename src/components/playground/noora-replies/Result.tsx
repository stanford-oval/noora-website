import React from "react";
import { clsx } from "clsx";

export default function Result({
  index,
  statement,
  good_replies,
  bad_replies,
}: ResultProps) {
  return (
    <div className="bg-white mb-2 rounded-md border-2 border-gray-300 p-5">
      {index}: {statement}
      <ul>
        {good_replies ? (
          good_replies.map((reply, idx) => (
            <li key={idx}>
              {reply && (
                <Reply
                  rating={reply.rating}
                  reply={reply.reply}
                  explanation={reply.explanation}
                  good_reply={true}
                />
              )}
            </li>
          ))
        ) : (
          <p className="font-bold text-xl">
            This will take around 25 seconds...
          </p>
        )}
        {bad_replies ? (
          bad_replies.map((reply, idx) => (
            <li key={idx}>
              {reply && (
                <Reply
                  rating={reply.rating}
                  reply={reply.reply}
                  explanation={reply.explanation}
                  good_reply={false}
                />
              )}
            </li>
          ))
        ) : (
          <p className="font-bold text-xl">
            This will take around 25 seconds...
          </p>
        )}
      </ul>
    </div>
  );
}

function Reply({ rating, reply, explanation, good_reply }: ReplyProps) {
  return (
    <div
      className={clsx(
        "p-3 border-2 rounded-lg",
        good_reply
          ? "border-green-800 bg-green-200"
          : "border-red-800 bg-red-200"
      )}
    >
      <p>{reply}</p>
      <p>{rating}</p>
      <p>If you replied with this:</p>
      <p>{explanation}</p>
    </div>
  );
}

type ResultProps = {
  index: number;
  statement: string;
  good_replies: any[];
  bad_replies: any[];
};

type ReplyProps = {
  rating: string;
  reply: string;
  explanation: string;
  good_reply: boolean;
};
