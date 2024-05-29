export interface Family {
    name: string;
    members: FamilyMember[];
}

export interface FamilyMember {
    name: string;
    familyId: number;
}