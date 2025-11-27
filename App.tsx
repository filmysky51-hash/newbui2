
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { useFCM } from './hooks/useFCM';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import LoadingScreen from './components/LoadingScreen';
import MaintenanceScreen from './components/MaintenanceScreen';
import AppLockPage from './pages/AppLockPage';
import WelcomeModal from './components/WelcomeModal';
import ThemeModal from './components/ThemeModal';
import AboutMeModal from './components/AboutMeModal';

import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DetailPage from './pages/DetailPage';
import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import LiveTvPage from './pages/LiveTvPage';
import LiveTvNetworkDetailPage from './pages/LiveTvNetworkDetailPage';
import LiveTvPlayerPage from './pages/LiveTvPlayerPage';
import WatchlistPage from './pages/WatchlistPage';
import CategoryPage from './pages/CategoryPage';
import UpcomingPage from './pages/UpcomingPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import DmcaPage from './pages/DmcaPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import RequestContentPage from './pages/RequestContentPage';
import PaymentPage from './pages/PaymentPage';
import AdminPage from './pages/AdminPage';
import AdPage from './pages/AdPage';
import SearchPage from './pages/SearchPage';
import PlayerPage from './pages/PlayerPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { authLoading, appSettings, user } = useAppContext();
  const location = useLocation();
  const [isLocked, setIsLocked] = useState(!!localStorage.getItem('filmysky_app_pin'));
  const [unlockedSession, setUnlockedSession] = useState(false);

  useFCM();

  // Maintenance Mode Check
  const isMaintenance = appSettings?.maintenance?.status === 'ACTIVE';
  // Admin bypass maintenance
  const isAdmin = user?.role === true;
  
  if (authLoading) return <LoadingScreen />;

  if (isLocked && !unlockedSession) {
    return <AppLockPage onUnlock={() => setUnlockedSession(true)} />;
  }

  if (isMaintenance && !isAdmin) {
      return <MaintenanceScreen status={appSettings?.maintenance?.status || 'ACTIVE'} config={appSettings?.maintenance} />;
  }

  // Determine if navigation bars should be hidden
  const isPlayer = location.pathname.startsWith('/player/');
  const isLiveTvPlayer = location.pathname.match(/^\/livetv\/[^/]+\/[^/]+$/); // Matches /livetv/:networkId/:streamId
  const isAd = location.pathname === '/ad';
  const isAuth = location.pathname === '/auth';
  const isAdminPage = location.pathname.startsWith('/admin');
  
  const hideNav = isPlayer || isLiveTvPlayer || isAd || isAuth || isAdminPage;

  return (
    <div className={`min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 font-sans ${!hideNav ? 'pb-16 md:pb-0' : ''}`}>
      <ScrollToTop />
      {!hideNav && <Header />}
      
      <main className={`${!hideNav ? 'pt-16' : ''} min-h-screen`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/livetv" element={<LiveTvPage />} />
          <Route path="/livetv/:networkId" element={<LiveTvNetworkDetailPage />} />
          <Route path="/livetv/:networkId/:streamId" element={<LiveTvPlayerPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/request" element={<RequestContentPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/ad" element={<AdPage />} />
          
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/dmca" element={<DmcaPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<div className="flex justify-center items-center h-screen">Page Not Found</div>} />
        </Routes>
      </main>

      {!hideNav && <BottomNav />}
      
      <ThemeModal />
      <WelcomeModal />
      <AboutMeModal />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
