import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';
import { AppShell } from './layout/AppShell';
import { MobileViewport } from './layout/MobileViewport';
import { DevToolsPage } from './pages/DevToolsPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { LottieTestPage } from './pages/LottieTestPage';
import { SignupPage } from './pages/SignupPage';

const page = new URLSearchParams(window.location.search).get('page');

function App() {
  return (
    <TDSMobileAITProvider brandPrimaryColor="#111111" fontScaleAvailable>
      <div className="flex min-h-0 w-full flex-1 flex-col">
        <AppShell>
          <MobileViewport>
            {page === 'devtools' ? (
              <DevToolsPage />
            ) : page === 'lottie' ? (
              <LottieTestPage />
            ) : page === 'signup' ? (
              <SignupPage />
            ) : page === 'login' ? (
              <LoginPage />
            ) : (
              <HomePage />
            )}
          </MobileViewport>
        </AppShell>
      </div>
    </TDSMobileAITProvider>
  );
}

export default App;
