// IMPORTS

import { UserHeader } from './user';

// INTERFACE

export default class Comment {
  // properties
  public id: number;
  public campaignId: number;
  public activationId: number;
  public parentId: number;
  public author: UserHeader;
  public text: string;
  public createdAt: Date;
  public subComments: Comment[];

  constructor(
    id: number,
    campaignId: number,
    activationId: number,
    parentId: number,
    author: UserHeader,
    properties: any,
    createdAt: Date,
    subComments: Comment[] = []
  ) {
    this.id = id;
    this.campaignId = campaignId;
    this.activationId = activationId;
    this.parentId = parentId;
    this.author = author;
    this.text = properties.text;
    this.createdAt = createdAt;
    this.subComments = subComments;
  }

  public addSubComment(comment: Comment) {
    this.subComments.push(comment);
  }

  public static fromJSON(json: any): Comment {
    return new Comment(
      json.id,
      json.campaignId,
      json.activationId,
      json.parentId,
      UserHeader.fromJSON(json.author),
      json,
      new Date(Date.parse(json.createdAt)),
      json.subComments.map((comment: any) => Comment.fromJSON(comment))
    );
  }
}