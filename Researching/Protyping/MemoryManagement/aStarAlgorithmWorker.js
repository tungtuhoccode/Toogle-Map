// astarWorker.js
// Offloads A* search to a Web Worker
importScripts('https://unpkg.com/@turf/turf@6.5.0/turf.min.js');

self.onmessage = async function(e) {
  const { graph, coordsMap, allKeys, startKey, endKey } = e.data;

  // heuristic: euclidean distance via turf
  function h(u) {
    return turf.distance(
      turf.point(coordsMap[u]),
      turf.point(coordsMap[endKey]),
      { units: 'kilometers' }
    );
  }

  // initialize scores and sets
  const openSet = new Set([startKey]);
  const cameFrom = {};
  const gScore = Object.fromEntries(allKeys.map(u => [u, Infinity]));
  const fScore = Object.fromEntries(allKeys.map(u => [u, Infinity]));
  gScore[startKey] = 0;
  fScore[startKey] = h(startKey);

  const visitedOrder = [];

  // A* main loop
  while (openSet.size) {
    let current = null, best = Infinity;
    for (const u of openSet) {
      if (fScore[u] < best) { best = fScore[u]; current = u; }
    }
    visitedOrder.push(current);
    if (current === endKey) break;

    openSet.delete(current);
    for (const { to: nei, weight: w } of graph[current]) {
      const tg = gScore[current] + w;
      if (tg < gScore[nei]) {
        cameFrom[nei] = current;
        gScore[nei] = tg;
        fScore[nei] = tg + h(nei);
        openSet.add(nei);
      }
    }
  }

  // reconstruct path
  let path = null;
  if (gScore[endKey] < Infinity) {
    path = [];
    let u = endKey;
    while (u) {
      path.unshift(u);
      u = cameFrom[u];
    }
  }

  // return results
  self.postMessage({ visitedOrder, path });
};
