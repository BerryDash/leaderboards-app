import { useEffect, useRef, useState } from "react"
import "./App.css"
import "@fontsource/lexend"
import { platform } from "@tauri-apps/plugin-os"

function App() {
  const [status, setStatus] = useState("")
  const [players, setPlayers] = useState<string[][]>([])
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return;
    if (platform() == "macos") document.body.classList.add("macos-body");
    if (platform() == "ios" || platform() == "android") {
      document.body.classList.add("mobile");
    } else {
      document.body.classList.add("desktop");
    }
    refresh();
    initialized.current = true;
  }, [])

  const refresh = async () => {
    setStatus("Loading...")
    setPlayers([]);
    try {
      const res = await fetch("https://berrydash.lncvrt.xyz/database/getTopPlayersAPI.php")
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const txt = await res.text()
      const entries = txt.split(";").map(x => {
        const [b64, score] = x.split(":")
        return [atob(b64), score]
      })
      setPlayers(entries)
      setStatus("")
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <main>
      <div className="top">
        <span style={{ color: status.startsWith("Error") ? "red" : "inherit" }}>{status}</span>
        <button onClick={refresh}>Refresh</button>
      </div>
      {players.length > 0 && (
        <div className="list">
          {players.map(([user, score], i) => (
            <div className="item" key={i}>
              <span>{user}</span>
              <span style={{ fontWeight: "bold" }}>{Number(score).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default App
