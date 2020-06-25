

window.onload = () => {
    getCountryData();
}


var map;
var infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 	28.644800, lng: 77.216721},
    zoom: 4
    });
    infoWindow = new google.maps.InfoWindow();

}


const getCountryData = () =>{

    fetch("https://corona.lmao.ninja/v2/countries")
    .then((respoce) => {
        //console.log(respoce); 
        return respoce.json()
    }).then ((data) => {
        //console.log(data)
        showDataOnMap(data); 
    })
}

const showDataOnMap = (data) => {
    
    data.map((country) => {
        
        let countryCenter = {
            lat : country.countryInfo.lat,
            lng : country.countryInfo.long
        }

        var countryCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: countryCenter,
            radius: country.casesPerOneMillion  * 15
          });

          var html = "Hello";
          google.maps.event.addListener(countryCircle, 'mouseover', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, countryCircle);
          });

    })

}








