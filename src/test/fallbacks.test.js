import { describe, it, expect } from 'vitest';
import { getFallback } from '../utils/fallbacks';

describe('Fallback Utility', () => {
  it('should return eligibility info for "eligibility" query in English', () => {
    const result = getFallback('Am I eligible to vote?', 'English');
    expect(result).toContain('Voter Eligibility in India');
  });

  it('should return eligibility info for "पात्रता" query in Hindi', () => {
    const result = getFallback('क्या मैं वोट के लिए पात्र हूँ?', 'Hindi');
    expect(result).toContain('भारत में मतदाता पात्रता');
  });

  it('should return null for unrelated queries', () => {
    const result = getFallback('How is the weather?', 'English');
    expect(result).toBeNull();
  });

  it('should return registration info for "register" query', () => {
    const result = getFallback('how to register?', 'English');
    expect(result).toContain('How to Register to Vote');
  });
});
