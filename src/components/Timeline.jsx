import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ClipboardList, Send, CheckCircle } from 'lucide-react';
import data from '../data/electionData.json';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function Timeline({ lang }) {
  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>Election Timeline</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Follow the standard phases of the democratic exercise.</p>
      </div>

      <div style={styles.container}>
        {data.genericTimeline.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel" 
            style={styles.stepCard}
          >
            <div style={styles.iconBox}>
              {idx % 2 === 0 ? <ClipboardList size={24} /> : <Send size={24} />}
            </div>
            <div style={styles.content}>
              <h3 style={styles.stepTitle}>Step {idx + 1}: {item.step}</h3>
              <p style={styles.details}>{item.details}</p>
            </div>
            <div style={styles.badge}>Official Phase</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel" style={styles.footerInfo}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <CheckCircle color="var(--green)" />
          <h4 style={{ margin: 0 }}>Model Code of Conduct</h4>
        </div>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          The Model Code of Conduct (MCC) comes into effect immediately after the announcement of the election schedule by the ECI.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    position: 'relative',
  },
  stepCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '32px',
    position: 'relative',
  },
  iconBox: {
    width: '64px',
    height: '64px',
    background: 'rgba(30, 58, 138, 0.1)',
    color: 'var(--navy)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  stepTitle: {
    margin: '0 0 8px 0',
    fontSize: '1.3rem',
    color: 'var(--navy)',
  },
  details: {
    margin: 0,
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  badge: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'var(--text-secondary)',
    opacity: 0.5,
  },
  footerInfo: {
    marginTop: '48px',
    padding: '32px',
    background: 'rgba(21, 128, 61, 0.05)',
    borderLeft: '4px solid var(--green)',
  }
};
