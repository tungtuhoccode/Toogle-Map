Contraction Hierarchies (CH) is a classic speed-up technique for computing exact shortest paths on large road networks by trading heavier preprocessing for extremely fast query times. Here’s how it works:

---

## 1. Two-Phase Algorithm: Preprocessing and Query

1. **Preprocessing (Node Contraction & Shortcuts)**

   * **Node Contraction**: Vertices are removed (“contracted”) one at a time in some importance order. When you contract a node *v*, you temporarily remove it and examine each pair of its neighbors *(u, w)*. If the shortest path between *u* and *w* goes through *v*, you add a “shortcut” edge directly connecting *u* to *w* whose weight equals the original *u–v–w* path length.
   * **Witness Search**: To decide whether a shortcut is needed between *u* and *w*, you run a limited Dijkstra (a “witness search”) avoiding *v*—if that avoids *v* path is already no longer than going through *v*, you skip adding the shortcut.
   * **Importance Ordering**: The order in which nodes are contracted is chosen via heuristics (e.g., minimizing the number of added shortcuts, node degree, or edge‐difference), since finding the optimal order is NP-complete. ([en.wikipedia.org][1], [docs.pgrouting.org][2])

2. **Query (Bidirectional Upward Search)**

   * After preprocessing, every edge is labelled with the “importance” levels of its endpoints. To answer a query from *s* to *t*, you run two simultaneous Dijkstra‐style searches:

     * One forward from *s*, only following edges that go “upwards” to more important nodes.
     * One backward from *t*, likewise only following upward edges.
   * Because all necessary shortcuts are in place, these two searches meet in the middle at the highest-importance vertex on the *s–t* shortest path. The distance is then simply the minimum sum of distances found where the search frontiers meet. ([en.wikipedia.org][1], [jlazarsfeld.github.io][3])

---

## 2. Why It’s So Fast

* **Dramatically Reduced Search Space**: By skipping over “less important” nodes via shortcuts, each query only relaxes a tiny subset of the entire network—often on the order of hundreds of vertices, even when the full graph has millions.
* **Microsecond Query Times**: In practice, CH can answer single *s–t* queries in tens to hundreds of microseconds, making it ideal for interactive routing (e.g., in-car navigation) or high-throughput web services.
* **Trade-off**: Preprocessing can take minutes to hours on continental-scale networks, but this cost is paid only once (or whenever the topology changes). ([publikationen.bibliothek.kit.edu][4], [en.wikipedia.org][1])

---

## 3. Implementation & Extensions

* **OSRM** and **GraphHopper** both use Contraction Hierarchies under the hood: they ingest OpenStreetMap data, run a CH preprocessing step (often called “contract”), and expose HTTP APIs for lightning-fast routing.
* **pgRouting** offers an experimental `pgr_contractionHierarchies` function for PostGIS, enabling CH on your own spatial database.
* **Customizable CH**: If you need to change edge weights frequently (e.g., live traffic updates), you can split preprocessing into two phases—metric-independent contraction (node ordering) and metric-dependent customization (shortcut recomputation). ([en.wikipedia.org][1], [docs.pgrouting.org][2])

---

### Key Points to Remember

* **Best for Very Large, Mostly Static Networks**: If your graph rarely changes, CH’s upfront cost is amortized over many ultra-fast queries.
* **Ordering Heuristics Matter**: A good contraction order minimizes added shortcuts and keeps both preprocessing time and query search space small.
* **Path Unpacking**: Because shortcuts summarize multi-edge paths, retrieving the actual sequence of original edges requires “unpacking”—following stored midpoints recursively to reconstruct the full route.

By adding just the right shortcuts and organizing nodes into a hierarchy of importance, Contraction Hierarchies turns millions-node routing problems into microsecond queries.

[1]: https://en.wikipedia.org/wiki/Contraction_hierarchies?utm_source=chatgpt.com "Contraction hierarchies"
[2]: https://docs.pgrouting.org/main/en/pgr_contractionHierarchies.html?utm_source=chatgpt.com "pgr_contractionHierarchies - Experimental — pgRouting Manual (3.8)"
[3]: https://jlazarsfeld.github.io/ch.150.project/sections/7-ch-overview/?utm_source=chatgpt.com "Core Components of CH | Contraction Hierarchies Guide"
[4]: https://publikationen.bibliothek.kit.edu/1000028701/142973925?utm_source=chatgpt.com "[PDF] Exact Routing in Large Road Networks Using Contraction Hierarchies"
