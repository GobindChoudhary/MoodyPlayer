import { useState } from "react";

const SongList = ({ songs = [] }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
            Recommended Tracks
          </h2>
        </div>

        {songs.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2 tracking-tight">
                No tracks yet
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed font-light">
                Detect your mood to generate a personalized playlist that
                matches your vibe
              </p>
            </div>
          </div>
        )}

        {songs.length > 0 && (
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {songs.map((song, index) => (
              <div
                key={index}
                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-white/30 hover:border-purple-200/50 transform hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center">
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors tracking-tight font-sans">
                      {song.title}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mt-1 font-sans">
                      {song.artist}
                    </p>
                  </div>

                  {isPlaying === index && (
                    <audio
                      key={index}
                      src={song.audio}
                      autoPlay
                      className="hidden"
                    />
                  )}

                  <button
                    onClick={() => handlePlayPause(index)}
                    className="ml-4 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group-hover:rotate-3"
                  >
                    {isPlaying === index ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongList;
