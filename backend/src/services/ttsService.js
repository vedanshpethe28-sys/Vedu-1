import axios from "axios";
import { env } from "../config/env.js";

const mockAudioUrl = "https://samplelib.com/lib/preview/mp3/sample-3s.mp3";

export const generateVoiceover = async (text) => {
  if (env.elevenLabsApiKey) {
    await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/default",
      { text },
      {
        headers: {
          "xi-api-key": env.elevenLabsApiKey,
          "Content-Type": "application/json"
        }
      }
    );
    return { audioUrl: mockAudioUrl, provider: "elevenlabs" };
  }

  if (env.googleTtsApiKey) {
    await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${env.googleTtsApiKey}`,
      {
        input: { text },
        voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
        audioConfig: { audioEncoding: "MP3" }
      }
    );
    return { audioUrl: mockAudioUrl, provider: "google-tts" };
  }

  return { audioUrl: mockAudioUrl, provider: "mock-tts" };
};
