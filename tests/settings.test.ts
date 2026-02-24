import { vitest, expect, describe, it, beforeAll } from 'vitest';

describe('settings', () => {
  let settings: any;
  
  beforeAll(async () => {
    settings = (await import('../settings')).settings;
  });
  
  it('check settings structure', () => {
    expect(settings).toHaveProperty('tokenTTLSec');
    expect(settings).toHaveProperty('databaseAdapter');
  });
})