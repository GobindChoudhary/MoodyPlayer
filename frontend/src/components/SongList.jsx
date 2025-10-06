import { useState, useCallback, memo } from "react";

const SpeakerIcon = () => (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12a7.971 7.971 0 00-1.343-4.243 1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const MusicNoteIcon = () => (
  <svg
    className="w-6 h-6 text-indigo-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const TrackCounter = memo(({ count }) => (
  <div className="bg-gray-800/50 md:rounded-full px-2 py-1 md:px-3 border border-gray-700">
    <span className="text-gray-300 text-xs font-medium line-clamp-1">
      {count} tracks
    </span>
  </div>
));

const EmptyPlaylist = memo(() => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700/50">
        <svg
          className="w-10 h-10 text-gray-500"
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
      <h3 className="text-lg font-medium text-white mb-2">No tracks yet</h3>
      <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
        Analyze your mood to discover personalized music recommendations that
        match your current vibe
      </p>
    </div>
  </div>
));

const AudioPlayer = memo(({ song, index, isPlaying }) =>
  isPlaying === index ? (
    <audio
      key={`audio-${index}`}
      src={song.audio}
      autoPlay
      className="hidden"
    />
  ) : null
);

const PlayButton = memo(({ isPlaying, onClick }) => (
  <button
    onClick={onClick}
    className="ml-4 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:rotate-3"
  >
    {isPlaying ? <PauseIcon /> : <PlayIcon />}
  </button>
));

const TrackItem = memo(({ song, index, isPlaying, onPlayPause }) => {
  const handleClick = useCallback(() => {
    onPlayPause(index);
  }, [index, onPlayPause]);

  return (
    <div className="group bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-gray-600/50 hover:bg-gray-800/60 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-gray-700/50">
            <MusicNoteIcon />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate group-hover:text-indigo-300 transition-colors">
              {song.title}
            </h3>
            <p className="text-gray-400 text-xs mt-1 truncate">{song.artist}</p>
          </div>
        </div>

        <AudioPlayer song={song} index={index} isPlaying={isPlaying} />
        <PlayButton isPlaying={isPlaying === index} onClick={handleClick} />
      </div>
    </div>
  );
});

const PlaylistHeader = memo(({ songsCount }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
        <SpeakerIcon />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">Your Playlist</h2>
        <p className="text-gray-400 text-sm">Mood-based recommendations</p>
      </div>
    </div>

    {songsCount > 0 && <TrackCounter count={songsCount} />}
  </div>
));

const SongList = ({ songs = [] }) => {
  const [playingTrackIndex, setPlayingTrackIndex] = useState(null);

  const togglePlayback = useCallback((trackIndex) => {
    setPlayingTrackIndex((current) =>
      current === trackIndex ? null : trackIndex
    );
  }, []);

  const hasNoSongs = songs.length === 0;

  return (
    <div className="h-full flex flex-col space-y-6">
      <PlaylistHeader songsCount={songs.length} />

      <div className="flex-1 min-h-0">
        {hasNoSongs ? (
          <EmptyPlaylist />
        ) : (
          <div className="h-full overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {songs.map((song, index) => (
              <TrackItem
                key={`track-${index}-${song.title}`}
                song={song}
                index={index}
                isPlaying={playingTrackIndex}
                onPlayPause={togglePlayback}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SongList);
