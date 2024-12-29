import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Circle as CircleGeometry, LineString } from 'ol/geom';
import { Feature } from 'ol';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Text } from 'ol/style';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: Map;

  ngOnInit(): void {

    // point A
    const aCoordinates = fromLonLat([-9.039462422741591, 38.889138745346195]);
    const aCircle = new CircleGeometry(aCoordinates, 100);
    const aCircleFeature = new Feature(aCircle);
    const aVectorSource = new VectorSource({
      features: [aCircleFeature]
    });
    const vectorLayer = new VectorLayer({
      source: aVectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.3)'
        }),
        stroke: new Stroke({
          color: 'red',
          width: 2
        })
      })
    });

    // point B
    const bCoordinates = fromLonLat([-9.009470716328996, 38.92434685430547]);
    const bCircle = new CircleGeometry(bCoordinates, 100);
    const bCircleFeature = new Feature(bCircle);
    const bVectorSource = new VectorSource({
      features: [bCircleFeature]
    });
    const bVectorLayer = new VectorLayer({
      source: bVectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(55, 0, 255, 0.3)'
        }),
        stroke: new Stroke({
          color: 'rgba(55, 0, 255, 0.3)',
          width: 2
        })
      })
    });

    // point C
    const cCoordinates = fromLonLat([-9.034975550719794, 38.89809502671182]);
    const cCircle = new CircleGeometry(cCoordinates, 100);
    const cCircleFeature = new Feature(cCircle);
    const cVectorSource = new VectorSource({
      features: [cCircleFeature]
    });
    const cVectorLayer = new VectorLayer({
      source: cVectorSource,
      style: new Style({
        fill: new Fill({
          color: 'rgba(55, 0, 255, 0.3)'
        }),
        stroke: new Stroke({
          color: 'rgba(55, 0, 255, 0.3)',
          width: 2
        })
      })
    });

    // Create the line between point A and point B
    const lineGeometry = new LineString([aCoordinates, bCoordinates]);
    const lineFeature = new Feature(lineGeometry);
    const lineVectorSource = new VectorSource({
      features: [lineFeature]
    });
    const lineVectorLayer = new VectorLayer({
      source: lineVectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 3
        }),
        text: new Text({
          text: this.calculateDistance(lineGeometry),
          font: '12px Arial',
          fill: new Fill({
            color: 'black'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 3
          }),
          offsetY: -15  // Position the text above the line
        })
      })
    });

    // Create the line between point A and point C
    const aCLineGeometry = new LineString([aCoordinates, cCoordinates]);
    const aCLineFeature = new Feature(aCLineGeometry);
    const aCLineVectorSource = new VectorSource({
      features: [aCLineFeature]
    });
    const aCLineVectorLayer = new VectorLayer({
      source: aCLineVectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgb(255, 102,0)',
          width: 3
        }),
        text: new Text({
          text: this.calculateDistance(aCLineGeometry),
          font: '12px Arial',
          fill: new Fill({
            color: 'black'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 3
          }),
          offsetY: -15  // Position the text above the line
        })
      })
    });

    // Create the map
    this.map = new Map({
      target: 'ol-map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer,
        bVectorLayer,
        cVectorLayer,
        lineVectorLayer,
        aCLineVectorLayer
      ],
      view: new View({
        center: aCoordinates,
        zoom: 12
      })
    });
  }

  calculateDistance(lineGeometry: LineString): string {
    const length = lineGeometry.getLength(); // Get the length of the line in meters
    return `${(length / 1000).toFixed(2)} km`;  // Convert meters to kilometers and return the formatted string
  }
}
