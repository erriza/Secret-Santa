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
  console.log('graph con info', graph);
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
  currentGiver: string,
  giverToReceiver: Record<string, string>,
  receiverToGiver: Record<string, string>,
  visited: Set<string>
): boolean => {
  for (const potentialReceiver of graph[currentGiver]) {
    if (!visited.has(potentialReceiver)) {
      visited.add(potentialReceiver);
      //If the potential receiver is unmatched OR if a path can be augmented from the receivers current giver
      if (!receiverToGiver[potentialReceiver] || 
          dfs(graph, receiverToGiver[potentialReceiver], giverToReceiver, receiverToGiver, visited)) {
        giverToReceiver[currentGiver] = potentialReceiver;
        receiverToGiver[potentialReceiver] = currentGiver;
        return true; //augmented path found!
      }
    }
  }
  return false; // No augmenting path found from this giver
};

// Hopcroft-Karp algorithm to find maximum bipartite matching
const hopcroftKarp = (graph: Record<string, Set<string>>): Record<string, string> => {
    const giverToReceiver: Record<string, string> = {}; //Maps giver to receiver
    const receiverToGiver: Record<string, string> = {}; //Maps receiver to giver
    let foundPath = true;
  
    while (foundPath) {
      foundPath = false;
      const visitedNodes = new Set<string>();
      for (const giver in graph) {
        if (!giverToReceiver[giver] && dfs(graph, giver, giverToReceiver, receiverToGiver, visitedNodes)) {
          foundPath = true; // found path, so continue searching
        }
      }
    }
  
    return giverToReceiver; // return the final matching giver to receiver
  };
  

// Main function to generate Secret Santa pairings
const generateSecretSanta = (
    families: Family[],
    pairingsHistory: Record<string, [string, number][]>,
    currentYear: number
  ): [Record<string, string>, string | null] => {
  // Create graph
  const graph = createGraph(families, pairingsHistory, currentYear);

  // Find maximum bipartite matching
  const pairings = hopcroftKarp(graph);

  // Check if we have a complete matching
  const allMembers = families.flatMap((family) => family.members);
  
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

  return [pairings, null]; // Return the pairings and no error message
};

export default generateSecretSanta;
