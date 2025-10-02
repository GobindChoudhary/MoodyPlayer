import React, { useState } from "react";
import MoodyPlayer from "./components/MoodyPlayer";
import SongList from "./components/SongList";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-28 h-28 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-bold">♪</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
              Moody Player
            </h1>
          </div>
          <p className="mt-3 text-gray-600 text-sm font-medium tracking-wide">
            AI-powered music that reads your emotions
          </p>
        </header>

        {/* Side-by-side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Left side - Camera and Mood Detection */}
          <div className="flex flex-col">
            <MoodyPlaygiter setSongs={setSongs} />
          </div>

          {/* Right side - Scrollable Tracks */}
          <div className="flex flex-col">
            <SongList songs={songs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
