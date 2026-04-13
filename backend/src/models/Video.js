import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, default: 12 },
    aspectRatio: { type: String, default: "9:16" },
    provider: { type: String, required: true },
    videoUrl: { type: String, required: true },
    audioUrl: { type: String },
    captionUrl: { type: String },
    musicTrack: { type: String },
    youtubeUploadStatus: { type: String, default: "not_uploaded" }
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
