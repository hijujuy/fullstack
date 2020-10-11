const tbodySalvoessSelf = document.getElementById("tableBodySelf");
const tbodySalvoesOpp = document.getElementById("tableBodyOpp");
var salvoesLocationsSelf = ["B5", "F0", "H6"];
var salvoesLocationsOpp = ["C1", "F7", "J5"];

function showPositions(salvoesLocations, self) {
  let tbody = self ? tbodySalvoessSelf : tbodySalvoesOpp;
  var fila = document.createElement("tr");
  var celda = document.createElement("td");
  var locations = "";

  salvoesLocations.forEach((salvoLocation) => {
    locations += " " + salvoLocation;
    let cell = document.getElementById(
      self ? "S" + salvoLocation : salvoLocation
    );
    if (self) {
      cell.classList.contains("shipCell")
        ? cell.classList.add("hitCell")
        : cell.classList.add("salvoCell");
    } else {
      shipsLocationsOpp.find((shipLocation) => shipLocation === salvoLocation)
        ? cell.classList.add("hitCell")
        : cell.classList.add("salvoCell");
    }
  });

  locations = document.createTextNode("[ " + locations + " ]");

  celda.appendChild(locations);
  fila.appendChild(celda);
  tbody.appendChild(fila);
}
