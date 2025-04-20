import React from 'react';
import './App.css';

function App() {
  const currentPath = window.location.pathname;
  let message = "Hello from your Google Meet Add-on!";

  if (currentPath === '/main-stage') {
    message = "Hello from the Main Stage!";
  } else if (currentPath === '/side-panel') {
    message = "Hello from the Side Panel!";
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