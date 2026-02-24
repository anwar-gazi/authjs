import { describe, it, expect } from 'vitest';
import { app } from '../index';

describe('API Endpoints', () => {
  it('should return "API is running..." from the root endpoint', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/'
    });
    expect(res.statusCode).toBe(200);
    expect(res.payload).toBe('API is running...');
  });

  it('should return status UP from the /health endpoint', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/health'
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: 'UP' });
  });
});
