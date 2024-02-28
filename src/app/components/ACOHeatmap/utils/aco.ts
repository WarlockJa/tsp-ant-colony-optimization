import { calculateTransitionProbability } from "./calculateTransitionProbability";

interface IFindShortestRouteProps {
  cities: any;
  steps: number;
}

export default function findShortestRoute(cities, steps, alpha, beta, rho, q0) {
  // Initialization
  let pheromones = initializePheromones(cities); // Matrix of initial pheromone values
  let bestRoute = null;
  let bestDistance = Number.MAX_SAFE_INTEGER;

  // Main ACO loop
  for (let step = 0; step < steps; step++) {
    let routes = [];
    for (let ant = 0; ant < cities.length; ant++) {
      // Simulate multiple ants
      let route = constructAntRoute(cities, pheromones, alpha, beta);
      routes.push(route);
    }

    updatePheromones(routes, pheromones, rho, q0);

    // Check if a better route was found this iteration
    for (let route of routes) {
      let distance = calculateRouteDistance(route);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestRoute = route;
      }
    }
  }

  return bestRoute;
}

export function initializePheromones(cities: any) {
  const numCities = cities.length;
  const pheromones = Array(numCities)
    .fill(null)
    .map(() => Array(numCities).fill(0.1));

  return pheromones;
}

function constructAntRoute(cities: IDot[], pheromones, alpha, beta) {
  const numCities = cities.length;
  const route = [cities[Math.floor(Math.random() * numCities)]]; // Random starting city
  const visited = new Array(numCities).fill(false);
  visited[route[0]] = true;

  for (let i = 1; i < numCities; i++) {
    let nextCity = null;
    let nextCityProb = Number.NEGATIVE_INFINITY;

    // Loop through unvisited cities
    for (let j = 0; j < numCities; j++) {
      if (!visited[j]) {
        const probability = calculateTransitionProbability(
          cities,
          route[i - 1],
          j,
          pheromones,
          alpha,
          beta
        );
        if (probability > nextCityProb) {
          nextCityProb = probability;
          nextCity = j;
        }
      }
    }

    // Handle cases with no unvisited cities (dead end)
    if (nextCity === null) {
      // Choose a random unvisited city
      const unvisitedCities = [];
      for (let j = 0; j < numCities; j++) {
        if (!visited[j]) {
          unvisitedCities.push(j);
        }
      }
      nextCity =
        unvisitedCities[Math.floor(Math.random() * unvisitedCities.length)];
    }

    route.push(cities[nextCity]);
    visited[nextCity] = true;
  }

  return route;
}
