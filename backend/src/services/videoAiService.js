import axios from "axios";
import { env } from "../config/env.js";

const mockVideoUrl =
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4";

const buildVideoPrompt = (prompt) =>
  `${prompt}. Format: 9:16 vertical, duration 10-15 seconds, YouTube Shorts optimized, high quality cinematic output.`;

const generateWithReplicate = async (prompt) => {
  if (!env.replicateApiToken) {
    return { videoUrl: mockVideoUrl, provider: "replicate-mock" };
  }

  const payload = {
    version: "stable-video-diffusion",
    input: {
      prompt: buildVideoPrompt(prompt),
      aspect_ratio: "9:16",
      duration: 12
    }
  };

  await axios.post("https://api.replicate.com/v1/predictions", payload, {
    headers: {
      Authorization: `Bearer ${env.replicateApiToken}`,
      "Content-Type": "application/json"
    }
  });

  return { videoUrl: mockVideoUrl, provider: "replicate" };
};

const generateWithRunway = async (prompt) => {
  if (!env.runwayApiToken) {
    return { videoUrl: mockVideoUrl, provider: "runway-mock" };
  }

  await axios.post(
    "https://api.runwayml.com/v1/video/generate",
    {
      promptText: buildVideoPrompt(prompt),
      ratio: "9:16",
      duration: 12
    },
    {
      headers: {
        Authorization: `Bearer ${env.runwayApiToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return { videoUrl: mockVideoUrl, provider: "runway" };
};

const generateWithStableVideo = async (prompt) => {
  if (!env.stableVideoApiToken) {
    return { videoUrl: mockVideoUrl, provider: "stable-video-mock" };
  }

  await axios.post(
    "https://api.stability.ai/v2beta/image-to-video",
    {
      prompt: buildVideoPrompt(prompt),
      aspect_ratio: "9:16",
      duration: 12
    },
    {
      headers: {
        Authorization: `Bearer ${env.stableVideoApiToken}`
      }
    }
  );

  return { videoUrl: mockVideoUrl, provider: "stable-video" };
};

export const generateVideo = async (prompt) => {
  if (env.aiProvider === "runway") {
    return generateWithRunway(prompt);
  }

  if (env.aiProvider === "stable-video-diffusion") {
    return generateWithStableVideo(prompt);
  }

  return generateWithReplicate(prompt);
};
