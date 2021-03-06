import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  text: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("In api/openai handler...");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion(req.body);

  let text = "";
  if (
    response &&
    response.data &&
    response.data.choices &&
    response.data.choices[0].text
  )
    text = response.data.choices[0].text;
  
  res.status(200).json({ text: text });
}
