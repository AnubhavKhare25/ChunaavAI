import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Search, Info } from 'lucide-react';
import { t } from '../utils/i18n';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function BoothLocator({ lang }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    const url = `https://www.google.com/maps/search/?api=1&query=Election+Commission+Office+near+${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>{t('findBooth', lang)}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Locate your nearest electoral registration office or polling station.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={styles.container}
      >
        <form onSubmit={handleSearch} style={styles.form}>
          <div style={styles.inputWrapper}>
            <MapPin size={20} color="var(--text-secondary)" />
            <label htmlFor="booth-search" className="sr-only">Search polling booth by pincode or city</label>
            <input 
              id="booth-search"
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('pincodePlaceholder', lang)} 
              style={styles.input}
              aria-label="Enter pincode or city"
            />
          </div>
          <button 
            type="submit" 
            className="btn-navy" 
            style={styles.submitBtn}
            aria-label="Search on Google Maps"
          >
            <Search size={18} />
            <span>{t('submit', lang)}</span>
          </button>
        </form>

        <div style={styles.helperBox}>
          <Info size={18} color="var(--navy)" />
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--navy)', fontWeight: '500' }}>
            {t('boothHelper', lang)}
          </p>
        </div>
      </motion.div>

      <div style={styles.quickLinks}>
         <div className="glass-panel" style={styles.infoCard}>
            <h4 style={{ margin: '0 0 12px 0', color: 'var(--navy)' }}>Blo Locator</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              You can also find your Booth Level Officer (BLO) on the ECI Voter Helpline App.
            </p>
         </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '48px',
    maxWidth: '800px',
    margin: '0 auto',
    background: 'white',
  },
  form: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  inputWrapper: {
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '0 20px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
  },
  input: {
    flex: 1,
    height: '60px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
  },
  submitBtn: {
    height: '60px',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '16px',
    fontSize: '1.1rem',
  },
  helperBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    background: 'rgba(30, 58, 138, 0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(30, 58, 138, 0.1)',
  },
  quickLinks: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  infoCard: {
    maxWidth: '400px',
    padding: '24px',
    textAlign: 'center',
  }
};
