import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  LayoutDashboard, 
  Search, 
  BarChart2, 
  BookOpen, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Globe,
  Clock,
  LogOut,
  ChevronDown,
  Languages,
  FileText,
  UserPlus,
  MapPin,
  HelpCircle
} from 'lucide-react';
import Dashboard from './Dashboard';
import Explore from './Explore';
import QuickFacts from './QuickFacts';
import Timeline from './Timeline';
import Documents from './Documents';
import BoothLocator from './BoothLocator';
import FAQNavigator from './FAQNavigator';
import FirstVoterGuide from './FirstVoterGuide';
import AuthWall from './AuthWall';
import Chatbot from './Chatbot';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import { t, languages } from '../utils/i18n';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function Layout() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [currentLang, setCurrentLang] = useState('English');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: t('dashboard', currentLang), icon: <LayoutDashboard size={24} />, component: <Dashboard lang={currentLang} /> },
    { id: 'explore', label: t('explore', currentLang), icon: <BarChart2 size={24} />, component: <Explore lang={currentLang} /> },
    { id: 'booth', label: t('findBooth', currentLang), icon: <MapPin size={24} />, component: <BoothLocator lang={currentLang} /> },
    { id: 'faq', label: 'FAQ Navigator', icon: <HelpCircle size={24} />, component: <FAQNavigator lang={currentLang} /> },
    { id: 'timeline', label: t('timeline', currentLang), icon: <Clock size={24} />, component: <Timeline lang={currentLang} /> },
    { id: 'documents', label: t('documents', currentLang), icon: <FileText size={24} />, component: <Documents lang={currentLang} /> },
    { id: 'facts', label: t('facts', currentLang), icon: <BookOpen size={24} />, component: <QuickFacts lang={currentLang} /> },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleNavClick = (id) => {
    setActiveModule(id);
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
    if (analytics) logEvent(analytics, 'module_view', { module_id: id, language: currentLang });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    if (analytics) logEvent(analytics, 'login', { language: currentLang });
  };

  const handleSignOut = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  return (
    <>
      {!user && <AuthWall onLogin={handleLogin} lang={currentLang} />}

      <div className={`bg-gradient-main`} style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        
        {/* Sidebar Navigation */}
        <aside 
          role="navigation"
          aria-label="Main Navigation"
          className="glass-panel" 
          style={{
            ...styles.sidebar,
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            width: isSidebarOpen ? '320px' : '0',
            opacity: isSidebarOpen ? 1 : 0,
            margin: isSidebarOpen ? '20px' : '0',
            padding: isSidebarOpen ? '32px' : '0',
            transition: 'all-ease 0.3s',
            position: window.innerWidth < 1024 ? 'fixed' : 'relative',
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={styles.logoBox}>C</div>
            <h2 style={{ fontSize: '1.8rem', margin: 0, fontWeight: '900', color: 'var(--navy)' }}>ChunaavAI</h2>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeModule === item.id ? 'page' : undefined}
                className={`nav-link ${activeModule === item.id ? 'active' : ''}`}
                style={{ ...styles.navItem, color: activeModule === item.id ? 'var(--navy)' : 'var(--text-secondary)' }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Enhanced Language Selector via Google Translate */}
          <div style={{ marginTop: 'auto', padding: '20px 0', borderTop: '1px solid var(--glass-border)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Languages size={18} color="var(--text-secondary)" />
                <select 
                  aria-label="Select Language"
                  value={currentLang} 
                  onChange={(e) => {
                    const selectedLang = e.target.value;
                    setCurrentLang(selectedLang);
                    
                    const langCodes = {
                      'English': 'en', 'Hindi': 'hi', 'Tamil': 'ta', 'Telugu': 'te', 
                      'Bengali': 'bn', 'Marathi': 'mr', 'Kannada': 'kn', 'Malayalam': 'ml', 'Gujarati': 'gu'
                    };
                    
                    const code = langCodes[selectedLang];
                    const gtSelect = document.querySelector('.goog-te-combo');
                    if (gtSelect && code) {
                      gtSelect.value = code;
                      gtSelect.dispatchEvent(new Event('change'));
                    }
                  }}
                  style={styles.langSelect}
                >
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
             </div>

             <button 
               onClick={toggleTheme} 
               className="nav-link" 
               style={{ ...styles.navItem, padding: '12px 16px' }}
               aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
             >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main id="main-content" style={{ flex: 1, overflowY: 'auto', padding: '32px', position: 'relative' }}>
          
          <header style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                style={styles.menuBtn}
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
                aria-expanded={isSidebarOpen}
              >
                {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
              
              <button 
                onClick={() => setIsGuideOpen(true)}
                className="glass-panel" 
                style={styles.guideBtn}
                aria-label="Open First Time Voter Guide"
              >
                <UserPlus size={18} />
                <span>First Time Voter? Click Here</span>
              </button>
            </div>
            
            <div style={styles.userSection}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                style={styles.profileCircle}
                aria-label="User Profile"
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                {user?.name?.charAt(0) || user?.identifier?.charAt(0) || 'U'}
              </button>
              
              {isProfileOpen && (
                <div 
                  className="glass-panel" 
                  style={styles.profileDropdown}
                  role="menu"
                >
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>
                    <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.identifier}</div>
                  </div>
                  <button onClick={handleSignOut} style={styles.signOutBtn} role="menuitem">
                    <LogOut size={16} /> {t('signOut', currentLang)}
                  </button>
                </div>
              )}
            </div>
          </header>

          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {navItems.find(item => item.id === activeModule)?.component}
          </div>
        </main>

        <FirstVoterGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
        <Chatbot />
      </div>
    </>
  );
}

const styles = {
  sidebar: {
    height: 'calc(100vh - 40px)',
    display: 'flex',
    flexDirection: 'column',
  },
  logoBox: {
    width: '48px',
    height: '48px',
    background: 'var(--navy)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '14px',
    fontSize: '1.6rem',
    fontWeight: '900',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 20px',
    fontSize: '1.1rem',
    borderRadius: '16px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  guideBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 20px',
    background: 'rgba(249, 115, 22, 0.1)',
    color: 'var(--saffron)',
    border: '1px solid rgba(249, 115, 22, 0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--navy)',
  },
  userSection: {
    position: 'relative',
  },
  profileCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'var(--saffron)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
    textTransform: 'uppercase',
    border: 'none',
  },
  profileDropdown: {
    position: 'absolute',
    top: '60px',
    right: 0,
    width: '220px',
    zIndex: 100,
    padding: 0,
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.98)',
  },
  signOutBtn: {
    width: '100%',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#ef4444',
    fontSize: '0.9rem',
    textAlign: 'left',
  },
  langSelect: {
    background: 'none',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    fontWeight: '600',
    outline: 'none',
    cursor: 'pointer',
  }
};

Layout.propTypes = {
  // Component manages internal state, no props passed from parent
};
