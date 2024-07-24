import styles from './MusicPage.module.css'
import image from './assets/2.jpg'

const MusicPage = () => {

    return (
        <div className={styles.musicPlayerContainer}>
            <img className={`${styles.backgroundImage} ${styles.fadeIn}`} src={image} />
        </div>
    );
    
}

export default MusicPage