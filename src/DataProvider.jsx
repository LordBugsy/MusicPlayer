import React, {useState, createContext} from "react";
export const MusicData = createContext();

const DataProvider = ({children}) => {
    const [audio, setAudio] = useState("");
    const [isSongSelected, toggleSongPlay] = useState(false);

    
    const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
    const [currentMusicName, setCurrentMusicName] = useState("");
    const [isMusicItemVisibile, setMusicItemVisibility] = useState(false);


    const [globalVolume, setVolumeState] = useState(0.5);
    const [previousIndex, setPreviousIndex] = useState(0);
    const [isAudioActivated, setButtonState] = useState(false);    

    return (
        <MusicData.Provider value={{audio, setAudio, isSongSelected, toggleSongPlay, isMusicItemVisibile, setMusicItemVisibility,
            currentMusicIndex, setCurrentMusicIndex, currentMusicName, setCurrentMusicName, globalVolume, setVolumeState, isAudioActivated, setButtonState
        }}>
            {children}
        </MusicData.Provider>
    )
}

export default DataProvider