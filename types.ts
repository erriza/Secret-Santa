import { Types } from 'mongoose';

export interface Family {
  name: string;
  members: FamilyMember[];
  _id: Types.ObjectId;
  familyId: string; // Change to string
}

export interface FamilyMember {
  name: string;
  familyId: string; 
  _id: Types.ObjectId; 
}

export type FamilyDocument = Document & {
  name: string;
  members: FamilyMember[];
  _id: string;
};