import {createHash} from 'crypto';
import { JwtCreatePayload, JwtInfo } from "../type/type";

const sha256Hash = (payload: string) => {
  return createHash('sha256').update(payload).digest('hex');
};

export const generateHash = (payload: JwtCreatePayload): string => {
  const payloadString = `${payload.id}|${payload.name}|${payload.email}|${payload.authSecret}|${payload.expireAt}`;
  return sha256Hash(payloadString);
};

export const token = (info: JwtInfo): string => {
  return Buffer.from(JSON.stringify(info)).toString('base64');
};

export const parseToken = (token: string): JwtInfo => {
  return JSON.parse(Buffer.from(token, 'base64').toString());
}