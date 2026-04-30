import { expect, test, describe } from 'vitest';
import { t, languages } from '../utils/i18n';

describe('i18n Translation Engine', () => {
  test('should return correct English translation', () => {
    expect(t('dashboard', 'English')).toBe('Dashboard');
  });

  test('should return correct Hindi translation', () => {
    expect(t('dashboard', 'Hindi')).toBe('डैशबोर्ड');
  });

  test('should fallback to English if key is missing in target language', () => {
    // Note: This assumes 'dashboard' exists in English but we simulate a missing key
    expect(t('nonExistentKey', 'Hindi')).toBe('nonExistentKey');
  });

  test('should fallback to English if language is not supported', () => {
    expect(t('dashboard', 'French')).toBe('Dashboard');
  });

  test('languages array should contain support for major Indian languages', () => {
    expect(languages).toContain('English');
    expect(languages).toContain('Hindi');
    expect(languages).toContain('Tamil');
    expect(languages).toContain('Telugu');
  });
});
