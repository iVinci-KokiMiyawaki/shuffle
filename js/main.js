const max = 65;
const list = [...Array(max).keys()].map(i => ++i);
const endList = []; 

$(function() {
  $(".odometer").html(00);
  list.forEach(element => {
    $(".flex").append(
      $("<p/>")
        .attr("id", element)
        .html(element)
    );
  });
});

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2);
}

$(".progress-button button").click(function() {
  let start = () => {
    const result = Math.floor(Math.random() * max) + 1;
    if (endList.indexOf(result) >= 0) {
      start();
    }
    $(".odometer").html(getdoubleDigestNumer(result));
    $(".progress-button").addClass("loading");
    draw(".progress-circle path");
    setTimeout(toggleSuccess, 2000);
    setTimeout(function() {
      $("#" + result).addClass("is-active");
    }, 2500);
    endList.push(result);
    if (endList.length >= max) {
      $("button").prop("disabled", true);
      return;
    }
  }
  start();
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
