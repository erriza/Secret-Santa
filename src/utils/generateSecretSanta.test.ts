import { Types } from "mongoose";
import { Family } from "../../types";
import generateSecretSanta from "./generateSecretSanta.tsx";

describe("generate Secret Santa", () => {
    it("should generate valid pairings for a simple case", () => {
      const families: Family[] = [
        {
          name: "Family A",
          _id: new Types.ObjectId(),
          familyId: 'familyAId', 
          members: [
            { name: "Alice", familyId: 'familyAId', _id: new Types.ObjectId() },
            { name: "Bob", familyId: 'familyAId', _id: new Types.ObjectId() }
          ]
        },
        {
          name: "Family B",
          _id: new Types.ObjectId(),
          familyId: 'familyBId',
          members: [
            { name: "Charlie", familyId: 'familyBId', _id: new Types.ObjectId() },
            { name: "David", familyId: 'familyBId', _id: new Types.ObjectId() }
          ]
        },
      ];
  
      const pairingHistory = {};
      const currentYear = new Date().getFullYear();
      const [pairings, error] = generateSecretSanta(families, pairingHistory, currentYear);
  
      expect(error).toBeNull();
      expect(pairings).toEqual(
        expect.objectContaining({
          Alice: expect.any(String),
          Bob: expect.any(String),
          Charlie: expect.any(String),
          David: expect.any(String),
        })
      );
    });
  });
  

    it("should handle cases with multiple families", () => {
      const families: Family[] = [
        {
          _id: new Types.ObjectId(),
          name: "Family A",
          familyId: 'familyAId', 
          members: [
            { name: "Alice", familyId: 'familyAId', _id: new Types.ObjectId() },
            { name: "Bob", familyId: 'familyAId', _id: new Types.ObjectId() }
          ]
        },
        {
          _id: new Types.ObjectId(),
          name: "Family B",
          familyId: 'familyBId',
          members: [
            { name: "Charlie", familyId: 'familyBId', _id: new Types.ObjectId() },
            { name: "David", familyId: 'familyBId', _id: new Types.ObjectId() }
          ]
        },
        {
          _id: new Types.ObjectId(),
          name: "Family C",
          familyId: 'familyCId',
          members: [
            { name: "Eve", familyId: 'familyCId', _id: new Types.ObjectId() },
            { name: "Frank", familyId: 'familyCId', _id: new Types.ObjectId() }
          ]
        },
      ];
  
      const pairingHistory = {}
      const currentYear = new Date().getFullYear();
      const [pairings, error] = generateSecretSanta(families, pairingHistory, currentYear);
  
      expect(error).toBeNull();
      expect(pairings).toEqual(
        expect.objectContaining({
          Alice: expect.any(String),
          Bob: expect.any(String),
          Charlie: expect.any(String),
          David: expect.any(String),
          Eve: expect.any(String),
          Frank: expect.any(String),
        })
      )
    });
  
    it("should handle cases with a single Family", () => {
      const families: Family[] = [
        {
          _id: new Types.ObjectId(),
          name: "Family A",
          familyId: 'familyAId', 
          members: [
            { name: "Alice", familyId: 'familyAId', _id: new Types.ObjectId() },
            { name: "Bob", familyId: 'familyAId', _id: new Types.ObjectId() },
            { name: "Carol", familyId: 'familyAId', _id: new Types.ObjectId() }
          ]
        },
      ]
      const pairingHistory = {}
      const currentYear = new Date().getFullYear();
      const [pairings, error] = generateSecretSanta(families, pairingHistory, currentYear);
  
      expect(error).toBe("Could not generate valid pairings. An odd number of members cannot be paired.");
      expect(pairings).toEqual({});
    });
  
    it("should handle cases with repeated pairings within the last 3 years", () => {
      const families: Family[] = [
        {
          _id: new Types.ObjectId(),
          name: "Family A",
          familyId: 'familyAId',
          members: [
            { name: "Alice", familyId: 'familyAId', _id: new Types.ObjectId() },
            { name: "Bob", familyId: 'familyAId', _id: new Types.ObjectId() }
          ]
        },
        {
          _id: new Types.ObjectId(),
          name: "Family B",
          familyId: 'familyBId',
          members: [
            { name: "Charlie", familyId: 'familyBId', _id: new Types.ObjectId() },
            { name: "David", familyId: 'familyBId', _id: new Types.ObjectId() }
          ]
        },
      ];
  
      // Simulate pairings history for the last 3 years
      const pairingHistory: Record<string, [string, number][]> = {
        Alice: [
          ["David", new Date().getFullYear() - 1], 
          ["Charlie", new Date().getFullYear() - 2]
        ],
        Bob: [
          ["Charlie", new Date().getFullYear() - 1],
          ["David", new Date().getFullYear() - 2]
  
        ],
        Charlie: [
          ["Alice", new Date().getFullYear() - 1],
          ["Bob", new Date().getFullYear() - 2]
  
        ],
        David: [
          ["Bob", new Date().getFullYear() - 1],
          ["Alice", new Date().getFullYear() - 2]
  
        ]
      }
  
      const currentYear = new Date().getFullYear();
      const [pairings, error] = generateSecretSanta(families, pairingHistory, currentYear);
  
      expect(error).toBe("Could not generate valid pairings. Please try adjusting family members or the 3-year rule.");
      expect(pairings).toEqual({});
    });
