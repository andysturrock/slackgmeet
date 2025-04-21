/**
 * This is just a placeholder.  I can't think of any functionality requiring the main stage for now.
*/
import React from 'react';
import './App.css';
import { useEffect } from 'react';
import {
    meet
} from '@googleworkspace/meet-addons/meet.addons';

export function MainStage() {
  const projectNumber = process.env.REACT_APP_PROJECT_NUMBER ?? "";

  useEffect(() => {
    (async () => {
        const session = await meet.addon.createAddonSession({
            cloudProjectNumber: projectNumber,
        });
        await session.createMainStageClient();
    })();
  }, [projectNumber]);

  let message = "Hello from your Google Meet Add-on Main Stage!";
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
