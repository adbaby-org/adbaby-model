// IMPORTS

// INTERFACE

export default class Auth {
  public username: string;
  public accessToken: string;
  public refreshToken: string;
  public tokenExpiration: number;

  constructor(username: string, accessToken: string, refreshToken: string, tokenExpiration: number) {
    this.username = username;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.tokenExpiration = tokenExpiration;
  }

  public static fromJSON(json: any): Auth {
    return new Auth(
      json.username,
      json.accessToken,
      json.refreshToken,
      json.tokenExpiration
    );
  }
}