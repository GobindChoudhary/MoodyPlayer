import React, { useState } from "react";
import MoodyPlayer from "./components/MoodyPlayer";
import SongList from "./components/SongList";

const backgroundPattern = {
  backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%),
                   radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
};

const MusicIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const LiveIndicator = () => (
  <div className="hidden md:flex items-center space-x-2 bg-gray-900/50 rounded-full px-4 py-2 border border-gray-800">
    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
    <span className="text-gray-300 text-sm font-medium">Live Detection</span>
  </div>
);

const Header = () => (
  <header className="px-6 py-8 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <MusicIcon />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Moody Player
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              AI-powered music that reads your emotions
            </p>
          </div>
        </div>
        <LiveIndicator />
      </div>
    </div>
  </header>
);

const MainContent = ({ songs, setSongs }) => (
  <main className="flex-1 px-6 pb-8 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
          <MoodyPlayer setSongs={setSongs} />
        </section>
        <section className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50 p-6">
          <SongList songs={songs} />
        </section>
      </div>
    </div>
  </main>
);

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={backgroundPattern} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <MainContent songs={songs} setSongs={setSongs} />
      </div>
    </div>
  );
}

export default App;
