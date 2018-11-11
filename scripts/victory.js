var winner = getName("winner");
var loser = getName("loser");
var victoryHTML = document.getElementById("victoryMessage");
victoryHTML.innerHTML = "<p>" + winner + " HAS WON" + "<\p>";

function getName(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
