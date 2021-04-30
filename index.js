// Initialize and add the map
function initMap() {
  const data = [
    {
      lat: -25.344,
      lng: 131.036,
      value: 300,
    },
    {
      lat: -1.6311362,
      lng: 116.6358188,
      value: 1400,
    },

    {
      lat: 10.7603994,
      lng: 106.6766961,
      value: 340,
    },
    {
      lat: 120.7603994,
      lng: 109.6766961,
      value: 540,
    },
  ];

  const map_center = new google.maps.LatLng(-2.5521896, 117.9706619);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: map_center,
  });
  data.map((loc) => {
    const circle = new google.maps.Circle({
      map: map,
      radius: Math.sqrt(loc.value * 2000) * 100,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: new google.maps.LatLng(loc.lat, loc.lng),
    });
  });
}
