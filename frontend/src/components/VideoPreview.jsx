const VideoPreview = ({ preview }) => {
  if (!preview) return null;

  return (
    <div className="space-y-4 rounded-2xl bg-slate-900 p-4">
      <video controls src={preview.videoUrl} className="aspect-[9/16] w-full rounded-xl bg-black" />
      <div className="text-sm text-slate-300">
        <p>Music: {preview.music?.musicTrack}</p>
        <p>Subtitles: Big bold YouTube Shorts style</p>
      </div>
      <a
        href={preview.downloadUrl}
        download
        className="inline-block rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-950"
      >
        Download MP4
      </a>
    </div>
  );
};

export default VideoPreview;
