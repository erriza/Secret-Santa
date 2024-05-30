import { Family, FamilyMember } from "../../types";

// Function to create the adjacency list for the graph
const createGraph = (
  families: Family[],
  pairingsHistory: Record<string, [string, number][]>,
  currentYear: number
): Record<string, Set<string>> => {
  const graph: Record<string, Set<string>> = {};

  // Create nodes for each family member
  const allMembers = families.flatMap((family) => family.members);

  // Initialize adjacency list
  allMembers.forEach((member) => {
    graph[member.name] = new Set();
  });

  console.log('inicia allmembers',allMembers);
  console.log('inicia graph',graph);

  // Add edges between valid pairings
  allMembers.forEach((giver) => {
    allMembers.forEach((receiver) => {
      if (
        giver.name !== receiver.name &&
        giver.familyId !== receiver.familyId &&
        !hasBeenPairedRecently(giver, receiver, pairingsHistory, currentYear)
      ) {
        graph[giver.name].add(receiver.name);
      }
    });
  });

  return graph;
};

// Function to check if a pairing happened within the last 3 years
const hasBeenPairedRecently = (
  giver: FamilyMember,
  receiver: FamilyMember,
  pairingsHistory: Record<string, [string, number][]>,
  currentYear: number
): boolean => {
  if (!pairingsHistory[giver.name]) {
    return false;
  }
  const pastPairings = pairingsHistory[giver.name];
  return pastPairings.some(
    (pastPairing) =>
      pastPairing[0] === receiver.name && currentYear - pastPairing[1] <= 3
  );
};

// Helper function for DFS to find an augmenting path
const dfs = (
  graph: Record<string, Set<string>>,
  u: string,
  pairU: Record<string, string>,
  pairV: Record<string, string>,
  visited: Set<string>
): boolean => {
  for (const v of graph[u]) {
    if (!visited.has(v)) {
      visited.add(v);
      if (!pairV[v] || dfs(graph, pairV[v], pairU, pairV, visited)) {
        pairU[u] = v;
        pairV[v] = u;
        return true;
      }
    }
  }
  return false;
};

// Hopcroft-Karp algorithm to find maximum bipartite matching
const hopcroftKarp = (graph: Record<string, Set<string>>): Record<string, string> => {
    const pairU: Record<string, string> = {};
    const pairV: Record<string, string> = {};
    let foundPath = true;
  
    while (foundPath) {
      foundPath = false;
      const visited = new Set<string>();
      for (const u in graph) {
        if (!pairU[u] && dfs(graph, u, pairU, pairV, visited)) {
          foundPath = true;
        }
      }
    }
  
    return pairU;
  };
  

// Main function to generate Secret Santa pairings
const generateSecretSanta = (
    families: Family[],
    pairingsHistory: Record<string, [string, number][]>,
    currentYear: number
  ): [Record<string, string>, string | null] => {
//   const currentYear = new Date().getFullYear();
//   const pairingsHistory: Record<string, [string, number][]> = {};
  // Create graph
  const graph = createGraph(families, pairingsHistory, currentYear);

  // Find maximum bipartite matching
  const pairings = hopcroftKarp(graph);

  // Check if we have a complete matching
  const allMembers = families.flatMap((family) => family.members);
  console.log('Objects keys', Object.keys(pairings).length)
  console.log('allmembers', allMembers.length);
  console.log('validation', allMembers.length % 2 !== 0);
  if (Object.keys(pairings).length !== allMembers.length) {
    if (allMembers.length % 2 !== 0) {
      return [{}, 'Could not generate valid pairings. An odd number of members cannot be paired.'];
    } else {
      return [{}, 'Could not generate valid pairings. Please try adjusting family members or the 3-year rule.'];
    }
  }

  // Update pairings history
  for (const giver in pairings) {
    pairingsHistory[giver] = pairingsHistory[giver] || [];
    pairingsHistory[giver].push([pairings[giver], currentYear]);
  }
  console.log('history', pairingsHistory)

  return [pairings, null];
};

export default generateSecretSanta;
