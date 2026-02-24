import { userInfo } from "os";
import { JwtCreatePayload, JwtInfo, UserInfo } from "../type/type";

export function DbRowToUserInfo(row: Record<string, any>): UserInfo {
  return {
    id: row.id,
    name: row.name,
    email: row.email
  };
}

export function userInfoToJwtCreatePayload(info: UserInfo, authSecret: string, expireAt: string): JwtCreatePayload {
  return {...info, authSecret, expireAt};
}

export function toJwtInfo(email: string, expireAt: string, hash: string): JwtInfo {
  return { email, expireAt, hash };
}