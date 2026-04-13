export const uploadToYoutube = async (videoUrl, title) => {
  return {
    status: "queued",
    message: "YouTube upload is optional and requires OAuth setup.",
    videoUrl,
    title
  };
};
