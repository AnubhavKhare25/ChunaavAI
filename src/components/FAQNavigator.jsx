import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  Vote, 
  Cpu, 
  FileText, 
  CreditCard, 
  UserPlus, 
  Clock, 
  Shield, 
  Gavel,
  Info,
  ChevronLeft,
  BookOpen,
  ListOrdered,
  AlertTriangle,
  ChevronUp
} from 'lucide-react';
import faqData from '../data/faqData.json';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

const iconMap = {
  Vote: <Vote size={20} />,
  Cpu: <Cpu size={20} />,
  FileText: <FileText size={20} />,
  CreditCard: <CreditCard size={20} />,
  UserPlus: <UserPlus size={20} />,
  Clock: <Clock size={20} />,
  Shield: <Shield size={20} />,
  Gavel: <Gavel size={20} />
};

export default function FAQNavigator() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCategoryClick = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    setSelectedTopic(null);
    setShowDetails(false);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setShowDetails(false);
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setShowDetails(false);
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>Election FAQ Navigator</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Explore verified information across all electoral topics in a structured way.</p>
      </div>

      <div style={styles.layout}>
        {/* Navigation Tree */}
        <div className="glass-panel" style={styles.treePanel}>
          {faqData.map((cat, idx) => (
            <div key={idx} style={styles.categoryGroup}>
              <button 
                onClick={() => handleCategoryClick(cat.category)}
                style={{
                  ...styles.categoryBtn,
                  background: expandedCategory === cat.category ? 'rgba(30, 58, 138, 0.05)' : 'transparent',
                  color: expandedCategory === cat.category ? 'var(--navy)' : 'var(--text-primary)'
                }}
                aria-expanded={expandedCategory === cat.category}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {iconMap[cat.icon]}
                  <span style={{ fontWeight: '600' }}>{cat.category}</span>
                </div>
                {expandedCategory === cat.category ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              <AnimatePresence>
                {expandedCategory === cat.category && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={styles.topicList}>
                      {cat.topics.map((topic, tIdx) => (
                        <button 
                          key={tIdx}
                          onClick={() => handleTopicClick(topic)}
                          style={{
                            ...styles.topicBtn,
                            color: selectedTopic?.title === topic.title ? 'var(--navy)' : 'var(--text-secondary)',
                            fontWeight: selectedTopic?.title === topic.title ? 'bold' : 'normal'
                          }}
                        >
                          <ChevronRight size={14} style={{ opacity: 0.5 }} />
                          {topic.title}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          <AnimatePresence mode="wait">
            {selectedTopic ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel"
                style={styles.contentCard}
              >
                <div style={styles.contentHeader}>
                   <button onClick={handleBack} style={styles.backBtn}>
                      <ChevronLeft size={18} /> Back to Topics
                   </button>
                   <h2 style={{ margin: '20px 0 12px 0', color: 'var(--navy)' }}>{selectedTopic.title}</h2>
                   <div style={styles.divider} />
                </div>

                {/* Layer 1: Quick Summary */}
                <div style={styles.contentText}>
                  {selectedTopic.summary || selectedTopic.content}
                </div>

                {/* Expandable Sections */}
                {selectedTopic.detailedExplanation && (
                  <div style={{ marginTop: '24px' }}>
                    <button 
                      onClick={() => setShowDetails(!showDetails)}
                      style={styles.toggleBtn}
                    >
                      {showDetails ? (
                        <><ChevronUp size={18} /> Show Less</>
                      ) : (
                        <><ChevronDown size={18} /> Deep Dive: Learn More</>
                      )}
                    </button>

                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={styles.deepDiveContainer}>
                            
                            {/* Layer 2: Detailed Explanation */}
                            <div style={styles.detailSection}>
                              <h3 style={styles.sectionTitle}>
                                <BookOpen size={20} color="var(--saffron)" /> Detailed Explanation
                              </h3>
                              <p style={styles.detailText}>{selectedTopic.detailedExplanation}</p>
                            </div>

                            {/* Layer 3: Steps */}
                            {selectedTopic.steps && selectedTopic.steps.length > 0 && (
                              <div style={styles.detailSection}>
                                <h3 style={styles.sectionTitle}>
                                  <ListOrdered size={20} color="var(--saffron)" /> Step-by-Step Process
                                </h3>
                                <ul style={styles.stepList}>
                                  {selectedTopic.steps.map((step, idx) => (
                                    <li key={idx} style={styles.stepItem}>
                                      <div style={styles.stepNumber}>{idx + 1}</div>
                                      <div>{step}</div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Layer 4: Important Notes */}
                            {selectedTopic.importantNotes && selectedTopic.importantNotes.length > 0 && (
                              <div style={styles.notesSection}>
                                <h3 style={{ ...styles.sectionTitle, color: '#b91c1c' }}>
                                  <AlertTriangle size={20} color="#dc2626" /> Important Notes
                                </h3>
                                <ul style={styles.notesList}>
                                  {selectedTopic.importantNotes.map((note, idx) => (
                                    <li key={idx} style={styles.noteItem}>{note}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                <div style={{ ...styles.infoBox, marginTop: '40px' }}>
                   <Info size={18} color="var(--navy)" />
                   <span>Verified ECI Source</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles.emptyState}
              >
                <div style={styles.emptyIcon}><Info size={48} /></div>
                <h3>Select a topic to explore</h3>
                <p>Choose a category from the left to start learning about the electoral process.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    gap: '32px',
    alignItems: 'start',
    minHeight: '600px',
  },
  treePanel: {
    padding: '16px',
    background: 'white',
    height: 'fit-content',
  },
  categoryGroup: {
    marginBottom: '8px',
  },
  categoryBtn: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
  },
  topicList: {
    padding: '8px 16px 16px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  topicBtn: {
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
  },
  contentArea: {
    height: '100%',
  },
  contentCard: {
    padding: '48px',
    background: 'white',
    minHeight: '400px',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: 0,
    fontSize: '0.9rem',
  },
  divider: {
    height: '4px',
    width: '60px',
    background: 'var(--saffron)',
    borderRadius: '2px',
    marginBottom: '32px',
  },
  contentText: {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: 'var(--text-primary)',
  },
  toggleBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(30, 58, 138, 0.05)',
    color: 'var(--navy)',
    border: '1px solid rgba(30, 58, 138, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
  },
  deepDiveContainer: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  detailSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: 0,
    fontSize: '1.2rem',
    color: 'var(--navy)',
  },
  detailText: {
    margin: 0,
    lineHeight: '1.7',
    color: 'var(--text-secondary)',
    fontSize: '1.05rem',
  },
  stepList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  stepItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    fontSize: '1.05rem',
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--navy)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    flexShrink: 0,
    marginTop: '2px',
  },
  notesSection: {
    background: '#fef2f2',
    padding: '24px',
    borderRadius: '12px',
    border: '1px solid #fecaca',
  },
  notesList: {
    margin: '16px 0 0 0',
    paddingLeft: '24px',
    color: '#991b1b',
    lineHeight: '1.6',
  },
  noteItem: {
    marginBottom: '8px',
  },
  infoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 24px',
    background: 'rgba(30, 58, 138, 0.05)',
    borderRadius: '12px',
    fontSize: '0.9rem',
    color: 'var(--navy)',
    fontWeight: 'bold',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '400px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
  },
  emptyIcon: {
    marginBottom: '20px',
    opacity: 0.2,
  }
};
