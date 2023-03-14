// IMPORTS

import Membership from "./membership";
import { CampaignHeader } from "./campaign";
import { Member } from "aws-sdk/clients/guardduty";

// INTERFACE

export const OrganizationProperties: string[] = [
  "name",
];

export class OrganizationHeader {
  id: number;
  handle: string;
  name: string;
  avatar: string;

  constructor(id: number, handle: string, properties: any) {
    this.id = id;
    this.handle = handle;
    this.name = properties.name;
    this.avatar = properties.avatar;
  }

  public static fromJSON(json: any): OrganizationHeader {
    return new OrganizationHeader(json.id, json.handle, json);
  }
}

export default class Organization {
  // profile data
  public header: OrganizationHeader;

  // member data
  public members: { [id: number]: Membership};

  // campaign data
  public campaigns: CampaignHeader[];

  // permissions
  public callerIsAdmin: boolean;

  constructor(
    id: number,
    handle: string,
    properties: any,
    members: { [id: number]: Membership },
    campaigns: CampaignHeader[],
    callerIsAdmin: boolean = false
  ) {
    this.header = new OrganizationHeader(id, handle, properties);
    this.members = members;
    this.campaigns = campaigns;
    this.callerIsAdmin = callerIsAdmin;
  }

  public static fromJSON(json: any): Organization {
    const members = Object.entries(json.members).reduce((acc: { [id: number]: Membership }, [id, member]: [string, any]) => {
      acc[+id] = Membership.fromJSON(member);
      return acc;
    }, {});
    const campaigns = json.campaigns.map((campaign: any) => CampaignHeader.fromJSON(campaign));
    return new Organization(json.header.id, json.header.handle, json.header, members, campaigns, json.callerIsAdmin);
  }
}