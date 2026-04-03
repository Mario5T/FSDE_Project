import { describe, expect, it } from 'vitest';
import { normalizeApiBaseUrl } from './apiClient';

describe('normalizeApiBaseUrl', () => {
  it('falls back to the proxied api path when no environment url is set', () => {
    expect(normalizeApiBaseUrl()).toBe('/api');
    expect(normalizeApiBaseUrl('')).toBe('/api');
  });

  it('trims whitespace and removes trailing slashes', () => {
    expect(normalizeApiBaseUrl(' https://api.example.com/ ')).toBe('https://api.example.com');
  });
});