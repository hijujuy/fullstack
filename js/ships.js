var ships;
var dragged;

/* Definicion y creacion de ships */
ships = [
    { name: 'carrier',      x: 0, y: 0, width: 5, height: 1, direction: 'hor'},
    { name: 'destroyer',    x: 0, y: 2, width: 4, height: 1, direction: 'hor'},
    { name: 'battleship',   x: 0, y: 4, width: 3, height: 1, direction: 'hor'},
    { name: 'submarine',    x: 0, y: 6, width: 3, height: 1, direction: 'hor'},
    { name: 'patrolboat',   x: 0, y: 8, width: 2, height: 1, direction: 'hor'}
];

/*  */
placeShips();
/* Ubica los ship en la tabla */
function placeShips() {
    for (let i = 0; i < ships.length; i++) {
        let div = document.createElement('div');
        div.setAttribute('id', ships[i].name);
        div.setAttribute('draggable', true);
        div.classList.add('shipCell');
        div.dataset.x = ships[i].x;
        div.dataset.y = ships[i].y;
        div.dataset.width = ships[i].width;
        div.dataset.height = ships[i].height;
        div.dataset.direction = ships[i].direction;
        document.getElementById('S'+ships[i].y+ships[i].x).appendChild(div);
        document.getElementById('S'+ships[i].y+ships[i].x).classList.add('shipCell');
    }
}

/* Creacion de zonas drop para objetos draggables */
for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
        let cell = document.getElementById('S'+y+x);
        cell.classList.add('dropzone');
        cell.dataset.x = x;
        cell.dataset.y = y;
    }
}

/* Definicion de eventos */
document.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('shipDraggedId', e.target.id);
    
});

document.addEventListener('dragover', function(e){
    e.preventDefault();

});

document.addEventListener('drop', function(e) {
    draggedId = e.dataTransfer.getData('shipDraggedId');
    let shipDiv = document.getElementById(draggedId);

    if (e.target.classList.contains('dropzone')) {
        if (validTranslate(e.target, shipDiv)){            
            e.target.appendChild(document.getElementById(draggedId));            
            let shipObject = ships.find(ship => ship.name === draggedId);
            document.getElementById('S'+shipObject.y+shipObject.x).classList.remove('shipCell');
            shipObject.x = parseInt(e.target.dataset.x);
            shipObject.y = parseInt(e.target.dataset.y);
            shipDiv.dataset.x = shipObject.x;
            shipDiv.dataset.y = shipObject.y;
            document.getElementById('S'+shipObject.y+shipObject.x).classList.add('shipCell');
        }
    }
});

/* Validacion de movimiento de traslacion de ships */
function validTranslate(cell, ship) {
    let x = parseInt(cell.dataset.x);
    let y = parseInt(cell.dataset.y);
    let width = parseInt(ship.dataset.width);
    let height = parseInt(ship.dataset.height);
    let response = false;
    
    if (x + width <= 10) {
        if (y + height <= 10) {
            response = true;
        }
    }

    return response;
}