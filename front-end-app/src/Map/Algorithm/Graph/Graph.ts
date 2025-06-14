import {point, distance} from '@turf/turf'
import type { FeatureCollection } from "geojson";

/**
 * Represents a directed edge in the graph.
 */
export interface Edge {
    /** The destination vertex key */
    to: string; 

    /** The weight of the edge */
    weight: number;
}

/**
 * Generic graph that supports both directed and undirect graph
 */
export class Graph {

    private adjacencyList :  Map<string, Edge[]>;

    constructor() {
        this.adjacencyList = new  Map<string, Edge[]>();
    }

    /**
     * Adds a vertex to the graph if it doesn't already exist.
     * @param key Unique key identifying the vertex
    */
    addVertex(key: string) : void {
        if (!this.adjacencyList.has(key)){
            this.adjacencyList.set(key, [])
        }
    }

    /**
     * Adds an edge between two vertices with a given weight. 
     * Automatically create new to and from vertex it it doesn't exist
     * @param from Source vertex key
     * @param to Destination vertex key
     * @param weight Weight or cost of the edge
     * @param directed Whether the edge is directed (one-way). Defaults to false (undirected).
    */
    addEdge(from: string, to: string, weight: number, directed = false) : void {
        this.addVertex(from);
        this.addVertex(to);
        this.adjacencyList.get(from)!.push({ to, weight });
        
        if (!directed) {
            this.adjacencyList.get(to)!.push({ to: from, weight });
        }
    } 

    /**
     * Constructs a Graph instance from a GeoJSON FeatureCollection.
     * Assumes each feature is a LineString with optional `oneway` property. Only LineString with oneway = 'yes' is oneway road
     * @param geojson A valid GeoJSON FeatureCollection
     * 
     * Example of a valid GEOJSON: 
     * See small.geojson in public folder
     * 
    */
    static fromGeoJSON(geojson: FeatureCollection): Graph {
        const graph = new Graph();
        geojson.features.forEach((feature: any) => {
            const coordinates : [number, number][] = feature.geometry.coordinates

            const isOneWay: boolean = feature.properties.oneway === 'yes';

            for (let i = 1; i < coordinates.length; i++){
                const [lonA, latA] = coordinates[i-1]
                const [lonB, latB] = coordinates[i]

                const vertexKeyA = `${lonA}, ${latA}`
                const vertexKeyB = `${lonB}, ${latB}`
                
                const w = distance(point(coordinates[i - 1]), point(coordinates[i]), { units: 'kilometers' });
                graph.addEdge(vertexKeyA, vertexKeyB, w, isOneWay)
            }
        })

        return graph;
    }
}