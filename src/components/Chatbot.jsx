import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  ChevronRight,
  Info,
  ListOrdered
} from 'lucide-react';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaste! I am your ChunaavAssist. How can I help you with the election process today?",
      isFallback: false
    }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Simple Knowledge Base
  const knowledgeBase = [
    {
      keywords: ['vote', 'how to vote', 'voting process', 'cast'],
      response: "To cast your vote: 1. Verify your name on the voter list. 2. Present your valid ID at the booth. 3. Get your finger inked. 4. Press the button on the EVM against your chosen candidate. 5. Verify the VVPAT slip."
    },
    {
      keywords: ['register', 'new voter', 'form 6', 'registration', 'first-time guide'],
      response: "To register as a new voter, visit the Voters' Service Portal (voters.eci.gov.in) and fill out Form 6. You will need a recent passport-size photo, identity proof, and address proof."
    },
    {
      keywords: ['document', 'id card', 'proof', 'documents required', 'accepted'],
      response: "For voting on polling day, you can use your Voter ID (EPIC) or any of the 12 approved alternative IDs like Aadhaar Card, Passport, Driving License, or PAN Card."
    },
    {
      keywords: ['candidate', 'compare', 'background'],
      response: "You can compare candidates and check their criminal backgrounds using the official KYC (Know Your Candidate) app provided by the Election Commission of India."
    },
    {
      keywords: ['lost', 'correction', 'form 8', 'lost id'],
      response: "If you have lost your Voter ID card or need to make corrections (like name or address changes), you must fill out Form 8 on the Voters' Service Portal."
    },
    {
      keywords: ['party', 'parties', 'symbol'],
      response: "India has several major national and state political parties. You can view their symbols and details in the Major Political Parties section on the dashboard."
    }
  ];

  const handleSend = (text) => {
    const query = typeof text === 'string' ? text : input;
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now(), sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');

    // Process Query
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedResponse = null;

      // Basic Keyword Match
      for (const entry of knowledgeBase) {
        if (entry.keywords.some(kw => lowerQuery.includes(kw))) {
          matchedResponse = entry.response;
          break;
        }
      }

      if (matchedResponse) {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: matchedResponse, isFallback: false }]);
      } else {
        // Trigger Smart Fallback
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          sender: 'bot', 
          text: "Sorry, I couldn't fully understand that. Here's a general guide to help you navigate Indian elections:", 
          isFallback: true 
        }]);
      }
    }, 600); // simulated delay
  };

  const handleOptionClick = (optionQuery) => {
    handleSend(optionQuery);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{
          ...styles.fab,
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto'
        }}
        aria-label="Open ChunaavAssist"
      >
        <MessageCircle size={28} color="white" />
        <div style={styles.onlineDot} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass-panel"
            style={styles.chatWindow}
          >
            {/* Header */}
            <div style={styles.header}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={styles.botAvatarHeader}>
                  <Bot size={20} color="white" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--navy)' }}>ChunaavAssist</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7EE787' }}></span>
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div style={styles.messagesContainer}>
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: '20px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', maxWidth: '85%' }}>
                    {msg.sender === 'bot' && (
                      <div style={styles.botAvatarSmall}><Bot size={14} color="white"/></div>
                    )}
                    
                    <div style={{
                      ...styles.messageBubble,
                      background: msg.sender === 'user' ? 'var(--navy)' : 'white',
                      color: msg.sender === 'user' ? 'white' : 'var(--text-primary)',
                      borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '16px',
                      boxShadow: msg.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                    }}>
                      {msg.text}

                      {/* Smart Fallback UI */}
                      {msg.isFallback && (
                        <div style={styles.fallbackContainer}>
                          
                          <div style={styles.fallbackSection}>
                            <h4 style={styles.fallbackTitle}><ListOrdered size={14}/> Steps to Follow</h4>
                            <ul style={styles.fallbackList}>
                              <li><strong>Voting Process</strong> → How to cast your vote?</li>
                              <li><strong>Registration</strong> → How to become a new voter?</li>
                              <li><strong>Documents</strong> → What IDs are accepted?</li>
                              <li><strong>Candidates</strong> → How to compare candidates?</li>
                              <li><strong>Parties</strong> → Information about political parties</li>
                            </ul>
                          </div>

                          <div style={styles.fallbackSection}>
                            <h4 style={{ ...styles.fallbackTitle, color: '#b91c1c' }}><Info size={14}/> Important Notes</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem' }}>You can explore topics using the buttons below.</p>
                          </div>

                          {/* Interactive Suggestions */}
                          <div style={styles.suggestionGrid}>
                            <button onClick={() => handleOptionClick('Voting Process')} style={styles.suggestionBtn}>
                              Voting Process <ChevronRight size={14} />
                            </button>
                            <button onClick={() => handleOptionClick('Documents Required')} style={styles.suggestionBtn}>
                              Documents Required <ChevronRight size={14} />
                            </button>
                            <button onClick={() => handleOptionClick('First-Time Guide')} style={styles.suggestionBtn}>
                              First-Time Guide <ChevronRight size={14} />
                            </button>
                            <button onClick={() => handleOptionClick('Compare Candidates')} style={styles.suggestionBtn}>
                              Compare Candidates <ChevronRight size={14} />
                            </button>
                            <button onClick={() => handleOptionClick('Lost ID')} style={styles.suggestionBtn}>
                              Lost ID Card <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Pre-defined Topic Bubbles */}
            <div style={styles.topicsScrollRow}>
              <button onClick={() => handleOptionClick('How to vote?')} style={styles.topicChip}>How to vote?</button>
              <button onClick={() => handleOptionClick('Required Documents')} style={styles.topicChip}>Required Documents</button>
              <button onClick={() => handleOptionClick('First-time voter')} style={styles.topicChip}>First-time voter</button>
              <button onClick={() => handleOptionClick('Lost ID')} style={styles.topicChip}>Lost ID</button>
            </div>

            {/* Input Area */}
            <div style={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about elections..."
                style={styles.inputField}
              />
              <button 
                onClick={() => handleSend()} 
                style={{
                  ...styles.sendBtn,
                  background: input.trim() ? 'var(--navy)' : '#e2e8f0',
                  color: input.trim() ? 'white' : '#94a3b8'
                }}
                disabled={!input.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const styles = {
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'var(--navy)',
    border: 'none',
    boxShadow: '0 8px 24px rgba(30, 58, 138, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 9999,
  },
  onlineDot: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#7EE787',
    border: '2px solid var(--navy)',
  },
  chatWindow: {
    position: 'fixed',
    bottom: '110px',
    right: '30px',
    width: '380px',
    height: '600px',
    background: 'rgba(247, 249, 252, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9999,
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  header: {
    padding: '20px',
    background: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  botAvatarHeader: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'var(--navy)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botAvatarSmall: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'var(--navy)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '8px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
  },
  messagesContainer: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  messageBubble: {
    padding: '14px 18px',
    borderRadius: '16px',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    wordWrap: 'break-word',
  },
  fallbackContainer: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    paddingTop: '16px',
  },
  fallbackSection: {
    background: '#f8fafc',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  fallbackTitle: {
    margin: '0 0 8px 0',
    color: 'var(--navy)',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  fallbackList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  suggestionGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px',
  },
  suggestionBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    background: 'white',
    border: '1px solid var(--navy)',
    color: 'var(--navy)',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  topicsScrollRow: {
    display: 'flex',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(255, 255, 255, 0.8)',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    borderTop: '1px solid rgba(0,0,0,0.05)',
  },
  topicChip: {
    padding: '6px 12px',
    background: 'var(--saffron)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    flexShrink: 0,
  },
  inputArea: {
    padding: '16px',
    background: 'white',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    gap: '12px',
  },
  inputField: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '24px',
    outline: 'none',
    fontSize: '0.95rem',
    background: '#f8fafc',
  },
  sendBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }
};
