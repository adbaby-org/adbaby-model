// IMPORTS

import Membership from './membership';
import { ActivationHeader } from './activation';
import { OrganizationHeader } from './organization';
import Comment from './comment';

// INTERFACE

export const CampaignProperties: string[] = [
  'name',
  'description',
  'startDate',
  'endDate',
];

export class CampaignHeader {
  public id: number;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public publisher: OrganizationHeader;
  public advertiser: OrganizationHeader | null;

  constructor(
    id: number,
    properties: any,
    publisher: OrganizationHeader,
    advertiser: OrganizationHeader | null
  ) {
    this.id = id;
    this.name = properties.name;
    this.description = properties.description;
    this.startDate = new Date(properties.startDate);
    this.endDate = new Date(properties.endDate);
    this.publisher = publisher;
    this.advertiser = advertiser;
  }

  public static fromJSON(json: any): CampaignHeader {
    return new CampaignHeader(
      json.id,
      json,
      OrganizationHeader.fromJSON(json.publisher),
      (json.advertiser ? OrganizationHeader.fromJSON(json.advertiser) : null)
    );
  }
}

export default class Campagin {
  // overview
  public header: CampaignHeader;

  // members
  public memberOrgs: { [id: number]: OrganizationHeader};
  public members: { [id: number]: Membership};

  // activations
  public activations: ActivationHeader[];

  // comments
  public comments: Comment[];

  constructor(
    id: number,
    properties: any,
    publisherOrgId: number,
    advertiserOrgId: number,
    memberOrgs: { [id: number]: OrganizationHeader},
    members: { [id: number]: Membership},
    activations: ActivationHeader[],
    comments: Comment[]
  ) {
    this.header = new CampaignHeader(id, properties, memberOrgs[publisherOrgId], (advertiserOrgId ? memberOrgs[advertiserOrgId] : null));
    this.memberOrgs = memberOrgs;
    this.members = members;
    this.activations = activations;
    this.comments = comments;
  }

  public static fromJSON(json: any): Campagin {
    const memberOrgs = Object.entries(json.memberOrgs).reduce((acc: { [id: number]: OrganizationHeader }, [id, org]: [string, any]) => {
      acc[+id] = OrganizationHeader.fromJSON(org);
      return acc;
    }, {});
    const members = Object.entries(json.members).reduce((acc: { [id: number]: Membership }, [id, member]: [string, any]) => {
      acc[+id] = Membership.fromJSON(member);
      return acc;
    }, {});
    const activations = json.activations.map((a: any) => ActivationHeader.fromJSON(a));
    const comments = json.comments.map((c: any) => Comment.fromJSON(c));
    return new Campagin(
      json.header.id,
      json.header,
      json.header.publisher.id,
      (json.header.advertiser ? json.header.advertiser.id : 0),
      memberOrgs,
      members,
      activations,
      comments
    );
  }
}