import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [playlist] = useState([
    { title: "Chill Vibes", url: "/songs/song1.mp3" },
    { title: "Lo-Fi Beats", url: "/songs/song2.mp3" },
    { title: "Morning Tune", url: "/songs/song3.mp3" }
  ]);

  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef(null);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTrack = () => {
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };

  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value;
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <h2>🎵 React Music Player</h2>

      <label className="theme-switch">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="slider"></span> Dark Mode
      </label>

      <p><strong>Now Playing:</strong> {playlist[currentTrack].title}</p>
      <audio ref={audioRef} src={playlist[currentTrack].url} />

      <div className="controls">
        <button onClick={playPause}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={skipTrack}>⏭ Next</button>
        <input type="range" min="0" max="1" step="0.01" onChange={handleVolume} defaultValue="1" />
      </div>

      <h3>🎧 Playlist</h3>
      <ul className="playlist">
        {playlist.map((track, index) => (
          <li key={index}>
            <button
              className={index === currentTrack ? "active" : ""}
              onClick={() => {
                setCurrentTrack(index);
                setIsPlaying(true);
                setTimeout(() => audioRef.current.play(), 100);
              }}
            >
              🎵 {track.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
