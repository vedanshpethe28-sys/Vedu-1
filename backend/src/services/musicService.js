const tracks = [
  "Neon Pulse",
  "Momentum Rise",
  "Epic Vibes",
  "Lo-Fi Sparks",
  "Dark Cinematic Flow"
];

export const attachTrendingMusic = async () => {
  const track = tracks[Math.floor(Math.random() * tracks.length)];
  return {
    musicTrack: track,
    musicUrl: "https://pixabay.com/music/search/trending/"
  };
};
