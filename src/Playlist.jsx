import styles from './Playlist.module.css'
import KalosPowerPlant from './audio/Kalos Power Plant.mp3';
import SherbetLand from './audio/N64 Sherbet Land.mp3';
import PokemonCenter from './audio/Pokémon Center (Black & White).mp3';
import { MusicData } from './DataProvider'
import { useContext } from 'react'

const Playlist = () => {
    const { setCurrentMusicName, setCurrentMusicIndex, isMusicItemVisibile, setMusicItemVisibility } = useContext(MusicData);

    const slidePlaylistUp = (index, name) => {
        if (!isMusicItemVisibile) setMusicItemVisibility(!isMusicItemVisibile);
        orderSongIndex(index, name);
    }

    const orderSongIndex = (index, name) => {
        setCurrentMusicIndex(index);
        setCurrentMusicName(name);
    }

    const setMusicDuration = index => {
        const audio = document.getElementById(`${index}`);
        if (audio) {
            const minutes = parseInt(audio.duration / 60);
            const seconds = String(parseInt(audio.duration % 60)).padStart(2,'0');
            return `${minutes}:${seconds}`
        }

        else return "Loading...";
    }

    return (
        <div className={styles.playlistContainer}>
            <h1 className={styles.logo}>Music Player</h1>
            <div id='playlist' className={styles.playlist}>
                <div onClick={() => slidePlaylistUp(0, "Kalos Power Plant")} className={styles.card}>
                    <div className={styles.icon}>
                        <i className={`ri-music-2-line ${styles.scale}`}></i>
                    </div>
                    <div className={styles.name}>
                        <h1 className={styles.musicHeader}>Kalos Power Plant</h1>
                        <p id='time' className={styles.musicTime}>{setMusicDuration(0)}</p>
                    </div>

                    <audio id='0' src={KalosPowerPlant} />
                </div>

                <div onClick={() => slidePlaylistUp(1, "N64 Sherbet Land")} className={styles.card}>
                    <div className={styles.icon}>
                        <i className={`ri-music-2-line ${styles.scale}`}></i>
                    </div>
                    <div className={styles.name}>
                        <h1 className={styles.musicHeader}>N64 Sherbet Land</h1>
                        <p id='time' className={styles.musicTime}>{setMusicDuration(1)}</p>
                    </div>

                    <audio id='1' src={SherbetLand} />
                </div>

                <div onClick={() => slidePlaylistUp(2, "Pokémon Center (Black & White)")} className={styles.card}>
                    <div className={styles.icon}>
                        <i className={`ri-music-2-line ${styles.scale}`}></i>
                    </div>
                    <div className={styles.name}>
                        <h1 className={styles.musicHeader}>Pokémon Center (Black & White)</h1>
                        <p id='time' className={styles.musicTime}>{setMusicDuration(2)}</p>
                    </div>

                    <audio id='2' src={PokemonCenter} />
                </div>

                {/* <div className={styles.center}>
                    <button onClick={} className={`${styles.button} ${styles.add}`}>Add <i className="ri-add-circle-line"></i></button>
                </div> */}

            </div>

            <div className='copyright'>
                <p>Copyright © {new Date().getFullYear()} LordBugsy. All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Playlist