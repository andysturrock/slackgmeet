import './SidePanel-tailwind.css';
import { useEffect, useState } from 'react';
import {
    meet,
    MeetSidePanelClient,
    MeetingInfo
} from '@googleworkspace/meet-addons/meet.addons';

export function SidePanel() {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo>();

  const projectNumber = process.env.REACT_APP_PROJECT_NUMBER ?? "";

  // Start the add-on session and create the sidePanelClient
  useEffect(() => {
    async function startSession() {
      const session = await meet.addon.createAddonSession({
        cloudProjectNumber: projectNumber,
      });
      setSidePanelClient(await session.createSidePanelClient());
    }
    startSession();
  }, [projectNumber]);  // projectNumber is technically a dependency but it will never change in reality.

  // Get meeting info once sidePanelClient is defined
  useEffect(() => {
    async function getMeetingInfo() {
      if(sidePanelClient) {
        setMeetingInfo(await sidePanelClient.getMeetingInfo());
      }
    }
    getMeetingInfo();
  }, [sidePanelClient]);

  const headerText = "Slack <-> GMeet integration";
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage('hello world');
  };

  return (
    <div className="sidepanel-content">
      <header className="sidepanel-header">
        <h1 className="sidepanel-heading">
          {headerText}
        </h1>
      </header>
      <main className="container mx-auto">
        <div className="mb-6">
          <h2 className="table-title">Meeting Info</h2>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="table-header-cell">
                  Meeting Code
                </th>
                <th scope="col" className="table-header-cell">
                  Meeting Id
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="table-cell">
                  {meetingInfo?.meetingCode ?? "Loading..."}
                </td>
                <td className="table-cell">
                {meetingInfo?.meetingId ?? "Loading..."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <button onClick={handleClick} className="click-me-button">
            click me
          </button>
        </div>

        {message && (
          <div className="message-text">
            {message}
          </div>
        )}
      </main>
    </div>
  );
}
