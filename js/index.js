import { myLocation, map, setMarker } from './utils.js'

const btnElement = document.getElementById("search-btn")
const infoElement = document.getElementById("info-container")
const searchInput = document.getElementById("search-input")


//gets current location and passes it to renderMap
myLocation()

searchInput.addEventListener("click", () => searchInput.select())

btnElement.addEventListener("click", checkInput)

function checkInput() {
    //checks whether domain or IP address was inputed
    const inputText = searchInput.value
    const regex = /[a-zA-Z]/g;
    const match = inputText.match(regex)

    if(match) {
        getAddressInfo(`&domain=${inputText}`)
    } else {
        getAddressInfo(`&ipAddress=${inputText}`)
    }
}

//func runs when button is clicked
async function getAddressInfo(endpoint) {
    const baseUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ghRC3sgc9cVPs7xMJ1LREDYE5a08x`

    try {
        const res = await fetch(`${baseUrl}${endpoint}`)
        if(!res.ok) {
            throw new Error(`Error ${res.status}`)
        }
        const data = await res.json()
        renderInfo(data)
    }
    catch(err) {
        console.error(err)
        alert("Invalid Address: Please enter valid IP address or domain")
    }
}

function renderInfo(dataObj) {
    const {ip, isp, location: {region, city, postalCode, timezone, lat, lng}} = dataObj

    //reconfigures the map div with new coords
    map.flyTo(new L.LatLng(lat, lng));
    setMarker(lat, lng)

    infoElement.innerHTML = `
        <div>
            <p>IP Address</p>
            <h3>${ip}</h3>
        </div>
        <hr>
        <div>
            <p>Location</p>
            <h3>${city}, ${region} ${postalCode}</h3>
        </div>
        <hr>
        <div>
            <p>Timezone</p>
            <h3>UTC${timezone}</h3>
        </div>
        <hr>
        <div>
            <p>ISP</p>
            <h3>${isp}</h3>
        </div>`
}