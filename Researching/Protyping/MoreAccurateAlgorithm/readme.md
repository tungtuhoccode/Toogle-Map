This version is a more accurate version, since it takes into account the direciton of travelling as well. 2 way street will be different from 1 way street. 

const graph = {};

function key(pt){ return pt[0] + ',' + pt[1]; }
geojson.features.forEach(f => {
//determine if the road is oneway or not? 
    //based on the geojson file, there are three cases
    //
    //if the oneway == 'yes'
const c = f.geometry.coordinates;
let isOneWay = false;
if(f.properties.oneway && f.properties.oneway == "yes") 
    isOneWay = true

    for (let i = 1; i < c.length; i++) {
const A = key(c[i-1]), B = key(c[i]);
const d = turf.distance(turf.point(c[i-1]), turf.point(c[i]), { units: 'kilometers' });
graph[A] = graph[A] || [];
graph[B] = graph[B] || [];
graph[A].push({ to: B, weight: d });
if (!isOneWay) graph[B].push({ to: A, weight: d });
}
});