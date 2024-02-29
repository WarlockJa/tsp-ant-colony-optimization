// The calculateTransitionProbability function is a key component of the ant's decision-making process in the ant colony optimization algorithm (ACO). It calculates the probability of an ant moving from its current city (i) to another unvisited city (j) based on two factors:

//     Pheromone level (τ_ij): Represents the attractiveness of the path between the current city (i) and the unvisited city (j), influenced by the pheromone trails left by previous ants.
//     Heuristic information (η_ij): Represents the desirability of the path based on a problem-specific rule, typically favoring shorter distances between cities.

// Here's a common formula used to calculate the transition probability:

// P(i -> j) = (τ_ij)^α / Σ(τ_kj)^α * (η_ij)^β

// Explanation of the formula:

//     P(i -> j): Represents the probability of the ant moving from city i to city j.
//     τ_ij: Pheromone level on the path between city i and city j.
//     α (alpha): Controls the relative importance of pheromone trails. Higher alpha values emphasize the influence of pheromones.
//     Σ(τ_kj)^α: Sum of pheromone levels raised to power α, taken over all unvisited cities (k) from the current city (i).
//     η_ij: Heuristic value associated with the path between city i and city j. This can be the inverse of the distance between the cities (1 / distance_ij).
//     β (beta): Controls the relative importance of the heuristic information. Higher beta values emphasize the influence of the heuristic.

export function calculateTransitionProbability(
  dotsArray: IDot[],
  indexDotA,
  indexDotB,
  desirabilityTable
) {
  const numCities = pheromones.length;
  let numerator = pheromones[i][j] ** alpha;
  let denominator = 0;

  for (let k = 0; k < numCities; k++) {
    if (!visited[k]) {
      // Only consider unvisited cities
      denominator += pheromones[i][k] ** alpha;
    }
  }

  denominator *= calculateHeuristic(cities[i], cities[j]) ** beta; // Include heuristic information

  return numerator / denominator;
}

// Helper function to calculate the chosen heuristic (e.g., inverse of distance)
function calculateHeuristic(i: IDot, j: IDot) {
  // Implement your specific heuristic calculation here,
  // e.g., 1 / distance between city i and j
  return 1 / Math.sqrt(Math.pow(j.x - i.x, 2) + Math.pow(j.y - i.y, 2));
}
