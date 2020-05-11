import { CountUp } from "countup.js";

function script() {

const proxyCors = "https://cors-anywhere.herokuapp.com/";
const API = "https://api.kawalcorona.com/"
const API_INDONESIA = "https://covid19.mathdro.id/api/countries/indonesia/confirmed";
const API_PROVINSI = "https://api.kawalcorona.com/indonesia/provinsi";



const totalCase = document.querySelector('.totalCase');
const totalCaseWorld = document.querySelector('.totalWorld');
const totalProvinsi = document.querySelector('.totalProvinsi');



function getData() {
    fetch(`${API_INDONESIA}`)
        .then(response => {
            return response.json()
        })
        .then(responseJson => {
            responseJson.forEach(id => {
                totalCase.innerHTML = totalID(id)
            })
        })
}

function getDataWorld() {
    return fetch(`${proxyCors}${API}`)
        .then(response => response.json())
        .then(response => {
            let o = ''
            let no = 1;
            response.forEach(n => {
                const nD = n.attributes;
                o += world(nD, no++)
                totalCaseWorld.innerHTML = o
            })
        })
}

function dataProvinsi() {
    fetch(`${proxyCors}${API_PROVINSI}`)
    .then(response => {
            return response.json()
        })
        .then(responseJson => {
            let no = 1;
            let i = "";
            responseJson.forEach(prov => {
                const attribute = prov.attributes;
                i += province(attribute, no++)
                totalProvinsi.innerHTML = i;
            })
        })
    }
    
    
    
    function totalID(id) {
        let animasi = new CountUp('tes', `${id.confirmed}`);

        if(!animasi.error) {
            animasi.start()
        } else {
            console.error(animasi.error)
        }

        return `
        <div class="row">
        <div class="col s12 m6 l3">
        <div class="card  amber lighten-1">
        <div class="card-content black-text">
        <span class="card-title center-align">Positif</span>
        <h2 class="center-align" id="tes">${id.confirmed}</h2>
                        <p class="center-align">Orang</p>
                        </div>
                </div>
                </div>
        <div class="col s12 m6 l3">
        <div class="card light-blue accent-2">
        <div class="card-content black-text">
                    <span class="card-title center-align">Aktif</span>
                    <h2 class="center-align">${id.active}</h2>
                    <p class="center-align">Orang</p>
                </div>
                </div>
                </div>
                <div class="col s12 m6 l3">
                <div class="card light-green">
                <div class="card-content black-text">
                <span class="card-title center-align">Sembuh</span>
                <h2 class="center-align">${id.recovered}</h2>
                <p class="center-align">Orang</p>
                </div>
                </div>
                </div>
                <div class="col s12 m6 l3">
            <div class="card red">
                <div class="card-content black-text">
                <span class="card-title center-align">Meninggal</span>
                    <h2 class="center-align">${id.deaths}</h2>
                    <p class="center-align">Orang</p>
                    </div>
                    </div>
        </div>
    </div>
    `;

    
}

function province(attribute, no) {
    return `
    <tr>
            <th>${no}</th>
            <th>${attribute.Provinsi}</th>
            <th>${attribute.Kasus_Posi}</th>
            <th>${attribute.Kasus_Semb}</th>
            <th>${attribute.Kasus_Meni}</th>
            </tr>
            `;
        }

function world(nD, no) {
        return `
        <tr>
            <th>${no}</th>
            <th>${nD.Country_Region}</th>
            <th>${nD.Confirmed}</th>
            <th> ${nD.Recovered} </th>
            <th> ${nD.Deaths} </th>
        </tr>
        `;
}

        document.addEventListener("DOMContentLoaded", () => {
     getData();
    getDataWorld();
    dataProvinsi();
})

}

export default script;