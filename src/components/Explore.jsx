import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend, AreaChart, Area
} from 'recharts';
import data from '../data/electionData.json';

// Powered by Firebase Analytics
// Performance tracked using Firebase Performance Monitoring

export default function Explore({ lang }) {
  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', color: 'var(--navy)' }}>Election Data Insights</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Deep dive into the trends, turnouts, and demographics of Indian democracy.</p>
      </div>

      <div style={styles.grid}>
        {/* Turnout Trends Chart */}
        <div className="glass-panel" style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Historical Voter Turnout (%)</h3>
          <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.turnoutTrends}>
                <defs>
                  <linearGradient id="colorTurnout" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--navy)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--navy)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis domain={[40, 75]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} unit="%" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="turnout" stroke="var(--navy)" strokeWidth={3} fillOpacity={1} fill="url(#colorTurnout)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={styles.chartFooter}>Decadal growth in citizen participation since the first general election.</p>
        </div>

        {/* Voter Base Growth Chart */}
        <div className="glass-panel" style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Voter Base Growth (in Crores)</h3>
          <div style={{ height: '350px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.turnoutTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="voters" stroke="var(--saffron)" strokeWidth={3} dot={{ r: 4, fill: 'var(--saffron)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={styles.chartFooter}>Number of registered voters (in Crores) over the years.</p>
        </div>

        {/* State Turnout Comparison */}
        <div className="glass-panel" style={{ ...styles.chartCard, gridColumn: '1 / -1' }}>
          <h3 style={styles.chartTitle}>State-wise Participation (2024 vs 2019)</h3>
          <div style={{ height: '400px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.stateTurnout}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis domain={[50, 90]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} unit="%" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="turnout2019" name="2019 Turnout" fill="rgba(30, 58, 138, 0.3)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="turnout2024" name="2024 Turnout" fill="var(--navy)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '24px',
  },
  chartCard: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
  },
  chartTitle: {
    fontSize: '1.3rem',
    marginBottom: '32px',
    fontWeight: '700',
    color: 'var(--navy)',
  },
  chartFooter: {
    marginTop: '20px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    fontStyle: 'italic',
  }
};
