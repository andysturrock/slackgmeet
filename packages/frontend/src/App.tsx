import React from 'react';
import './App.css';
import { MainStage } from './MainStage';
import { SidePanel } from './SidePanel';

function App() {

  const fullURL = window.location.href;
  const currentPath = window.location.pathname;
  let message = "Hello from your Google Meet Add-on!";
  console.log(`Current path: ${currentPath}`)
  console.log(`Full URL: ${fullURL}`)

  if (currentPath === '/main-stage') {
    return (
      <MainStage/>
    )
  } else if (currentPath === '/side-panel') {
    return (
      <SidePanel/>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;