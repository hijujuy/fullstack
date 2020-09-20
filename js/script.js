const tbodyShipsSelf = document.getElementById('tbodyShipsSelf');
const tbodyShipsOpp = document.getElementById('tbodyShipsOpp');
var shipsLocationsSelf = ['A0', 'C5', 'H2'];
var shipsLocationsOpp = ['B9', 'G4', 'J0'];

showPositions(tbodyShipsSelf, shipsLocationsSelf);

function showPositions(tbody, shipLocations) {
    var fila = document.createElement('tr');
    var celda = document.createElement('td');
    var locations = '';

    shipLocations.forEach(item => {
        locations += ' ' + item;
    }
    );

    locations = document.createTextNode('[ ' + locations + ' ]');

    celda.appendChild(locations);
    fila.appendChild(celda);
    tbody.appendChild(fila);
}