import { Link, useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const AuthPage = () => {
  const { pathname } = useLocation();
  const mode = pathname.includes("signup") ? "signup" : "login";

  return (
    <div className="mx-auto grid min-h-screen max-w-5xl place-items-center px-6">
      <div className="grid w-full gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-black">PromptShorts AI</h1>
          <p className="mt-3 text-slate-300">
            Turn prompts into 9:16 YouTube Shorts with AI video, captions, voiceover, and trending music.
          </p>
          <p className="mt-2 text-slate-400">Free 3 videos/day · Paid ₹299/month unlimited</p>
        </div>
        <div>
          <AuthForm mode={mode} />
          <p className="mt-4 text-sm text-slate-400">
            {mode === "login" ? (
              <>
                New here? <Link to="/signup" className="text-brand">Create account</Link>
              </>
            ) : (
              <>
                Already registered? <Link to="/login" className="text-brand">Login</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
