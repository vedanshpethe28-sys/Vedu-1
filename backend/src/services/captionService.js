export const generateCaptions = async (text) => {
  const words = text.split(" ").slice(0, 24);

  const subtitles = words.map((word, index) => ({
    text: word,
    start: Number((index * 0.5).toFixed(2)),
    end: Number((index * 0.5 + 0.45).toFixed(2)),
    style: {
      fontSize: 68,
      fontWeight: "900",
      color: "#ffffff",
      stroke: "#000000",
      position: "bottom-center"
    }
  }));

  return {
    captionUrl: "https://example.com/mock-captions.vtt",
    subtitles
  };
};
