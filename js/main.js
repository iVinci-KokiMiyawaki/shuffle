let max = 18;
let prizeCount = 1;
let roleTime = 3000;
let endList = [];
let numList = [];
const list = [...Array(max).keys()].map(i => ++i);

let goodList = [
  { word: "夢と魔法の王国 ペアチケット", value: 1 },
  { word: "筋肉はすべてのソリューションだ！", value: 1 },
  { word: "女性社員イチオシ！蒸気で上機嫌！！", value: 1 },
  { word: "話題のカナル式 ワイヤレスイヤホン！？", value: 1 },
  { word: "牛タン煮込み3種セット（仙台煮・土手煮・赤ワイ煮）", value: 1 },
  { word: "大人のスイーツセット", value: 1 },
  { word: "カロリーの暴力！13000キロカロリープレゼント！！", value: 1 },
  { word: "HARIO グラタン皿 耐熱ガラス2個セット", value: 1 },
  { word: "アップルプレートセット", value: 1 },
  { word: "Joseph Joseph 折りたためるまな板チョップ2ポットミニ", value: 1 },
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
    if (word) {
      $(".scroll-list__wrp").append(
        $("<div/>")
          .addClass(`scroll-list__item js-scroll-list-item value-${value}`)
          .attr("id", idx)
          .append(
            $("<div/>")
              .addClass("roulette")
              .html(`${idx + 1}位 ${word}`)
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

$(".load-button button").click(function() {
  numList = JSON.parse($("#load-list").val());
  console.log(numList);
});

$(".progress-button button").click(function() {
  console.log();
  startBingo();
  setTimeout(stopBingo, roleTime);
});

var toggleSuccess = function() {
  $(".progress-button").addClass("success");
  draw(".checkmark path");
  setTimeout(function() {
    $(".progress-button")
      .removeClass("success")
      .removeClass("loading");
    resetDashes();
  }, roleTime);
};

var toggleError = function() {
  $(".progress-button").addClass("error");
  draw(".cross path");
  setTimeout(function() {
    $(".progress-button")
      .removeClass("error")
      .removeClass("loading");
    resetDashes();
  }, roleTime);
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
  $("#" + max).append($("<div/>").addClass(`result-name-${prizeCount}`));
  rouletteResult();
}

function stopBingo() {
  // ボタンの表示切り替え
  isStop = true;
}

function rouletteResult() {
  var id = "";
  var num = Math.floor(Math.random() * numList.length);
  while (!endList.indexOf(numList[num].name)) {
    num = Math.floor(Math.random() * numList.length);
  }
  // ストップボタンが押された
  if (isStop) {
    // 遅延呼び出しを解除
    clearTimeout(id);
    $(`#${max}>.result-name-${prizeCount}`).html(numList[num].name);

    endList.push(numList[num].name);
    localStorage.setItem("result", JSON.stringify(endList));
    if (prizeCount < goodList[max].value) {
      prizeCount++;
    } else {
      prizeCount = 1;
      max -= 1;
    }
    return false;
  }
  $(`#${max}>.result-name-${prizeCount}`).html(numList[num].name);

  id = setTimeout(rouletteResult, 100);
}
