import { Injectable } from '@nestjs/common';

@Injectable()
export class GraphService {
  private graph = new Map<string, Map<string, number>>();

  // Method to build the graph from an array of route strings (["AB5", "BC4"])
  buildGraph(routes: string[]): void {
    this.graph.clear();
    for (const route of routes) {
      const startNode = route[0];
      const endNode = route[1];
      const distance = parseInt(route.substring(2), 10);

      if (!this.graph.has(startNode)) {
        this.graph.set(startNode, new Map<string, number>());
      }
      this.graph.get(startNode)!.set(endNode, distance);
    }
  }

  // Method to calculate the distance of a specific route
  getDistance(route: string[]): number | string {
    if (route.length < 2) {
      return 'NO SUCH ROUTE';
    }

    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const start = route[i];
      const end = route[i + 1];

      if (!this.graph.has(start) || !this.graph.get(start)?.has(end)) {
        return 'NO SUCH ROUTE';
      }
      totalDistance += this.graph.get(start)!.get(end)!;
    }
    return totalDistance;
  }

  // Method to find the shortest route between two cities using Dijkstra's algorithm
  getShortestDistance(start: string, end: string): number | string {
    const distances = new Map<string, number>();
    const visited = new Set<string>();
    const nodes = Array.from(this.graph.keys());

    // Initialize distances
    for (const node of nodes) {
      distances.set(node, Infinity);
    }
    distances.set(start, 0);

    // Main loop for Dijkstra's
    while (visited.size < nodes.length) {
      const currentNode = this.getNearestUnvisitedNode(distances, visited);
      if (currentNode === null) break;
      visited.add(currentNode);

      // Update distances to neighbors
      const neighbors = this.graph.get(currentNode);
      if (neighbors) {
        for (const [neighbor, distance] of neighbors.entries()) {
          const currentDistance = distances.get(currentNode)!;
          const newDistance = currentDistance + distance;
          const neighborDistance = distances.get(neighbor)!;
          if (newDistance < neighborDistance) {
            distances.set(neighbor, newDistance);
          }
        }
      }
    }

    const shortestDistance = distances.get(end);
    if (shortestDistance === undefined || shortestDistance === Infinity) {
      return 'NO SUCH ROUTE';
    }
    return shortestDistance;
  }

  // Helper method for Dijkstra's to find the nearest unvisited node
  private getNearestUnvisitedNode(
    distances: Map<string, number>,
    visited: Set<string>,
  ): string | null {
    let minDistance = Infinity;
    let nearestNode: string | null = null;

    for (const [node, distance] of distances.entries()) {
      if (!visited.has(node) && distance < minDistance) {
        minDistance = distance;
        nearestNode = node;
      }
    }
    return nearestNode;
  }
}
