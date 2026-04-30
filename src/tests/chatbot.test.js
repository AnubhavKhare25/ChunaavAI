import { expect, test, describe } from 'vitest';
import { sanitizeInput, findMatchedResponse } from '../utils/chatbotUtils';

describe('Chatbot Utilities', () => {
  const mockKB = [
    { keywords: ['vote', 'how to'], response: 'Voting Guide' },
    { keywords: ['register'], response: 'Registration Guide' }
  ];

  describe('sanitizeInput', () => {
    test('should remove special characters but keep punctuation', () => {
      expect(sanitizeInput('Hello! How are you? @#$')).toBe('Hello! How are you?');
    });

    test('should trim whitespace', () => {
      expect(sanitizeInput('   hello   ')).toBe('hello');
    });

    test('should return empty string for null/undefined', () => {
      expect(sanitizeInput(null)).toBe('');
    });
  });

  describe('findMatchedResponse', () => {
    test('should find response by keyword', () => {
      expect(findMatchedResponse('how to vote?', mockKB)).toBe('Voting Guide');
    });

    test('should be case insensitive', () => {
      expect(findMatchedResponse('REGISTER', mockKB)).toBe('Registration Guide');
    });

    test('should return null if no match found', () => {
      expect(findMatchedResponse('pizza', mockKB)).toBeNull();
    });
  });
});
