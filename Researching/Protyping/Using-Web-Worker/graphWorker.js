// graphWorker.js
importScripts('https://unpkg.com/@turf/turf@6.5.0/turf.min.js');

onmessage = ({ data: geojson }) => {
  const graph = {};
  const coordsMap = {};
  const key = pt => pt[0] + ',' + pt[1];

  for (const f of geojson.features) {
    const c = f.geometry.coordinates;
    const isOneWay = f.properties.oneway === 'yes';
    for (let i = 1; i < c.length; i++) {
      const [lonA, latA] = c[i-1];
      const [lonB, latB] = c[i];
      const A = key(c[i-1]), B = key(c[i]);
      const d = turf.distance(turf.point(c[i-1]), turf.point(c[i]), { units: 'kilometers' });

      graph[A] = graph[A] || []; graph[B] = graph[B] || [];
      coordsMap[A] = [lonA, latA]; coordsMap[B] = [lonB, latB];

      graph[A].push({ to: B, weight: d });
      if (!isOneWay) graph[B].push({ to: A, weight: d });
    }
  }

  const allKeys = Object.keys(graph);
  const idMap   = Object.fromEntries(allKeys.map((k,i) => [k, i]));

  // send the minimal needed back:
  postMessage({ graph, coordsMap, allKeys, idMap });
};
