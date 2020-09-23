/*
dragstart
dragover
drop
dragend

dragenter next
dragover
dragleave previus
drop

var shipsLocationsSelf  = ['A0','B2','F7'];
var shipsLocationsOpp   = ['A2','B5','H9'];

function showShipsLocations(shipsLocations) {
    shipsLocations.forEach(item => {
        document.getElementById('S'+item).classList.add('shipCell');
    });
}
*/
var shipCurrent;
var dragged;
ships = [
    { name: 'patrolboat',   x: 0, y: 0, width: 2, height: 1, direction: 'hor'},
    { name: 'submarine',    x: 0, y: 2, width: 3, height: 1, direction: 'hor'},
    { name: 'battleship',   x: 0, y: 4, width: 3, height: 1, direction: 'hor'},
    { name: 'destroyer',    x: 0, y: 6, width: 4, height: 1, direction: 'hor'},
    { name: 'carrier',      x: 0, y: 8, width: 5, height: 1, direction: 'hor'}
];

shipsPlacement();

function shipsPlacement() {    
    for (let y = 0; y < 10; y++) {        
        for (let x = 0; x < 10; x++) {
            document.getElementById('P'+y+x).dataset.x = x;
            document.getElementById('P'+y+x).dataset.y = y;
            document.getElementById('P'+y+x).classList.add('dropzone');
        }
    }
    
    ships.forEach(ship => {
        for (let y = ship.y; y < ship.y+ship.height; y++) {
            for (let x = ship.x; x < ship.x+ship.width; x++) {
                let cell = document.getElementById('P'+y+x);
                cell.classList.add('shipCell');
            }    
        }
        document.getElementById('P'+ship.y+ship.x).setAttribute('draggable', true);
        document.getElementById('P'+ship.y+ship.x).dataset.name = ship.name;        
    });
    
}

document.addEventListener('click', function(e){
    shipName = e.target.getAttribute('data-name');
    let ship = ships.find(item => item.name == shipName);
    
    if (ship.direction === 'hor') {
        
        for (let x = ship.x; x < ship.x + ship.width; x++) {
            document.getElementById('P' + ship.y + x).classList.remove('shipCell');
        }
        for (let y = ship.y; y < ship.y + ship.width; y++) {
            document.getElementById('P' + y + ship.x).classList.add('shipCell');
        }
        ship.direction = 'ver';
    }
    else if (ship.direction === 'ver') {
        for (let y = ship.y; y < ship.y + ship.height; y++) {
            document.getElementById('P' + y + ship.x).classList.remove('shipCell');
        }
        for (let x = ship.x; x < ship.x + ship.height; x++) {
            document.getElementById('P' + ship.y + x).classList.add('shipCell');
        }
        ship.direction = 'hor';
    }

    let aux = ship.width;
    ship.width = ship.height;
    ship.height = aux;
    console.log(ship);
});

document.addEventListener('dragstart', function(e){
    dragged = e.target;    
    shipName = e.target.getAttribute('data-name');
    shipCurrent = ships.find(item => item.name == shipName);    
});

document.addEventListener('dragover', function(e){
    e.preventDefault();        
    fillCell(e.target);
});

function fillCell(current) {
    let x0 = parseInt(dragged.getAttribute('data-x'));
    let y0 = parseInt(dragged.getAttribute('data-y'));
    let x1 = parseInt(current.getAttribute('data-x'));
    let y1 = parseInt(current.getAttribute('data-y'));
    let dx = x1 - x0;
    let dy = y1 - y0;
    console.log('dx = '+dx+' - dy = '+dy);

    if (dx || dy) {
        if (shipCurrent.height === 1){
            for (let x = x0; x < x0+shipCurrent.width; x++) {            
                document.getElementById('P'+y0+x).classList.remove('shipCell');            
            }
            for (let x = x1; x < x1+shipCurrent.width; x++) {
                document.getElementById('P'+y1+x).classList.add('shipCell');
            }        
        }

        if (shipCurrent.width === 1) {
            for (let y = y0; y < y0+shipCurrent.height; y++) {            
                document.getElementById('P'+y+x0).classList.remove('shipCell');            
            }
            for (let y = y1; y < y1+shipCurrent.height; y++) {
                document.getElementById('P'+y+x1).classList.add('shipCell');
            }        
        }
        current.dataset.name = dragged.getAttribute('data-name');
        dragged.removeAttribute('data-name');
        current.setAttribute('draggable', true);
        dragged.removeAttribute('draggable');
        shipCurrent.x = x1;
        shipCurrent.y = y1;
        dragged = current;
    }
    
}
