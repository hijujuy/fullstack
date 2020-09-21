const tbodySalvoessSelf = document.getElementById('tbodySalvoesSelf');
const tbodySalvoesOpp = document.getElementById('tbodySalvoesOpp');
var salvoesLocationsSelf = ['C5', 'F0', 'H6'];
var salvoesLocationsOpp = ['C1', 'F6', 'J5'];

showPositions(salvoesLocationsSelf, true);
showPositions(salvoesLocationsOpp, false);

function showPositions(salvoesLocations, self) {
    let tbody = self ? tbodySalvoessSelf : tbodySalvoesOpp;
    var fila = document.createElement('tr');
    var celda = document.createElement('td');
    var locations = '';

    salvoesLocations.forEach(item => {
        locations += ' ' + item;
        document.getElementById(self ? 'S'+item : item).classList.add('salvoCell');
    });

    locations = document.createTextNode('[ ' + locations + ' ]');

    celda.appendChild(locations);
    fila.appendChild(celda);
    tbody.appendChild(fila);
}
