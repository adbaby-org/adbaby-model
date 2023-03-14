// IMPORTS

import { OrganizationHeader } from './organization';
import Comment from './comment';

// CONSTANTS


export const ACTIVATION_MEDIUMS: { [key: string]: string[] } = {
  'Digital': ['Display', 'Search', 'Social Media', 'Other'],
  'Print': ['Newspaper', 'Magazine', 'Other'],
  'Audio': ['Radio', 'Podcast', 'Other'],
  'Video': ['Television', 'Streaming', 'Other'],
  'Out-of-Home': ['Billboard', 'Transit', 'Other'],
  'Social Media': ['Facebook', 'Instagram', 'Twitter', 'Other'],
  'Other': ['Other']
}

// INTERFACE

export const ActivationProperties: string[] = [
  'medium',
  'subMedium',
  'subtype',
  'name',
  'description',
  'startDate',
  'endDate',
];

export class ActivationHeader {
  public id: number;
  public campaignId: number;
  public medium: string;
  public subMedium: string;
  public subtype: string;
  public name: string;
  public description: string;
  public startDate: Date;
  public endDate: Date;
  public publisher: OrganizationHeader;
  public advertiser: OrganizationHeader | null;

  constructor(
    id: number,
    campaignId: number,
    properties: any,
    publisher: OrganizationHeader,
    advertiser: OrganizationHeader | null
  ) {
    this.id = id;
    this.campaignId = campaignId;
    this.medium = properties.medium;
    this.subMedium = properties.subMedium;
    this.subtype = properties.subtype;
    this.name = properties.name;
    this.description = properties.description;
    this.startDate = new Date(properties.startDate);
    this.endDate = new Date(properties.endDate);
    this.publisher = publisher;
    this.advertiser = advertiser;
  }

  public static fromJSON(json: any): ActivationHeader {
    return new ActivationHeader(
      json.id,
      json.campaignId,
      json,
      OrganizationHeader.fromJSON(json.publisher),
      (json.advertiser ? OrganizationHeader.fromJSON(json.advertiser) : null)
    );
  }
}

export default class Activation {
  // properties
  public header: ActivationHeader;

  // content items

  // tasks

  // comments
  public comments: Comment[];

  constructor(
    id: number,
    campaignId: number,
    properties: any,
    publisher: OrganizationHeader,
    advertiser: OrganizationHeader | null,
    comments: Comment[]
  ) {
    this.header = new ActivationHeader(id, campaignId, properties, publisher, advertiser);
    this.comments = comments;
  }

  public static fromJSON(json: any): Activation {
    const publisher = OrganizationHeader.fromJSON(json.header.publisher);
    const advertiser = (json.header.advertiser ? OrganizationHeader.fromJSON(json.header.advertiser) : null);
    const comments = json.comments.map((comment: any) => Comment.fromJSON(comment));
    return new Activation(
      json.header.id,
      json.header.campaignId,
      json.header,
      publisher,
      advertiser,
      comments
    );
  }
}