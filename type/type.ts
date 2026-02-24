export type UserInfo = {
  id: string,
  name: string,
  email: string
}

export type CreateUserPayLoad = {
  name: string,
  email: string
}

export type JwtCreatePayload = { 
  id: string,
  name: string,
  email: string,
  // ----------
  authSecret: string,
  // ----------
  expireAt: string
};

export type JwtInfo = {
  email: string,
  expireAt: string,
  hash: string
};