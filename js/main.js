let max = 20;
const list = [...Array(max).keys()].map(i => ++i);
const endList = [];

var numList = [
  "0001 田中 太郎",
  "0002 田中 太郎",
  "0003 田中 太郎",
  "0004 田中 太郎",
  "0005 田中 太郎",
  "0006 田中 太郎",
  "0007 田中 太郎",
  "0008 田中 太郎",
  "0009 田中 太郎",
  "0010 田中 太郎",
  "0011 田中 太郎",
  "0012 田中 太郎",
  "0013 田中 太郎",
  "0014 田中 太郎",
  "0015 田中 太郎",
  "0016 田中 太郎",
  "0017 田中 太郎",
  "0018 田中 太郎",
  "0019 田中 太郎",
  "0020 田中 太郎"
];

var goodList = [
  "1. 賞品テキストテキストテキストテキスト",
  "2. 賞品テキストテキストテキストテキスト",
  "3. 賞品テキストテキストテキストテキスト",
  "4. 賞品テキストテキストテキストテキスト",
  "5. 賞品テキストテキストテキストテキスト",
  "6. 賞品テキストテキストテキストテキスト",
  "7. 賞品テキストテキストテキストテキスト",
  "8. 賞品テキストテキストテキストテキスト",
  "9. 賞品テキストテキストテキストテキスト",
  "10. 賞品テキストテキストテキストテキスト",
  "11. 賞品テキストテキストテキストテキスト",
  "12. 賞品テキストテキストテキストテキスト",
  "13. 賞品テキストテキストテキストテキスト",
  "14. 賞品テキストテキストテキストテキスト",
  "15. 賞品テキストテキストテキストテキスト",
  "16. 賞品テキストテキストテキストテキスト",
  "17. 賞品テキストテキストテキストテキスト",
  "18. 賞品テキストテキストテキストテキスト",
  "19. 賞品テキストテキストテキストテキスト",
  "20. 賞品テキストテキストテキストテキスト"
];

$(function() {
  goodList.forEach((element, idx) => {
    $(".scroll-list__wrp").append(
      $("<div/>")
        .addClass("scroll-list__item js-scroll-list-item")
        .attr("id", ++idx)
        .append(
          $("<div/>")
            .addClass("roulette")
            .html(element)
        )
    );
  });

  var Scrollbar = window.Scrollbar;

  Scrollbar.use(window.OverscrollPlugin);

  var customScroll = Scrollbar.init(document.querySelector(".js-scroll-list"), {
    plugins: {
      overscroll: true
    }
  });

  var listItem = $(".js-scroll-list-item");

  listItem.eq(0).addClass("item-focus");
  listItem.eq(1).addClass("item-next");

  customScroll.addListener(function(status) {
    var $content = $(".js-scroll-content");

    var viewportScrollDistance = 0;

    viewportScrollDistance = status.offset.y;
    var viewportHeight = $content.height();
    var listHeight = 0;
    var $listItems = $content.find(".js-scroll-list-item");
    for (var i = 0; i < $listItems.length; i++) {
      listHeight += $($listItems[i]).height();
    }

    var top = status.offset.y;
    // console.log(top);
    var visibleCenterVertical = 0;
    visibleCenterVertical = top;

    var parentTop = 1;
    var $lis = $(".js-scroll-list-item");
    var $focusLi;
    for (var i = 0; i < $lis.length; i++) {
      var $li = $($lis[i]);
      var liTop = $li.position().top;
      var liRelTop = liTop - parentTop;

      var distance = 0;
      var distance = Math.abs(top - liRelTop);
      var maxDistance = $(".js-scroll-content").height() / 2;
      var distancePercent = distance / (maxDistance / 100);

      if (liRelTop + $li.parent().scrollTop() > top) {
        if (!$li.hasClass("item-focus")) {
          $li.prev().addClass("item-hide");
          $lis.removeClass("item-focus");
          $lis.removeClass("item-next");
        }
        $li.removeClass("item-hide");
        $li.addClass("item-focus");
        $li.next().addClass("item-next");
        break;
      }
    }
  });
});

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2);
}

$(".progress-button button").click(function() {
  console.log();
  startBingo();
  setTimeout(stopBingo, 2000);
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

var isStop = true;

function startBingo() {
  isStop = false;
  $("#" + max).append($("<div/>").addClass("result-name"));
  rouletteResult();
}

function stopBingo() {
  // ボタンの表示切り替え
  isStop = true;
  console.log("stop");
}

function rouletteResult() {
  var id = "";
  var num = Math.floor(Math.random() * numList.length);
  // ストップボタンが押された
  if (isStop) {
    // 遅延呼び出しを解除
    clearTimeout(id);
    $(`#${max}>.result-name`).html(numList[num]);
    //決定した数字をリストから削除する
    endList.push(numList[num]);
    max -= 1;
    return false;
  }
  console.log(num);
  console.log($(`#${max}>.result-name`));
  $(`#${max}>.result-name`).html(numList[num]);
  // 100ms後に再帰的に実行するよう登録する
  id = setTimeout(rouletteResult, 100);
}
