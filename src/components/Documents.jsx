import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  User, 
  MapPin, 
  Calendar, 
  Camera, 
  CreditCard,
  Search,
  Check
} from 'lucide-react';
import { t } from '../utils/i18n';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function Documents({ lang }) {
  const registrationDocs = [
    { 
      category: "Proof of Identity", 
      icon: <User size={20} />, 
      items: [
        { name: "Aadhaar Card", desc: "Most widely accepted proof of identity." },
        { name: "Indian Passport", desc: "Official government document for identity." },
        { name: "Driving License", desc: "Valid photo ID issued by RTO." },
        { name: "PAN Card", desc: "Permanent Account Number issued by Income Tax Dept." }
      ]
    },
    { 
      category: "Proof of Address", 
      icon: <MapPin size={20} />, 
      items: [
        { name: "Utility Bills", desc: "Electricity, Water, or Gas bill from last 3 months." },
        { name: "Rent Agreement", desc: "Registered rent or lease deed for current residence." },
        { name: "Bank Passbook", desc: "Updated passbook with current address and photo." }
      ]
    },
    { 
      category: "Proof of Age", 
      icon: <Calendar size={20} />, 
      items: [
        { name: "Birth Certificate", desc: "Issued by Municipal Authority or Registrar." },
        { name: "10th Marksheet", desc: "Board certificate showing date of birth." }
      ]
    },
    { 
      category: "Other", 
      icon: <Camera size={20} />, 
      items: [
        { name: "Passport Size Photograph", desc: "Recent color photo with white background." }
      ]
    }
  ];

  const pollingDayDocs = [
    { name: "Voter ID (EPIC)", desc: "Your primary document for voting.", primary: true },
    { name: "Aadhaar Card", desc: "Widely used alternative ID." },
    { name: "Passport", desc: "Valid for NRIs and local citizens." },
    { name: "Driving License", desc: "Accepted photo identification." },
    { name: "PAN Card", desc: "Valid identity proof." },
    { name: "Govt Employee ID", desc: "ID issued by Central/State Govt/PSUs." }
  ];

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>{t('documents', lang)}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Complete guide to the documents you need for registration and at the booth.</p>
      </div>

      {/* Section A: Registration */}
      <section style={{ marginBottom: '64px' }}>
        <h2 style={styles.sectionTitle}>{t('registrationDocs', lang)}</h2>
        <div style={styles.grid}>
          {registrationDocs.map((cat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-panel" 
              style={styles.card}
            >
              <div style={styles.cardHeader}>
                <div style={styles.iconBox}>{cat.icon}</div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{cat.category}</h3>
              </div>
              <div style={styles.itemList}>
                {cat.items.map((item, i) => (
                  <div key={i} style={styles.item}>
                    <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section B: Polling Day */}
      <section>
        <h2 style={styles.sectionTitle}>{t('pollingDocs', lang)}</h2>
        <div className="glass-panel" style={styles.pollingContainer}>
          <div style={styles.pollingGrid}>
            {pollingDayDocs.map((doc, idx) => (
              <div key={idx} style={styles.pollingItem}>
                <CheckCircle size={18} color={doc.primary ? 'var(--navy)' : 'var(--green)'} />
                <div>
                  <div style={{ fontWeight: 'bold' }}>{doc.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{doc.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={styles.noteBox}>
             <Check size={20} color="var(--navy)" />
             <p style={{ margin: 0, fontWeight: '600', color: 'var(--navy)' }}>
               {t('altIdNote', lang)}
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  sectionTitle: {
    fontSize: '1.8rem',
    color: 'var(--navy)',
    marginBottom: '24px',
    paddingLeft: '12px',
    borderLeft: '4px solid var(--saffron)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    padding: '24px',
    height: '100%',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    color: 'var(--navy)',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    background: 'rgba(30, 58, 138, 0.1)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  item: {
    paddingBottom: '12px',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  },
  pollingContainer: {
    padding: '32px',
    background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.02), transparent)',
  },
  pollingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  pollingItem: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  noteBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    background: 'rgba(30, 58, 138, 0.05)',
    borderRadius: '16px',
    border: '1px dashed var(--navy)',
  }
};
