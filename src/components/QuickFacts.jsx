import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight, ChevronLeft } from 'lucide-react';
import data from '../data/electionData.json';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function QuickFacts() {
  const [index, setIndex] = useState(0);
  const facts = data.flashcards || [];

  const nextFact = () => setIndex((prev) => (prev + 1) % facts.length);
  const prevFact = () => setIndex((prev) => (prev - 1 + facts.length) % facts.length);

  if (facts.length === 0) {
    return <div className="glass-panel">No facts available.</div>;
  }

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>Quick Facts</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Fascinating insights into the world's largest democratic process.</p>
      </div>

      <div style={styles.container}>
        <button onClick={prevFact} style={styles.navBtn}><ChevronLeft size={32} /></button>
        
        <div style={styles.cardWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="glass-panel"
              style={styles.factCard}
            >
              <div style={styles.header}>
                <Lightbulb size={24} color="var(--saffron)" />
                <span style={styles.category}>{facts[index].category}</span>
              </div>
              <h2 style={styles.title}>{facts[index].title}</h2>
              <p style={styles.factText}>{facts[index].fact}</p>
              <div style={styles.progress}>
                {facts.map((_, i) => (
                  <div key={i} style={{ ...styles.dot, background: i === index ? 'var(--navy)' : 'rgba(0,0,0,0.1)' }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={nextFact} style={styles.navBtn}><ChevronRight size={32} /></button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    minHeight: '400px',
  },
  navBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--navy)',
    opacity: 0.6,
    transition: 'opacity 0.2s',
  },
  cardWrapper: {
    width: '100%',
    maxWidth: '500px',
  },
  factCard: {
    padding: '48px',
    textAlign: 'center',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  category: {
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: 'var(--text-secondary)',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '1.8rem',
    color: 'var(--navy)',
    marginBottom: '20px',
  },
  factText: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: 'var(--text-primary)',
    margin: 0,
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '32px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
  }
};
