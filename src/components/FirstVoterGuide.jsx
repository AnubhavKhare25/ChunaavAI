import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, UserPlus } from 'lucide-react';
import data from '../data/electionData.json';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function FirstVoterGuide({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={styles.overlay}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel" 
            style={styles.modal}
          >
            <div style={styles.header}>
              <div style={styles.titleGroup}>
                <UserPlus size={28} color="var(--navy)" />
                <h2 style={{ margin: 0, fontSize: '1.8rem' }}>First-Time Voter Guide</h2>
              </div>
              <button onClick={onClose} style={styles.closeBtn}><X size={24} /></button>
            </div>

            <div style={styles.content}>
              <p style={styles.intro}>Follow these 5 simple steps to get registered and cast your first vote in the Indian General Elections.</p>
              
              <div style={styles.stepsList}>
                {data.registrationSteps.map((step, idx) => (
                  <div key={idx} style={styles.stepItem}>
                    <div style={styles.stepNumber}>{step.step}</div>
                    <div style={styles.stepInfo}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>{step.title}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.footer}>
              <button onClick={onClose} className="btn-navy" style={styles.finishBtn}>
                Got it, let's go! <CheckCircle size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(2, 6, 23, 0.8)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
  },
  modal: {
    width: '100%',
    maxWidth: '600px',
    background: 'white',
    padding: '40px',
    borderRadius: '24px',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  titleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
  },
  intro: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  stepsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  stepItem: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--navy)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  stepInfo: {
    flex: 1,
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  footer: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  finishBtn: {
    padding: '16px 32px',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '16px',
  }
};
