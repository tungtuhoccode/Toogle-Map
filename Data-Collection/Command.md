### Query 2: Get all highway that are for cars
curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"](
        poly:"45.405993370714384 -75.73277333814548 \
              45.39094620785227  -75.72409036574257 \
              45.40421468098455  -75.69260463592516 \
              45.418251875214565 -75.70567544412225 \
              45.405993370714384 -75.73277333814548"
      );
    );
    out geom;' \
  > test.geojson

`Data`: The data in here are in overpass JSON. We have to convert it to geojson so we can use it in our map.
https://tyrasd.github.io/osmtogeojson/

### Query 3: For bigger area
curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"](
        poly:"45.37244221120824 -75.7876683553953 \
              45.33465540891936 -75.74384180351687 \
              45.397888479910364 -75.61641923668238 \
              45.43936352165309 -75.69938058090212 \
              45.37244221120824 -75.7876683553953"
      );
    );
    out geom;' \
  > medium.json

### Query 4: Very big area
curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"](
        poly:"45.51778111451668 -76.21932181178113 \
              44.73831618527649 -76.34350923739015 \
              45.14677854029969 -74.65598553535536 \
              45.733427336528365 -75.20402812608924 \
              45.51778111451668 -76.21932181178113"
      );
    );
    out geom;' \
  > huge.json

`Data`: The data in here are in overpass JSON. We have to convert it to geojson so we can use it in our map.
https://tyrasd.github.io/osmtogeojson/

### Query 5: Super super huge area
curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way
        ["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"]
        (
          poly:"44.166717653092206 -79.77671826135706 \
                43.67782521996742 -79.43874891440242 \
                45.07506246684741 -74.95079980084256 \
                45.88584318448329 -75.98229210573747 \
                44.166717653092206 -79.77671826135706"
        );
    );
    out geom;' \
  > super-huge.json

Step 1: Convert to geojson. 
  $ node --max_old_space_size=8192 `which osmtogeojson` super-huge.json > super-huge.geojson

Step 2: Convert to mbtiles
docker run --rm -it \
  -v "$(pwd)/Mb-tiles-server":/data \
  -p 8080:8080 \
  maptiler/tileserver-gl

Step 3: Start the mp-tiles server 


### Command 4 to start the mp-tiles server
docker run --rm -it \
  -v path/to/dataFolder:/data \
  -p 8080:8080 \
  maptiler/tileserver-gl

