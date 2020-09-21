var shipsLocationsSelf  = ['A0','B2','F7'];
var shipsLocationsOpp   = ['A2','B5','H9'];

showShipsLocations(shipsLocations);

function showShipsLocations(shipsLocations) {
    shipsLocations.forEach(item => {
        document.getElementById('S'+item).classList.add('shipCell');
    });
}