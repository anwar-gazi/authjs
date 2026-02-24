import { toJwtInfo, userInfoToJwtCreatePayload } from "../lib/mapper";
import { Repository } from "../repository/Repository";
import { JwtInfo } from "../type/type";
import { generateHash, token, parseToken } from "../lib/jwt";
import { settings } from "../settings";

export class Service {
  constructor(private repo: Repository) { }

  public async generateJwtInfo(email: string, expireAt: string): Promise<JwtInfo> {
    if (!await this.repo.user.exists(email)) throw Error('email not found in db');
    if (!settings.authSecret) throw Error('authSecret empty, check settings');

    const userInfo = await this.repo.user.getByEmail(email);

    const jwtPayload = userInfoToJwtCreatePayload(userInfo, settings.authSecret, expireAt);

    const hash = generateHash(jwtPayload);

    return toJwtInfo(email, expireAt, hash);
  }

  public async token(email: string, expireAt: string): Promise<string> {
    const info = await this.generateJwtInfo(email, expireAt);

    const t = token(info);

    return t;
  }

  public async validateToken(token: string): Promise<boolean> {
    const info: JwtInfo = parseToken(token);
    const estimatedHash = (await this.generateJwtInfo(info.email, info.expireAt)).hash

    return info.hash === estimatedHash;
  }
}