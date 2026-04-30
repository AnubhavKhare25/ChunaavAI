import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Learn from '../components/Learn';
import Dashboard from '../components/Dashboard';
import data from '../data/electionData.json';

// Mock Firebase Analytics
vi.mock('../firebase', () => ({
  analytics: null,
  auth: {},
  db: {}
}));

describe('ChunaavAI Civic Intelligence Platform', () => {
  
  describe('Dashboard Module', () => {
    it('renders the correct voter base from the dataset', () => {
      render(<Dashboard />);
      expect(screen.getByText('968 Million')).toBeDefined();
    });

    it('displays the latest turnout percentage', () => {
      render(<Dashboard />);
      const latestTurnout = data.turnoutTrends[data.turnoutTrends.length - 1].turnout;
      expect(screen.getByText(`${latestTurnout}%`)).toBeDefined();
    });
  });

  describe('Learn Module (Q&A Engine)', () => {
    it('filters questions based on search input', () => {
      render(<Learn />);
      const searchInput = screen.getByPlaceholderText(/search for questions/i);
      
      // Search for NOTA
      fireEvent.change(searchInput, { target: { value: 'NOTA' } });
      
      expect(screen.getByText(/What is NOTA?/i)).toBeDefined();
      // Should not show other questions like "EPIC"
      expect(screen.queryByText(/Who is eligible to vote in India?/i)).toBeNull();
    });

    it('displays the Google Maps external link button', () => {
      render(<Learn />);
      const mapBtn = screen.getByRole('link', { name: /open maps/i });
      expect(mapBtn.getAttribute('href')).toContain('google.com/maps');
    });
  });

});
