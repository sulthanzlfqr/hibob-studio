import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EntryWrapper from './EntryWrapper'
import { PrivacyPage, TermsPage, RobloxCompliancePage } from './LegalPages'

function Router() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (route === "#/privacy") return <PrivacyPage />;
  if (route === "#/terms") return <TermsPage />;
  if (route === "#/roblox-compliance") return <RobloxCompliancePage />;
  return <EntryWrapper />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
