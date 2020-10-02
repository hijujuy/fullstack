var ships;
var shipCells = [];

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
/* Primera funcion q ejecuta el script */
function placeShips() {
    /* Ubica los elementos del array ships en la tabla */
    for (let i = 0; i < ships.length; i++) {        

        /* Creacion y llenado de cada ship draggable en la tabla self */
        let div = document.createElement('div');
        div.setAttribute('id', ships[i].name);
        div.setAttribute('draggable', true);
        div.classList.add('shipCell');
        div.classList.add(ships[i].name+'Hor');
        div.dataset.x = ships[i].x;
        div.dataset.y = ships[i].y;
        div.dataset.width = ships[i].width;
        div.dataset.height = ships[i].height;
        div.dataset.direction = ships[i].direction;

        /* Insercion de boton rotacion dentro de cada ship */
        let btn = document.createElement('div');
        btn.classList.add('btnRotate');
        div.appendChild(btn);

        document.getElementById('P' + ships[i].y + ships[i].x).appendChild(div);
        showShipPlaces(ships[i]);
    }

    /* Creacion de zonas drop para objetos draggables */
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let cell = document.getElementById('P' + y + x);
            cell.classList.add('dropzone');
            cell.dataset.x = x;
            cell.dataset.y = y;
        }
    }

}

/* 
    Carga todas las posiciones de los ships dentro de array shipCells,
    excepto las posiciones del ship que disparó el arrastre.
*/
function uploadShipsPlaces(shipName) {
    ships.filter(ship => ship.name !== shipName)
        .forEach(ship => {
            let startx = ship.x;
            let endx = ship.x + ship.width;
            let starty = ship.y;
            let endy = ship.y + ship.height;
            for (let y = starty; y < endy; y++) {
                for (let x = startx; x < endx; x++) {
                    shipCells.push('P'+y+x);
                }
            }        
        });
}

/* Definicion del manejador del evento dragstart */
document.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('shipDraggedId', e.target.id);
    uploadShipsPlaces(e.target.id);
    document.getElementById(e.target.id+'Places').textContent = 'esperando nueva ubicacion';
    document.getElementById(e.target.id+'Places').classList.add('blink');
});

/*
  Overlapping, informa si las celdas que podria llegar a ocupar el ship
  esten desocupadas. Es usado en el dragover
*/
function overlapping(container, ship) {
    let a = parseInt(container.dataset.x);
    let b = parseInt(container.dataset.y);
    let width = a + parseInt(ship.dataset.width);
    let height = b + parseInt(ship.dataset.height);
    let response = false;
    for (let x = a ; x < width; x++) {        
        for (let y = b; y < height; y++) {
            if (shipCells.includes('P'+y+x)){
                response = true;
            }
        }        
    }
    return response;
}

/*
  Overflowing, informa si el ship saldrá de los limites
  de la tabla. Es usado en el dragover
*/

/**
 * @param ship, es el contenedor draggable ship que desencadenó el drag
 * @param container, es el contenedor drop que disparó el dragover 
*/
function overflowing(container, ship) {
    let x = parseInt(container.dataset.x);
    let y = parseInt(container.dataset.y);
    let width = parseInt(ship.dataset.width);
    let height = parseInt(ship.dataset.height);
    let response = true;
    if (x + width <= 10) {
        if (y + height <= 10) {            
            response = false;
        }
    }
    return response;
}

/* 
  is_container verifica que el contenedor donde se
  almacenará el ship, sea una zona drop.
*/
function is_container(container){
    return container.classList.contains('dropzone');
}

/* 
  Manejador de eventos dragover
*/
document.addEventListener('dragover', function(e){
    //Obtiene el div ship que se disparó el dragstart
    console.log(e.target);
    let ship = document.getElementById(e.dataTransfer.getData('shipDraggedId'));
    if (is_container(e.target)) {
        if (!overflowing(e.target, ship)) {
            if (!overlapping(e.target, ship)) {                
                e.preventDefault();
            }
        }
    }
});

//Manejador de eventos dragend
document.addEventListener('dragend', function(e){
    //Remueve las celdas almacenadas en shipCells
    shipCells.length = 0;    
});

document.addEventListener('drop', function(e) {
    draggedId = e.dataTransfer.getData('shipDraggedId');
    let shipDiv = document.getElementById(draggedId);
    e.target.appendChild(shipDiv);
    let shipObject = ships.find(ship => ship.name === draggedId);
    shipObject.x = parseInt(e.target.dataset.x);
    shipObject.y = parseInt(e.target.dataset.y);
    shipDiv.dataset.x = shipObject.x;
    shipDiv.dataset.y = shipObject.y;
    showShipPlaces(shipObject);
    document.getElementById(shipObject.name+'Places').classList.remove('blink');
});

/* Modulo de rotacion de ships */
document.addEventListener('click', function(e){
    if (e.target.classList.contains('btnRotate')) {
        let ship = ships.find(ship => ship.name === e.target.parentElement.id);
        if (ship.direction === 'hor') {
            ship.height = parseInt(ship.width);
            ship.width = 1;
            ship.direction = 'ver';
            document.getElementById(e.target.parentElement.id).classList.add(e.target.parentElement.id+'Ver');
        }
        else if (ship.direction === 'ver') {
            ship.width = ship.height;
            ship.height = 1;
            ship.direction = 'hor';
            document.getElementById(e.target.parentElement.id).classList.remove(e.target.parentElement.id+'Ver');
        }
    }
});

function showShipPlaces(ship) {
    let places = [];
    let startx = ship.x;
    let endx = ship.x + ship.width;
    let starty = ship.y;
    let endy = ship.y + ship.height;
    for (let y = starty; y < endy; y++) {
        for (let x = startx; x < endx; x++) {
            places.push('' + y + x);
        }
    }
    document.getElementById(ship.name + 'Places').textContent = '[ ' + places + ']';
}
