import React, { useEffect, useRef, useState, useCallback } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const MODEL_URL = "/models";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LiveIndicator = () => (
  <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-3 py-1 border border-gray-700">
    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
    <span className="text-gray-300 text-xs font-medium">LIVE</span>
  </div>
);

const LoadingSpinner = ({ size = "w-4 h-4" }) => (
  <div
    className={`${size} border-2 border-white border-t-transparent rounded-full animate-spin`}
  />
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clipRule="evenodd"
    />
  </svg>
);

const MoodProgressBar = ({ isDetecting }) => (
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div
      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
      style={{ width: isDetecting ? "60%" : "100%" }}
    />
  </div>
);

const VideoSection = ({ videoRef }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
    <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/50">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  </div>
);

const MoodyPlayer = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [currentMood, setCurrentMood] = useState("neutral");
  const [isDetecting, setIsDetecting] = useState(false);

  const initializeCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera initialization failed:", error);
    }
  }, []);

  const loadFaceApiModels = useCallback(async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      await initializeCamera();
    } catch (error) {
      console.error("Model loading failed:", error);
    }
  }, [initializeCamera]);

  const fetchMoodBasedSongs = useCallback(
    async (mood) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/songs?mood=${mood}`);
        setSongs(response.data.songs);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    },
    [setSongs]
  );

  const detectMood = useCallback(async () => {
    if (!videoRef.current || !faceapi.nets.faceExpressionNet.params) {
      return;
    }

    setIsDetecting(true);

    try {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections?.expressions) {
        const sortedExpressions = Object.entries(detections.expressions).sort(
          ([, a], [, b]) => b - a
        );

        const dominantMood = sortedExpressions[0][0];
        setCurrentMood(dominantMood);
        await fetchMoodBasedSongs(dominantMood);
      }
    } catch (error) {
      console.error("Mood detection failed:", error);
    } finally {
      setIsDetecting(false);
    }
  }, [fetchMoodBasedSongs]);

  useEffect(() => {
    loadFaceApiModels();
  }, [loadFaceApiModels]);

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Camera Feed</h2>
        <LiveIndicator />
      </div>

      <VideoSection videoRef={videoRef} />

      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-white mb-2">Mood Analysis</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Real-time facial expression analysis powered by AI
          </p>
        </div>

        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Current Mood
            </span>
            {isDetecting && (
              <div className="flex items-center space-x-2">
                <LoadingSpinner />
                <span className="text-xs text-indigo-400">Analyzing...</span>
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-white capitalize mb-2">
            {currentMood}
          </div>
          <MoodProgressBar isDetecting={isDetecting} />
        </div>

        <button
          onClick={detectMood}
          disabled={isDetecting}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-[1.01] disabled:transform-none"
        >
          {isDetecting ? (
            <>
              <LoadingSpinner size="w-5 h-5" />
              <span>Analyzing Mood...</span>
            </>
          ) : (
            <>
              <PlayIcon />
              <span>Detect My Mood</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MoodyPlayer;
