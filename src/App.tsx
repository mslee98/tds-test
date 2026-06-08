import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import { AppShell } from './layout/AppShell';
import { MobileViewport } from './layout/MobileViewport';
import { DevToolsPage } from './pages/DevToolsPage';
import { HomePage } from './pages/HomePage';

const isDevTools =
  new URLSearchParams(window.location.search).get('page') === 'devtools';

function App() {
  return (
    <TDSMobileAITProvider brandPrimaryColor="#111111" fontScaleAvailable>
      <AppShell>
        <MobileViewport>
          {isDevTools ? <DevToolsPage /> : <HomePage />}
        </MobileViewport>
      </AppShell>
    </TDSMobileAITProvider>
  );
}

export default App;
