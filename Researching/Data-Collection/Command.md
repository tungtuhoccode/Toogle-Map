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

### Query 7: Medium Ottawa Area
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

### Query 8: Large Ottawa Area

curl -G "https://overpass-api.de/api/interpreter" \
  --data-urlencode 'data=[out:json][timeout:25];
    (
      way
        ["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|living_street|service|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"]
        (
          poly:"45.36370716998803 -75.9417290596017 \
                45.34914162416496 -75.96767233562812 \
                45.335254130192624 -75.93539547720869 \
                45.32203474247791 -75.96193613079166 \
                45.30441343701264 -75.93878618783543 \
                45.278694307051154 -75.97673511504489 \
                45.24682251381162 -75.93724853160508 \
                45.23295066026358 -75.91072656710558 \
                45.26219638884746 -75.86771909843617 \
                45.268205388174806 -75.83542588970496 \
                45.22246319601871 -75.79385280286252 \
                45.228482757495215 -75.73223769550677 \
                45.22480947545563 -75.70437313656078 \
                45.21460722616834 -75.67540771020539 \
                45.24244028963051 -75.66293353070218 \
                45.274824321462944 -75.67480972122303 \
                45.30327461873213 -75.60097877218195 \
                45.34526808102933 -75.64201999285959 \
                45.37030237243323 -75.5763362921846 \
                45.41793027510758 -75.46359815306171 \
                45.47555933808587 -75.42990418666162 \
                45.50598700756021 -75.4500337696723 \
                45.52491874399712 -75.47555138842611 \
                45.51006602453617 -75.49164861215881 \
                45.49051662872898 -75.54088723831545 \
                45.475838782095906 -75.57011087209654 \
                45.46065520586791 -75.67988792360903 \
                45.44194946338041 -75.70523730084717 \
                45.423840331215104 -75.70715106938938 \
                45.41310061466024 -75.74953928251527 \
                45.38689321234739 -75.78077728858194 \
                45.36591845235617 -75.81532240264139 \
                45.368752205745636 -75.8583347653547 \
                45.36370716998803 -75.9417290596017"
        );
    );
    out geom;' \
  > large-ottawa-area.json


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

