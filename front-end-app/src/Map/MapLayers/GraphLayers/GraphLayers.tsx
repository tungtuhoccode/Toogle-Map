import { useEffect, useState } from "react";
import { Source, Layer } from "react-map-gl/maplibre";
import {useMap} from '@vis.gl/react-maplibre';
import type {
  CircleLayerSpecification,
  LineLayerSpecification,
} from "react-map-gl/maplibre";
import type { FeatureCollection } from "geojson";
import "maplibre-gl/dist/maplibre-gl.css";

const graphNodeLayer: CircleLayerSpecification = {
  id: "graph-node-layer",
  source: "graph-data",
  type: "circle",
  paint: {
    "circle-radius": 3,
    "circle-color": "#2ECC40",
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

const graphEdgeLayer: LineLayerSpecification = {
  id: "graph-edge-layer",
  source: "graph-data",
  type: "line",
  paint: {
    "line-color": "#0074D9",
    "line-width": 2,
  },
};

/*
Graph: 
1. Node: point on graph that is a pair of [lat, long]
2. Edge: for each 2 points on the graph, there is an edge. 
  a. If it's an 1 way street, then there is 1 edge from previous point to the next point
  b. If it's an 2 way street, there will be 2 edges back and forth 
*/
export default function GraphLayers() {
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [showEdges, setShowEdges] = useState(true);
  const [showNodes, setShowNodes] = useState(true);

  useEffect(() => {
    fetch("/sample-data/small.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json: FeatureCollection) => 
        {
          setData(json)
        }
      )
      .catch(console.error);
  }, []);

  if (!data) return null;

  const UIHelper = () => {
    return (
      <>
        {/* toggles UI */}
        <div className="absolute top-4 right-4 z-30 bg-white p-2 rounded-md shadow-md">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showEdges}
              onChange={() => setShowEdges((v) => !v)}
            />
            <span>Show Edges</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={showNodes}
              onChange={() => setShowNodes((v) => !v)}
            />
            <span>Show Nodes</span>
          </label>
        </div>
      </>
    );
  };

  return (
    <>
     {UIHelper()}

      <Source id="graph-data" type="geojson" data={data}>
          <Layer
              {...graphEdgeLayer}
              layout={{ visibility: showEdges ? "visible" : "none" }}
          />

          <Layer
              {...graphNodeLayer}
              layout={{ visibility: showNodes ? "visible" : "none" }}
          />
      </Source>
    </>
  );
}
