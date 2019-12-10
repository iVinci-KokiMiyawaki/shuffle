let max = 19;
let prizeCount = 1;
let rollTime = 100;
let endList = [];
let numList = [];
let result = 0;
const list = [...Array(max).keys()].map(i => ++i);

let goodList = [
  { word: "特賞", value: 1 },
  { word: "夢と魔法の王国 ペアチケット", value: 1 },
  { word: "筋肉はすべてのソリューションだ！", value: 1 },
  { word: "女性社員イチオシ！蒸気で上機嫌！！", value: 1 },
  { word: "話題のカナル式 ワイヤレスイヤホン！？", value: 1 },
  { word: "牛タン煮込み3種セット", value: 1 },
  { word: "大人のスイーツセット", value: 1 },
  { word: "カロリーの暴力！13000キロカロリープレゼント！！", value: 1 },
  { word: "HARIO グラタン皿 耐熱ガラス2個セット", value: 1 },
  { word: "アップルプレートセット", value: 1 },
  { word: "折りたためるまな板チョップ2ポットミニ", value: 1 },
  { word: "ポケクリーン 500円玉も吸い上げる小型クリーナー", value: 1 },
  { word: "ネック＆ヘッドもみもみリフレッシュ", value: 1 },
  { word: "日本製檜の香りナチュラル生活浴用3点セット", value: 1 },
  { word: "ランタンとトーチの２ＷＡＹアウトドアライト", value: 2 },
  { word: "回転スタンド付ステーショナリー10点セット", value: 2 },
  { word: "キッチン賑やかアニマルスポンジセット", value: 3 },
  { word: "アニマル型メラミンスポンジ10個セット", value: 3 },
  { word: "とっておきフーズどこでもカップケーキ缶", value: 5 },
  { word: "フルーツストラップ付スイーツタオル", value: 5 },
  { word: "", value: 1 }
];

$(function() {
  goodList.forEach(({ word, value }, idx) => {
    if (idx === 0) {
      $(".scroll-list__wrp").append(
        $("<div/>")
          .addClass(`scroll-list__item js-scroll-list-item value-${value}`)
          .attr("id", idx)
          .append(
            $("<div/>")
              .addClass("roulette")
              .html(`${word}`)
          )
      );
      return;
    }
    if (word) {
      $(".scroll-list__wrp").append(
        $("<div/>")
          .addClass(`scroll-list__item js-scroll-list-item value-${value}`)
          .attr("id", idx)
          .append(
            $("<div/>")
              .addClass("roulette")
              .html(`${idx}位 ${word}`)
          )
      );
    } else {
      $(".scroll-list__wrp").append(
        $("<div/>")
          .addClass("scroll-list__item js-scroll-list-item")
          .attr("id", ++idx)
          .append($("<div/>").addClass("roulette"))
      );
    }
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

  var local = JSON.parse(localStorage.getItem("result"));
  console.log(local);
  if (local) {
    endList = local;
    local.forEach(name => {
      $(`#${max}`).append($("<div/>").addClass(`result-name-${prizeCount}`));
      $(`#${max}>.result-name-${prizeCount}`).html(name);
      if (prizeCount < goodList[max].value) {
        prizeCount++;
      } else {
        prizeCount = 1;
        max -= 1;
      }
    });
  }
});

function getdoubleDigestNumer(number) {
  return ("0" + number).slice(-2);
}

$("#load").click(function() {
  numList = JSON.parse($("#load-list").val());
  console.log(numList);
});

$("#star").click(function() {
  $(".scroll-list__item:first-child").css("opacity", 1);
});

$(".progress-button button").click(function() {
  startBingo();
  setTimeout(stopBingo, rollTime);
});

var toggleSuccess = function() {
  $(".progress-button").addClass("success");
  draw(".checkmark path");
  setTimeout(function() {
    $(".progress-button")
      .removeClass("success")
      .removeClass("loading");
    resetDashes();
  }, rollTime);
};

var toggleError = function() {
  $(".progress-button").addClass("error");
  draw(".cross path");
  setTimeout(function() {
    $(".progress-button")
      .removeClass("error")
      .removeClass("loading");
    resetDashes();
  }, rollTime);
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
  $("#roll")
    .get(0)
    .play();
  $("#" + max).append($("<div/>").addClass(`result-name-${prizeCount}`));
  result = Math.floor(Math.random() * numList.length);
  while (endList.indexOf(numList[result].name) >= 0) {
    console.log(numList[result].name);
    result = Math.floor(Math.random() * numList.length);
  }
  rouletteResult();
}

function stopBingo() {
  isStop = true;
  $("#roll")
    .get(0)
    .pause();
  $("#roll").get(0).currentTime = 0;
  $("#decide")
    .get(0)
    .play();
}

function rouletteResult() {
  var id = "";
  var num = Math.floor(Math.random() * numList.length);
  // ストップボタンが押された
  if (isStop) {
    // 遅延呼び出しを解除
    clearTimeout(id);
    $(`#${max}>.result-name-${prizeCount}`).html(numList[result].name);

    endList.push(numList[result].name);
    localStorage.setItem("result", JSON.stringify(endList));
    if (prizeCount < goodList[max].value) {
      prizeCount++;
    } else {
      prizeCount = 1;
      max -= 1;
    }
    if (max <= 7) {
      rollTime = 10000;
      numList = numList.filter(item => item.name.substr(0, 3) !== "TFZ");
      console.log(numList);
    }
    return false;
  }
  $(`#${max}>.result-name-${prizeCount}`).html(numList[num].name);

  id = setTimeout(rouletteResult, 50);
}
