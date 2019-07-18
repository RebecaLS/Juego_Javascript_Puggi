

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    document.getElementById("portada").style.display = "none";
    document.getElementById("start-button").style.display = "none";
    document.getElementById("canvas").style.border = "4px inset rgba(50, 117, 103, 0.75)";
    Game.init("canvas");
  };
}