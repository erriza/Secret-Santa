import { Family } from "../../types";
import generateSecretSanta from "./generateSecretSanta.tsx";

describe("generate Secret Santa", () => {
    it("should generate valid pairings for a simple case", () => {
        const families: Family[] = [
            {
                name: "Family A",
                members: [
                    { name: "Alice", familyId: 1 },
                    { name: "Bob", familyId: 1 }
                ]
            },
            {
                name: "Family B",
                members: [
                    { name: "Charlie", familyId: 2 },
                    { name: "David", familyId: 2 }
                ]
            },
        ]

        const pairingHistory = {}
        const currentYear = new Date().getFullYear();
        const [pairings, error] = generateSecretSanta(families, pairingHistory, currentYear);

        expect(error).toBeNull;
        expect(pairings).toEqual(
            expect.objectContaining({
                Alice: expect.any(String),
                Bob: expect.any(String),
                Charlie: expect.any(String),
                David: expect.any(String),
            })
        )
    });

    it("should handle cases with multiple families", () => {
        const families: Family[] = [
            {
                name: "Family A",
                members: [
                    { name: "Alice", familyId: 1 },
                    { name: "Bob", familyId: 1 }
                ]
            },
            {
                name: "Family B",
                members: [
                    { name: "Charlie", familyId: 2 },
                    { name: "David", familyId: 2 }
                ]
            },
            {
                name: "Family C",
                members: [
                    { name: "Eve", familyId: 3 },
                    { name: "Frank", familyId: 3 }
                ]
            },
        ]

        const pairingHistory = {}
        const currentYear = new Date().getFullYear();
        const [pairings, error] = generateSecretSanta(families, pairingHistory, currentYear);

        expect(error).toBeNull;
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
                name: "Family A",
                members: [
                    { name: "Alice", familyId: 1 },
                    { name: "Bob", familyId: 1 },
                    { name: "Carol", familyId: 1 }
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
                name: "Family A",
                members: [
                    { name: "Alice", familyId: 1 },
                    { name: "Bob", familyId: 1 }
                ]
            },
            {
                name: "Family B",
                members: [
                    { name: "Charlie", familyId: 2 },
                    { name: "David", familyId: 2 }
                ]
            },
        ]

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

})