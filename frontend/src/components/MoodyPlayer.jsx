import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const MoodyPlayer = ({ setSongs }) => {
  const videoRef = useRef(null);
  const [currentMood, setCurrentMood] = useState("neutral");
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // ensure models are in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Camera error:", err));
    };

    loadModels();
  }, []);

  const interval = async () => {
    if (videoRef.current && faceapi.nets.faceExpressionNet.params) {
      setIsDetecting(true);
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (detections && detections.expressions) {
        const sorted = Object.entries(detections.expressions).sort(
          (a, b) => b[1] - a[1]
        );
        const mood = sorted[0][0];
        setCurrentMood(mood);
        console.log(mood);

        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/songs?mood=${mood}`
          );
          setSongs(res.data.songs);
        } catch (err) {
          console.error("Error fetching songs:", err);
        }
      }
      setIsDetecting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
        <div className="flex flex-col items-center space-y-6">
          {/* Video Section with modern styling */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl blur opacity-40"></div>
            <div className="relative w-64 h-64 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>

              {/* Live indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-medium">LIVE</span>
              </div>
            </div>
          </div>

          {/* Mood Detection Info with glassmorphism */}
          <div className="w-full max-w-sm text-center space-y-4">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 tracking-tight">
                Live Mood Detection
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Your current mood is being analyzed in real-time. Enjoy music
                tailored to your feelings.
              </p>
            </div>

            {/* Modern mood display card */}
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 backdrop-blur-sm rounded-2xl p-4 border border-blue-100/50 shadow-lg">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
                Current mood
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent capitalize tracking-tight">
                {currentMood || "Analyzing..."}
              </div>
            </div>

            {/* Modern CTA button */}
            <button
              onClick={interval}
              disabled={isDetecting}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:from-blue-400 disabled:to-teal-400 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none tracking-wide"
            >
              {isDetecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium">Analyzing...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">Start Listening</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodyPlayer;
