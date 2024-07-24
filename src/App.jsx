import MusicInfo from "./MusicInfo"
import Playlist from "./Playlist"
import DataProvider, {MusicData} from "./DataProvider"
import { useContext } from "react"

function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  )
}

function MainApp() {
  const { isMusicItemVisibile } = useContext(MusicData);
  return (
    <>
      <Playlist />
      {isMusicItemVisibile && <MusicInfo />}
    </>
  )
}

export default App
