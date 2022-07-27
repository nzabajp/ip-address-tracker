let map

function myLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
        const {latitude, longitude} = pos.coords
        renderMap(latitude, longitude)
    })
}


function renderMap(lat, long) {
    //renders map
    map = L.map('map', {
        center: [lat, long],
        zoom: 14,
        zoomControl: false
    });

    //adds layer to map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    setMarker(lat, long)
}

function setMarker(lat, lng) {
    //add custom marker icon
    const myIcon = L.icon({
        iconUrl: '../images/icon-location.svg',
        iconSize: [23, 28],
        iconAnchor: [11, 5]
    });
    
    //adds marker to map
    const marker = L.marker([lat, lng], {icon: myIcon}).addTo(map);

    //adds popup message to marker
    marker.bindPopup(`<b>Lat: ${lat}<br>Lng: ${lng}</b>`).openPopup();
}

export { myLocation, map, setMarker }