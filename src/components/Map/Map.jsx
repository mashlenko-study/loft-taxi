import React from "react";
import mapboxgl from "mapbox-gl";
import styles from "./Map.module.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGl2YnkwanV0c3UiLCJhIjoiY2trODFlcWNrMDZ5ZjJ2cjBja2g0cXJ0biJ9.UPbkwkpv_KaJ1yA7TrKUqg";

export const drawRoute = (map, coordinates) => {
  map.flyTo({
    center: coordinates[0],
    zoom: 15,
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      },
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#ffc617",
      "line-width": 8,
    },
  });
};

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 37.6,
      lat: 55.7,
      zoom: 12,
    };
  }

  render() {
    return (
      <div
        className={styles.mapContainer}
        ref={(el) => (this.mapContainer = el)}
      />
    );
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }
}
