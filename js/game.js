let data = gameview;

renderView();

function renderView() {
  switch (data.gameState) {
    case "BYPLACING":
      document.getElementById("panelGame").style.display = "none";
      break;
    case "WAITINGOPP":
      break;
    case "PLAY":
      break;
    case "WAIT":
      break;
    case "WON":
      break;
    case "TIED":
      break;
    case "LOST":
      break;
  }
}
