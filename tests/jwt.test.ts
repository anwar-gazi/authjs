import { describe, expect, it } from 'vitest';
import { generateToken } from '../lib/jwt';
import { JwtCreatePayload } from '../type/type';
import { tokenExpireAt } from '../lib/time';

describe('jwt token', () => {
  const tokenPayload: JwtCreatePayload = {
    id: 'sample',
    name: 'Anwar',
    email: 'minhaj.me.bd@gmail.com',
    expireAt: tokenExpireAt()
  };

  it('token creation and token length', () => {
    const token = generateToken(tokenPayload);
    expect(token).toBeDefined();
    expect(token.length).toBe(64);
  });

});