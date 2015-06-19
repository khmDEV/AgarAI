// ==UserScript==
// @name         Agar AI
// @namespace    AgarAI
// @version      0.1
// @description  Is a AI for agar.io
// @author       khmDEV
// @match        http://agar.io/
// @grant        none
// ==/UserScript==

USER_SCRIPT = true; //USER_SCRIPT mode

/*
 * OPTIONS
 */
const MAX_X = 12000;
const MAX_Y = 12000;
const LINE_SIZE = 5;

const COLOR_ENEMY = "#FF0909"; //RED
const COLOR_POINTS = "#11FF09"; //GREEN
const COLOR_TEST = "#FFF009"; //YELLOW
const COLOR_DIRECTION = "#CC66FF"; //PURPLE

const COF_DIVIDE = 0.50;
const FONT_DEFAULT = "bold 30px Courier";
const DIVIDE_SIZE = 100;
const SPLIT_POWER = MAX_MOVE;
const NUMBER_TYPE = "type=\"number\"";
const DEFAULT_NAME = "AgarAI";

const KEY_ENABLE = ["E", 69];
const KEY_ALERT_MODE = ["A", 65];
const KEY_SAVE_DIE = ["S", 83];
const KEY_AUTO_RESTART = ["U", 85];
const KEY_LINES = ["L", 76];
const KEY_LINES_TESTS = ["T", 84];
const KEY_LINES_DANGER = ["D", 68];
const KEY_LINES_POINTS = ["O", 79];
const KEY_LINES_DIRECTION = ["I", 73];
const KEY_COSTS = ["C", 67];
const KEY_COSTS_ROAD = ["R", 82];
const KEY_COSTS_POINTS = ["P", 80];
const KEY_MENU = ["M", 77];

// TOOGLES
var ALERT_MODE = 0;
var SAVE_DIE = 0;
var AUTO_RESTART = 0;

var LINES = 1;
var LINES_DANGER = 1;
var LINES_TESTS = 0;
var LINES_POINTS = 1
var LINES_DIRECTION = 1;
var COSTS = 0;
var COSTS_POINTS = 1;
var COSTS_ROAD = 1;

// VALUES
var MAX_CALCULATE = 5;
var MAX_VELOCITY = 1000;
var MAX_MOVE = 1000;
var MIN_DANGER_ALERT = MAX_MOVE / 2;
var COST_DANGER = 5;
var DANGER_PERC = 0.9;
var LIMMIT_PRESION = 2;
var TO_DIE = MIN_DANGER_ALERT / 5;
var COF_SIZE = 1.2;

var lines = [];
var texts = [];
var DIE = false;
/*
 * SET UP MIDDLEWARE
 */
