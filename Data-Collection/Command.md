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

### Query 6: Suppppppppppper HUGE
curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way
        ["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"]
        (
          poly:"43.88997559240056 -80.43510185607934 \
                43.089726298776014 -80.99163944416655 \
                43.11144064770991 -79.31232069803184 \
                43.75364925661475 -77.16587114509527 \
                45.09489519675449 -74.49270721094993 \
                45.59775122444637 -74.73121746841782 \
                46.137438516296896 -77.0466681613953 \
                43.88997559240056 -80.43510185607934"
        );
    );
    out geom;' \
  > new-super-huge.json

### Query 7: Ottawa Area
curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way
        ["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"]
        (
          poly:"45.3659678809054 -75.8311801056978 \
                45.30417292966152 -75.78920380124758 \
                45.30620488256068 -75.71620401865331 \
                45.31232581275083 -75.6875781571408 \
                45.2983529716023  -75.65525363414406 \
                45.33012440936898 -75.59010741934313 \
                45.36830985864438 -75.59422777601678 \
                45.38754619352463 -75.57299515948517 \
                45.41669093509273 -75.58128472766849 \
                45.4321223584611  -75.59666827604346 \
                45.464480887695174 -75.61403711130653 \
                45.469728654250986 -75.63520567882485 \
                45.46507636028406 -75.67630933628575 \
                45.4481797682877  -75.71036288308655 \
                45.3659678809054  -75.8311801056978"
        );
    );
    out geom;' \
  > medium-ottawa-area.json


### Conversion
1. Step 1: Convert to geojson. 
  $ node --max_old_space_size=8192 `which osmtogeojson` super-huge.json > super-huge.geojson

2. Step 2: Convert to mbtiles
tippecanoe \
  -o new-super-huge.mbtiles \
  --layer=graph \
  --drop-densest-as-needed \
  --extend-zooms-if-still-dropping \
  --generate-ids \
  new-super-huge.geojson

//keep dense lines
tippecanoe \
  -o new-super-huge.mbtiles \
  --layer=highways \
  --minimum-zoom=0 \
  --maximum-zoom=14 \
  --no-feature-limit       \
  --no-tile-size-limit     \
  --generate-ids           \
  new-super-huge.geojson

3. Step 3: Start the mp-tiles server 

docker run --rm -it \
  -v "$(pwd)/Mb-tiles-server":/data \
  -p 8080:8080 \
  maptiler/tileserver-gl

docker run --rm -it \
  -v path/to/dataFolder:/data \
  -p 8080:8080 \
  maptiler/tileserver-gl

