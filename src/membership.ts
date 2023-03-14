// IMPORTS

import { UserHeader } from "./user";

// INTERFACE

export default class Membership {
  public user: UserHeader;
  public accepted: boolean;
  public admin: boolean;

  constructor(user: UserHeader, accepted: boolean, admin: boolean) {
    this.user = user;
    this.accepted = accepted;
    this.admin = admin;
  }

  public static fromJSON(json: any): Membership {
    const user = UserHeader.fromJSON(json.user);
    return new Membership(user, json.accepted, json.admin);
  }
}