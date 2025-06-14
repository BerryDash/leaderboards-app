import { useEffect } from "react";
import "./App.css";
import '@fontsource/lexend';
import { platform } from "@tauri-apps/plugin-os";

function App() {
  useEffect(() => {
    if (platform() == 'macos') document.body.classList.add('macos-body');
  });

  return (
    <main className="container">
      <p>Berry Leaderboards</p>
    </main>
  );
}

export default App;
