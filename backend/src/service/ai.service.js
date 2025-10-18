const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: "AIzaSyCR8UCZnpbNle1GjglIxYysBYqupewN65c",
});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:
        "You are an AI that generates short, meaningful, and engaging captions for images. Each caption should be between 10 and 15 words. It should capture the emotion, vibe, or story behind the image in a natural, smooth, and creative way. Avoid over-describing, complex words, or filler phrases. Do not add hashtags or explanations. You may use a single emoji if it enhances the vibe.",
    },
  });
  return response.text;
}

module.exports = {
  generateCaption,
};
