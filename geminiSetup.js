const { GoogleGenAI, Type } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_AI_KEY });

async function searchFunction(param) {
  const response = await ai.models.generateContent({
    contents: param,
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "You are an AI working in a tourism companion app and will be receiving requests from users for location and trip ideas. Respond to their requests with a list of at least 5 place names that satisfy the given request.  ",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
  });
  return response.text;
}

async function suggestLocation(param) {
  const response = await ai.models.generateContent({
    contents: param,
    model: "gemini-2.5-flash",
    config: {
      systemInstruction:
        "You are an AI functioning in a tourism companion app and will be suggesting locations for users to visit based on their previiously visited locations. For each location you receive, respond with the names of not more than two locations in a 30km radius whose offerings closely match those of the initial location ",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
  });

  return response.text;
}

module.exports = { searchFunction, suggestLocation };
