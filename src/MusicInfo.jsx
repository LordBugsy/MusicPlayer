import { useContext, useEffect, useState, useRef } from 'react';
import styles from './Playlist.module.css';
import KalosPowerPlant from './audio/Kalos Power Plant.mp3';
import SherbetLand from './audio/N64 Sherbet Land.mp3';
import PokemonCenter from './audio/Pokémon Center (Black & White).mp3';
import { MusicData } from './DataProvider';

const MusicInfo = () => {
    const { setMusicItemVisibility, currentMusicIndex, currentMusicName, setVolumeState, globalVolume } = useContext(MusicData);
    const previousMusicIndexRef = useRef();
    const {isAudioActivated, setButtonState} = useContext(MusicData);

    const [isMusicPlayed, setMusic] = useState(isAudioActivated);
    const [isRepeat, setRepeat] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(globalVolume);
    
    const closeMusicItem = () => {
        const musicContainer = document.getElementById('container');
        musicContainer.classList.add(styles.fadeOut);
        musicContainer.classList.remove(styles.fadeIn);
        setTimeout(() => setMusicItemVisibility(false), 310);
    };


    const getMusicFullTime = () => {
        const audio = document.getElementById(`${currentMusicIndex}`);
        if (audio && audio.duration) {
            const minutes = parseInt(audio.duration / 60);
            const seconds = String(parseInt(audio.duration % 60)).padStart(2,'0');
            return `${minutes}:${seconds}`;
        }
        return '0:00';
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const musicContainer = document.getElementById('container');
            if (musicContainer && event.target === musicContainer) closeMusicItem();
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);
    
    const toggleRepeat = () => {
        const audio = document.getElementById(`${currentMusicIndex}`);
        setRepeat(!isRepeat);
        audio.loop = !isRepeat;
    };
    
    const toggleMusic = () => {
        //resetPreviousMusic();
        setMusic(!isMusicPlayed);
        setButtonState(!isAudioActivated);

        const audio = document.getElementById(`${currentMusicIndex}`);
        if (!isMusicPlayed) audio.play();
        else audio.pause();
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    
    const updateProgress = () => {
        const audio = document.getElementById(`${currentMusicIndex}`);
        if (audio) setCurrentTime(audio.currentTime);

    };

    const handleLoadedMetadata = () => {
        const audio = document.getElementById(`${currentMusicIndex}`);
        if (audio) setDuration(audio.duration);
    };
    
    const handleVolumeChange = (event) => {
        const audio = document.getElementById(`${currentMusicIndex}`);
        const newVolume = event.target.value;

        if (audio) audio.volume = newVolume;

        setVolume(newVolume);
        setVolumeState(newVolume);
    };

    useEffect(() => {
        const audio = document.getElementById(`${currentMusicIndex}`);
        if (audio) {
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.volume = volume;
            setVolumeState(volume);

            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            };
        }
    }, [currentMusicIndex, volume]);

    return (
        <div id='container' className={`${styles.musicInfoContainer} ${styles.fadeIn}`}>
            <div className={styles.musicInfo}>
                <div className={styles.flex}>
                    <i className={`ri-music-line ${styles.musicIcon} ${styles.smallIcon}`}></i>
                    <div className={styles.spaceBetween}>
                        <h1 className={styles.musicName}>{currentMusicName}</h1> 
                        <p id='time' className={styles.musicTime}>{formatTime(currentTime)} / {getMusicFullTime()}</p>
                    </div>
                </div>

                <div className={styles.volumeControl}>
                    <label htmlFor="volume">Volume:</label>
                    <input id="volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                </div>
                
                <div className={styles.bottom}>
                    <i onClick={toggleRepeat} className={`ri-loop-right-line ${!isRepeat ? styles.falseRepeat : styles.trueRepeat}`}></i>
                    <button onClick={toggleMusic} className={`${styles.button} ${isMusicPlayed ? styles.stop : styles.play}`}>
                        {isMusicPlayed ? 'Pause' : 'Play'}
                    </button>
                </div>
            </div>

            <div>
                <audio id='0' src={KalosPowerPlant} />
                <audio id='1' src={SherbetLand} />
                <audio id='2' src={PokemonCenter} />
            </div> 
        </div>
    );
};

export default MusicInfo;
