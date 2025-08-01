import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PORTFOLIO_CONFIG } from "@/config/constants";

export default function MusicPlayer() {
  // Don't render if music player is disabled
  if (!PORTFOLIO_CONFIG.musicPlayer.enabled) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([0.5]);
  const [progress, setProgress] = useState([0]);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const playlist = PORTFOLIO_CONFIG.musicPlayer.playlist;
  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setDuration(audio.duration);
      if (PORTFOLIO_CONFIG.musicPlayer.autoplay) {
        // Auto-play with a slight delay to ensure proper loading
        setTimeout(() => {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Auto-play failed, user interaction required
            console.log("Auto-play prevented by browser");
          });
        }, 1000);
      }
    };

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress([(audio.currentTime / audio.duration) * 100]);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress([0]);
      // Play next track or loop to first
      playNext();
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0];
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log("Play failed");
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setProgress(value);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setProgress([0]);
    setIsLoaded(false);
  };

  const playPrevious = () => {
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    setProgress([0]);
    setIsLoaded(false);
  };

  const formatTrackTitle = (title: string) => {
    // Remove file extension and format as readable title
    return title.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  };

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.src = currentTrack.url;
    audio.load();
    
    if (isPlaying) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        preload="auto"
        loop={false}
      />

      {/* Optimized Music Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover-scale gpu-accelerated transition-colors duration-200"
          size="icon"
        >
          <div className={isPlaying ? 'animate-spin' : ''}>
            <Music className="h-5 w-5" />
          </div>
        </Button>

        {/* Music Player Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-16 right-0 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl p-3"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-base">🎵 Playing</h3>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white h-6 w-6 p-0 text-sm"
                >
                  ×
                </Button>
              </div>

              {/* Track Title */}
              <div className="mb-3 text-center">
                <p className="text-gray-300 font-medium truncate text-sm">
                  {formatTrackTitle(currentTrack.title)}
                </p>
                <p className="text-gray-500 text-xs">
                  {currentTrackIndex + 1} of {playlist.length}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>
                    {audioRef.current ? formatTime(audioRef.current.currentTime || 0) : "0:00"}
                  </span>
                  <span>{duration ? formatTime(duration) : "0:00"}</span>
                </div>
                <Slider
                  value={progress}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={0.1}
                  className="w-full"
                  disabled={!isLoaded}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Button
                  onClick={playPrevious}
                  disabled={!isLoaded}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                  size="icon"
                >
                  <SkipBack className="h-3 w-3" />
                </Button>
                
                <Button
                  onClick={togglePlay}
                  disabled={!isLoaded}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  size="icon"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
                
                <Button
                  onClick={playNext}
                  disabled={!isLoaded}
                  className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                  size="icon"
                >
                  <SkipForward className="h-3 w-3" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white p-2"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={1}
                  step={0.01}
                  className="flex-1"
                />
                <span className="text-xs text-gray-400 w-8">
                  {Math.round(volume[0] * 100)}%
                </span>
              </div>

              {/* Loading Indicator */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2 animate-spin" />
                    <p className="text-gray-400 text-xs">Loading...</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}