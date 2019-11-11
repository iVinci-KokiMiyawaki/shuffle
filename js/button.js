/*
 * Forked from Colin Garven and Manoela Ilic on dribble:  https://dribbble.com/shots/1426764-Submit-Button
 *
 * https://tympanus.net/codrops/2014/04/09/how-to-create-a-circular-progress-button/
 */

$(".progress-button button").click(function() {
  $(".progress-button").addClass("loading");
  draw(".progress-circle path");
  setTimeout(toggleSuccess, 2000);
});

var toggleSuccess = function() {
  $(".progress-button").addClass("success");
  draw(".checkmark path");
  setTimeout(function() {
    $(".progress-button")
      .removeClass("success")
      .removeClass("loading");
    resetDashes();
  }, 2000);
};

var toggleError = function() {
  $(".progress-button").addClass("error");
  draw(".cross path");
  setTimeout(function() {
    $(".progress-button")
      .removeClass("error")
      .removeClass("loading");
    resetDashes();
  }, 2000);
};

function draw(loc) {
  var paths = document.querySelectorAll(loc);
  console.log(paths);
  for (var i = 0; i < paths.length; i++) {
    paths[i].style.strokeDashoffset = "0";
  }
}

function resetDashes() {
  var paths = document.querySelectorAll("path");
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var length = path.getTotalLength();
    path.style.strokeDasharray = length + " " + length;
    path.style.strokeDashoffset = length;
  }
}
