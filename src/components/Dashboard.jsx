import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Users, Activity, ShieldCheck, Heart, PlayCircle, ExternalLink } from 'lucide-react';
import data from '../data/electionData.json';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function Dashboard({ lang }) {
  // Image Proxy to bypass blocks for EXTERNAL assets only
  const proxy = (url) => {
    if (!url) return '';
    if (url.startsWith('/') || url.startsWith('blob:')) return url;
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=600`;
  };

  // Helper for actual YouTube thumbnails
  const getThumbnail = (url) => {
    const id = url.split('/').pop().split('?')[0];
    return proxy(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  };

  // Helper for Party Fallback Colors
  const getPartyColor = (abbr) => {
    const colors = {
      'BJP': '#FF9933',
      'INC': '#19AAED',
      'AAP': '#0072B0',
      'TMC': '#20C646',
      'DMK': '#DD1100',
      'CPI(M)': '#DE0000',
      'BSP': '#000080',
      'NCP': '#00B2B2'
    };
    return colors[abbr] || 'var(--navy)';
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>Election Intelligence</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Reliable summaries and verified civic data for Indian General Elections.</p>
      </div>

      <div style={styles.topStats}>
        <motion.div whileHover={{ y: -5 }} className="glass-panel" style={styles.card}>
          <div style={{ ...styles.iconWrapper, background: 'rgba(30, 58, 138, 0.1)', color: 'var(--navy)' }}>
            <Users size={24} />
          </div>
          <h3 style={styles.cardTitle}>Voter Base</h3>
          <p style={styles.cardValue}>968 Million</p>
          <p style={styles.sourceTag}>* Data according to 2024</p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="glass-panel" style={styles.card}>
          <div style={{ ...styles.iconWrapper, background: 'rgba(21, 128, 61, 0.1)', color: 'var(--green)' }}>
            <Activity size={24} />
          </div>
          <h3 style={styles.cardTitle}>ECI Oversight</h3>
          <p style={styles.cardValue}>1.05 Million</p>
          <p style={styles.sourceTag}>* Data according to 2024</p>
        </motion.div>
      </div>

      {/* ECI Learning Videos - Proper Inline Iframe Embedding */}
      <div style={{ marginTop: '64px' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PlayCircle fill="var(--saffron)" color="white" size={32} /> Learning Center: ECI Official Guides
        </h2>
        <div style={styles.videoGrid}>
          {data.eciVideos.map((video, idx) => (
            <div key={idx} className="glass-panel" style={{ ...styles.videoCard, cursor: 'default' }}>
              <div style={styles.thumbnailContainer}>
                <iframe
                  width="100%"
                  height="100%"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: 'var(--navy)', fontSize: '1.1rem' }}>{video.title}</h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{video.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>



      <div style={{ marginTop: '64px' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Heart color="var(--saffron)" fill="var(--saffron)" /> Why Should You Vote?
        </h2>
        <div style={styles.importanceGrid}>
          {data.importance.map((item, idx) => (
            <div key={idx} className="glass-panel" style={styles.importanceCard}>
              <h4 style={{ color: 'var(--navy)', margin: '0 0 12px 0', fontSize: '1.2rem' }}>{item.title}</h4>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginTop: '64px', background: 'rgba(30, 58, 138, 0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--navy)', fontWeight: 'bold' }}>
          <ShieldCheck size={20} /> Powered by Google Firebase Ecosystem
        </div>
      </div>
    </div>
  );
}

const styles = {
  topStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    marginBottom: '8px',
    fontWeight: '600',
  },
  cardValue: {
    fontSize: '2.2rem',
    fontWeight: '800',
    marginBottom: '4px',
    color: 'var(--text-primary)',
  },
  sourceTag: {
    fontSize: '0.75rem',
    color: '#ef4444',
    fontWeight: '600',
    margin: 0,
    opacity: 0.9,
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '32px',
  },
  videoCard: {
    padding: 0,
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  thumbnailContainer: {
    width: '100%',
    aspectRatio: '16/9',
    position: 'relative',
    background: '#f1f5f9',
    overflow: 'hidden',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  partyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  partyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '16px 24px',
  },
  symbolBox: {
    width: '54px',
    height: '54px',
    background: 'white',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  symbolImg: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
  symbolFallback: {
    width: '100%',
    height: '100%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderRadius: '10px',
  },
  importanceGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
  },
  importanceCard: {
    padding: '32px',
    borderTop: '4px solid var(--navy)',
  },
};

Dashboard.propTypes = {
  lang: PropTypes.string.isRequired,
};
