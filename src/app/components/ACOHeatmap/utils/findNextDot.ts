interface IFindNextDotProps {
  mapDotsDataMutable: IDotWithIndex[];
  alpha: number;
  beta: number;
  currentDotIndex: number;
  desirabilityMatrix: TDesirabilityMatrix;
}

export default function findNextDot({
  mapDotsDataMutable,
  alpha,
  beta,
  currentDotIndex,
  desirabilityMatrix,
}: IFindNextDotProps): IDotWithIndex {
  const probabilityArray: number[] = mapDotsDataMutable.map((dot) => {
    // finding route data in desirabilityMatrix
    const dotDataInDesirabilityMatrix =
      currentDotIndex < dot.index
        ? desirabilityMatrix[currentDotIndex][dot.index]
        : desirabilityMatrix[dot.index][currentDotIndex];

    // calculating transition probability for the dot
    return calculateTransitionProbability({
      alpha,
      beta,
      heuristic: dotDataInDesirabilityMatrix!.heuristic,
      pheromone: dotDataInDesirabilityMatrix!.pheromone,
    });
  });
  // calculating sum of all probabilities
  const sumOfAllProbabilities = probabilityArray.reduce(
    (sum, val) => (sum += val),
    0
  );

  // deciding which dot to travel to
  // TEST for testing purposes replacing random number with 0.5
  // const randomChoice = 0.5;
  const randomChoice = Math.random();

  let pathProbabilitySum = 0;
  let chosenPathIndex = -1;
  do {
    chosenPathIndex++;
    pathProbabilitySum +=
      probabilityArray[chosenPathIndex] / sumOfAllProbabilities;
  } while (pathProbabilitySum < randomChoice);

  return mapDotsDataMutable[chosenPathIndex];
}

// The calculateTransitionProbability function is a key component of the ant's decision-making process in the ant colony optimization algorithm (ACO). It calculates the probability of an ant moving from its current dot (i) to another unvisited dot (j) based on two factors:
//     Pheromone level (τ_ij): Represents the attractiveness of the path between the current dot (i) and the unvisited dot (j), influenced by the pheromone trails left by previous ants.
//     Heuristic information (η_ij): Represents the desirability of the path based on a problem-specific rule, typically favoring shorter distances between cities.
// Here's a common formula used to calculate the transition probability:

// P(i -> j) = (τ_ij)^α / Σ(τ_kj)^α * (η_ij)^β

// Explanation of the formula:
//     P(i -> j): Represents the probability of the ant moving from dot i to dot j.
//     τ_ij: Pheromone level on the path between dot i and dot j.
//     α (alpha): Controls the relative importance of pheromone trails. Higher alpha values emphasize the influence of pheromones.
//     Σ(τ_kj)^α: Sum of pheromone levels raised to power α, taken over all unvisited cities (k) from the current dot (i).
//     η_ij: Heuristic value associated with the path between dot i and dot j. This can be the inverse of the distance between the cities (1 / distance_ij).
//     β (beta): Controls the relative importance of the heuristic information. Higher beta values emphasize the influence of the heuristic.

interface ICalculateTransitionProbabilityProps {
  alpha: number;
  beta: number;
  pheromone: number;
  heuristic: number;
}
const calculateTransitionProbability = ({
  alpha,
  beta,
  pheromone,
  heuristic,
}: ICalculateTransitionProbabilityProps): number => {
  return Math.pow(pheromone, alpha) * Math.pow(heuristic, beta);
};
