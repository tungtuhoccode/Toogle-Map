import json

# 1. Load your original GeoJSON
with open('/Users/tung/Document_local/Project-Code/Toogle-Map/Toogle-Map/Data-Collection/medium-ottawa-area.geojson') as f:
    data = json.load(f)

# 2. Flatten out every [lon, lat]
all_coords = []

for feat in data['features']:
    def collect(coords):
        if isinstance(coords[0], (float, int)):
            all_coords.append(coords)
        else:
            for c in coords:
                collect(c)
    collect(feat['geometry']['coordinates'])

# 3. Build a new FeatureCollection of Points
point_features = []
for lon, lat in all_coords:
    point_features.append({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [lon, lat]
        },
        "properties": {}            # you can copy over properties if you like
    })

points_fc = {
    "type": "FeatureCollection",
    "features": point_features
}

# 4. Write it out
with open('points.geojson', 'w') as out:
    json.dump(points_fc, out, indent=2)
print(f"Written {len(point_features)} point features to points.geojson")