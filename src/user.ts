// IMPORTS

import { OrganizationHeader } from "./organization";
import { CampaignHeader } from "./campaign";
import { ActivationHeader } from "./activation";

// INTERFACE

export const UserProperties: string[] = [
  "displayName",
  "firstName",
  "lastName"
];

export class UserHeader {
  public id: number;
  public displayName: string;
  public avatar: string;

  constructor(id: number, properties: any) {
    this.id = id;
    this.displayName = properties.displayName;
    this.avatar = properties.avatar;
  }

  public static fromJSON(json: any): UserHeader {
    return new UserHeader(json.id, json);
  }
}

export default class User {
  // protected profile data
  public header: UserHeader;

  // private profile data
  public email: string;
  public firstName: string;
  public lastName: string;
  
  // organization memberships
  public organizations: OrganizationHeader[];

  // campaign memberships
  public campaigns: CampaignHeader[];

  // activation memberships
  public activations: ActivationHeader[];

  // invites
  public orgInvites: OrganizationHeader[];
  public campaignInvites: CampaignHeader[];

  constructor(
    id: number,
    headerProperties: any,
    properties: any,
    orgainzations: OrganizationHeader[],
    campaigns: CampaignHeader[],
    activations: ActivationHeader[],
    orgInvites: OrganizationHeader[],
    campaignInvites: CampaignHeader[]
  ) {
    this.header = new UserHeader(id, headerProperties);
    this.email = properties.email;
    this.firstName = properties.firstName;
    this.lastName = properties.lastName;
    this.organizations = orgainzations;
    this.campaigns = campaigns;
    this.activations = activations;
    this.orgInvites = orgInvites;
    this.campaignInvites = campaignInvites;
  }

  public static fromJSON(json: any): User {
    const organizations = json.organizations.map((org: any) => OrganizationHeader.fromJSON(org));
    const campaigns = json.campaigns.map((campaign: any) => CampaignHeader.fromJSON(campaign));
    const activations = json.activations.map((activation: any) => ActivationHeader.fromJSON(activation));
    const orgInvites = json.orgInvites.map((org: any) => OrganizationHeader.fromJSON(org));
    const campaignInvites = json.campaignInvites.map((campaign: any) => CampaignHeader.fromJSON(campaign));
    return new User(json.header.id, json.header, json, organizations, campaigns, activations, orgInvites, campaignInvites);
  }
}