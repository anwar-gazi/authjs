import { describe, it, expect } from 'vitest';
import {service as serviceFactory} from '../lib/factory';
import { tokenExpireAt } from '../lib/time';
import { JwtInfo } from '../type/type';

describe('service', ()=> {
  const service = serviceFactory();
  it('should not generate token for some unknown user', async () => {
    const token = await service.generateJwtInfo(Date.now().toString() + '.some.unknown@user.com');
    expect(token).toBeNull();
  });

  it('should generate token for a known user', async () => {
    const email = 'minhaj.me.bd@gmail.com';
    const expireAt = tokenExpireAt();

    const tokenInfo = await service.generateJwtInfo(email);
    expect(typeof tokenInfo).toBe('object');
    expect(tokenInfo).toHaveProperty('token');
    expect(tokenInfo).toHaveProperty('expireAt');
    expect(tokenInfo).toHaveProperty('email');

    expect(tokenInfo?.token.length).toBe(64);
    expect(tokenInfo?.email).toBe(email);
    expect(tokenInfo?.expireAt).toBe(expireAt);
  })
});