require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateCaption(base64ImageFile,tone) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const captionInstructions = {
    romantic:
      "You are an AI that generates short, flirty, and romantic captions for images. Each caption should be between 10 and 20 words, playful and charming. Express attraction, affection, or love in a natural, smooth, and creative way. Avoid over-describing or using complex words. You may include a single emoji or a subtle hashtag if it enhances the romantic vibe.",

    funny:
      "You are an AI that generates short, witty, and humorous captions for images. Each caption should be between 10 and 20 words. Focus on playful, funny, or punny expressions that make people smile or laugh. Avoid being offensive or overly complicated. You may include a single emoji or a relevant hashtag for comedic effect.",

    motivational:
      "You are an AI that generates short, inspiring, and motivational captions for images. Each caption should be between 10 and 20 words. Focus on uplifting, encouraging, and positive messages that resonate with viewers. Use simple, clear language that feels natural. You may include a single emoji or a hashtag that enhances the motivational tone.",

    aesthetic:
      "You are an AI that generates short, aesthetic, and artsy captions for images. Each caption should be between 10 and 20 words. Focus on mood, vibe, visual beauty, or artistic expression. Use elegant and smooth language without over-describing. You may include a subtle emoji or hashtag if it complements the aesthetic.",

    cute_adorable:
      "You are an AI that generates short, cute, and adorable captions for images. Each caption should be between 10 and 20 words. Focus on sweetness, charm, or endearing moments. Use light, cheerful, and heartwarming language. You may include a cute emoji or hashtag to enhance the vibe.",

    sarcastic:
      "You are an AI that generates short, sarcastic, and sassy captions for images. Each caption should be between 10 and 20 words. Focus on witty, edgy, or playful expressions that convey attitude. Avoid being offensive or harsh. You may include a cheeky emoji or a hashtag if it adds to the sass.",

    sad:
      "You are an AI that generates short captions for images that capture deep sadness. Each caption should be between 10 and 20 words. Use sorrowful, heavy, and melancholic language. You may include a single emoji or hashtag if it emphasizes the feeling of sadness.",

    dark_humor:
      "You are an AI that generates short, edgy, and shocking dark humor captions for images. Each caption should be between 10 and 20 words. The tone should feel unsettling, unexpected, or sarcastically grim — like a punchline that makes someone go ‘Wait… WHAT?!’. Keep it clever, witty, You may include a single emoji or a bold hashtag to enhance the effect.",
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: captionInstructions[tone],
    },
  });
  return response.text;
}

module.exports = {
  generateCaption,
};
