var shipsLocationsSelf  = ['A0','B2','F7'];
var shipsLocationsOpp   = ['A2','B5','H9'];

showShipsLocations(shipsLocationsSelf, true);
showShipsLocations(shipsLocationsOpp, false);

function showShipsLocations(shipsLocations, self) {
    shipsLocations.forEach(item => {
        if (self) {
            document.getElementById('S'+item).classList.add('shipCell');
        }else {
            document.getElementById(item).classList.add('shipCellOpp');            
        }
    });
}