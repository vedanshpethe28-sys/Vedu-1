import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import TemplatePicker from "../components/TemplatePicker";
import VideoPreview from "../components/VideoPreview";

const DashboardPage = () => {
  const { user, logout, refresh } = useAuth();
  const [templates, setTemplates] = useState({});
  const [category, setCategory] = useState("Motivation");
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const templateText = useMemo(() => templates[category] || "", [templates, category]);

  const loadData = async () => {
    const [{ data: templatesData }, { data: videosData }] = await Promise.all([
      api.get("/videos/templates"),
      api.get("/videos")
    ]);

    setTemplates(templatesData.templates);
    setVideos(videosData.videos);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onGenerate = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
      const { data } = await api.post("/videos/generate", {
        prompt: `${templateText} Topic: ${prompt}`,
        category
      });
      setPreview(data.preview);
      await loadData();
      await refresh();
    } finally {
      setLoading(false);
    }
  };

  const onUpgrade = async () => {
    const { data } = await api.post("/payments/create-order");
    await api.post("/payments/verify", {
      orderId: data.order.id,
      paymentId: `pay_mock_${Date.now()}`,
      signature: "mock_signature"
    });
    await refresh();
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl space-y-6 px-6 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">PromptShorts AI Dashboard</h1>
          <p className="text-slate-300">
            Plan: {user?.plan} · Credits left today: {user?.creditsRemaining}
          </p>
        </div>
        <div className="space-x-3">
          {user?.plan === "free" && (
            <button className="rounded-xl bg-amber-400 px-4 py-2 font-semibold text-slate-950" onClick={onUpgrade}>
              Upgrade ₹299/month
            </button>
          )}
          <button className="rounded-xl bg-slate-700 px-4 py-2" onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl bg-slate-900 p-5">
          <h2 className="text-xl font-bold">1) Choose a template</h2>
          <TemplatePicker templates={templates} selected={category} onSelect={setCategory} />
          <p className="text-sm text-slate-400">Template: {templateText}</p>
          <h2 className="text-xl font-bold">2) Enter your prompt</h2>
          <textarea
            rows="4"
            className="w-full rounded-xl bg-slate-800 p-3"
            placeholder="e.g. morning routine for success"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="w-full rounded-xl bg-brand px-4 py-3 font-semibold disabled:opacity-50"
            onClick={onGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Video"}
          </button>
        </div>

        <div>
          <VideoPreview preview={preview} />
        </div>
      </section>

      <section className="rounded-2xl bg-slate-900 p-5">
        <h2 className="mb-4 text-xl font-bold">Recent videos</h2>
        <div className="space-y-3">
          {videos.map((video) => (
            <div key={video._id} className="flex flex-wrap items-center justify-between rounded-xl bg-slate-800 p-3">
              <div>
                <p className="font-semibold">{video.category}</p>
                <p className="text-sm text-slate-400">{video.prompt.slice(0, 80)}...</p>
              </div>
              <a href={video.videoUrl} className="text-brand" target="_blank" rel="noreferrer">Open</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
