import { describe, it, expect } from 'vitest';
import { tokenExpireAt } from '../lib/time';
import { settings } from '../settings';

describe('time', () => {
  it('test', () => {
    const s = (new Date(tokenExpireAt()).getTime() - Date.now())/1000 -1;
    expect(s).toBeLessThan(settings.tokenTTLSec);
  });
});