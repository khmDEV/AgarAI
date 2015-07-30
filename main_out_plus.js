// ==UserScript==
// @name         Agar AI
// @namespace    AgarAI
// @version      0.1
// @description  Is a AI for agar.io
// @author       khmDEV
// @match        http://agar.io/
// @grant        none
// ==/UserScript==

(function(d, e) {
  /*
   * SET UP MIDDLEWARE
   */

  /*
    MIDDLEWARE:
       ENABLED: the system is enabled?
       isPlaying(): the game is started
       goTo(x,y): move the node to (x,y)
       getMaxX(): return the max X
       getMaxY(): return the max Y
       getNodes(): return all nodes
           Node:
             x: x position
             y: y position
             size: size of the node
             isVirus:  is a virus type?
       divide2save: eject some mass

       render: custom render
       AI: AI system
  */

  if (window.MIDDLEWARE == null) {
    none = new Function("none", '');
    MIDDLEWARE = {};

    MIDDLEWARE.ENABLED = false;
    MIDDLEWARE.render = none;
    MIDDLEWARE.AI = none;
    MIDDLEWARE.start = none;
    MIDDLEWARE.pauseGame = none;
    MIDDLEWARE.unpauseGame = none;
  }
  MIDDLEWARE.MAX_X = 7054;
  MIDDLEWARE.MAX_Y = 7054;
  MIDDLEWARE.MIN_X = -7054;
  MIDDLEWARE.MIN_Y = -7054;

  MIDDLEWARE.setNick = function(nick) {
    document.getElementById('nick').value = nick;
  };

  MIDDLEWARE.getNick = function(nick) {
    return document.getElementById('nick').value;
  };
  MIDDLEWARE.startGame = function() {
    setNick(MIDDLEWARE.getNick());
  };

  MIDDLEWARE.isPlaying = function() {
    return X() && ea && null != H;
  };

  MIDDLEWARE.goTo = function(x, y) {
    var a = P(21);
    a.setUint8(0, 16);
    a.setFloat64(1, x, !0);
    a.setFloat64(9, y, !0);
    a.setUint32(17, 0, !0);
    Q(a);
  }

  MIDDLEWARE.getPlayers = function() {
    return h;
  }

  MIDDLEWARE.getScore = function() {
    return ~~(O / 100);
  }

  MIDDLEWARE.getNodes = function() {
    for (var i = 0; i < x.length; i++) {
      x[i].isVirus = x[i].d;
    }
    return x.slice(0);
  };
  MIDDLEWARE.divide2save = function() {
    K(17);
  };

  // CONTROL
  function $() {
    if (X()) {
      if (MIDDLEWARE.ENABLED) {
        MIDDLEWARE.AI();
        return;
      }
      var a = ja - m / 2,
        b = ka - s / 2;
      64 > a * a + b * b || .01 > Math.abs(ub -
        na) && .01 > Math.abs(vb - oa) || (ub = na, vb = oa, a = P(21), a.setUint8(0, 16), a.setFloat64(1, na, !0), a.setFloat64(9, oa, !0), a.setUint32(17, 0, !0), Q(a))
    }
  }
  function sb() {
    if (X() && ea && null != H) {
      var a = P(1 + 2 * H.length);
      a.setUint8(0, 0);
      for (var b = 0; b < H.length; ++b) a.setUint16(1 + 2 * b, H.charCodeAt(b), !0);
      Q(a);
      H = null
    }
  }

  // RENDER
  function wb() {
    var a, b = Date.now();
    ++Vb;
    F = b;
    if (0 < h.length) {
      Ub();
      for (var c = a = 0, d = 0; d < h.length; d++) h[d].P(), a += h[d].x / h.length, c += h[d].y / h.length;
      fa = a;
      ga = c;
      ha = g;
      v = (v + a) / 2;
      w = (w + c) / 2
    } else v = (29 * v + fa) / 30, w = (29 * w + ga) / 30, g = (9 * g + ha * xb()) / 10;
    Jb();
    Ea();
    Ta || f.clearRect(0, 0, m, s);
    Ta ? (f.fillStyle = xa ? "#111111" : "#F2FBFF", f.globalAlpha = .05, f.fillRect(0, 0, m, s), f.globalAlpha = 1) : Wb();
    x.sort(function(a, b) {
      return a.size == b.size ? a.id - b.id : a.size - b.size
    });
    f.save();
    f.translate(m / 2, s / 2);
    f.scale(g, g);
    f.translate(-v, -w);
    for (d =
      0; d < U.length; d++) U[d].w(f);
    for (d = 0; d < x.length; d++) x[d].w(f);

    if (MIDDLEWARE.ENABLED) {
      MIDDLEWARE.render(f);
    }

    if (La) {
      ra = (3 * ra + Ja) / 4;
      sa = (3 * sa + Ka) / 4;
      f.save();
      f.strokeStyle = "#FFAAAA";
      f.lineWidth = 10;
      f.lineCap = "round";
      f.lineJoin = "round";
      f.globalAlpha = .5;
      f.beginPath();
      for (d = 0; d < h.length; d++) f.moveTo(h[d].x, h[d].y), f.lineTo(ra, sa);
      f.stroke();
      f.restore()
    }
    f.restore();
    C && C.width && f.drawImage(C, m - C.width - 10, 10);
    O = Math.max(O, yb());
    0 != O && (null == ya && (ya = new za(24, "#FFFFFF")), ya.C(da("score") + ": " + ~~(O / 100)), c = ya.L(), a = c.width, f.globalAlpha = .2, f.fillStyle = "#000000",
      f.fillRect(10, s - 10 - 24 - 10, a + 10, 34), f.globalAlpha = 1, f.drawImage(c, 15, s - 10 - 24 - 5));
    Xb();
    b = Date.now() - b;
    b > 1E3 / 60 ? G -= .01 : b < 1E3 / 65 && (G += .01);.4 > G && (G = .4);
    1 < G && (G = 1);
    b = F - zb;
    !X() || ba || S ? (u += b / 2E3, 1 < u && (u = 1)) : (u -= b / 300, 0 > u && (u = 0));
    0 < u && (f.fillStyle = "#000000", f.globalAlpha = .5 * u, f.fillRect(0, 0, m, s), f.globalAlpha = 1);
    zb = F
  }

  // MAIN
  function Ib() {
    Ca = !0;
    Za();
    setInterval(Za, 18E4);
    J = Da = document.getElementById("canvas");
    f = J.getContext("2d");
    J.onmousedown = function(a) {
      if ($a) {
        var b = a.clientX - (5 + m / 5 / 2),
          c = a.clientY - (5 + m / 5 / 2);
        if (Math.sqrt(b * b + c * c) <= m / 5 / 2) {
          $();
          K(17);
          return
        }
      }
      ja = 1 * a.clientX;
      ka = 1 * a.clientY;
      Ea();
      $()
    };
    J.onmousemove = function(a) {
      ja = 1 * a.clientX;
      ka = 1 * a.clientY;
      Ea()
    };
    J.onmouseup = function() {};
    /firefox/i.test(navigator.userAgent) ? document.addEventListener("DOMMouseScroll", ab, !1) : document.body.onmousewheel = ab;
    var a = !1,
      b = !1,
      c = !1;
    d.onkeydown = function(p) {
      32 != p.keyCode || a || ($(), K(17), a = !0);
      81 != p.keyCode || b || (K(18), b = !0);
      87 != p.keyCode || c || ($(), K(21), c = !0);
      27 == p.keyCode && la(300)
    };
    d.onkeyup = function(p) {
      32 == p.keyCode && (a = !1);
      87 == p.keyCode && (c = !1);
      81 == p.keyCode && b && (K(19), b = !1)
    };
    d.onblur = function() {
      K(19);
      c = b = a = !1
    };
    d.onresize = bb;
    d.requestAnimationFrame(cb);
    setInterval($, 40);
    A && e("#region").val(A);
    db();
    ma(e("#region").val());
    0 == Fa && A && L();
    la(0);
    bb();
    d.location.hash && 6 <= d.location.hash.length && eb(d.location.hash)
    MIDDLEWARE.start();
  }

  //UNPAUSE GAME
  function fb() {
    e("#adsBottom").hide();
    e("#overlays").hide();
    e("#stats").hide();
    e("#mainPanel").hide();
    S = ba = !1;
    db();
    gb(d.aa)
    MIDDLEWARE.unpauseGame();
  }

  //PAUSE GAME
  function la(a) {
    ba || S || (e("#adsBottom").show(), H = null, hb(d.aa), 1E3 > a && (u = 1), ba = !0, e("#mainPanel").show(), 0 < a ? e("#overlays").fadeIn(a) : e("#overlays").show())
    MIDDLEWARE.pauseGame();
  }

  /*
   * ORIGINAL CODE
   */
  function ab(a) {
    M *=
      Math.pow(.9, a.wheelDelta / -120 || a.detail || 0);
    1 > M && (M = 1);
    M > 4 / g && (M = 4 / g)
  }

  function Jb() {
    if (.4 > g) aa = null;
    else {
      for (var a = Number.POSITIVE_INFINITY, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, p = Number.NEGATIVE_INFINITY, d = 0, q = 0; q < x.length; q++) {
        var e = x[q];
        !e.N() || e.R || 20 >= e.size * g || (d = Math.max(e.size, d), a = Math.min(e.x, a), b = Math.min(e.y, b), c = Math.max(e.x, c), p = Math.max(e.y, p))
      }
      aa = Kb.la({
        ca: a - (d + 100),
        da: b - (d + 100),
        oa: c + (d + 100),
        pa: p + (d + 100),
        ma: 2,
        na: 4
      });
      for (q = 0; q < x.length; q++)
        if (e = x[q], e.N() && !(20 >= e.size *
            g))
          for (a = 0; a < e.a.length; ++a) b = e.a[a].x, c = e.a[a].y, b < v - m / 2 / g || c < w - s / 2 / g || b > v + m / 2 / g || c > w + s / 2 / g || aa.m(e.a[a])
    }
  }

  function Ea() {
    na = (ja - m / 2) / g + v;
    oa = (ka - s / 2) / g + w
  }

  function Za() {
    null == pa && (pa = {}, e("#region").children().each(function() {
      var a = e(this),
        b = a.val();
      b && (pa[b] = a.text())
    }));
    e.get("http://m.agar.io/info", function(a) {
      var b = {},
        c;
      for (c in a.regions) {
        var p = c.split(":")[0];
        b[p] = b[p] || 0;
        b[p] += a.regions[c].numPlayers
      }
      for (c in b) e('#region option[value="' + c + '"]').text(pa[c] + " (" + b[c] + " players)")
    }, "json")
  }

  function ma(a) {
    a && a != A && (e("#region").val() != a && e("#region").val(a), A = d.localStorage.location = a, e(".region-message").hide(), e(".region-message." + a).show(), e(".btn-needs-server").prop("disabled", !1), Ca && L())
  }

  function ca(a) {
    e("#helloContainer").attr("data-gamemode",
      a);
    T = a;
    e("#gamemode").val(a)
  }

  function db() {
    e("#region").val() ? d.localStorage.location = e("#region").val() : d.localStorage.location && e("#region").val(d.localStorage.location);
    e("#region").val() ? e("#locationKnown").append(e("#region")) : e("#locationUnknown").append(e("#region"))
  }

  function hb(a) {
    d.googletag && d.googletag.cmd.push(function() {
      Ga && (Ga = !1, setTimeout(function() {
        Ga = !0
      }, 6E4 * Lb), d.googletag && d.googletag.pubads && d.googletag.pubads().refresh && d.googletag.pubads().refresh(a))
    })
  }

  function gb(a) {
    d.googletag &&
      d.googletag.pubads && d.googletag.pubads().clear && d.googletag.pubads().clear(a)
  }

  function da(a) {
    return d.i18n[a] || d.i18n_dict.en[a] || a
  }

  function ib() {
    var a = ++Fa;
    console.log("Find " + A + T);
    e.ajax("http://m.agar.io/findServer", {
      error: function() {
        setTimeout(ib, 1E3)
      },
      success: function(b) {
        a == Fa && (b.alert && alert(b.alert), Ha("ws://" + b.ip, b.token))
      },
      dataType: "json",
      method: "POST",
      cache: !1,
      crossDomain: !0,
      data: (A + T || "?") + "\n154669603"
    })
  }

  function L() {
    Ca && A && (e("#connecting").show(), ib())
  }

  function Ha(a, b) {
    if (t) {
      t.onopen =
        null;
      t.onmessage = null;
      t.onclose = null;
      try {
        t.close()
      } catch (c) {}
      t = null
    }
    Ia.ip && (a = "ws://" + Ia.ip);
    if (null != N) {
      var p = N;
      N = function() {
        p(b)
      }
    }
    if (jb) {
      var d = a.split(":");
      a = d[0] + "s://ip-" + d[1].replace(/\./g, "-").replace(/\//g, "") + ".tech.agar.io:" + (+d[2] + 2E3)
    }
    B = [];
    h = [];
    I = {};
    x = [];
    U = [];
    y = [];
    C = D = null;
    O = 0;
    ea = !1;
    console.log("Connecting to " + a);
    t = new WebSocket(a);
    t.binaryType = "arraybuffer";
    t.onopen = function() {
      var a;
      console.log("socket open");
      a = P(5);
      a.setUint8(0, 254);
      a.setUint32(1, 5, !0);
      Q(a);
      a = P(5);
      a.setUint8(0, 255);
      a.setUint32(1, 154669603, !0);
      Q(a);
      a = P(1 + b.length);
      a.setUint8(0, 80);
      for (var c = 0; c < b.length; ++c) a.setUint8(c + 1, b.charCodeAt(c));
      Q(a);
      kb()
    };
    t.onmessage = Mb;
    t.onclose = Nb;
    t.onerror = function() {
      console.log("socket error")
    }
  }

  function P(a) {
    return new DataView(new ArrayBuffer(a))
  }

  function Q(a) {
    t.send(a.buffer)
  }

  function Nb() {
    ea && (qa = 500);
    console.log("socket close");
    setTimeout(L, qa);
    qa *= 2
  }

  function Mb(a) {
    Ob(new DataView(a.data))
  }

  function Ob(a) {
    function b() {
      for (var b = "";;) {
        var d = a.getUint16(c, !0);
        c += 2;
        if (0 == d) break;
        b += String.fromCharCode(d)
      }
      return b
    }
    var c = 0;
    240 == a.getUint8(c) && (c += 5);
    switch (a.getUint8(c++)) {
      case 16:
        Pb(a, c);
        break;
      case 17:
        fa = a.getFloat32(c, !0);
        c += 4;
        ga = a.getFloat32(c, !0);
        c += 4;
        ha = a.getFloat32(c, !0);
        c += 4;
        break;
      case 20:
        h = [];
        B = [];
        break;
      case 21:
        Ja = a.getInt16(c, !0);
        c += 2;
        Ka = a.getInt16(c, !0);
        c += 2;
        La || (La = !0, ra = Ja, sa = Ka);
        break;
      case 32:
        B.push(a.getUint32(c, !0));
        c += 4;
        break;
      case 49:
        if (null != D) break;
        var p = a.getUint32(c, !0),
          c = c + 4;
        y = [];
        for (var d = 0; d < p; ++d) {
          var e = a.getUint32(c, !0),
            c = c + 4;
          y.push({
            id: e,
            name: b()
          })
        }
        lb();
        break;
      case 50:
        D = [];
        p = a.getUint32(c, !0);
        c += 4;
        for (d = 0; d < p; ++d) D.push(a.getFloat32(c, !0)), c += 4;
        lb();
        break;
      case 64:
        ta = a.getFloat64(c, !0);
        c += 8;
        ua = a.getFloat64(c, !0);
        c += 8;
        va = a.getFloat64(c, !0);
        c += 8;
        wa = a.getFloat64(c, !0);
        c += 8;
        fa = (va + ta) / 2;
        ga = (wa + ua) / 2;
        ha = 1;
        0 == h.length && (v = fa, w = ga, g = ha);
        break;
      case 81:
        var n = a.getUint32(c, !0),
          c = c + 4,
          k = a.getUint32(c, !0),
          c = c + 4,
          f = a.getUint32(c, !0),
          c = c + 4;
        setTimeout(function() {
          V({
            e: n,
            f: k,
            d: f
          })
        }, 1200)
    }
  }

  function Pb(a, b) {
    function c() {
      for (var c = "";;) {
        var d = a.getUint16(b, !0);
        b += 2;
        if (0 ==
          d) break;
        c += String.fromCharCode(d)
      }
      return c
    }

    function p() {
      for (var c = "";;) {
        var d = a.getUint8(b++);
        if (0 == d) break;
        c += String.fromCharCode(d)
      }
      return c
    }
    mb = F = Date.now();
    ea || (ea = !0, Qb());
    Ma = !1;
    var r = a.getUint16(b, !0);
    b += 2;
    for (var q = 0; q < r; ++q) {
      var n = I[a.getUint32(b, !0)],
        k = I[a.getUint32(b + 4, !0)];
      b += 8;
      n && k && (k.X(), k.s = k.x, k.t = k.y, k.r = k.size, k.J = n.x, k.K = n.y, k.q = k.size, k.Q = F, Rb(n, k))
    }
    for (q = 0;;) {
      r = a.getUint32(b, !0);
      b += 4;
      if (0 == r) break;
      ++q;
      var f, n = a.getInt32(b, !0);
      b += 4;
      k = a.getInt32(b, !0);
      b += 4;
      f = a.getInt16(b, !0);
      b +=
        2;
      var l = a.getUint8(b++),
        g = a.getUint8(b++),
        m = a.getUint8(b++),
        g = Sb(l << 16 | g << 8 | m),
        m = a.getUint8(b++),
        s = !!(m & 1),
        t = !!(m & 16),
        nb = null;
      m & 2 && (b += 4 + a.getUint32(b, !0));
      m & 4 && (nb = p());
      var u = c(),
        l = null;
      I.hasOwnProperty(r) ? (l = I[r], l.P(), l.s = l.x, l.t = l.y, l.r = l.size, l.color = g) : (l = new W(r, n, k, f, g, u), x.push(l), I[r] = l, l.ta = n, l.ua = k);
      l.h = s;
      l.n = t;
      l.J = n;
      l.K = k;
      l.q = f;
      l.Q = F;
      l.ba = m;
      l.fa = nb;
      u && l.B(u); - 1 != B.indexOf(r) && -1 == h.indexOf(l) && (h.push(l), 1 == h.length && (v = l.x, w = l.y, ob(), document.getElementById("overlays").style.display =
        "none", z = [], Na = 0, Oa = h[0].color, Pa = !0, pb = Date.now(), R = Qa = Ra = 0))
    }
    n = a.getUint32(b, !0);
    b += 4;
    for (q = 0; q < n; q++) r = a.getUint32(b, !0), b += 4, l = I[r], null != l && l.X();
    Ma && 0 == h.length && (qb = Date.now(), Pa = !1, ba || S || (rb ? (hb(d.ab), Tb(), S = !0, e("#overlays").fadeIn(3E3), e("#stats").show()) : la(3E3)))
  }

  function Qb() {
    e("#connecting").hide();
    sb();
    N && (N(), N = null);
    null != Sa && clearTimeout(Sa);
    Sa = setTimeout(function() {
      d.ga && (++tb, d.ga("set", "dimension2", tb))
    }, 1E4)
  }

  function X() {
    return null != t && t.readyState == t.OPEN
  }

  function K(a) {
    if (X()) {
      var b = P(1);
      b.setUint8(0, a);
      Q(b)
    }
  }

  function kb() {
    if (X() && null != E) {
      var a = P(1 + E.length);
      a.setUint8(0, 81);
      for (var b = 0; b < E.length; ++b) a.setUint8(b + 1,
        E.charCodeAt(b));
      Q(a)
    }
  }

  function bb() {
    m = 1 * d.innerWidth;
    s = 1 * d.innerHeight;
    Da.width = J.width = m;
    Da.height = J.height = s;
    var a = e("#helloContainer");
    a.css("transform", "none");
    var b = a.height(),
      c = d.innerHeight;
    b > c / 1.1 ? a.css("transform", "translate(-50%, -50%) scale(" + c / b / 1.1 + ")") : a.css("transform", "translate(-50%, -50%)");
    wb()
  }

  function xb() {
    var a;
    a = 1 * Math.max(s / 1080, m / 1920);
    return a *= M
  }

  function Ub() {
    if (0 != h.length) {
      for (var a = 0, b = 0; b < h.length; b++) a += h[b].size;
      a = Math.pow(Math.min(64 / a, 1), .4) * xb();
      g = (9 * g + a) / 10
    }
  }

  function Wb() {
    f.fillStyle = xa ? "#111111" : "#F2FBFF";
    f.fillRect(0, 0, m, s);
    f.save();
    f.strokeStyle = xa ? "#AAAAAA" : "#000000";
    f.globalAlpha = .2 * g;
    for (var a = m / g, b = s / g, c = (-v + a / 2) % 50; c < a; c += 50) f.beginPath(),
      f.moveTo(c * g - .5, 0), f.lineTo(c * g - .5, b * g), f.stroke();
    for (c = (-w + b / 2) % 50; c < b; c += 50) f.beginPath(), f.moveTo(0, c * g - .5), f.lineTo(a * g, c * g - .5), f.stroke();
    f.restore()
  }

  function Xb() {
    if ($a && Ua.width) {
      var a = m / 5;
      f.drawImage(Ua, 5, 5, a, a)
    }
  }

  function yb() {
    for (var a = 0, b = 0; b < h.length; b++) a += h[b].q * h[b].q;
    return a
  }

  function lb() {
    C = null;
    if (null != D || 0 != y.length)
      if (null != D || Aa) {
        C = document.createElement("canvas");
        var a = C.getContext("2d"),
          b = 60,
          b = null == D ? b + 24 * y.length : b + 180,
          c = Math.min(200, .3 * m) / 200;
        C.width = 200 * c;
        C.height = b * c;
        a.scale(c, c);
        a.globalAlpha = .4;
        a.fillStyle = "#000000";
        a.fillRect(0, 0, 200, b);
        a.globalAlpha = 1;
        a.fillStyle = "#FFFFFF";
        c = null;
        c = da("leaderboard");
        a.font = "30px Ubuntu";
        a.fillText(c, 100 - a.measureText(c).width / 2, 40);
        if (null == D)
          for (a.font = "20px Ubuntu", b = 0; b < y.length; ++b) c = y[b].name || da("unnamed_cell"), Aa || (c = da("unnamed_cell")), -1 != B.indexOf(y[b].id) ? (h[0].name && (c = h[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b);
        else
          for (b = c = 0; b < D.length; ++b) {
            var d =
              c + D[b] * Math.PI * 2;
            a.fillStyle = Yb[b + 1];
            a.beginPath();
            a.moveTo(100, 140);
            a.arc(100, 140, 80, c, d, !1);
            a.fill();
            c = d
          }
      }
  }

  function Va(a, b, c, d, e) {
    this.V = a;
    this.x = b;
    this.y = c;
    this.i = d;
    this.b = e
  }

  function W(a, b, c, d, e, q) {
    this.id = a;
    this.s = this.x = b;
    this.t = this.y = c;
    this.r = this.size = d;
    this.color = e;
    this.a = [];
    this.W();
    this.B(q)
  }

  function Sb(a) {
    for (a = a.toString(16); 6 > a.length;) a = "0" + a;
    return "#" + a
  }

  function za(a, b, c, d) {
    a && (this.u = a);
    b && (this.S = b);
    this.U = !!c;
    d && (this.v = d)
  }

  function Zb(a) {
    for (var b = a.length, c, d; 0 < b;) d = Math.floor(Math.random() *
      b), b--, c = a[b], a[b] = a[d], a[d] = c
  }

  function V(a, b) {
    var c = "1" == e("#helloContainer").attr("data-has-account-data");
    e("#helloContainer").attr("data-has-account-data", "1");
    if (null == b && d.localStorage.loginCache) {
      var p = JSON.parse(d.localStorage.loginCache);
      p.f = a.f;
      p.d = a.d;
      p.e = a.e;
      d.localStorage.loginCache = JSON.stringify(p)
    }
    if (c) {
      var r = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[0],
        c = +e(".agario-exp-bar .progress-bar-text").first().text().split("/")[1].split(" ")[0],
        p = e(".agario-profile-panel .progress-bar-star").first().text();
      if (p != a.e) V({
        f: c,
        d: c,
        e: p
      }, function() {
        e(".agario-profile-panel .progress-bar-star").text(a.e);
        e(".agario-exp-bar .progress-bar").css("width", "100%");
        e(".progress-bar-star").addClass("animated tada").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
          e(".progress-bar-star").removeClass("animated tada")
        });
        setTimeout(function() {
          e(".agario-exp-bar .progress-bar-text").text(a.d + "/" + a.d + " XP");
          V({
            f: 0,
            d: a.d,
            e: a.e
          }, function() {
            V(a, b)
          })
        }, 1E3)
      });
      else {
        var q = Date.now(),
          n = function() {
            var c;
            c = (Date.now() - q) / 1E3;
            c = 0 > c ? 0 : 1 < c ? 1 : c;
            c = c * c * (3 - 2 * c);
            e(".agario-exp-bar .progress-bar-text").text(~~(r + (a.f - r) * c) + "/" + a.d + " XP");
            e(".agario-exp-bar .progress-bar").css("width", (88 * (r + (a.f - r) * c) / a.d).toFixed(2) + "%");
            1 > c ? d.requestAnimationFrame(n) : b && b()
          };
        d.requestAnimationFrame(n)
      }
    } else e(".agario-profile-panel .progress-bar-star").text(a.e), e(".agario-exp-bar .progress-bar-text").text(a.f + "/" + a.d + " XP"), e(".agario-exp-bar .progress-bar").css("width", (88 * a.f / a.d).toFixed(2) + "%"), b &&
      b()
  }

  function Ab(a) {
    "string" == typeof a && (a = JSON.parse(a));
    Date.now() + 18E5 > a.ka ? e("#helloContainer").attr("data-logged-in", "0") : (d.localStorage.loginCache = JSON.stringify(a), E = a.ha, e(".agario-profile-name").text(a.name), kb(), V({
      f: a.f,
      d: a.d,
      e: a.e
    }), e("#helloContainer").attr("data-logged-in", "1"))
  }

  function $b(a) {
    a = a.split("\n");
    Ab({
      name: a[0],
      sa: a[1],
      ha: a[2],
      ka: 1E3 * +a[3],
      e: +a[4],
      f: +a[5],
      d: +a[6]
    })
  }

  function Wa(a) {
    if ("connected" == a.status) {
      var b = a.authResponse.accessToken;
      console.log(b);
      d.FB.api("/me/picture?width=180&height=180",
        function(a) {
          d.localStorage.fbPictureCache = a.data.url;
          e(".agario-profile-picture").attr("src", a.data.url)
        });
      e("#helloContainer").attr("data-logged-in", "1");
      null != E ? e.ajax("http://m.agar.io/checkToken", {
        error: function() {
          E = null;
          Wa(a)
        },
        success: function(a) {
          a = a.split("\n");
          V({
            e: +a[0],
            f: +a[1],
            d: +a[2]
          })
        },
        dataType: "text",
        method: "POST",
        cache: !1,
        crossDomain: !0,
        data: E
      }) : e.ajax("http://m.agar.io/facebookLogin", {
        error: function() {
          E = null;
          e("#helloContainer").attr("data-logged-in", "0")
        },
        success: $b,
        dataType: "text",
        method: "POST",
        cache: !1,
        crossDomain: !0,
        data: b
      })
    }
  }

  function eb(a) {
    ca(":party");
    e("#helloContainer").attr("data-party-state", "4");
    a = decodeURIComponent(a).replace(/.*#/gim, "");
    Xa("#" + d.encodeURIComponent(a));
    e.ajax("http://m.agar.io/getToken", {
      error: function() {
        e("#helloContainer").attr("data-party-state", "6")
      },
      success: function(b) {
        b = b.split("\n");
        e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
        e("#helloContainer").attr("data-party-state", "5");
        ca(":party");
        Ha("ws://" + b[0], a)
      },
      dataType: "text",
      method: "POST",
      cache: !1,
      crossDomain: !0,
      data: a
    })
  }

  function Xa(a) {
    d.history && d.history.replaceState && d.history.replaceState({}, d.document.title, a)
  }

  function Rb(a, b) {
    var c = -1 != B.indexOf(a.id),
      d = -1 != B.indexOf(b.id),
      e = 30 > b.size;
    c && e && ++Na;
    e || !c || d || ++Qa
  }

  function Bb(a) {
    a = ~~a;
    var b = (a % 60).toString();
    a = (~~(a / 60)).toString();
    2 > b.length && (b = "0" + b);
    return a + ":" + b
  }

  function ac() {
    if (null == y) return 0;
    for (var a = 0; a < y.length; ++a)
      if (-1 != B.indexOf(y[a].id)) return a + 1;
    return 0
  }

  function Tb() {
    e(".stats-food-eaten").text(Na);
    e(".stats-time-alive").text(Bb((qb -
      pb) / 1E3));
    e(".stats-leaderboard-time").text(Bb(Ra));
    e(".stats-highest-mass").text(~~(O / 100));
    e(".stats-cells-eaten").text(Qa);
    e(".stats-top-position").text(0 == R ? ":(" : R);
    var a = document.getElementById("statsGraph");
    if (a) {
      var b = a.getContext("2d"),
        c = a.width,
        a = a.height;
      b.clearRect(0, 0, c, a);
      if (2 < z.length) {
        for (var d = 200, r = 0; r < z.length; r++) d = Math.max(z[r], d);
        b.lineWidth = 3;
        b.lineCap = "round";
        b.lineJoin = "round";
        b.strokeStyle = Oa;
        b.fillStyle = Oa;
        b.beginPath();
        b.moveTo(0, a - z[0] / d * (a - 10) + 10);
        for (r = 1; r < z.length; r +=
          Math.max(~~(z.length / c), 1)) {
          for (var q = r / (z.length - 1) * c, n = [], k = -20; 20 >= k; ++k) 0 > r + k || r + k >= z.length || n.push(z[r + k]);
          n = n.reduce(function(a, b) {
            return a + b
          }) / n.length / d;
          b.lineTo(q, a - n * (a - 10) + 10)
        }
        b.stroke();
        b.globalAlpha = .5;
        b.lineTo(c, a);
        b.lineTo(0, a);
        b.fill();
        b.globalAlpha = 1
      }
    }
  }
  if (!d.agarioNoInit) {
    var Cb = d.location.protocol,
      jb = "https:" == Cb;
    if (jb && -1 == d.location.search.indexOf("fb")) d.location.href = "http://agar.io/";
    else {
      var Ba = d.navigator.userAgent;
      if (-1 != Ba.indexOf("Android")) d.ga && d.ga("send", "event", "MobileRedirect",
        "PlayStore"), setTimeout(function() {
        d.location.href = "https://play.google.com/store/apps/details?id=com.miniclip.agar.io"
      }, 1E3);
      else if (-1 != Ba.indexOf("iPhone") || -1 != Ba.indexOf("iPad") || -1 != Ba.indexOf("iPod")) d.ga && d.ga("send", "event", "MobileRedirect", "AppStore"), setTimeout(function() {
        d.location.href = "https://itunes.apple.com/app/agar.io/id995999703?mt=8&at=1l3vajp"
      }, 1E3);
      else {
        var Da, f, J, m, s, aa = null,
          t = null,
          v = 0,
          w = 0,
          B = [],
          h = [],
          I = {},
          x = [],
          U = [],
          y = [],
          ja = 0,
          ka = 0,
          na = -1,
          oa = -1,
          Vb = 0,
          F = 0,
          zb = 0,
          H = null,
          ta = 0,
          ua = 0,
          va =
          1E4,
          wa = 1E4,
          g = 1,
          A = null,
          Db = !0,
          Aa = !0,
          Ya = !1,
          Ma = !1,
          O = 0,
          xa = !1,
          Eb = !1,
          fa = v = ~~((ta + va) / 2),
          ga = w = ~~((ua + wa) / 2),
          ha = 1,
          T = "",
          D = null,
          Ca = !1,
          La = !1,
          Ja = 0,
          Ka = 0,
          ra = 0,
          sa = 0,
          Fb = 0,
          Yb = ["#333333", "#FF3333", "#33FF33", "#3333FF"],
          Ta = !1,
          ea = !1,
          mb = 0,
          E = null,
          M = 1,
          u = 1,
          ba = !1,
          Fa = 0,
          Ia = {};
        (function() {
          var a = d.location.search;
          "?" == a.charAt(0) && (a = a.slice(1));
          for (var a = a.split("&"), b = 0; b < a.length; b++) {
            var c = a[b].split("=");
            Ia[c[0]] = c[1]
          }
        })();
        var $a = "ontouchstart" in d && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(d.navigator.userAgent),
          Ua = new Image;
        Ua.src = "img/split.png";
        var Gb = document.createElement("canvas");
        if ("undefined" == typeof console || "undefined" == typeof DataView || "undefined" == typeof WebSocket || null == Gb || null == Gb.getContext || null == d.localStorage) alert("You browser does not support this game, we recommend you to use Firefox to play this");
        else {
          var pa = null;
          d.setNick = function(a) {
            d.ga && d.ga("send", "event", "Nick", a.toLowerCase());
            fb();
            H = a;
            sb();
            O = 0
          };
          d.setRegion = ma;
          d.setSkins = function(a) {
            Db = a
          };
          d.setNames = function(a) {
            Aa = a
          };
          d.setDarkTheme =
            function(a) {
              xa = a
            };
          d.setColors = function(a) {
            Ya = a
          };
          d.setShowMass = function(a) {
            Eb = a
          };
          d.spectate = function() {
            H = null;
            K(1);
            fb()
          };
          d.setGameMode = function(a) {
            a != T && (":party" == T && e("#helloContainer").attr("data-party-state", "0"), ca(a), ":party" != a && L())
          };
          d.setAcid = function(a) {
            Ta = a
          };
          null != d.localStorage && (null == d.localStorage.AB9 && (d.localStorage.AB9 = 0 + ~~(100 * Math.random())), Fb = +d.localStorage.AB9, d.ABGroup = Fb);
          e.get(Cb + "//gc.agar.io", function(a) {
            var b = a.split(" ");
            a = b[0];
            b = b[1] || ""; - 1 == ["UA"].indexOf(a) && Hb.push("ussr");
            ia.hasOwnProperty(a) && ("string" == typeof ia[a] ? A || ma(ia[a]) : ia[a].hasOwnProperty(b) && (A || ma(ia[a][b])))
          }, "text");
          var Ga = !0,
            Lb = 0,
            ia = {
              AF: "JP-Tokyo",
              AX: "EU-London",
              AL: "EU-London",
              DZ: "EU-London",
              AS: "SG-Singapore",
              AD: "EU-London",
              AO: "EU-London",
              AI: "US-Atlanta",
              AG: "US-Atlanta",
              AR: "BR-Brazil",
              AM: "JP-Tokyo",
              AW: "US-Atlanta",
              AU: "SG-Singapore",
              AT: "EU-London",
              AZ: "JP-Tokyo",
              BS: "US-Atlanta",
              BH: "JP-Tokyo",
              BD: "JP-Tokyo",
              BB: "US-Atlanta",
              BY: "EU-London",
              BE: "EU-London",
              BZ: "US-Atlanta",
              BJ: "EU-London",
              BM: "US-Atlanta",
              BT: "JP-Tokyo",
              BO: "BR-Brazil",
              BQ: "US-Atlanta",
              BA: "EU-London",
              BW: "EU-London",
              BR: "BR-Brazil",
              IO: "JP-Tokyo",
              VG: "US-Atlanta",
              BN: "JP-Tokyo",
              BG: "EU-London",
              BF: "EU-London",
              BI: "EU-London",
              KH: "JP-Tokyo",
              CM: "EU-London",
              CA: "US-Atlanta",
              CV: "EU-London",
              KY: "US-Atlanta",
              CF: "EU-London",
              TD: "EU-London",
              CL: "BR-Brazil",
              CN: "CN-China",
              CX: "JP-Tokyo",
              CC: "JP-Tokyo",
              CO: "BR-Brazil",
              KM: "EU-London",
              CD: "EU-London",
              CG: "EU-London",
              CK: "SG-Singapore",
              CR: "US-Atlanta",
              CI: "EU-London",
              HR: "EU-London",
              CU: "US-Atlanta",
              CW: "US-Atlanta",
              CY: "JP-Tokyo",
              CZ: "EU-London",
              DK: "EU-London",
              DJ: "EU-London",
              DM: "US-Atlanta",
              DO: "US-Atlanta",
              EC: "BR-Brazil",
              EG: "EU-London",
              SV: "US-Atlanta",
              GQ: "EU-London",
              ER: "EU-London",
              EE: "EU-London",
              ET: "EU-London",
              FO: "EU-London",
              FK: "BR-Brazil",
              FJ: "SG-Singapore",
              FI: "EU-London",
              FR: "EU-London",
              GF: "BR-Brazil",
              PF: "SG-Singapore",
              GA: "EU-London",
              GM: "EU-London",
              GE: "JP-Tokyo",
              DE: "EU-London",
              GH: "EU-London",
              GI: "EU-London",
              GR: "EU-London",
              GL: "US-Atlanta",
              GD: "US-Atlanta",
              GP: "US-Atlanta",
              GU: "SG-Singapore",
              GT: "US-Atlanta",
              GG: "EU-London",
              GN: "EU-London",
              GW: "EU-London",
              GY: "BR-Brazil",
              HT: "US-Atlanta",
              VA: "EU-London",
              HN: "US-Atlanta",
              HK: "JP-Tokyo",
              HU: "EU-London",
              IS: "EU-London",
              IN: "JP-Tokyo",
              ID: "JP-Tokyo",
              IR: "JP-Tokyo",
              IQ: "JP-Tokyo",
              IE: "EU-London",
              IM: "EU-London",
              IL: "JP-Tokyo",
              IT: "EU-London",
              JM: "US-Atlanta",
              JP: "JP-Tokyo",
              JE: "EU-London",
              JO: "JP-Tokyo",
              KZ: "JP-Tokyo",
              KE: "EU-London",
              KI: "SG-Singapore",
              KP: "JP-Tokyo",
              KR: "JP-Tokyo",
              KW: "JP-Tokyo",
              KG: "JP-Tokyo",
              LA: "JP-Tokyo",
              LV: "EU-London",
              LB: "JP-Tokyo",
              LS: "EU-London",
              LR: "EU-London",
              LY: "EU-London",
              LI: "EU-London",
              LT: "EU-London",
              LU: "EU-London",
              MO: "JP-Tokyo",
              MK: "EU-London",
              MG: "EU-London",
              MW: "EU-London",
              MY: "JP-Tokyo",
              MV: "JP-Tokyo",
              ML: "EU-London",
              MT: "EU-London",
              MH: "SG-Singapore",
              MQ: "US-Atlanta",
              MR: "EU-London",
              MU: "EU-London",
              YT: "EU-London",
              MX: "US-Atlanta",
              FM: "SG-Singapore",
              MD: "EU-London",
              MC: "EU-London",
              MN: "JP-Tokyo",
              ME: "EU-London",
              MS: "US-Atlanta",
              MA: "EU-London",
              MZ: "EU-London",
              MM: "JP-Tokyo",
              NA: "EU-London",
              NR: "SG-Singapore",
              NP: "JP-Tokyo",
              NL: "EU-London",
              NC: "SG-Singapore",
              NZ: "SG-Singapore",
              NI: "US-Atlanta",
              NE: "EU-London",
              NG: "EU-London",
              NU: "SG-Singapore",
              NF: "SG-Singapore",
              MP: "SG-Singapore",
              NO: "EU-London",
              OM: "JP-Tokyo",
              PK: "JP-Tokyo",
              PW: "SG-Singapore",
              PS: "JP-Tokyo",
              PA: "US-Atlanta",
              PG: "SG-Singapore",
              PY: "BR-Brazil",
              PE: "BR-Brazil",
              PH: "JP-Tokyo",
              PN: "SG-Singapore",
              PL: "EU-London",
              PT: "EU-London",
              PR: "US-Atlanta",
              QA: "JP-Tokyo",
              RE: "EU-London",
              RO: "EU-London",
              RU: "RU-Russia",
              RW: "EU-London",
              BL: "US-Atlanta",
              SH: "EU-London",
              KN: "US-Atlanta",
              LC: "US-Atlanta",
              MF: "US-Atlanta",
              PM: "US-Atlanta",
              VC: "US-Atlanta",
              WS: "SG-Singapore",
              SM: "EU-London",
              ST: "EU-London",
              SA: "EU-London",
              SN: "EU-London",
              RS: "EU-London",
              SC: "EU-London",
              SL: "EU-London",
              SG: "JP-Tokyo",
              SX: "US-Atlanta",
              SK: "EU-London",
              SI: "EU-London",
              SB: "SG-Singapore",
              SO: "EU-London",
              ZA: "EU-London",
              SS: "EU-London",
              ES: "EU-London",
              LK: "JP-Tokyo",
              SD: "EU-London",
              SR: "BR-Brazil",
              SJ: "EU-London",
              SZ: "EU-London",
              SE: "EU-London",
              CH: "EU-London",
              SY: "EU-London",
              TW: "JP-Tokyo",
              TJ: "JP-Tokyo",
              TZ: "EU-London",
              TH: "JP-Tokyo",
              TL: "JP-Tokyo",
              TG: "EU-London",
              TK: "SG-Singapore",
              TO: "SG-Singapore",
              TT: "US-Atlanta",
              TN: "EU-London",
              TR: "TK-Turkey",
              TM: "JP-Tokyo",
              TC: "US-Atlanta",
              TV: "SG-Singapore",
              UG: "EU-London",
              UA: "EU-London",
              AE: "EU-London",
              GB: "EU-London",
              US: "US-Atlanta",
              UM: "SG-Singapore",
              VI: "US-Atlanta",
              UY: "BR-Brazil",
              UZ: "JP-Tokyo",
              VU: "SG-Singapore",
              VE: "BR-Brazil",
              VN: "JP-Tokyo",
              WF: "SG-Singapore",
              EH: "EU-London",
              YE: "JP-Tokyo",
              ZM: "EU-London",
              ZW: "EU-London"
            },
            N = null;
          d.connect = Ha;
          var qa = 500,
            Sa = null,
            tb = 0,
            ub = -1,
            vb = -1,
            C = null,
            G = 1,
            ya = null,
            cb = function() {
              var a = Date.now(),
                b = 1E3 / 60;
              return function() {
                d.requestAnimationFrame(cb);
                var c = Date.now(),
                  e = c - a;
                e > b && (a = c - e % b, !X() ||
                  240 > Date.now() - mb ? wb() : console.warn("Skipping draw"), bc())
              }
            }(),
            Y = {},
            Hb = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;chaplin;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;doge;nasa;byzantium;imperial japan;french kingdom;somalia;turkey;mars;pokerface;8;irs;receita federal;facebook;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;venezuela;blatter;chavez;cuba;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
            cc = "8;nasa;putin;merkel;tsipras;obama;kim jong-un;dilma;hollande;berlusconi;cameron;clinton;hillary;blatter;chavez;fidel;merkel;palin;queen;boris;bush;trump".split(";"),
            Z = {};
          Va.prototype = {
            V: null,
            x: 0,
            y: 0,
            i: 0,
            b: 0
          };
          W.prototype = {
            id: 0,
            a: null,
            name: null,
            o: null,
            O: null,
            x: 0,
            y: 0,
            size: 0,
            s: 0,
            t: 0,
            r: 0,
            J: 0,
            K: 0,
            q: 0,
            ba: 0,
            Q: 0,
            ja: 0,
            G: !1,
            h: !1,
            n: !1,
            R: !0,
            Y: 0,
            fa: null,
            X: function() {
              var a;
              for (a = 0; a < x.length; a++)
                if (x[a] == this) {
                  x.splice(a, 1);
                  break
                }
              delete I[this.id];
              a = h.indexOf(this); - 1 != a && (Ma = !0, h.splice(a, 1));
              a = B.indexOf(this.id); - 1 != a && B.splice(a, 1);
              this.G = !0;
              0 < this.Y && U.push(this)
            },
            l: function() {
              return Math.max(~~(.3 * this.size), 24)
            },
            B: function(a) {
              if (this.name = a) null == this.o ? this.o = new za(this.l(), "#FFFFFF", !0, "#000000") : this.o.M(this.l()), this.o.C(this.name)
            },
            W: function() {
              for (var a = this.I(); this.a.length > a;) {
                var b = ~~(Math.random() * this.a.length);
                this.a.splice(b, 1)
              }
              for (0 == this.a.length && 0 < a && this.a.push(new Va(this, this.x, this.y, this.size, Math.random() - .5)); this.a.length < a;) b = ~~(Math.random() * this.a.length), b = this.a[b], this.a.push(new Va(this,
                b.x, b.y, b.i, b.b))
            },
            I: function() {
              var a = 10;
              20 > this.size && (a = 0);
              this.h && (a = 30);
              var b = this.size;
              this.h || (b *= g);
              b *= G;
              this.ba & 32 && (b *= .25);
              return ~~Math.max(b, a)
            },
            qa: function() {
              this.W();
              for (var a = this.a, b = a.length, c = 0; c < b; ++c) {
                var d = a[(c - 1 + b) % b].b,
                  e = a[(c + 1) % b].b;
                a[c].b += (Math.random() - .5) * (this.n ? 3 : 1);
                a[c].b *= .7;
                10 < a[c].b && (a[c].b = 10); - 10 > a[c].b && (a[c].b = -10);
                a[c].b = (d + e + 8 * a[c].b) / 10
              }
              for (var q = this, n = this.h ? 0 : (this.id / 1E3 + F / 1E4) % (2 * Math.PI), c = 0; c < b; ++c) {
                var k = a[c].i,
                  d = a[(c - 1 + b) % b].i,
                  e = a[(c + 1) % b].i;
                if (15 <
                  this.size && null != aa && 20 < this.size * g && 0 < this.id) {
                  var f = !1,
                    l = a[c].x,
                    h = a[c].y;
                  aa.ra(l - 5, h - 5, 10, 10, function(a) {
                    a.V != q && 25 > (l - a.x) * (l - a.x) + (h - a.y) * (h - a.y) && (f = !0)
                  });
                  !f && (a[c].x < ta || a[c].y < ua || a[c].x > va || a[c].y > wa) && (f = !0);
                  f && (0 < a[c].b && (a[c].b = 0), a[c].b -= 1)
                }
                k += a[c].b;
                0 > k && (k = 0);
                k = this.n ? (19 * k + this.size) / 20 : (12 * k + this.size) / 13;
                a[c].i = (d + e + 8 * k) / 10;
                d = 2 * Math.PI / b;
                e = this.a[c].i;
                this.h && 0 == c % 2 && (e += 5);
                a[c].x = this.x + Math.cos(d * c + n) * e;
                a[c].y = this.y + Math.sin(d * c + n) * e
              }
            },
            P: function() {
              if (0 >= this.id) return 1;
              var a;
              a = (F - this.Q) / 120;
              a = 0 > a ? 0 : 1 < a ? 1 : a;
              var b = 0 > a ? 0 : 1 < a ? 1 : a;
              this.l();
              if (this.G && 1 <= b) {
                var c = U.indexOf(this); - 1 != c && U.splice(c, 1)
              }
              this.x = a * (this.J - this.s) + this.s;
              this.y = a * (this.K - this.t) + this.t;
              this.size = b * (this.q - this.r) + this.r;
              return b
            },
            N: function() {
              return 0 >= this.id ? !0 : this.x + this.size + 40 < v - m / 2 / g || this.y + this.size + 40 < w - s / 2 / g || this.x - this.size - 40 > v + m / 2 / g || this.y - this.size - 40 > w + s / 2 / g ? !1 : !0
            },
            w: function(a) {
              if (this.N()) {
                ++this.Y;
                var b = 0 < this.id && !this.h && !this.n && .4 > g;
                5 > this.I() && 0 < this.id && (b = !0);
                if (this.R &&
                  !b)
                  for (var c = 0; c < this.a.length; c++) this.a[c].i = this.size;
                this.R = b;
                a.save();
                this.ja = F;
                c = this.P();
                this.G && (a.globalAlpha *= 1 - c);
                a.lineWidth = 10;
                a.lineCap = "round";
                a.lineJoin = this.h ? "miter" : "round";
                Ya ? (a.fillStyle = "#FFFFFF", a.strokeStyle = "#AAAAAA") : (a.fillStyle = this.color, a.strokeStyle = this.color);
                if (b) a.beginPath(), a.arc(this.x, this.y, this.size + 5, 0, 2 * Math.PI, !1);
                else {
                  this.qa();
                  a.beginPath();
                  var d = this.I();
                  a.moveTo(this.a[0].x, this.a[0].y);
                  for (c = 1; c <= d; ++c) {
                    var e = c % d;
                    a.lineTo(this.a[e].x, this.a[e].y)
                  }
                }
                a.closePath();
                c = this.name.toLowerCase();
                !this.n && Db && ":teams" != T ? (d = this.fa, null == d ? d = null : ":" == d[0] ? (Z.hasOwnProperty(d) || (Z[d] = new Image, Z[d].src = d.slice(1)), d = 0 != Z[d].width && Z[d].complete ? Z[d] : null) : d = null, d || (-1 != Hb.indexOf(c) ? (Y.hasOwnProperty(c) || (Y[c] = new Image, Y[c].src = "skins/" + c + ".png"), d = 0 != Y[c].width && Y[c].complete ? Y[c] : null) : d = null)) : d = null;
                e = d;
                b || a.stroke();
                a.fill();
                null != e && (a.save(), a.clip(), a.drawImage(e, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), a.restore());
                (Ya || 15 < this.size) &&
                !b && (a.strokeStyle = "#000000", a.globalAlpha *= .1, a.stroke());
                a.globalAlpha = 1;
                d = -1 != h.indexOf(this);
                b = ~~this.y;
                if (0 != this.id && (Aa || d) && this.name && this.o && (null == e || -1 == cc.indexOf(c))) {
                  e = this.o;
                  e.C(this.name);
                  e.M(this.l());
                  c = 0 >= this.id ? 1 : Math.ceil(10 * g) / 10;
                  e.ea(c);
                  var e = e.L(),
                    q = ~~(e.width / c),
                    n = ~~(e.height / c);
                  a.drawImage(e, ~~this.x - ~~(q / 2), b - ~~(n / 2), q, n);
                  b += e.height / 2 / c + 4
                }
                0 < this.id && Eb && (d || 0 == h.length && (!this.h || this.n) && 20 < this.size) && (null == this.O && (this.O = new za(this.l() / 2, "#FFFFFF", !0, "#000000")),
                  d = this.O, d.M(this.l() / 2), d.C(~~(this.size * this.size / 100)), c = Math.ceil(10 * g) / 10, d.ea(c), e = d.L(), q = ~~(e.width / c), n = ~~(e.height / c), a.drawImage(e, ~~this.x - ~~(q / 2), b - ~~(n / 2), q, n));
                a.restore()
              }
            }
          };
          za.prototype = {
            F: "",
            S: "#000000",
            U: !1,
            v: "#000000",
            u: 16,
            p: null,
            T: null,
            k: !1,
            D: 1,
            M: function(a) {
              this.u != a && (this.u = a, this.k = !0)
            },
            ea: function(a) {
              this.D != a && (this.D = a, this.k = !0)
            },
            setStrokeColor: function(a) {
              this.v != a && (this.v = a, this.k = !0)
            },
            C: function(a) {
              a != this.F && (this.F = a, this.k = !0)
            },
            L: function() {
              null == this.p && (this.p =
                document.createElement("canvas"), this.T = this.p.getContext("2d"));
              if (this.k) {
                this.k = !1;
                var a = this.p,
                  b = this.T,
                  c = this.F,
                  d = this.D,
                  e = this.u,
                  q = e + "px Ubuntu";
                b.font = q;
                var n = ~~(.2 * e);
                a.width = (b.measureText(c).width + 6) * d;
                a.height = (e + n) * d;
                b.font = q;
                b.scale(d, d);
                b.globalAlpha = 1;
                b.lineWidth = 3;
                b.strokeStyle = this.v;
                b.fillStyle = this.S;
                this.U && b.strokeText(c, 3, e - n / 2);
                b.fillText(c, 3, e - n / 2)
              }
              return this.p
            }
          };
          Date.now || (Date.now = function() {
            return (new Date).getTime()
          });
          (function() {
            for (var a = ["ms", "moz", "webkit", "o"], b =
                0; b < a.length && !d.requestAnimationFrame; ++b) d.requestAnimationFrame = d[a[b] + "RequestAnimationFrame"], d.cancelAnimationFrame = d[a[b] + "CancelAnimationFrame"] || d[a[b] + "CancelRequestAnimationFrame"];
            d.requestAnimationFrame || (d.requestAnimationFrame = function(a) {
              return setTimeout(a, 1E3 / 60)
            }, d.cancelAnimationFrame = function(a) {
              clearTimeout(a)
            })
          })();
          var Kb = {
              la: function(a) {
                function b(a, b, c, d, e) {
                  this.x = a;
                  this.y = b;
                  this.j = c;
                  this.g = d;
                  this.depth = e;
                  this.items = [];
                  this.c = []
                }
                var c = a.ma || 2,
                  d = a.na || 4;
                b.prototype = {
                  x: 0,
                  y: 0,
                  j: 0,
                  g: 0,
                  depth: 0,
                  items: null,
                  c: null,
                  H: function(a) {
                    for (var b = 0; b < this.items.length; ++b) {
                      var c = this.items[b];
                      if (c.x >= a.x && c.y >= a.y && c.x < a.x + a.j && c.y < a.y + a.g) return !0
                    }
                    if (0 != this.c.length) {
                      var d = this;
                      return this.$(a, function(b) {
                        return d.c[b].H(a)
                      })
                    }
                    return !1
                  },
                  A: function(a, b) {
                    for (var c = 0; c < this.items.length; ++c) b(this.items[c]);
                    if (0 != this.c.length) {
                      var d = this;
                      this.$(a, function(c) {
                        d.c[c].A(a, b)
                      })
                    }
                  },
                  m: function(a) {
                    0 != this.c.length ? this.c[this.Z(a)].m(a) : this.items.length >= c && this.depth < d ? (this.ia(), this.c[this.Z(a)].m(a)) :
                      this.items.push(a)
                  },
                  Z: function(a) {
                    return a.x < this.x + this.j / 2 ? a.y < this.y + this.g / 2 ? 0 : 2 : a.y < this.y + this.g / 2 ? 1 : 3
                  },
                  $: function(a, b) {
                    return a.x < this.x + this.j / 2 && (a.y < this.y + this.g / 2 && b(0) || a.y >= this.y + this.g / 2 && b(2)) || a.x >= this.x + this.j / 2 && (a.y < this.y + this.g / 2 && b(1) || a.y >= this.y + this.g / 2 && b(3)) ? !0 : !1
                  },
                  ia: function() {
                    var a = this.depth + 1,
                      c = this.j / 2,
                      d = this.g / 2;
                    this.c.push(new b(this.x, this.y, c, d, a));
                    this.c.push(new b(this.x + c, this.y, c, d, a));
                    this.c.push(new b(this.x, this.y + d, c, d, a));
                    this.c.push(new b(this.x + c,
                      this.y + d, c, d, a));
                    a = this.items;
                    this.items = [];
                    for (c = 0; c < a.length; c++) this.m(a[c])
                  },
                  clear: function() {
                    for (var a = 0; a < this.c.length; a++) this.c[a].clear();
                    this.items.length = 0;
                    this.c.length = 0
                  }
                };
                var e = {
                  x: 0,
                  y: 0,
                  j: 0,
                  g: 0
                };
                return {
                  root: new b(a.ca, a.da, a.oa - a.ca, a.pa - a.da, 0),
                  m: function(a) {
                    this.root.m(a)
                  },
                  A: function(a, b) {
                    this.root.A(a, b)
                  },
                  ra: function(a, b, c, d, f) {
                    e.x = a;
                    e.y = b;
                    e.j = c;
                    e.g = d;
                    this.root.A(e, f)
                  },
                  H: function(a) {
                    return this.root.H(a)
                  },
                  clear: function() {
                    this.root.clear()
                  }
                }
              }
            },
            ob = function() {
              var a = new W(0, 0, 0, 32,
                  "#ED1C24", ""),
                b = document.createElement("canvas");
              b.width = 32;
              b.height = 32;
              var c = b.getContext("2d");
              return function() {
                0 < h.length && (a.color = h[0].color, a.B(h[0].name));
                c.clearRect(0, 0, 32, 32);
                c.save();
                c.translate(16, 16);
                c.scale(.4, .4);
                a.w(c);
                c.restore();
                var d = document.getElementById("favicon"),
                  e = d.cloneNode(!0);
                e.setAttribute("href", b.toDataURL("image/png"));
                d.parentNode.replaceChild(e, d)
              }
            }();
          e(function() {
            ob()
          });
          e(function() {
            +d.localStorage.wannaLogin && (d.localStorage.loginCache && Ab(d.localStorage.loginCache),
              d.localStorage.fbPictureCache && e(".agario-profile-picture").attr("src", d.localStorage.fbPictureCache))
          });
          d.facebookLogin = function() {
            d.localStorage.wannaLogin = 1
          };
          d.fbAsyncInit = function() {
            function a() {
              d.localStorage.wannaLogin = 1;
              null == d.FB ? alert("You seem to have something blocking Facebook on your browser, please check for any extensions") : d.FB.login(function(a) {
                Wa(a)
              }, {
                scope: "public_profile, email"
              })
            }
            d.FB.init({
              appId: "677505792353827",
              cookie: !0,
              xfbml: !0,
              status: !0,
              version: "v2.2"
            });
            d.FB.Event.subscribe("auth.statusChange",
              function(b) {
                +d.localStorage.wannaLogin && ("connected" == b.status ? Wa(b) : a())
              });
            d.facebookLogin = a
          };
          d.logout = function() {
            E = null;
            e("#helloContainer").attr("data-logged-in", "0");
            e("#helloContainer").attr("data-has-account-data", "0");
            delete d.localStorage.wannaLogin;
            delete d.localStorage.loginCache;
            delete d.localStorage.fbPictureCache;
            L()
          };
          var bc = function() {
            function a(a, b, c, d, e) {
              var f = b.getContext("2d"),
                g = b.width;
              b = b.height;
              a.color = e;
              a.B(c);
              a.size = d;
              f.save();
              f.translate(g / 2, b / 2);
              a.w(f);
              f.restore()
            }
            for (var b =
                new W(-1, 0, 0, 32, "#5bc0de", ""), c = new W(-1, 0, 0, 32, "#5bc0de", ""), d = "#0791ff #5a07ff #ff07fe #ffa507 #ff0774 #077fff #3aff07 #ff07ed #07a8ff #ff076e #3fff07 #ff0734 #07ff20 #ff07a2 #ff8207 #07ff0e".split(" "), f = [], g = 0; g < d.length; ++g) {
              var h = g / d.length * 12,
                k = 30 * Math.sqrt(g / d.length);
              f.push(new W(-1, Math.cos(h) * k, Math.sin(h) * k, 10, d[g], ""))
            }
            Zb(f);
            var m = document.createElement("canvas");
            m.getContext("2d");
            m.width = m.height = 70;
            a(c, m, "", 26, "#ebc0de");
            return function() {
              e(".cell-spinner").filter(":visible").each(function() {
                var c =
                  e(this),
                  d = Date.now(),
                  f = this.width,
                  g = this.height,
                  h = this.getContext("2d");
                h.clearRect(0, 0, f, g);
                h.save();
                h.translate(f / 2, g / 2);
                for (var k = 0; 10 > k; ++k) h.drawImage(m, (.1 * d + 80 * k) % (f + 140) - f / 2 - 70 - 35, g / 2 * Math.sin((.001 * d + k) % Math.PI * 2) - 35, 70, 70);
                h.restore();
                (c = c.attr("data-itr")) && (c = da(c));
                a(b, this, c || "", +e(this).attr("data-size"), "#5bc0de")
              });
              e("#statsPellets").filter(":visible").each(function() {
                e(this);
                var b = this.width,
                  c = this.height;
                this.getContext("2d").clearRect(0, 0, b, c);
                for (b = 0; b < f.length; b++) a(f[b], this,
                  "", f[b].size, f[b].color)
              })
            }
          }();
          d.createParty = function() {
            ca(":party");
            N = function(a) {
              Xa("/#" + d.encodeURIComponent(a));
              e(".partyToken").val("agar.io/#" + d.encodeURIComponent(a));
              e("#helloContainer").attr("data-party-state", "1")
            };
            L()
          };
          d.joinParty = eb;
          d.cancelParty = function() {
            Xa("/");
            e("#helloContainer").attr("data-party-state", "0");
            ca("");
            L()
          };
          var z = [],
            Na = 0,
            Oa = "#000000",
            S = !1,
            Pa = !1,
            pb = 0,
            qb = 0,
            Ra = 0,
            Qa = 0,
            R = 0,
            rb = !0;
          setInterval(function() {
            Pa && z.push(yb() / 100)
          }, 1E3 / 60);
          setInterval(function() {
            var a = ac();
            0 != a &&
              (++Ra, 0 == R && (R = a), R = Math.min(R, a))
          }, 1E3);
          d.closeStats = function() {
            S = !1;
            e("#stats").hide();
            gb(d.ab);
            la(0)
          };
          d.setSkipStats = function(a) {
            rb = !a
          };
          e(function() {
            e(Ib)
          })
        }
      }
    }
  }
})(window, window.jQuery);
