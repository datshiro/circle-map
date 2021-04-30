// Initialize and add the map
//
const default_url =
  "http://decisions.truebpm.vn/Primary/?FlowAlias=th_scs_shar_get_map_data&Guest=true&outputtype=RawJson&action=api&fbclid=IwAR2s_LYthBJiUwV53gKY7bcmAbbxJZD_KSeHf79AzSa92FF2dX9mZTY474Y";

async function initMap() {
  const params = parseParam(document.location.search);
  let url = default_url;
  if (params.source) {
    url = params.source;
  }

  var data;
  try {
    const resp = await fetchData(url);
    data = resp.data;
  } catch (err) {
    alert("failed to call api " + url + "\n", err);
    return;
  }

  const map_center = new google.maps.LatLng(17.4520535, 102.4301246);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: map_center,
  });
  data.map((loc) => {
    const circle = new google.maps.Circle({
      map: map,
      radius: Math.sqrt(loc.data) * 100,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: new google.maps.LatLng(loc.lat, loc.lng),
    });
  });
}

function fetchData(url) {
  return new Promise(function (myResolve, myReject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = function () {
      var status = xhr.status;
      if (status === 200) {
        myResolve(xhr.response);
      } else {
        myReject(status);
      }
    };
    xhr.send();
  });
}

function parseParam(queryString) {
  var params = getUrlParams(queryString);
  return {
    action: params.get("action"),
    source: params.get("source"),
  };
}
