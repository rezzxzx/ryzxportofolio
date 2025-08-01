import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, X, Disc3, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PORTFOLIO_CONFIG } from "@/config/constants";

interface FloatingMusicPlayerProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FloatingMusicPlayer({ isOpen: externalIsOpen, onToggle }: FloatingMusicPlayerProps = {}) {
  // Don't render if music player is disabled
  if (!PORTFOLIO_CONFIG.musicPlayer.enabled) {
    return null;
  }

  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleToggle = onToggle || (() => setInternalIsOpen(!internalIsOpen));
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
  const autoplay = PORTFOLIO_CONFIG.musicPlayer.autoplay || false;
  const loopPlaylist = PORTFOLIO_CONFIG.musicPlayer.loop || false;

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
    // For new playlist format, title is already clean
    if (currentTrack.title) {
      return currentTrack.title;
    }
    // Fallback for old format
    return title.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Update audio source when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Handle both old and new playlist formats
    const trackUrl = currentTrack.url || currentTrack.url;
    audio.src = trackUrl;
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

      {/* Professional Music Player Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-4 top-16 w-80 bg-gradient-to-br from-gray-900/98 to-gray-800/95 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-2xl overflow-hidden z-50"
            initial={{ opacity: 0, x: 30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
          >
              {/* Header Gradient */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-600/20 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 p-4">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-gray-500'}`}
                      animate={isPlaying ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                      transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
                    />
                    <h3 className="text-sm font-semibold text-white">Now Playing</h3>
                  </div>
                  <Button
                    onClick={() => handleToggle()}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                {/* Track Info with Real Cover */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative w-12 h-12 rounded-lg shadow-lg overflow-hidden flex-shrink-0">
                    {currentTrack.cover ? (
                      <img 
                        src={currentTrack.cover} 
                        alt={`${currentTrack.title} cover`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to gradient background if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Music className="h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-white truncate">
                      {currentTrack.title}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {currentTrack.artist || "Unknown Artist"}
                    </p>
                  </div>
                </div>

                {/* Compact Progress Bar with Time */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{formatTime((progress[0] / 100) * duration)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <Slider
                    value={progress}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={1}
                    className="w-full h-1"
                    disabled={!isLoaded}
                  />
                </div>

                {/* Compact Controls */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {playlist.length > 1 && (
                      <Button
                        onClick={playPrevious}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
                      >
                        <SkipBack className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      onClick={togglePlay}
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full shadow-lg border border-blue-400/30 transition-all duration-300"
                      disabled={!isLoaded}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 ml-0.5" />
                      )}
                    </Button>

                    {playlist.length > 1 && (
                      <Button
                        onClick={playNext}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
                      >
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Track Counter & Volume in one line */}
                  <div className="flex items-center space-x-2">
                    {playlist.length > 1 && (
                      <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                        {currentTrackIndex + 1}/{playlist.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Compact Volume Controls */}
                <div className="flex items-center space-x-3 bg-gray-800/30 rounded-lg p-2">
                  <Button
                    onClick={toggleMute}
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-full transition-all duration-200"
                  >
                    {isMuted ? (
                      <VolumeX className="h-3 w-3" />
                    ) : (
                      <Volume2 className="h-3 w-3" />
                    )}
                  </Button>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={1}
                    step={0.1}
                    className="flex-1 h-1"
                  />
                  <span className="text-xs text-gray-400 w-8 text-right font-mono">
                    {Math.round(volume[0] * 100)}%
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
}