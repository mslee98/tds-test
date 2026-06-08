import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import { AppShell } from './layout/AppShell';
import { MobileViewport } from './layout/MobileViewport';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <TDSMobileAITProvider brandPrimaryColor="#111111" fontScaleAvailable>
      <AppShell>
        <MobileViewport>
          <HomePage />
        </MobileViewport>
      </AppShell>
    </TDSMobileAITProvider>
  );
}

export default App;
