import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause, Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PORTFOLIO_CONFIG } from "@/config/constants";

export default function CompactMusicPlayer() {
  // Don't render if music player is disabled
  if (!PORTFOLIO_CONFIG.musicPlayer.enabled) {
    return null;
  }

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

      {/* Compact Music Player for Sidebar */}
      <motion.div
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 mx-2 mb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Now Playing Info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
            <p className="text-xs text-gray-300 truncate">
              Now Playing: {formatTrackTitle(currentTrack.title)}
            </p>
          </div>
          <div className="text-xs text-gray-400">
            {playlist.length > 1 && `${currentTrackIndex + 1}/${playlist.length}`}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            max={100}
            step={1}
            className="w-full h-1"
            disabled={!isLoaded}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Play Controls */}
          <div className="flex items-center space-x-1">
            {playlist.length > 1 && (
              <Button
                onClick={playPrevious}
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-300 hover:text-white"
              >
                <SkipBack className="h-3 w-3" />
              </Button>
            )}
            
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-300 hover:text-white"
              disabled={!isLoaded}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>

            {playlist.length > 1 && (
              <Button
                onClick={playNext}
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-gray-300 hover:text-white"
              >
                <SkipForward className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Volume Controls */}
          <div className="flex items-center space-x-2 flex-1 max-w-20 ml-3">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-gray-300 hover:text-white"
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
              className="w-full h-1"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}