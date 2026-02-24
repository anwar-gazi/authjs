import { settings } from '../settings';

export const tokenExpireAt = () => {
  return new Date(Date.now() + 1000 * settings.tokenTTLSec).toISOString().split('.')[0] + 'Z';
};