(function(f, l) {
  if (f.MIDDLEWARE == null) {
    none = new Function("none", '');
    MIDDLEWARE = {};

    MIDDLEWARE.ENABLED = true;
    MIDDLEWARE.isPlaying = none;
    MIDDLEWARE.goTo = none;
    MIDDLEWARE.getNodes = none;
    MIDDLEWARE.divide2save = none;
    MIDDLEWARE.getMiddleware = none;
  }

  MIDDLEWARE.ENABLED = true;
  MIDDLEWARE.render = render;
  MIDDLEWARE.AI = AI;
  MIDDLEWARE.start = startGame;


  function startGame() {
    defaultSettings();
    var last = f.onkeydown;
    f.onkeydown = function(k) {
      defaultKeys(k);
      last(k);
    }
    setDarkTheme(1);
    setShowMass(1);
    document.getElementById('nick').value = DEFAULT_NAME;
    Rod = undefined;

  }

  var maxScore = 0;

  function render(g) {
    /*
     * LINES
     */
    for (var i = 0; LINES && i < lines.length; i++) {
      g.beginPath();
      g.moveTo(lines[i][0].x, lines[i][0].y);
      g.lineTo(lines[i][1].x, lines[i][1].y);
      g.strokeStyle = lines[i][2];
      g.lineWidth = lines[i][3];
      g.stroke();
    }

    /*
     * TEXTS
     */
    for (var i = 0; COSTS && i < texts.length; i++) {
      g.fillStyle = texts[i][4];
      g.font = texts[i][3];
      g.fillText(texts[i][0], texts[i][1], texts[i][2]);
    }
    setText("Max score: " + maxScore.toFixed(2).toString());
  }

  function AI() {
    if (MIDDLEWARE.isPlaying) {
      var s = MIDDLEWARE.getScore();
      if (maxScore < s) {
        AUTO_RESTART = false;
      }
      maxScore = maxScore < s ? s : maxScore;
      calculate();
      MIDDLEWARE.goTo(Xc, Yc);

      if (DIE) {
        DIE = false;
        divide2save();
      }
    }
  }

  function calculate() {
    var lpl = MIDDLEWARE.getPlayers();
    //console.log(lpl);
    var arr = MIDDLEWARE.getNodes();
    Xc = 0; //<-----
    Yc = 0; //<-----
    if (lpl.length == 0) {
      return;
    } else if (lpl.length == 1) {
      player = lpl[0];
    } else { //Multi nodes (EXPERIMENTAL)
      var minX = MAX_X,
        maxX = 0,
        minY = MAX_Y,
        maxY = 0,
        size = pl.size;
      for (var i = 0; i < lpl.length; i++) {
        var pl = lpl[i];
        minX = minX + pl.size > pl.x ? pl.x - pl.size : minX;
        maxX = maxY < pl.x + pl.size ? pl.x + pl.size : maxX;
        minY = minY + pl.size > pl.y ? pl.y - pl.size : minY;
        maxY = maxY < pl.y + pl.size ? pl.y + pl.size : maxY;
        //size+=pl.size;
      }
      player.x = (minX + maxX) / 2;
      player.y = (minX + maxX) / 2;
      player.size = size; //Math.max(maxX - minX,maxY - minY);
      player.id = lpl[0].id;

    }
    var x = 0,
      y = 0;
    points = [], danger = [];
    var vectorDanger = [0, 0],
      vectorEnemys = [0, 0];

    //LIMITS
    var SIZE_MIN = player.size * COF_SIZE * 2;
    var DISTANCE_MIN = 10;
    for (var i = 0; i < LIMMIT_PRESION; i++) {
      arr.push({
        size: SIZE_MIN,
        x: -DISTANCE_MIN,
        y: player.y,
        isVirus: false,
        isWall: true
      });
      arr.push({
        size: SIZE_MIN,
        x: MAX_X + DISTANCE_MIN,
        y: player.y,
        isVirus: false,
        isWall: true
      });
      arr.push({
        size: SIZE_MIN,
        x: player.x,
        y: -DISTANCE_MIN,
        isVirus: false,
        isWall: true
      });
      arr.push({
        size: SIZE_MIN,
        x: player.x,
        y: MAX_Y + DISTANCE_MIN,
        isVirus: false,
        isWall: true
      });
    }

    var ALERT = ALERT_MODE;
    DIE = false;

    lines = [];

    //console.log(player);
    //console.log("+++++++++++++");
    for (var i = 0; i < arr.length; i++) {
      var e = arr[i];
      //console.log(e);
      if (!e.isVirus || player.size > DIVIDE_SIZE) { //ENEMYS

        if (e.size > player.size * COF_SIZE || (player.size > DIVIDE_SIZE && e.isVirus)) { //ENEMYS DANGEROUS
          var dist = distance(player, e);
          danger.push(e);
          var xt = distanceX(player, e), //(player.x - e.x), //
            yt = distanceY(player, e), //(player.y - e.y), //
            mt = MAX_X + MAX_Y;
          if (dist < MAX_MOVE) {
            //console.log(e);
            if (LINES && LINES_DANGER) {
              lines.push([player, e, COLOR_ENEMY, LINE_SIZE]);
            }
            ALERT = ALERT || dist < MIN_DANGER_ALERT && !e.hasOwnProperty("isWall");
            DIE = (DIE || dist < TO_DIE) && SAVE_DIE;
            if (xt != 0) {
              vectorDanger[0] += xt > 0 ? 1 - (xt / mt) : -1 + (xt / mt);
            }
            if (yt != 0) {
              vectorDanger[1] += yt > 0 ? 1 - (yt / mt) : -1 + (yt / mt);
            }
          } else {
            if (xt != 0) {
              vectorEnemys[0] += xt > 0 ? 1 - (xt / mt) : -1 + (xt / mt);
            }
            if (yt != 0) {
              vectorEnemys[1] += yt > 0 ? 1 - (yt / mt) : -1 + (yt / mt);
            }
          }
        } else if (e.size * COF_SIZE< player.size) {
          if (LINES && LINES_TESTS) {
            lines.push([player, e, COLOR_TEST, LINE_SIZE]);
          }
          points.push(e);
          //console.log(lines.length+" "+points.length);
        }
      }
    }
    vectorDanger[0] = vectorDanger[0] * (DANGER_PERC) + vectorEnemys[0] * (1 - DANGER_PERC);
    vectorDanger[1] = vectorDanger[1] * (DANGER_PERC) + vectorEnemys[1] * (1 - DANGER_PERC);
    /*if(player.x<10&&vectorDanger[0]<0){vectorDanger[0]=1}
    else if(player.x>MAX_X-10&&vectorDanger[0]>0){vectorDanger[0]=-1}
    else if(player.y<10&&vectorDanger[1]<0){vectorDanger[1]=1}
    else if(player.y>MAX_Y-10&&vectorDanger[1]>0){vectorDanger[1]=-1}*/
    //Remove posible players (TO_FIX)
    var points2 = [];
    for (var i = 0; i < points.length; i++) {
      var ok = true;
      var e = points[i];
      for (var o = 0; o < danger.length && ok; o++) {
        var dist = distance(danger[o], e);
        if (dist < MIN_DANGER_ALERT) {
          ok = false;
        }
      }
      if (ok) {
        points2.push(e);
      }
    }
    points = points2;

    if (!ALERT) {

      Rod = costMin(player, points, vectorDanger);

      var road = Rod.road;
      if (road.length < 1) {
        ALERT = true;
      } else {
        for (var i = 0; i < road.length - 1; i++) {
          var e = road[i];
          var e2 = road[i + 1];
          if (LINES && LINES_POINTS) {
            lines.push([e, e2, COLOR_POINTS, LINE_SIZE]);
          }
        }
        if (COSTS && COSTS_ROAD) {
          texts.push([Rod.cost.toFixed(2).toString(), (road[1].x + player.x) / 2, (road[1].y + player.y) / 2, FONT_DEFAULT, COLOR_POINTS]);
        }
        x = (road[0].x - player.x);
        y = (road[0].y - player.y);
      }
    }
    if (ALERT) {
      x = vectorDanger[0];
      y = vectorDanger[1];
    }

    if (player.x < player.size && x < 0) {
      x = 0;
    } else if (player.x > MAX_X - player.size && x > 0) {
      x = 0;
    }

    if (player.y < player.size && y < 0) {
      y = 0;
    } else if (player.y > MAX_Y - player.size && y > 0) {
      y = 0;
    }

    if (x == 0 && y == 0) {
      if (ALERT) {
        if (player.y < player.size&&vectorDanger[0]<vectorDanger[1]) {
          y = 1;
        } else if (player.y > MAX_Y - player.size&&vectorDanger[0]>vectorDanger[1]) {
          y = -1;
        }
        if (player.x < player.size&&vectorDanger[0]<vectorDanger[1]) {
          x = 1;
        } else if (player.x > MAX_X - player.size&&vectorDanger[0]>vectorDanger[1]) {
          x = -1;
        }
      } else {
        if (player.y < player.size) {
          y = 1;
        } else if (player.y > MAX_Y - player.size) {
          y = -1;
        }
        if (player.x < player.size) {
          x = 1;
        } else if (player.x > MAX_X - player.size) {
          x = -1;
        }
      }
    }
    var mx = Math.abs(x) + Math.abs(y);

    x = mx != 0 ? x / mx : x;
    y = mx != 0 ? y / mx : y;

    Xc = x * MAX_VELOCITY + player.x;
    Yc = y * MAX_VELOCITY + player.y;
    if (LINES && LINES_DIRECTION) {
      lines.push([player, {
        x: Xc,
        y: Yc
      }, COLOR_DIRECTION, LINE_SIZE]);
    }
  }

  // DINAMIC ALGORITHM
  function costMin(init, points, vectorDanger) {
    T = [, ];
    texts = [];

    var R = costMinRec(init, remove(points, init), 0, vectorDanger);
    console.log(T);
    //console.log(R);
    return R;
  }

  function costMinRec(init, points, num, vectorDanger) {
    var min = {
      cost: Infinity,
      road: []
    };
    var sel = -1;

    if (!undef(T[init.id, hash(points)])) {
      return T[init.id, hash(points)];
    } else if (num == MAX_CALCULATE || points.length == 0) {
      min.cost = 0;
      min.road = [];
    } else {
      for (var i = 0; i < points.length; i++) {
        var e = points[i];
        var R = costMinRec(e, remove(points, e), num + 1, vectorDanger);
        var cost = R.cost;
        cost += costFunc(init, e, vectorDanger);
        //console.log("NUM"+num+": "+i+"- "+cost+" / "+min.cost);

        if (num == 0 && COSTS && COSTS_POINTS) {
          texts.push([cost.toFixed(2).toString(), (init.x + e.x) / 2, (init.y + e.y) / 2,
            FONT_DEFAULT, COLOR_TEST
          ]);
        }

        if (min.cost > cost /*&& R.road.length >= min.road.length*/ ) {

          min.cost = cost;
          min.road = R.road.slice(0);
          min.road.unshift(e);
          //console.log(e);
          //lines.push([init, e, COLOR_TEST, LINE_SIZE]);
        }
      }
    }

    T[init.id, hash(points)] = min;
    return min;
  }

  function hash(c) {
    var code = 0;
    for (var i = 0; i < c.length; i++) {
      code += c[i];
    }
    return code;
  }

  function costFunc(a, b, vectorDanger) {
    //return dist(a.x, a.y, b.x, b.y);
    var cost = dist(a.x, a.y, b.x, b.y);
    cost /= b.size;
    if (b.x < MAX_MOVE) { // REMOVE FOOD TOO CLOSE AT WALLS
      cost = Infinity; //*= (b.x / MAX_MOVE) * COST_DANGER; //
    } else if (b.x > MAX_X - MAX_MOVE) {
      cost = Infinity; //*= (MAX_X - b.x / MAX_MOVE) * COST_DANGER; //
    }

    if (b.y < MAX_MOVE) {
      cost = Infinity; //*= (b.y / MAX_MOVE) * COST_DANGER; //
    } else if (b.y > MAX_Y - MAX_MOVE) {
      cost = Infinity; //*= (MAX_Y - b.y / MAX_MOVE) * COST_DANGER; //
    }

    if ((b.x - a.x) * vectorDanger[0] < 0) {
      cost *= COST_DANGER; //= Infinity; //
    }
    if ((b.y - a.y) * vectorDanger[1] < 0) {
      cost *= COST_DANGER; //= Infinity; //
    }
    return cost;
  }

  function clone(a) {
    return {
      cost: a.cost,
      road: a.road
    }
  }

  function union(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
      var ind = b.indexOf(a[i]);
      if (ind != -1) {
        arr.push(a[i]);
      }
    }
    return arr;
  }

  function remove(array, e) {
    var aux = array.slice(0);
    var i = aux.indexOf(e);
    if (i != -1) {
      aux.splice(i, 1);
    }
    return aux;
  }

  function distanceX(a, b) {
    var asize = a.size;
    var bsize = b.size; //+ (b.size > DIVIDE_SIZE && b.size * distance > a.size * COF_SIZE ? SPLIT_POWER : 0);

    if (a.x > b.x) {
      var x = (a.x - asize) > (b.x + bsize) ? ((a.x - asize) - (b.x + bsize)) : (b.x + bsize) - (a.x - asize);
    } else {
      var x = ((a.x + asize) < (b.x - bsize)) ? ((a.x + asize) - (b.x - bsize)) : (b.x - bsize) - (a.x + asize);
    }
    return x;
  }

  function distanceY(a, b) {

    var asize = a.size / 2;
    var bsize = b.size / 2; // + (b.size > DIVIDE_SIZE && b.size * distance > a.size * COF_SIZE ? SPLIT_POWER : 0);
    if (a.y > b.y) {
      var y = (a.y - asize) > (b.y + bsize) ? ((a.y - asize) - (b.y + bsize)) : (-(a.y - asize) + (b.y + bsize));
    } else {
      var y = ((a.y + asize) < (b.y - bsize)) ? ((a.y + asize) - (b.y - bsize)) : (-(a.y + asize) + (b.y - bsize));
    }
    return y;
  }

  function distance(a, b) {
    return Math.sqrt(Math.pow(distanceX(a, b), 2) + Math.pow(distanceY(a, b), 2));
  }

  function dist(xa, ya, xb, yb) {
    return Math.sqrt(Math.pow(xa - xb, 2) + Math.pow(ya - yb, 2));
  }


  function dir(a, b) {
    return Math.atan(Math.pow(a.x - b.x, 2) / Math.pow(a.y - b.y, 2));
  }

  function undef(a) {
    return typeof a === "undefined";
  }


  function returnConstant(obj) {
    return new Function('return ' + obj + ';');
  }

  function setConstant(obj) {
    return new Function("v", obj + '=v;');
  }

  /*
   * I/O
   */
  setEnable = function(en) {
    MIDDLEWARE.ENABLED = en;
  };
  setAlertMode = function(en) {
    ALERT_MODE = en;
  };
  setAutoRestart = function(en) {
    AUTO_RESTART = en;
  };
  setSaveDie = function(en) {
    SAVE_DIE = en;
  };
  setLines = function(en) {
    LINES = en;
  };
  setLinesTests = function(en) {
    LINES_TESTS = en;
  };
  setLinesDanger = function(en) {
    LINES_DANGER = en;
  };
  setLinesPoints = function(en) {
    LINES_POINTS = en;
  };
  setLinesDirection = function(en) {
    LINES_DIRECTION = en;
  };
  setCosts = function(en) {
    COSTS = en;
  };
  setCostsRoad = function(en) {
    COSTS_ROAD = en;
  };
  setCostsPoints = function(en) {
    COSTS_POINTS = en;
  };
  changeMAX_CALCULATE = function(v) {
    if (v) {
      MAX_CALCULATE = v;
    }
  };
  changeMAX_VELOCITY = function(v) {
    if (v) {
      MAX_VELOCITY = v;
    }
  };
  changeMAX_MOVE = function(v) {
    if (v) {
      MAX_MOVE = v;
    }
  };
  changeMIN_DANGER_ALERT = function(v) {
    if (v) {
      MIN_DANGER_ALERT = v;
    }
  };
  changeCOST_DANGER = function(v) {
    if (v) {
      COST_DANGER = v;
    }
  };
  changeDANGER_PERC = function(v) {
    if (v) {
      DANGER_PERC = v;
    }
  };
  changeLIMMIT_PRESION = function(v) {
    if (v) {
      LIMMIT_PRESION = v;
    }
  };
  changeTO_DIE = function(v) {
    if (v) {
      TO_DIE = v;
    }
  };
  changeCOF_SIZE = function(v) {
    if (v) {
      COF_SIZE = v;
    }
  };

  function defaultKeys(k) {
    if (k.ctrlKey || k.altKey || k.shiftKey) {
      return;
    }
    if (k.keyCode == KEY_ENABLE[1]) {
      MIDDLEWARE.ENABLED = !MIDDLEWARE.ENABLED;
      document.getElementById(KEY_ENABLE[0]).checked = MIDDLEWARE.ENABLED;
    } else if (k.keyCode == KEY_MENU) {
      g("#overlays").show()
    } else if (k.keyCode == KEY_ALERT_MODE[1]) {
      ALERT_MODE = !ALERT_MODE;
      document.getElementById(KEY_ALERT_MODE[0]).checked = ALERT_MODE;
    } else if (k.keyCode == KEY_SAVE_DIE[1]) {
      SAVE_DIE = !SAVE_DIE;
      document.getElementById(KEY_SAVE_DIE[0]).checked = SAVE_DIE;
    } else if (k.keyCode == KEY_AUTO_RESTART[1]) {
      AUTO_RESTART = !AUTO_RESTART;
      document.getElementById(KEY_AUTO_RESTART[0]).checked = AUTO_RESTART;
    } else if (k.keyCode == KEY_COSTS[1]) {
      COSTS = !COSTS;
      document.getElementById(KEY_COSTS[0]).checked = COSTS;
    } else if (k.keyCode == KEY_COSTS_ROAD[1]) {
      COSTS_ROAD = !COSTS_ROAD;
      document.getElementById(KEY_COSTS_ROAD[0]).checked = COSTS_ROAD;
    } else if (k.keyCode == KEY_COSTS_POINTS[1]) {
      COSTS_POINTS = !COSTS_POINTS;
      document.getElementById(KEY_COSTS_POINTS[0]).checked = COSTS_POINTS;
    } else if (k.keyCode == KEY_LINES[1]) {
      LINES = !LINES;
      document.getElementById(KEY_LINES[0]).checked = LINES;
    } else if (k.keyCode == KEY_LINES_TESTS[1]) {
      LINES_TESTS = !LINES_TESTS;
      document.getElementById(KEY_LINES_TESTS[0]).checked = LINES_TESTS;
    } else if (k.keyCode == KEY_LINES_DANGER[1]) {
      LINES_DANGER = !LINES_DANGER;
      document.getElementById(KEY_LINES_DANGER[0]).checked = LINES_DANGER;
    } else if (k.keyCode == KEY_LINES_POINTS[1]) {
      LINES_POINTS = !LINES_POINTS;
      document.getElementById(KEY_LINES_POINTS[0]).checked = LINES_POINTS;
    } else if (k.keyCode == KEY_LINES_DIRECTION[1]) {
      LINES_DIRECTION = !LINES_DIRECTION;
      document.getElementById(KEY_LINES_DIRECTION[0]).checked = LINES_DIRECTION;
    }
  }

  function defaultSettings() {
    addCheckbox("Enable(" + KEY_ENABLE[0] + ")", "setEnable", KEY_ENABLE[0], MIDDLEWARE.ENABLED);
    addCheckbox("Alert(" + KEY_ALERT_MODE[0] + ")", "setAlertMode", KEY_ALERT_MODE[0], ALERT_MODE);
    addCheckbox("Save die(" + KEY_SAVE_DIE[0] + ")", "setSaveDie", KEY_SAVE_DIE[0], SAVE_DIE);
    addCheckbox("Auto-restart(" + KEY_AUTO_RESTART[0] + ")", "setAutoRestart", KEY_AUTO_RESTART[0], AUTO_RESTART);

    addCheckbox("Lines(" + KEY_LINES[0] + ")", "setLines", KEY_LINES[0], LINES);
    addCheckbox("Lines_tests(" + KEY_LINES_TESTS[0] + ")", "setLinesTests", KEY_LINES_TESTS[0], LINES_TESTS);
    addCheckbox("Lines_danger(" + KEY_LINES_DANGER[0] + ")", "setLinesDanger", KEY_LINES_DANGER[0], LINES_DANGER);
    addCheckbox("Lines_points(" + KEY_LINES_POINTS[0] + ")", "setLinesPoints", KEY_LINES_POINTS[0], LINES_POINTS);
    addCheckbox("Lines_direction(" + KEY_LINES_DIRECTION[0] + ")", "setLinesPoints", KEY_LINES_DIRECTION[0], LINES_DIRECTION);

    addCheckbox("Costs(" + KEY_COSTS[0] + ")", "setCosts", KEY_COSTS[0], COSTS);
    addCheckbox("Costs_road(" + KEY_COSTS_ROAD[0] + ")", "setCostsRoad", KEY_COSTS_ROAD[0], COSTS_ROAD);
    addCheckbox("Costs_points(" + KEY_COSTS_POINTS[0] + ")", "setCostsPoints", KEY_COSTS_POINTS[0], COSTS_POINTS);

    addTextbox("MAX_CALCULATE", "changeMAX_CALCULATE", MAX_CALCULATE, NUMBER_TYPE);
    addTextbox("MAX_VELOCITY", "changeMAX_VELOCITY", MAX_VELOCITY, NUMBER_TYPE);
    addTextbox("MAX_MOVE", "changeMAX_MOVE", MAX_MOVE, NUMBER_TYPE);
    addTextbox("MIN_DANGER_ALERT", "changeMIN_DANGER_ALERT", MIN_DANGER_ALERT, NUMBER_TYPE);
    addTextbox("COST_DANGER", "changeCOST_DANGER", COST_DANGER, NUMBER_TYPE);
    addTextbox("DANGER_PERC", "changeDANGER_PERC", DANGER_PERC, NUMBER_TYPE);
    addTextbox("LIMMIT_PRESION", "changeLIMMIT_PRESION", LIMMIT_PRESION, NUMBER_TYPE);
    addTextbox("TO_DIE", "changeTO_DIE", TO_DIE, NUMBER_TYPE);
    addTextbox("COF_SIZE", "changeCOF_SIZE", COF_SIZE, NUMBER_TYPE);

  }

  function addCheckbox(s, f, n, e) {
    var txt = "<input id=\"" + n + "\" type=\"checkbox\" onchange=\"" + f + "($(this).is(':checked'));\" " + (e ? "checked" : "") + ">" + s;
    var newDiv = document.createElement("label");
    newDiv.innerHTML = txt;
    var settings = document.getElementById("settings").getElementsByTagName("div")[2];
    var currentDiv = settings.getElementsByTagName("label")[0];
    settings.insertBefore(newDiv, currentDiv);
  }

  function addTextbox(s, f, v, op) {

    var txt = s + "<input " + op + " onkeyup=\"" + f + "($(this).val());\" class=\"form-control\" value=\"" + v + "\" placeholder=\"" + s + "\" maxlength=\"15\">";
    var newDiv = document.createElement("label");
    newDiv.innerHTML = txt;
    var settings = document.getElementById("settings");
    var currentDiv = settings.getElementsByTagName("div")[3];
    settings.insertBefore(newDiv, currentDiv);

  }

  function setText(txt) {
    var newDiv = document.getElementById("msg");
    if (newDiv == null) {
      newDiv = document.createElement("div");
      newDiv.id = "msg";
      var settings = document.getElementById("instructions");
      var currentDiv = settings.getElementsByTagName("div")[3];
      settings.insertBefore(newDiv, currentDiv);
    }
    newDiv.innerHTML = txt;
  }
})(window, jQuery);
