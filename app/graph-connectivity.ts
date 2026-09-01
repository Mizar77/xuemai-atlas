export type GraphLink = { from: string; to: string };

/**
 * Return shortest undirected hop distances from a person. Relationship arrows
 * still retain their meaning when rendered; only reachability ignores them.
 */
export function undirectedHopDistances(centerId: string, links: GraphLink[]) {
  const adjacency = new Map<string, Set<string>>();
  links.forEach((link) => {
    if (link.from === link.to) return;
    const fromNeighbors = adjacency.get(link.from) ?? new Set<string>();
    const toNeighbors = adjacency.get(link.to) ?? new Set<string>();
    fromNeighbors.add(link.to);
    toNeighbors.add(link.from);
    adjacency.set(link.from, fromNeighbors);
    adjacency.set(link.to, toNeighbors);
  });

  const distances = new Map<string, number>([[centerId, 0]]);
  const queue = [centerId];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor];
    const nextDistance = (distances.get(current) ?? 0) + 1;
    adjacency.get(current)?.forEach((neighbor) => {
      if (distances.has(neighbor)) return;
      distances.set(neighbor, nextDistance);
      queue.push(neighbor);
    });
  }
  return distances;
}

export function undirectedConnectedPersonIds(centerId: string, links: GraphLink[]) {
  return new Set(undirectedHopDistances(centerId, links).keys());
}
