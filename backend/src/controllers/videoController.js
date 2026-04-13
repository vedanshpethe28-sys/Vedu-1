import Video from "../models/Video.js";
import User from "../models/User.js";
import { generateVideo } from "../services/videoAiService.js";
import { generateVoiceover } from "../services/ttsService.js";
import { generateCaptions } from "../services/captionService.js";
import { attachTrendingMusic } from "../services/musicService.js";
import { uploadToYoutube } from "../services/youtubeService.js";
import {
  canGenerateVideo,
  consumeCredit,
  creditsRemaining,
  FREE_DAILY_LIMIT,
  resetDailyCreditsIfNeeded
} from "../utils/creditUtils.js";

export const listTemplates = async (_req, res) => {
  const { listTemplates: list } = await import("../services/templateService.js");
  return res.json({ templates: list() });
};

export const generate = async (req, res) => {
  const { prompt, category, withYoutubeUpload = false } = req.body;

  if (!prompt || !category) {
    return res.status(400).json({ message: "Prompt and category are required." });
  }

  const user = await User.findById(req.user._id);
  resetDailyCreditsIfNeeded(user);

  if (!canGenerateVideo(user)) {
    return res.status(403).json({
      message: `Free plan limit reached (${FREE_DAILY_LIMIT}/day). Upgrade to ₹299/month for unlimited videos.`
    });
  }

  const [videoOutput, ttsOutput, captionOutput, musicOutput] = await Promise.all([
    generateVideo(prompt),
    generateVoiceover(prompt),
    generateCaptions(prompt),
    attachTrendingMusic()
  ]);

  consumeCredit(user);
  await user.save();

  const video = await Video.create({
    user: user._id,
    prompt,
    category,
    provider: videoOutput.provider,
    videoUrl: videoOutput.videoUrl,
    audioUrl: ttsOutput.audioUrl,
    captionUrl: captionOutput.captionUrl,
    musicTrack: musicOutput.musicTrack,
    duration: 12,
    aspectRatio: "9:16"
  });

  let youtube = null;
  if (withYoutubeUpload) {
    youtube = await uploadToYoutube(video.videoUrl, `PromptShorts: ${prompt.slice(0, 40)}`);
    video.youtubeUploadStatus = youtube.status;
    await video.save();
  }

  return res.status(201).json({
    video,
    preview: {
      videoUrl: video.videoUrl,
      downloadUrl: video.videoUrl,
      subtitles: captionOutput.subtitles,
      music: musicOutput,
      youtube
    },
    creditsRemaining: creditsRemaining(user)
  });
};

export const listVideos = async (req, res) => {
  const videos = await Video.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20);
  return res.json({ videos });
};
