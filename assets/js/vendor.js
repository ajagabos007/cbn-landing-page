function GoogleMaps_InfoBox_Factory(e) {
  function t(e) {
    (e = e || {}),
      google.maps.OverlayView.apply(this, arguments),
      (this.content_ = e.content || ""),
      (this.disableAutoPan_ = e.disableAutoPan || !1),
      (this.maxWidth_ = e.maxWidth || 0),
      (this.pixelOffset_ = e.pixelOffset || new google.maps.Size(0, 0)),
      (this.position_ = e.position || new google.maps.LatLng(0, 0)),
      (this.zIndex_ = e.zIndex || null),
      (this.boxClass_ = e.boxClass || "infoBox"),
      (this.boxStyle_ = e.boxStyle || {}),
      (this.closeBoxMargin_ = e.closeBoxMargin || "2px"),
      (this.closeBoxURL_ =
        e.closeBoxURL || "//www.google.com/intl/en_us/mapfiles/close.gif"),
      "" === e.closeBoxURL && (this.closeBoxURL_ = ""),
      (this.closeBoxTitle_ = e.closeBoxTitle || " Close "),
      (this.infoBoxClearance_ =
        e.infoBoxClearance || new google.maps.Size(1, 1)),
      void 0 === e.visible &&
        (void 0 === e.isHidden ? (e.visible = !0) : (e.visible = !e.isHidden)),
      (this.isHidden_ = !e.visible),
      (this.alignBottom_ = e.alignBottom || !1),
      (this.pane_ = e.pane || "floatPane"),
      (this.enableEventPropagation_ = e.enableEventPropagation || !1),
      (this.div_ = null),
      (this.closeListener_ = null),
      (this.moveListener_ = null),
      (this.contextListener_ = null),
      (this.eventListeners_ = null),
      (this.fixedWidthSet_ = null);
  }
  return (
    ((t.prototype = new google.maps.OverlayView()).createInfoBoxDiv_ =
      function () {
        function t(e) {
          (e.cancelBubble = !0), e.stopPropagation && e.stopPropagation();
        }
        var e,
          i,
          n,
          o = this;
        if (!this.div_) {
          if (
            ((this.div_ = document.createElement("div")),
            this.setBoxStyle_(),
            void 0 === this.content_.nodeType
              ? (this.div_.innerHTML = this.getCloseBoxImg_() + this.content_)
              : ((this.div_.innerHTML = this.getCloseBoxImg_()),
                this.div_.appendChild(this.content_)),
            this.getPanes()[this.pane_].appendChild(this.div_),
            this.addClickHandler_(),
            this.div_.style.width
              ? (this.fixedWidthSet_ = !0)
              : 0 !== this.maxWidth_ && this.div_.offsetWidth > this.maxWidth_
              ? ((this.div_.style.width = this.maxWidth_),
                (this.div_.style.overflow = "auto"),
                (this.fixedWidthSet_ = !0))
              : ((n = this.getBoxWidths_()),
                (this.div_.style.width =
                  this.div_.offsetWidth - n.left - n.right + "px"),
                (this.fixedWidthSet_ = !1)),
            this.panBox_(this.disableAutoPan_),
            !this.enableEventPropagation_)
          ) {
            for (
              this.eventListeners_ = [],
                i = [
                  "mousedown",
                  "mouseover",
                  "mouseout",
                  "mouseup",
                  "click",
                  "dblclick",
                  "touchstart",
                  "touchend",
                  "touchmove",
                ],
                e = 0;
              e < i.length;
              e++
            )
              this.eventListeners_.push(
                google.maps.event.addDomListener(this.div_, i[e], t)
              );
            this.eventListeners_.push(
              google.maps.event.addDomListener(
                this.div_,
                "mouseover",
                function (e) {
                  this.style.cursor = "default";
                }
              )
            );
          }
          (this.contextListener_ = google.maps.event.addDomListener(
            this.div_,
            "contextmenu",
            function (e) {
              (e.returnValue = !1),
                e.preventDefault && e.preventDefault(),
                o.enableEventPropagation_ || t(e);
            }
          )),
            google.maps.event.trigger(this, "domready");
        }
      }),
    (t.prototype.getCloseBoxImg_ = function () {
      var e = "";
      return (
        "" !== this.closeBoxURL_ &&
          ((e = "<img"),
          (e += " src='" + this.closeBoxURL_ + "'"),
          (e += " align=right"),
          (e += " title='" + this.closeBoxTitle_ + "'"),
          (e += " style='"),
          (e += " position: relative;"),
          (e += " cursor: pointer;"),
          (e += " margin: " + this.closeBoxMargin_ + ";"),
          (e += "'>")),
        e
      );
    }),
    (t.prototype.addClickHandler_ = function () {
      var e;
      "" !== this.closeBoxURL_
        ? ((e = this.div_.firstChild),
          (this.closeListener_ = google.maps.event.addDomListener(
            e,
            "click",
            this.getCloseClickHandler_()
          )))
        : (this.closeListener_ = null);
    }),
    (t.prototype.getCloseClickHandler_ = function () {
      var t = this;
      return function (e) {
        (e.cancelBubble = !0),
          e.stopPropagation && e.stopPropagation(),
          google.maps.event.trigger(t, "closeclick"),
          t.close();
      };
    }),
    (t.prototype.panBox_ = function (e) {
      var t,
        i = 0,
        n = 0;
      if (!e && (t = this.getMap()) instanceof google.maps.Map) {
        t.getBounds().contains(this.position_) || t.setCenter(this.position_);
        var o = this.pixelOffset_.width,
          r = this.pixelOffset_.height,
          s = this.div_.offsetWidth,
          a = this.div_.offsetHeight,
          l = this.infoBoxClearance_.width,
          c = this.infoBoxClearance_.height;
        if (2 == t.panToBounds.length) {
          var u = { left: 0, right: 0, top: 0, bottom: 0 };
          (u.left = -o + l),
            (u.right = o + s + l),
            this.alignBottom_
              ? ((u.top = -r + c + a), (u.bottom = r + c))
              : ((u.top = -r + c), (u.bottom = r + a + c)),
            t.panToBounds(new google.maps.LatLngBounds(this.position_), u);
        } else {
          var h = t.getDiv(),
            d = h.offsetWidth,
            f = h.offsetHeight,
            p = this.getProjection().fromLatLngToContainerPixel(this.position_);
          if (
            (p.x < -o + l
              ? (i = p.x + o - l)
              : p.x + s + o + l > d && (i = p.x + s + o + l - d),
            this.alignBottom_
              ? p.y < -r + c + a
                ? (n = p.y + r - c - a)
                : p.y + r + c > f && (n = p.y + r + c - f)
              : p.y < -r + c
              ? (n = p.y + r - c)
              : p.y + a + r + c > f && (n = p.y + a + r + c - f),
            0 !== i || 0 !== n)
          ) {
            t.getCenter();
            t.panBy(i, n);
          }
        }
      }
    }),
    (t.prototype.setBoxStyle_ = function () {
      var e, t;
      if (this.div_) {
        for (e in ((this.div_.className = this.boxClass_),
        (this.div_.style.cssText = ""),
        (t = this.boxStyle_)))
          t.hasOwnProperty(e) && (this.div_.style[e] = t[e]);
        (void 0 === this.div_.style.WebkitTransform ||
          (-1 === this.div_.style.WebkitTransform.indexOf("translateZ") &&
            -1 === this.div_.style.WebkitTransform.indexOf("matrix"))) &&
          (this.div_.style.WebkitTransform = "translateZ(0)"),
          void 0 !== this.div_.style.opacity &&
            "" !== this.div_.style.opacity &&
            ((this.div_.style.MsFilter =
              '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' +
              100 * this.div_.style.opacity +
              ')"'),
            (this.div_.style.filter =
              "alpha(opacity=" + 100 * this.div_.style.opacity + ")")),
          (this.div_.style.position = "absolute"),
          (this.div_.style.visibility = "hidden"),
          null !== this.zIndex_ && (this.div_.style.zIndex = this.zIndex_);
      }
    }),
    (t.prototype.getBoxWidths_ = function () {
      var e,
        t = { top: 0, bottom: 0, left: 0, right: 0 },
        i = this.div_;
      return (
        document.defaultView && document.defaultView.getComputedStyle
          ? (e = i.ownerDocument.defaultView.getComputedStyle(i, "")) &&
            ((t.top = parseInt(e.borderTopWidth, 10) || 0),
            (t.bottom = parseInt(e.borderBottomWidth, 10) || 0),
            (t.left = parseInt(e.borderLeftWidth, 10) || 0),
            (t.right = parseInt(e.borderRightWidth, 10) || 0))
          : document.documentElement.currentStyle &&
            i.currentStyle &&
            ((t.top = parseInt(i.currentStyle.borderTopWidth, 10) || 0),
            (t.bottom = parseInt(i.currentStyle.borderBottomWidth, 10) || 0),
            (t.left = parseInt(i.currentStyle.borderLeftWidth, 10) || 0),
            (t.right = parseInt(i.currentStyle.borderRightWidth, 10) || 0)),
        t
      );
    }),
    (t.prototype.onRemove = function () {
      this.div_ &&
        (this.div_.parentNode.removeChild(this.div_), (this.div_ = null));
    }),
    (t.prototype.draw = function () {
      this.createInfoBoxDiv_();
      var e = this.getProjection().fromLatLngToDivPixel(this.position_);
      (this.div_.style.left = e.x + this.pixelOffset_.width + "px"),
        this.alignBottom_
          ? (this.div_.style.bottom = -(e.y + this.pixelOffset_.height) + "px")
          : (this.div_.style.top = e.y + this.pixelOffset_.height + "px"),
        this.isHidden_
          ? (this.div_.style.visibility = "hidden")
          : (this.div_.style.visibility = "visible");
    }),
    (t.prototype.setOptions = function (e) {
      void 0 !== e.boxClass &&
        ((this.boxClass_ = e.boxClass), this.setBoxStyle_()),
        void 0 !== e.boxStyle &&
          ((this.boxStyle_ = e.boxStyle), this.setBoxStyle_()),
        void 0 !== e.content && this.setContent(e.content),
        void 0 !== e.disableAutoPan &&
          (this.disableAutoPan_ = e.disableAutoPan),
        void 0 !== e.maxWidth && (this.maxWidth_ = e.maxWidth),
        void 0 !== e.pixelOffset && (this.pixelOffset_ = e.pixelOffset),
        void 0 !== e.alignBottom && (this.alignBottom_ = e.alignBottom),
        void 0 !== e.position && this.setPosition(e.position),
        void 0 !== e.zIndex && this.setZIndex(e.zIndex),
        void 0 !== e.closeBoxMargin &&
          (this.closeBoxMargin_ = e.closeBoxMargin),
        void 0 !== e.closeBoxURL && (this.closeBoxURL_ = e.closeBoxURL),
        void 0 !== e.closeBoxTitle && (this.closeBoxTitle_ = e.closeBoxTitle),
        void 0 !== e.infoBoxClearance &&
          (this.infoBoxClearance_ = e.infoBoxClearance),
        void 0 !== e.isHidden && (this.isHidden_ = e.isHidden),
        void 0 !== e.visible && (this.isHidden_ = !e.visible),
        void 0 !== e.enableEventPropagation &&
          (this.enableEventPropagation_ = e.enableEventPropagation),
        this.div_ && this.draw();
    }),
    (t.prototype.setContent = function (e) {
      (this.content_ = e),
        this.div_ &&
          (this.closeListener_ &&
            (google.maps.event.removeListener(this.closeListener_),
            (this.closeListener_ = null)),
          this.fixedWidthSet_ || (this.div_.style.width = ""),
          void 0 === e.nodeType
            ? (this.div_.innerHTML = this.getCloseBoxImg_() + e)
            : ((this.div_.innerHTML = this.getCloseBoxImg_()),
              this.div_.appendChild(e)),
          this.fixedWidthSet_ ||
            ((this.div_.style.width = this.div_.offsetWidth + "px"),
            void 0 === e.nodeType
              ? (this.div_.innerHTML = this.getCloseBoxImg_() + e)
              : ((this.div_.innerHTML = this.getCloseBoxImg_()),
                this.div_.appendChild(e))),
          this.addClickHandler_()),
        google.maps.event.trigger(this, "content_changed");
    }),
    (t.prototype.setPosition = function (e) {
      (this.position_ = e),
        this.div_ && this.draw(),
        google.maps.event.trigger(this, "position_changed");
    }),
    (t.prototype.setZIndex = function (e) {
      (this.zIndex_ = e),
        this.div_ && (this.div_.style.zIndex = e),
        google.maps.event.trigger(this, "zindex_changed");
    }),
    (t.prototype.setVisible = function (e) {
      (this.isHidden_ = !e),
        this.div_ &&
          (this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible");
    }),
    (t.prototype.getContent = function () {
      return this.content_;
    }),
    (t.prototype.getPosition = function () {
      return this.position_;
    }),
    (t.prototype.getZIndex = function () {
      return this.zIndex_;
    }),
    (t.prototype.getVisible = function () {
      return (
        void 0 !== this.getMap() && null !== this.getMap() && !this.isHidden_
      );
    }),
    (t.prototype.getWidth = function () {
      var e = null;
      return this.div_ && (e = this.div_.offsetWidth), e;
    }),
    (t.prototype.getHeight = function () {
      var e = null;
      return this.div_ && (e = this.div_.offsetHeight), e;
    }),
    (t.prototype.show = function () {
      (this.isHidden_ = !1),
        this.div_ && (this.div_.style.visibility = "visible");
    }),
    (t.prototype.hide = function () {
      (this.isHidden_ = !0),
        this.div_ && (this.div_.style.visibility = "hidden");
    }),
    (t.prototype.open = function (e, t) {
      var i = this;
      t &&
        (this.setPosition(t.getPosition()),
        (this.moveListener_ = google.maps.event.addListener(
          t,
          "position_changed",
          function () {
            i.setPosition(this.getPosition());
          }
        ))),
        this.setMap(e),
        this.div_ && this.panBox_(this.disableAutoPan_);
    }),
    (t.prototype.close = function () {
      var e;
      if (
        (this.closeListener_ &&
          (google.maps.event.removeListener(this.closeListener_),
          (this.closeListener_ = null)),
        this.eventListeners_)
      ) {
        for (e = 0; e < this.eventListeners_.length; e++)
          google.maps.event.removeListener(this.eventListeners_[e]);
        this.eventListeners_ = null;
      }
      this.moveListener_ &&
        (google.maps.event.removeListener(this.moveListener_),
        (this.moveListener_ = null)),
        this.contextListener_ &&
          (google.maps.event.removeListener(this.contextListener_),
          (this.contextListener_ = null)),
        this.setMap(null);
    }),
    new t(e)
  );
}
!(function (r, h, d) {
  function f(e, t) {
    return typeof e === t;
  }
  function p(e) {
    return "function" != typeof h.createElement
      ? h.createElement(e)
      : v
      ? h.createElementNS.call(h, "http://www.w3.org/2000/svg", e)
      : h.createElement.apply(h, arguments);
  }
  function o(e) {
    return e
      .replace(/([A-Z])/g, function (e, t) {
        return "-" + t.toLowerCase();
      })
      .replace(/^ms-/, "-ms-");
  }
  function s(e, t, i, n) {
    var o,
      r,
      s,
      a,
      l = "modernizr",
      c = p("div"),
      u = (function () {
        var e = h.body;
        return e || ((e = p(v ? "svg" : "body")).fake = !0), e;
      })();
    if (parseInt(i, 10))
      for (; i--; )
        ((s = p("div")).id = n ? n[i] : l + (i + 1)), c.appendChild(s);
    return (
      ((o = p("style")).type = "text/css"),
      (o.id = "s" + l),
      (u.fake ? u : c).appendChild(o),
      u.appendChild(c),
      o.styleSheet
        ? (o.styleSheet.cssText = e)
        : o.appendChild(h.createTextNode(e)),
      (c.id = l),
      u.fake &&
        ((u.style.background = ""),
        (u.style.overflow = "hidden"),
        (a = g.style.overflow),
        (g.style.overflow = "hidden"),
        g.appendChild(u)),
      (r = t(c, e)),
      u.fake
        ? (u.parentNode.removeChild(u), (g.style.overflow = a), g.offsetHeight)
        : c.parentNode.removeChild(c),
      !!r
    );
  }
  function m(e, t) {
    var i = e.length;
    if ("CSS" in r && "supports" in r.CSS) {
      for (; i--; ) if (r.CSS.supports(o(e[i]), t)) return !0;
      return !1;
    }
    if ("CSSSupportsRule" in r) {
      for (var n = []; i--; ) n.push("(" + o(e[i]) + ":" + t + ")");
      return s(
        "@supports (" +
          (n = n.join(" or ")) +
          ") { #modernizr { position: absolute; } }",
        function (e) {
          return (
            "absolute" ==
            (function (e, t, i) {
              var n;
              if ("getComputedStyle" in r) {
                n = getComputedStyle.call(r, e, t);
                var o = r.console;
                if (null !== n) i && (n = n.getPropertyValue(i));
                else if (o) {
                  o[o.error ? "error" : "log"].call(
                    o,
                    "getComputedStyle returning null, its possible modernizr test results are inaccurate"
                  );
                }
              } else n = !t && e.currentStyle && e.currentStyle[i];
              return n;
            })(e, null, "position")
          );
        }
      );
    }
    return d;
  }
  function a(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  function n(e, t, i, n, o) {
    var r = e.charAt(0).toUpperCase() + e.slice(1),
      s = (e + " " + y.join(r + " ") + r).split(" ");
    return f(t, "string") || f(t, "undefined")
      ? (function (e, t, i, n) {
          function o() {
            s && (delete w.style, delete w.modElem);
          }
          if (((n = !f(n, "undefined") && n), !f(i, "undefined"))) {
            var r = m(e, i);
            if (!f(r, "undefined")) return r;
          }
          for (
            var s, a, l, c, u, h = ["modernizr", "tspan", "samp"];
            !w.style && h.length;

          )
            (s = !0), (w.modElem = p(h.shift())), (w.style = w.modElem.style);
          for (l = e.length, a = 0; a < l; a++)
            if (
              ((c = e[a]),
              (u = w.style[c]),
              !~("" + c).indexOf("-") ||
                (c = c
                  .replace(/([a-z])-([a-z])/g, function (e, t, i) {
                    return t + i.toUpperCase();
                  })
                  .replace(/^-/, "")),
              w.style[c] !== d)
            ) {
              if (n || f(i, "undefined")) return o(), "pfx" != t || c;
              try {
                w.style[c] = i;
              } catch (e) {}
              if (w.style[c] != u) return o(), "pfx" != t || c;
            }
          return o(), !1;
        })(s, t, n, o)
      : (function (e, t, i) {
          var n;
          for (var o in e)
            if (e[o] in t)
              return !1 === i
                ? e[o]
                : f((n = t[e[o]]), "function")
                ? a(n, i || t)
                : n;
          return !1;
        })((s = (e + " " + b.join(r + " ") + r).split(" ")), t, i);
  }
  function e(e, t, i) {
    return n(e, d, d, t, i);
  }
  var l = [],
    c = [],
    t = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, t) {
        var i = this;
        setTimeout(function () {
          t(i[e]);
        }, 0);
      },
      addTest: function (e, t, i) {
        c.push({ name: e, fn: t, options: i });
      },
      addAsyncTest: function (e) {
        c.push({ name: null, fn: e });
      },
    },
    u = function () {};
  (u.prototype = t), (u = new u());
  var g = h.documentElement,
    v = "svg" === g.nodeName.toLowerCase(),
    i = "Moz O ms Webkit",
    y = t._config.usePrefixes ? i.split(" ") : [];
  t._cssomPrefixes = y;
  var b = t._config.usePrefixes ? i.toLowerCase().split(" ") : [];
  t._domPrefixes = b;
  var _ = { elem: p("modernizr") };
  u._q.push(function () {
    delete _.elem;
  });
  var w = { style: _.elem.style };
  u._q.unshift(function () {
    delete w.style;
  }),
    (t.testAllProps = n),
    (t.testAllProps = e),
    u.addTest("cssmask", e("maskRepeat", "repeat-x", !0)),
    (function () {
      var e, t, i, n, o, r;
      for (var s in c)
        if (c.hasOwnProperty(s)) {
          if (
            ((e = []),
            (t = c[s]).name &&
              (e.push(t.name.toLowerCase()),
              t.options && t.options.aliases && t.options.aliases.length))
          )
            for (i = 0; i < t.options.aliases.length; i++)
              e.push(t.options.aliases[i].toLowerCase());
          for (
            n = f(t.fn, "function") ? t.fn() : t.fn, o = 0;
            o < e.length;
            o++
          )
            1 === (r = e[o].split(".")).length
              ? (u[r[0]] = n)
              : (!u[r[0]] ||
                  u[r[0]] instanceof Boolean ||
                  (u[r[0]] = new Boolean(u[r[0]])),
                (u[r[0]][r[1]] = n)),
              l.push((n ? "" : "no-") + r.join("-"));
        }
    })(),
    (function (e) {
      var t = g.className,
        i = u._config.classPrefix || "";
      if ((v && (t = t.baseVal), u._config.enableJSClass)) {
        var n = new RegExp("(^|\\s)" + i + "no-js(\\s|$)");
        t = t.replace(n, "$1" + i + "js$2");
      }
      u._config.enableClasses &&
        ((t += " " + i + e.join(" " + i)),
        v ? (g.className.baseVal = t) : (g.className = t));
    })(l),
    delete t.addTest,
    delete t.addAsyncTest;
  for (var x = 0; x < u._q.length; x++) u._q[x]();
  r.Modernizr = u;
})(window, document),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define([], function () {
          return (e.returnExportsGlobal = t());
        })
      : "object" == typeof exports
      ? (module.exports = t())
      : (e.ResizeSensor = t());
  })(this, function () {
    return (function () {
      "use strict";
      var g =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (e) {
          return window.setTimeout(e, 20);
        };
      function v() {
        var e, t;
        (this.q = []),
          (this.add = function (e) {
            this.q.push(e);
          }),
          (this.call = function () {
            for (e = 0, t = this.q.length; e < t; e++) this.q[e].call();
          });
      }
      function s(e, t) {
        if (e.resizedAttached) {
          if (e.resizedAttached) return void e.resizedAttached.add(t);
        } else (e.resizedAttached = new v()), e.resizedAttached.add(t);
        (e.resizeSensor = document.createElement("div")),
          (e.resizeSensor.className = "resize-sensor");
        var i =
            "position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; opacity: 0;",
          n = "position: absolute; left: 0; top: 0; transition: 0s;";
        (e.resizeSensor.style.cssText = i),
          (e.resizeSensor.innerHTML =
            '<div class="resize-sensor-expand" style="' +
            i +
            '"><div style="' +
            n +
            '"></div></div><div class="resize-sensor-shrink" style="' +
            i +
            '"><div style="' +
            n +
            ' width: 200%; height: 200%"></div></div>'),
          e.appendChild(e.resizeSensor),
          "static" ==
            (function (e, t) {
              return e.currentStyle
                ? e.currentStyle[t]
                : window.getComputedStyle
                ? window.getComputedStyle(e, null).getPropertyValue(t)
                : e.style[t];
            })(e, "position") && (e.style.position = "relative");
        function o() {
          (s.style.width = 1e5 + "px"),
            (s.style.height = 1e5 + "px"),
            (r.scrollLeft = 1e5),
            (r.scrollTop = 1e5),
            (a.scrollLeft = 1e5),
            (a.scrollTop = 1e5);
        }
        var r = e.resizeSensor.childNodes[0],
          s = r.childNodes[0],
          a = e.resizeSensor.childNodes[1];
        o();
        var l,
          c,
          u,
          h,
          d = !1,
          f = function () {
            e.resizedAttached &&
              (d && (e.resizedAttached.call(), (d = !1)), g(f));
          };
        g(f);
        function p() {
          ((u = e.offsetWidth) == l && (h = e.offsetHeight) == c) ||
            ((d = !0), (l = u), (c = h)),
            o();
        }
        function m(e, t, i) {
          e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i);
        }
        m(r, "scroll", p), m(a, "scroll", p);
      }
      function o(e, t) {
        var i = Object.prototype.toString.call(e),
          n = (this._isCollectionTyped =
            "[object Array]" === i ||
            "[object NodeList]" === i ||
            "[object HTMLCollection]" === i ||
            ("undefined" != typeof jQuery && e instanceof window.jQuery) ||
            ("undefined" != typeof Elements && e instanceof window.Elements));
        if (((this._element = e), n))
          for (var o = 0, r = e.length; o < r; o++) s(e[o], t);
        else s(e, t);
      }
      return (
        (o.prototype.detach = function () {
          var e = this._isCollectionTyped,
            t = this._element;
          if (e) for (var i = 0, n = t.length; i < n; i++) o.detach(t[i]);
          else o.detach(t);
        }),
        (o.detach = function (e) {
          e.resizeSensor &&
            (e.removeChild(e.resizeSensor),
            delete e.resizeSensor,
            delete e.resizedAttached);
        }),
        o
      );
    })();
  }),
  (function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = e.document
          ? t(e, !0)
          : function (e) {
              if (!e.document)
                throw new Error("jQuery requires a window with a document");
              return t(e);
            })
      : t(e);
  })("undefined" != typeof window ? window : this, function (E, e) {
    "use strict";
    function m(e) {
      return null != e && e === e.window;
    }
    var t = [],
      S = E.document,
      n = Object.getPrototypeOf,
      a = t.slice,
      g = t.concat,
      l = t.push,
      o = t.indexOf,
      i = {},
      r = i.toString,
      v = i.hasOwnProperty,
      s = v.toString,
      c = s.call(Object),
      y = {},
      b = function (e) {
        return "function" == typeof e && "number" != typeof e.nodeType;
      },
      u = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function _(e, t, i) {
      var n,
        o,
        r = (i = i || S).createElement("script");
      if (((r.text = e), t))
        for (n in u)
          (o = t[n] || (t.getAttribute && t.getAttribute(n))) &&
            r.setAttribute(n, o);
      i.head.appendChild(r).parentNode.removeChild(r);
    }
    function w(e) {
      return null == e
        ? e + ""
        : "object" == typeof e || "function" == typeof e
        ? i[r.call(e)] || "object"
        : typeof e;
    }
    var C = function (e, t) {
        return new C.fn.init(e, t);
      },
      h = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function d(e) {
      var t = !!e && "length" in e && e.length,
        i = w(e);
      return (
        !b(e) &&
        !m(e) &&
        ("array" === i ||
          0 === t ||
          ("number" == typeof t && 0 < t && t - 1 in e))
      );
    }
    (C.fn = C.prototype =
      {
        jquery: "3.4.1",
        constructor: C,
        length: 0,
        toArray: function () {
          return a.call(this);
        },
        get: function (e) {
          return null == e
            ? a.call(this)
            : e < 0
            ? this[e + this.length]
            : this[e];
        },
        pushStack: function (e) {
          var t = C.merge(this.constructor(), e);
          return (t.prevObject = this), t;
        },
        each: function (e) {
          return C.each(this, e);
        },
        map: function (i) {
          return this.pushStack(
            C.map(this, function (e, t) {
              return i.call(e, t, e);
            })
          );
        },
        slice: function () {
          return this.pushStack(a.apply(this, arguments));
        },
        first: function () {
          return this.eq(0);
        },
        last: function () {
          return this.eq(-1);
        },
        eq: function (e) {
          var t = this.length,
            i = +e + (e < 0 ? t : 0);
          return this.pushStack(0 <= i && i < t ? [this[i]] : []);
        },
        end: function () {
          return this.prevObject || this.constructor();
        },
        push: l,
        sort: t.sort,
        splice: t.splice,
      }),
      (C.extend = C.fn.extend =
        function () {
          var e,
            t,
            i,
            n,
            o,
            r,
            s = arguments[0] || {},
            a = 1,
            l = arguments.length,
            c = !1;
          for (
            "boolean" == typeof s && ((c = s), (s = arguments[a] || {}), a++),
              "object" == typeof s || b(s) || (s = {}),
              a === l && ((s = this), a--);
            a < l;
            a++
          )
            if (null != (e = arguments[a]))
              for (t in e)
                (n = e[t]),
                  "__proto__" !== t &&
                    s !== n &&
                    (c && n && (C.isPlainObject(n) || (o = Array.isArray(n)))
                      ? ((i = s[t]),
                        (r =
                          o && !Array.isArray(i)
                            ? []
                            : o || C.isPlainObject(i)
                            ? i
                            : {}),
                        (o = !1),
                        (s[t] = C.extend(c, r, n)))
                      : void 0 !== n && (s[t] = n));
          return s;
        }),
      C.extend({
        expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
          throw new Error(e);
        },
        noop: function () {},
        isPlainObject: function (e) {
          var t, i;
          return (
            !(!e || "[object Object]" !== r.call(e)) &&
            (!(t = n(e)) ||
              ("function" ==
                typeof (i = v.call(t, "constructor") && t.constructor) &&
                s.call(i) === c))
          );
        },
        isEmptyObject: function (e) {
          var t;
          for (t in e) return !1;
          return !0;
        },
        globalEval: function (e, t) {
          _(e, { nonce: t && t.nonce });
        },
        each: function (e, t) {
          var i,
            n = 0;
          if (d(e))
            for (i = e.length; n < i && !1 !== t.call(e[n], n, e[n]); n++);
          else for (n in e) if (!1 === t.call(e[n], n, e[n])) break;
          return e;
        },
        trim: function (e) {
          return null == e ? "" : (e + "").replace(h, "");
        },
        makeArray: function (e, t) {
          var i = t || [];
          return (
            null != e &&
              (d(Object(e))
                ? C.merge(i, "string" == typeof e ? [e] : e)
                : l.call(i, e)),
            i
          );
        },
        inArray: function (e, t, i) {
          return null == t ? -1 : o.call(t, e, i);
        },
        merge: function (e, t) {
          for (var i = +t.length, n = 0, o = e.length; n < i; n++)
            e[o++] = t[n];
          return (e.length = o), e;
        },
        grep: function (e, t, i) {
          for (var n = [], o = 0, r = e.length, s = !i; o < r; o++)
            !t(e[o], o) != s && n.push(e[o]);
          return n;
        },
        map: function (e, t, i) {
          var n,
            o,
            r = 0,
            s = [];
          if (d(e))
            for (n = e.length; r < n; r++)
              null != (o = t(e[r], r, i)) && s.push(o);
          else for (r in e) null != (o = t(e[r], r, i)) && s.push(o);
          return g.apply([], s);
        },
        guid: 1,
        support: y,
      }),
      "function" == typeof Symbol &&
        (C.fn[Symbol.iterator] = t[Symbol.iterator]),
      C.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
          " "
        ),
        function (e, t) {
          i["[object " + t + "]"] = t.toLowerCase();
        }
      );
    var f = (function (i) {
      function h(e, t, i) {
        var n = "0x" + t - 65536;
        return n != n || i
          ? t
          : n < 0
          ? String.fromCharCode(65536 + n)
          : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320);
      }
      function o() {
        x();
      }
      var e,
        f,
        _,
        r,
        s,
        p,
        d,
        m,
        w,
        l,
        c,
        x,
        E,
        a,
        S,
        g,
        u,
        v,
        y,
        C = "sizzle" + 1 * new Date(),
        b = i.document,
        T = 0,
        n = 0,
        k = le(),
        A = le(),
        D = le(),
        I = le(),
        L = function (e, t) {
          return e === t && (c = !0), 0;
        },
        P = {}.hasOwnProperty,
        t = [],
        j = t.pop,
        N = t.push,
        O = t.push,
        M = t.slice,
        z = function (e, t) {
          for (var i = 0, n = e.length; i < n; i++) if (e[i] === t) return i;
          return -1;
        },
        B =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        H = "[\\x20\\t\\r\\n\\f]",
        R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        q =
          "\\[" +
          H +
          "*(" +
          R +
          ")(?:" +
          H +
          "*([*^$|!~]?=)" +
          H +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          R +
          "))|)" +
          H +
          "*\\]",
        F =
          ":(" +
          R +
          ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
          q +
          ")*)|.*)\\)|)",
        W = new RegExp(H + "+", "g"),
        $ = new RegExp("^" + H + "+|((?:^|[^\\\\])(?:\\\\.)*)" + H + "+$", "g"),
        V = new RegExp("^" + H + "*," + H + "*"),
        U = new RegExp("^" + H + "*([>+~]|" + H + ")" + H + "*"),
        Y = new RegExp(H + "|>"),
        Q = new RegExp(F),
        X = new RegExp("^" + R + "$"),
        G = {
          ID: new RegExp("^#(" + R + ")"),
          CLASS: new RegExp("^\\.(" + R + ")"),
          TAG: new RegExp("^(" + R + "|[*])"),
          ATTR: new RegExp("^" + q),
          PSEUDO: new RegExp("^" + F),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              H +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              H +
              "*(?:([+-]|)" +
              H +
              "*(\\d+)|))" +
              H +
              "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + B + ")$", "i"),
          needsContext: new RegExp(
            "^" +
              H +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              H +
              "*((?:-\\d)?\\d*)" +
              H +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        K = /HTML$/i,
        J = /^(?:input|select|textarea|button)$/i,
        Z = /^h\d$/i,
        ee = /^[^{]+\{\s*\[native \w/,
        te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ie = /[+~]/,
        ne = new RegExp("\\\\([\\da-f]{1,6}" + H + "?|(" + H + ")|.)", "ig"),
        oe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        re = function (e, t) {
          return t
            ? "\0" === e
              ? "�"
              : e.slice(0, -1) +
                "\\" +
                e.charCodeAt(e.length - 1).toString(16) +
                " "
            : "\\" + e;
        },
        se = _e(
          function (e) {
            return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase();
          },
          { dir: "parentNode", next: "legend" }
        );
      try {
        O.apply((t = M.call(b.childNodes)), b.childNodes),
          t[b.childNodes.length].nodeType;
      } catch (e) {
        O = {
          apply: t.length
            ? function (e, t) {
                N.apply(e, M.call(t));
              }
            : function (e, t) {
                for (var i = e.length, n = 0; (e[i++] = t[n++]); );
                e.length = i - 1;
              },
        };
      }
      function ae(t, e, i, n) {
        var o,
          r,
          s,
          a,
          l,
          c,
          u,
          h = e && e.ownerDocument,
          d = e ? e.nodeType : 9;
        if (
          ((i = i || []),
          "string" != typeof t || !t || (1 !== d && 9 !== d && 11 !== d))
        )
          return i;
        if (
          !n &&
          ((e ? e.ownerDocument || e : b) !== E && x(e), (e = e || E), S)
        ) {
          if (11 !== d && (l = te.exec(t)))
            if ((o = l[1])) {
              if (9 === d) {
                if (!(s = e.getElementById(o))) return i;
                if (s.id === o) return i.push(s), i;
              } else if (
                h &&
                (s = h.getElementById(o)) &&
                y(e, s) &&
                s.id === o
              )
                return i.push(s), i;
            } else {
              if (l[2]) return O.apply(i, e.getElementsByTagName(t)), i;
              if (
                (o = l[3]) &&
                f.getElementsByClassName &&
                e.getElementsByClassName
              )
                return O.apply(i, e.getElementsByClassName(o)), i;
            }
          if (
            f.qsa &&
            !I[t + " "] &&
            (!g || !g.test(t)) &&
            (1 !== d || "object" !== e.nodeName.toLowerCase())
          ) {
            if (((u = t), (h = e), 1 === d && Y.test(t))) {
              for (
                (a = e.getAttribute("id"))
                  ? (a = a.replace(oe, re))
                  : e.setAttribute("id", (a = C)),
                  r = (c = p(t)).length;
                r--;

              )
                c[r] = "#" + a + " " + be(c[r]);
              (u = c.join(",")), (h = (ie.test(t) && ve(e.parentNode)) || e);
            }
            try {
              return O.apply(i, h.querySelectorAll(u)), i;
            } catch (e) {
              I(t, !0);
            } finally {
              a === C && e.removeAttribute("id");
            }
          }
        }
        return m(t.replace($, "$1"), e, i, n);
      }
      function le() {
        var n = [];
        return function e(t, i) {
          return (
            n.push(t + " ") > _.cacheLength && delete e[n.shift()],
            (e[t + " "] = i)
          );
        };
      }
      function ce(e) {
        return (e[C] = !0), e;
      }
      function ue(e) {
        var t = E.createElement("fieldset");
        try {
          return !!e(t);
        } catch (e) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function he(e, t) {
        for (var i = e.split("|"), n = i.length; n--; ) _.attrHandle[i[n]] = t;
      }
      function de(e, t) {
        var i = t && e,
          n =
            i &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            e.sourceIndex - t.sourceIndex;
        if (n) return n;
        if (i) for (; (i = i.nextSibling); ) if (i === t) return -1;
        return e ? 1 : -1;
      }
      function fe(t) {
        return function (e) {
          return "input" === e.nodeName.toLowerCase() && e.type === t;
        };
      }
      function pe(i) {
        return function (e) {
          var t = e.nodeName.toLowerCase();
          return ("input" === t || "button" === t) && e.type === i;
        };
      }
      function me(t) {
        return function (e) {
          return "form" in e
            ? e.parentNode && !1 === e.disabled
              ? "label" in e
                ? "label" in e.parentNode
                  ? e.parentNode.disabled === t
                  : e.disabled === t
                : e.isDisabled === t || (e.isDisabled !== !t && se(e) === t)
              : e.disabled === t
            : "label" in e && e.disabled === t;
        };
      }
      function ge(s) {
        return ce(function (r) {
          return (
            (r = +r),
            ce(function (e, t) {
              for (var i, n = s([], e.length, r), o = n.length; o--; )
                e[(i = n[o])] && (e[i] = !(t[i] = e[i]));
            })
          );
        });
      }
      function ve(e) {
        return e && void 0 !== e.getElementsByTagName && e;
      }
      for (e in ((f = ae.support = {}),
      (s = ae.isXML =
        function (e) {
          var t = e.namespaceURI,
            i = (e.ownerDocument || e).documentElement;
          return !K.test(t || (i && i.nodeName) || "HTML");
        }),
      (x = ae.setDocument =
        function (e) {
          var t,
            i,
            n = e ? e.ownerDocument || e : b;
          return (
            n !== E &&
              9 === n.nodeType &&
              n.documentElement &&
              ((a = (E = n).documentElement),
              (S = !s(E)),
              b !== E &&
                (i = E.defaultView) &&
                i.top !== i &&
                (i.addEventListener
                  ? i.addEventListener("unload", o, !1)
                  : i.attachEvent && i.attachEvent("onunload", o)),
              (f.attributes = ue(function (e) {
                return (e.className = "i"), !e.getAttribute("className");
              })),
              (f.getElementsByTagName = ue(function (e) {
                return (
                  e.appendChild(E.createComment("")),
                  !e.getElementsByTagName("*").length
                );
              })),
              (f.getElementsByClassName = ee.test(E.getElementsByClassName)),
              (f.getById = ue(function (e) {
                return (
                  (a.appendChild(e).id = C),
                  !E.getElementsByName || !E.getElementsByName(C).length
                );
              })),
              f.getById
                ? ((_.filter.ID = function (e) {
                    var t = e.replace(ne, h);
                    return function (e) {
                      return e.getAttribute("id") === t;
                    };
                  }),
                  (_.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && S) {
                      var i = t.getElementById(e);
                      return i ? [i] : [];
                    }
                  }))
                : ((_.filter.ID = function (e) {
                    var i = e.replace(ne, h);
                    return function (e) {
                      var t =
                        void 0 !== e.getAttributeNode &&
                        e.getAttributeNode("id");
                      return t && t.value === i;
                    };
                  }),
                  (_.find.ID = function (e, t) {
                    if (void 0 !== t.getElementById && S) {
                      var i,
                        n,
                        o,
                        r = t.getElementById(e);
                      if (r) {
                        if ((i = r.getAttributeNode("id")) && i.value === e)
                          return [r];
                        for (o = t.getElementsByName(e), n = 0; (r = o[n++]); )
                          if ((i = r.getAttributeNode("id")) && i.value === e)
                            return [r];
                      }
                      return [];
                    }
                  })),
              (_.find.TAG = f.getElementsByTagName
                ? function (e, t) {
                    return void 0 !== t.getElementsByTagName
                      ? t.getElementsByTagName(e)
                      : f.qsa
                      ? t.querySelectorAll(e)
                      : void 0;
                  }
                : function (e, t) {
                    var i,
                      n = [],
                      o = 0,
                      r = t.getElementsByTagName(e);
                    if ("*" !== e) return r;
                    for (; (i = r[o++]); ) 1 === i.nodeType && n.push(i);
                    return n;
                  }),
              (_.find.CLASS =
                f.getElementsByClassName &&
                function (e, t) {
                  if (void 0 !== t.getElementsByClassName && S)
                    return t.getElementsByClassName(e);
                }),
              (u = []),
              (g = []),
              (f.qsa = ee.test(E.querySelectorAll)) &&
                (ue(function (e) {
                  (a.appendChild(e).innerHTML =
                    "<a id='" +
                    C +
                    "'></a><select id='" +
                    C +
                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                    e.querySelectorAll("[msallowcapture^='']").length &&
                      g.push("[*^$]=" + H + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length ||
                      g.push("\\[" + H + "*(?:value|" + B + ")"),
                    e.querySelectorAll("[id~=" + C + "-]").length ||
                      g.push("~="),
                    e.querySelectorAll(":checked").length || g.push(":checked"),
                    e.querySelectorAll("a#" + C + "+*").length ||
                      g.push(".#.+[+~]");
                }),
                ue(function (e) {
                  e.innerHTML =
                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                  var t = E.createElement("input");
                  t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length &&
                      g.push("name" + H + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length &&
                      g.push(":enabled", ":disabled"),
                    (a.appendChild(e).disabled = !0),
                    2 !== e.querySelectorAll(":disabled").length &&
                      g.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    g.push(",.*:");
                })),
              (f.matchesSelector = ee.test(
                (v =
                  a.matches ||
                  a.webkitMatchesSelector ||
                  a.mozMatchesSelector ||
                  a.oMatchesSelector ||
                  a.msMatchesSelector)
              )) &&
                ue(function (e) {
                  (f.disconnectedMatch = v.call(e, "*")),
                    v.call(e, "[s!='']:x"),
                    u.push("!=", F);
                }),
              (g = g.length && new RegExp(g.join("|"))),
              (u = u.length && new RegExp(u.join("|"))),
              (t = ee.test(a.compareDocumentPosition)),
              (y =
                t || ee.test(a.contains)
                  ? function (e, t) {
                      var i = 9 === e.nodeType ? e.documentElement : e,
                        n = t && t.parentNode;
                      return (
                        e === n ||
                        !(
                          !n ||
                          1 !== n.nodeType ||
                          !(i.contains
                            ? i.contains(n)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(n))
                        )
                      );
                    }
                  : function (e, t) {
                      if (t)
                        for (; (t = t.parentNode); ) if (t === e) return !0;
                      return !1;
                    }),
              (L = t
                ? function (e, t) {
                    if (e === t) return (c = !0), 0;
                    var i =
                      !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return (
                      i ||
                      (1 &
                        (i =
                          (e.ownerDocument || e) === (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1) ||
                      (!f.sortDetached && t.compareDocumentPosition(e) === i)
                        ? e === E || (e.ownerDocument === b && y(b, e))
                          ? -1
                          : t === E || (t.ownerDocument === b && y(b, t))
                          ? 1
                          : l
                          ? z(l, e) - z(l, t)
                          : 0
                        : 4 & i
                        ? -1
                        : 1)
                    );
                  }
                : function (e, t) {
                    if (e === t) return (c = !0), 0;
                    var i,
                      n = 0,
                      o = e.parentNode,
                      r = t.parentNode,
                      s = [e],
                      a = [t];
                    if (!o || !r)
                      return e === E
                        ? -1
                        : t === E
                        ? 1
                        : o
                        ? -1
                        : r
                        ? 1
                        : l
                        ? z(l, e) - z(l, t)
                        : 0;
                    if (o === r) return de(e, t);
                    for (i = e; (i = i.parentNode); ) s.unshift(i);
                    for (i = t; (i = i.parentNode); ) a.unshift(i);
                    for (; s[n] === a[n]; ) n++;
                    return n
                      ? de(s[n], a[n])
                      : s[n] === b
                      ? -1
                      : a[n] === b
                      ? 1
                      : 0;
                  })),
            E
          );
        }),
      (ae.matches = function (e, t) {
        return ae(e, null, null, t);
      }),
      (ae.matchesSelector = function (e, t) {
        if (
          ((e.ownerDocument || e) !== E && x(e),
          f.matchesSelector &&
            S &&
            !I[t + " "] &&
            (!u || !u.test(t)) &&
            (!g || !g.test(t)))
        )
          try {
            var i = v.call(e, t);
            if (
              i ||
              f.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return i;
          } catch (e) {
            I(t, !0);
          }
        return 0 < ae(t, E, null, [e]).length;
      }),
      (ae.contains = function (e, t) {
        return (e.ownerDocument || e) !== E && x(e), y(e, t);
      }),
      (ae.attr = function (e, t) {
        (e.ownerDocument || e) !== E && x(e);
        var i = _.attrHandle[t.toLowerCase()],
          n = i && P.call(_.attrHandle, t.toLowerCase()) ? i(e, t, !S) : void 0;
        return void 0 !== n
          ? n
          : f.attributes || !S
          ? e.getAttribute(t)
          : (n = e.getAttributeNode(t)) && n.specified
          ? n.value
          : null;
      }),
      (ae.escape = function (e) {
        return (e + "").replace(oe, re);
      }),
      (ae.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e);
      }),
      (ae.uniqueSort = function (e) {
        var t,
          i = [],
          n = 0,
          o = 0;
        if (
          ((c = !f.detectDuplicates),
          (l = !f.sortStable && e.slice(0)),
          e.sort(L),
          c)
        ) {
          for (; (t = e[o++]); ) t === e[o] && (n = i.push(o));
          for (; n--; ) e.splice(i[n], 1);
        }
        return (l = null), e;
      }),
      (r = ae.getText =
        function (e) {
          var t,
            i = "",
            n = 0,
            o = e.nodeType;
          if (o) {
            if (1 === o || 9 === o || 11 === o) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) i += r(e);
            } else if (3 === o || 4 === o) return e.nodeValue;
          } else for (; (t = e[n++]); ) i += r(t);
          return i;
        }),
      ((_ = ae.selectors =
        {
          cacheLength: 50,
          createPseudo: ce,
          match: G,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(ne, h)),
                (e[3] = (e[3] || e[4] || e[5] || "").replace(ne, h)),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1].slice(0, 3)
                  ? (e[3] || ae.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ("even" === e[3] || "odd" === e[3]))),
                    (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                  : e[3] && ae.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t,
                i = !e[6] && e[2];
              return G.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[4] || e[5] || "")
                    : i &&
                      Q.test(i) &&
                      (t = p(i, !0)) &&
                      (t = i.indexOf(")", i.length - t) - i.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = i.slice(0, t))),
                  e.slice(0, 3));
            },
          },
          filter: {
            TAG: function (e) {
              var t = e.replace(ne, h).toLowerCase();
              return "*" === e
                ? function () {
                    return !0;
                  }
                : function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t;
                  };
            },
            CLASS: function (e) {
              var t = k[e + " "];
              return (
                t ||
                ((t = new RegExp("(^|" + H + ")" + e + "(" + H + "|$)")) &&
                  k(e, function (e) {
                    return t.test(
                      ("string" == typeof e.className && e.className) ||
                        (void 0 !== e.getAttribute &&
                          e.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (i, n, o) {
              return function (e) {
                var t = ae.attr(e, i);
                return null == t
                  ? "!=" === n
                  : !n ||
                      ((t += ""),
                      "=" === n
                        ? t === o
                        : "!=" === n
                        ? t !== o
                        : "^=" === n
                        ? o && 0 === t.indexOf(o)
                        : "*=" === n
                        ? o && -1 < t.indexOf(o)
                        : "$=" === n
                        ? o && t.slice(-o.length) === o
                        : "~=" === n
                        ? -1 < (" " + t.replace(W, " ") + " ").indexOf(o)
                        : "|=" === n &&
                          (t === o || t.slice(0, o.length + 1) === o + "-"));
              };
            },
            CHILD: function (p, e, t, m, g) {
              var v = "nth" !== p.slice(0, 3),
                y = "last" !== p.slice(-4),
                b = "of-type" === e;
              return 1 === m && 0 === g
                ? function (e) {
                    return !!e.parentNode;
                  }
                : function (e, t, i) {
                    var n,
                      o,
                      r,
                      s,
                      a,
                      l,
                      c = v != y ? "nextSibling" : "previousSibling",
                      u = e.parentNode,
                      h = b && e.nodeName.toLowerCase(),
                      d = !i && !b,
                      f = !1;
                    if (u) {
                      if (v) {
                        for (; c; ) {
                          for (s = e; (s = s[c]); )
                            if (
                              b
                                ? s.nodeName.toLowerCase() === h
                                : 1 === s.nodeType
                            )
                              return !1;
                          l = c = "only" === p && !l && "nextSibling";
                        }
                        return !0;
                      }
                      if (((l = [y ? u.firstChild : u.lastChild]), y && d)) {
                        for (
                          f =
                            (a =
                              (n =
                                (o =
                                  (r = (s = u)[C] || (s[C] = {}))[s.uniqueID] ||
                                  (r[s.uniqueID] = {}))[p] || [])[0] === T &&
                              n[1]) && n[2],
                            s = a && u.childNodes[a];
                          (s = (++a && s && s[c]) || (f = a = 0) || l.pop());

                        )
                          if (1 === s.nodeType && ++f && s === e) {
                            o[p] = [T, a, f];
                            break;
                          }
                      } else if (
                        (d &&
                          (f = a =
                            (n =
                              (o =
                                (r = (s = e)[C] || (s[C] = {}))[s.uniqueID] ||
                                (r[s.uniqueID] = {}))[p] || [])[0] === T &&
                            n[1]),
                        !1 === f)
                      )
                        for (
                          ;
                          (s = (++a && s && s[c]) || (f = a = 0) || l.pop()) &&
                          ((b
                            ? s.nodeName.toLowerCase() !== h
                            : 1 !== s.nodeType) ||
                            !++f ||
                            (d &&
                              ((o =
                                (r = s[C] || (s[C] = {}))[s.uniqueID] ||
                                (r[s.uniqueID] = {}))[p] = [T, f]),
                            s !== e));

                        );
                      return (f -= g) === m || (f % m == 0 && 0 <= f / m);
                    }
                  };
            },
            PSEUDO: function (e, r) {
              var t,
                s =
                  _.pseudos[e] ||
                  _.setFilters[e.toLowerCase()] ||
                  ae.error("unsupported pseudo: " + e);
              return s[C]
                ? s(r)
                : 1 < s.length
                ? ((t = [e, e, "", r]),
                  _.setFilters.hasOwnProperty(e.toLowerCase())
                    ? ce(function (e, t) {
                        for (var i, n = s(e, r), o = n.length; o--; )
                          e[(i = z(e, n[o]))] = !(t[i] = n[o]);
                      })
                    : function (e) {
                        return s(e, 0, t);
                      })
                : s;
            },
          },
          pseudos: {
            not: ce(function (e) {
              var n = [],
                o = [],
                a = d(e.replace($, "$1"));
              return a[C]
                ? ce(function (e, t, i, n) {
                    for (var o, r = a(e, null, n, []), s = e.length; s--; )
                      (o = r[s]) && (e[s] = !(t[s] = o));
                  })
                : function (e, t, i) {
                    return (
                      (n[0] = e), a(n, null, i, o), (n[0] = null), !o.pop()
                    );
                  };
            }),
            has: ce(function (t) {
              return function (e) {
                return 0 < ae(t, e).length;
              };
            }),
            contains: ce(function (t) {
              return (
                (t = t.replace(ne, h)),
                function (e) {
                  return -1 < (e.textContent || r(e)).indexOf(t);
                }
              );
            }),
            lang: ce(function (i) {
              return (
                X.test(i || "") || ae.error("unsupported lang: " + i),
                (i = i.replace(ne, h).toLowerCase()),
                function (e) {
                  var t;
                  do {
                    if (
                      (t = S
                        ? e.lang
                        : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                    )
                      return (
                        (t = t.toLowerCase()) === i || 0 === t.indexOf(i + "-")
                      );
                  } while ((e = e.parentNode) && 1 === e.nodeType);
                  return !1;
                }
              );
            }),
            target: function (e) {
              var t = i.location && i.location.hash;
              return t && t.slice(1) === e.id;
            },
            root: function (e) {
              return e === a;
            },
            focus: function (e) {
              return (
                e === E.activeElement &&
                (!E.hasFocus || E.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            enabled: me(!1),
            disabled: me(!0),
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
              );
            },
            empty: function (e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeType < 6) return !1;
              return !0;
            },
            parent: function (e) {
              return !_.pseudos.empty(e);
            },
            header: function (e) {
              return Z.test(e.nodeName);
            },
            input: function (e) {
              return J.test(e.nodeName);
            },
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            text: function (e) {
              var t;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === e.type &&
                (null == (t = e.getAttribute("type")) ||
                  "text" === t.toLowerCase())
              );
            },
            first: ge(function () {
              return [0];
            }),
            last: ge(function (e, t) {
              return [t - 1];
            }),
            eq: ge(function (e, t, i) {
              return [i < 0 ? i + t : i];
            }),
            even: ge(function (e, t) {
              for (var i = 0; i < t; i += 2) e.push(i);
              return e;
            }),
            odd: ge(function (e, t) {
              for (var i = 1; i < t; i += 2) e.push(i);
              return e;
            }),
            lt: ge(function (e, t, i) {
              for (var n = i < 0 ? i + t : t < i ? t : i; 0 <= --n; ) e.push(n);
              return e;
            }),
            gt: ge(function (e, t, i) {
              for (var n = i < 0 ? i + t : i; ++n < t; ) e.push(n);
              return e;
            }),
          },
        }).pseudos.nth = _.pseudos.eq),
      { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
        _.pseudos[e] = fe(e);
      for (e in { submit: !0, reset: !0 }) _.pseudos[e] = pe(e);
      function ye() {}
      function be(e) {
        for (var t = 0, i = e.length, n = ""; t < i; t++) n += e[t].value;
        return n;
      }
      function _e(a, e, t) {
        var l = e.dir,
          c = e.next,
          u = c || l,
          h = t && "parentNode" === u,
          d = n++;
        return e.first
          ? function (e, t, i) {
              for (; (e = e[l]); ) if (1 === e.nodeType || h) return a(e, t, i);
              return !1;
            }
          : function (e, t, i) {
              var n,
                o,
                r,
                s = [T, d];
              if (i) {
                for (; (e = e[l]); )
                  if ((1 === e.nodeType || h) && a(e, t, i)) return !0;
              } else
                for (; (e = e[l]); )
                  if (1 === e.nodeType || h)
                    if (
                      ((o =
                        (r = e[C] || (e[C] = {}))[e.uniqueID] ||
                        (r[e.uniqueID] = {})),
                      c && c === e.nodeName.toLowerCase())
                    )
                      e = e[l] || e;
                    else {
                      if ((n = o[u]) && n[0] === T && n[1] === d)
                        return (s[2] = n[2]);
                      if (((o[u] = s)[2] = a(e, t, i))) return !0;
                    }
              return !1;
            };
      }
      function we(o) {
        return 1 < o.length
          ? function (e, t, i) {
              for (var n = o.length; n--; ) if (!o[n](e, t, i)) return !1;
              return !0;
            }
          : o[0];
      }
      function xe(e, t, i, n, o) {
        for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)
          (r = e[a]) && ((i && !i(r, n, o)) || (s.push(r), c && t.push(a)));
        return s;
      }
      function Ee(f, p, m, g, v, e) {
        return (
          g && !g[C] && (g = Ee(g)),
          v && !v[C] && (v = Ee(v, e)),
          ce(function (e, t, i, n) {
            var o,
              r,
              s,
              a = [],
              l = [],
              c = t.length,
              u =
                e ||
                (function (e, t, i) {
                  for (var n = 0, o = t.length; n < o; n++) ae(e, t[n], i);
                  return i;
                })(p || "*", i.nodeType ? [i] : i, []),
              h = !f || (!e && p) ? u : xe(u, a, f, i, n),
              d = m ? (v || (e ? f : c || g) ? [] : t) : h;
            if ((m && m(h, d, i, n), g))
              for (o = xe(d, l), g(o, [], i, n), r = o.length; r--; )
                (s = o[r]) && (d[l[r]] = !(h[l[r]] = s));
            if (e) {
              if (v || f) {
                if (v) {
                  for (o = [], r = d.length; r--; )
                    (s = d[r]) && o.push((h[r] = s));
                  v(null, (d = []), o, n);
                }
                for (r = d.length; r--; )
                  (s = d[r]) &&
                    -1 < (o = v ? z(e, s) : a[r]) &&
                    (e[o] = !(t[o] = s));
              }
            } else (d = xe(d === t ? d.splice(c, d.length) : d)), v ? v(null, t, d, n) : O.apply(t, d);
          })
        );
      }
      function Se(e) {
        for (
          var o,
            t,
            i,
            n = e.length,
            r = _.relative[e[0].type],
            s = r || _.relative[" "],
            a = r ? 1 : 0,
            l = _e(
              function (e) {
                return e === o;
              },
              s,
              !0
            ),
            c = _e(
              function (e) {
                return -1 < z(o, e);
              },
              s,
              !0
            ),
            u = [
              function (e, t, i) {
                var n =
                  (!r && (i || t !== w)) ||
                  ((o = t).nodeType ? l(e, t, i) : c(e, t, i));
                return (o = null), n;
              },
            ];
          a < n;
          a++
        )
          if ((t = _.relative[e[a].type])) u = [_e(we(u), t)];
          else {
            if ((t = _.filter[e[a].type].apply(null, e[a].matches))[C]) {
              for (i = ++a; i < n && !_.relative[e[i].type]; i++);
              return Ee(
                1 < a && we(u),
                1 < a &&
                  be(
                    e
                      .slice(0, a - 1)
                      .concat({ value: " " === e[a - 2].type ? "*" : "" })
                  ).replace($, "$1"),
                t,
                a < i && Se(e.slice(a, i)),
                i < n && Se((e = e.slice(i))),
                i < n && be(e)
              );
            }
            u.push(t);
          }
        return we(u);
      }
      return (
        (ye.prototype = _.filters = _.pseudos),
        (_.setFilters = new ye()),
        (p = ae.tokenize =
          function (e, t) {
            var i,
              n,
              o,
              r,
              s,
              a,
              l,
              c = A[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, a = [], l = _.preFilter; s; ) {
              for (r in ((i && !(n = V.exec(s))) ||
                (n && (s = s.slice(n[0].length) || s), a.push((o = []))),
              (i = !1),
              (n = U.exec(s)) &&
                ((i = n.shift()),
                o.push({ value: i, type: n[0].replace($, " ") }),
                (s = s.slice(i.length))),
              _.filter))
                !(n = G[r].exec(s)) ||
                  (l[r] && !(n = l[r](n))) ||
                  ((i = n.shift()),
                  o.push({ value: i, type: r, matches: n }),
                  (s = s.slice(i.length)));
              if (!i) break;
            }
            return t ? s.length : s ? ae.error(e) : A(e, a).slice(0);
          }),
        (d = ae.compile =
          function (e, t) {
            var i,
              n = [],
              o = [],
              r = D[e + " "];
            if (!r) {
              for (i = (t = t || p(e)).length; i--; )
                (r = Se(t[i]))[C] ? n.push(r) : o.push(r);
              (r = D(
                e,
                (function (g, v) {
                  function e(e, t, i, n, o) {
                    var r,
                      s,
                      a,
                      l = 0,
                      c = "0",
                      u = e && [],
                      h = [],
                      d = w,
                      f = e || (b && _.find.TAG("*", o)),
                      p = (T += null == d ? 1 : Math.random() || 0.1),
                      m = f.length;
                    for (
                      o && (w = t === E || t || o);
                      c !== m && null != (r = f[c]);
                      c++
                    ) {
                      if (b && r) {
                        for (
                          s = 0, t || r.ownerDocument === E || (x(r), (i = !S));
                          (a = g[s++]);

                        )
                          if (a(r, t || E, i)) {
                            n.push(r);
                            break;
                          }
                        o && (T = p);
                      }
                      y && ((r = !a && r) && l--, e && u.push(r));
                    }
                    if (((l += c), y && c !== l)) {
                      for (s = 0; (a = v[s++]); ) a(u, h, t, i);
                      if (e) {
                        if (0 < l)
                          for (; c--; ) u[c] || h[c] || (h[c] = j.call(n));
                        h = xe(h);
                      }
                      O.apply(n, h),
                        o &&
                          !e &&
                          0 < h.length &&
                          1 < l + v.length &&
                          ae.uniqueSort(n);
                    }
                    return o && ((T = p), (w = d)), u;
                  }
                  var y = 0 < v.length,
                    b = 0 < g.length;
                  return y ? ce(e) : e;
                })(o, n)
              )).selector = e;
            }
            return r;
          }),
        (m = ae.select =
          function (e, t, i, n) {
            var o,
              r,
              s,
              a,
              l,
              c = "function" == typeof e && e,
              u = !n && p((e = c.selector || e));
            if (((i = i || []), 1 === u.length)) {
              if (
                2 < (r = u[0] = u[0].slice(0)).length &&
                "ID" === (s = r[0]).type &&
                9 === t.nodeType &&
                S &&
                _.relative[r[1].type]
              ) {
                if (!(t = (_.find.ID(s.matches[0].replace(ne, h), t) || [])[0]))
                  return i;
                c && (t = t.parentNode), (e = e.slice(r.shift().value.length));
              }
              for (
                o = G.needsContext.test(e) ? 0 : r.length;
                o-- && ((s = r[o]), !_.relative[(a = s.type)]);

              )
                if (
                  (l = _.find[a]) &&
                  (n = l(
                    s.matches[0].replace(ne, h),
                    (ie.test(r[0].type) && ve(t.parentNode)) || t
                  ))
                ) {
                  if ((r.splice(o, 1), !(e = n.length && be(r))))
                    return O.apply(i, n), i;
                  break;
                }
            }
            return (
              (c || d(e, u))(
                n,
                t,
                !S,
                i,
                !t || (ie.test(e) && ve(t.parentNode)) || t
              ),
              i
            );
          }),
        (f.sortStable = C.split("").sort(L).join("") === C),
        (f.detectDuplicates = !!c),
        x(),
        (f.sortDetached = ue(function (e) {
          return 1 & e.compareDocumentPosition(E.createElement("fieldset"));
        })),
        ue(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          he("type|href|height|width", function (e, t, i) {
            if (!i)
              return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
          }),
        (f.attributes &&
          ue(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          he("value", function (e, t, i) {
            if (!i && "input" === e.nodeName.toLowerCase())
              return e.defaultValue;
          }),
        ue(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          he(B, function (e, t, i) {
            var n;
            if (!i)
              return !0 === e[t]
                ? t.toLowerCase()
                : (n = e.getAttributeNode(t)) && n.specified
                ? n.value
                : null;
          }),
        ae
      );
    })(E);
    (C.find = f),
      (C.expr = f.selectors),
      (C.expr[":"] = C.expr.pseudos),
      (C.uniqueSort = C.unique = f.uniqueSort),
      (C.text = f.getText),
      (C.isXMLDoc = f.isXML),
      (C.contains = f.contains),
      (C.escapeSelector = f.escape);
    function p(e, t, i) {
      for (var n = [], o = void 0 !== i; (e = e[t]) && 9 !== e.nodeType; )
        if (1 === e.nodeType) {
          if (o && C(e).is(i)) break;
          n.push(e);
        }
      return n;
    }
    function x(e, t) {
      for (var i = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && i.push(e);
      return i;
    }
    var T = C.expr.match.needsContext;
    function k(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function D(e, i, n) {
      return b(i)
        ? C.grep(e, function (e, t) {
            return !!i.call(e, t, e) !== n;
          })
        : i.nodeType
        ? C.grep(e, function (e) {
            return (e === i) !== n;
          })
        : "string" != typeof i
        ? C.grep(e, function (e) {
            return -1 < o.call(i, e) !== n;
          })
        : C.filter(i, e, n);
    }
    (C.filter = function (e, t, i) {
      var n = t[0];
      return (
        i && (e = ":not(" + e + ")"),
        1 === t.length && 1 === n.nodeType
          ? C.find.matchesSelector(n, e)
            ? [n]
            : []
          : C.find.matches(
              e,
              C.grep(t, function (e) {
                return 1 === e.nodeType;
              })
            )
      );
    }),
      C.fn.extend({
        find: function (e) {
          var t,
            i,
            n = this.length,
            o = this;
          if ("string" != typeof e)
            return this.pushStack(
              C(e).filter(function () {
                for (t = 0; t < n; t++) if (C.contains(o[t], this)) return !0;
              })
            );
          for (i = this.pushStack([]), t = 0; t < n; t++) C.find(e, o[t], i);
          return 1 < n ? C.uniqueSort(i) : i;
        },
        filter: function (e) {
          return this.pushStack(D(this, e || [], !1));
        },
        not: function (e) {
          return this.pushStack(D(this, e || [], !0));
        },
        is: function (e) {
          return !!D(
            this,
            "string" == typeof e && T.test(e) ? C(e) : e || [],
            !1
          ).length;
        },
      });
    var I,
      L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((C.fn.init = function (e, t, i) {
      var n, o;
      if (!e) return this;
      if (((i = i || I), "string" != typeof e))
        return e.nodeType
          ? ((this[0] = e), (this.length = 1), this)
          : b(e)
          ? void 0 !== i.ready
            ? i.ready(e)
            : e(C)
          : C.makeArray(e, this);
      if (
        !(n =
          "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
            ? [null, e, null]
            : L.exec(e)) ||
        (!n[1] && t)
      )
        return !t || t.jquery ? (t || i).find(e) : this.constructor(t).find(e);
      if (n[1]) {
        if (
          ((t = t instanceof C ? t[0] : t),
          C.merge(
            this,
            C.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : S, !0)
          ),
          A.test(n[1]) && C.isPlainObject(t))
        )
          for (n in t) b(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
        return this;
      }
      return (
        (o = S.getElementById(n[2])) && ((this[0] = o), (this.length = 1)), this
      );
    }).prototype = C.fn),
      (I = C(S));
    var P = /^(?:parents|prev(?:Until|All))/,
      j = { children: !0, contents: !0, next: !0, prev: !0 };
    function N(e, t) {
      for (; (e = e[t]) && 1 !== e.nodeType; );
      return e;
    }
    C.fn.extend({
      has: function (e) {
        var t = C(e, this),
          i = t.length;
        return this.filter(function () {
          for (var e = 0; e < i; e++) if (C.contains(this, t[e])) return !0;
        });
      },
      closest: function (e, t) {
        var i,
          n = 0,
          o = this.length,
          r = [],
          s = "string" != typeof e && C(e);
        if (!T.test(e))
          for (; n < o; n++)
            for (i = this[n]; i && i !== t; i = i.parentNode)
              if (
                i.nodeType < 11 &&
                (s
                  ? -1 < s.index(i)
                  : 1 === i.nodeType && C.find.matchesSelector(i, e))
              ) {
                r.push(i);
                break;
              }
        return this.pushStack(1 < r.length ? C.uniqueSort(r) : r);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? o.call(C(e), this[0])
            : o.call(this, e.jquery ? e[0] : e)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
      C.each(
        {
          parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null;
          },
          parents: function (e) {
            return p(e, "parentNode");
          },
          parentsUntil: function (e, t, i) {
            return p(e, "parentNode", i);
          },
          next: function (e) {
            return N(e, "nextSibling");
          },
          prev: function (e) {
            return N(e, "previousSibling");
          },
          nextAll: function (e) {
            return p(e, "nextSibling");
          },
          prevAll: function (e) {
            return p(e, "previousSibling");
          },
          nextUntil: function (e, t, i) {
            return p(e, "nextSibling", i);
          },
          prevUntil: function (e, t, i) {
            return p(e, "previousSibling", i);
          },
          siblings: function (e) {
            return x((e.parentNode || {}).firstChild, e);
          },
          children: function (e) {
            return x(e.firstChild);
          },
          contents: function (e) {
            return void 0 !== e.contentDocument
              ? e.contentDocument
              : (k(e, "template") && (e = e.content || e),
                C.merge([], e.childNodes));
          },
        },
        function (n, o) {
          C.fn[n] = function (e, t) {
            var i = C.map(this, o, e);
            return (
              "Until" !== n.slice(-5) && (t = e),
              t && "string" == typeof t && (i = C.filter(t, i)),
              1 < this.length &&
                (j[n] || C.uniqueSort(i), P.test(n) && i.reverse()),
              this.pushStack(i)
            );
          };
        }
      );
    var O = /[^\x20\t\r\n\f]+/g;
    function M(e) {
      return e;
    }
    function z(e) {
      throw e;
    }
    function B(e, t, i, n) {
      var o;
      try {
        e && b((o = e.promise))
          ? o.call(e).done(t).fail(i)
          : e && b((o = e.then))
          ? o.call(e, t, i)
          : t.apply(void 0, [e].slice(n));
      } catch (e) {
        i.apply(void 0, [e]);
      }
    }
    (C.Callbacks = function (n) {
      n =
        "string" == typeof n
          ? (function (e) {
              var i = {};
              return (
                C.each(e.match(O) || [], function (e, t) {
                  i[t] = !0;
                }),
                i
              );
            })(n)
          : C.extend({}, n);
      function i() {
        for (r = r || n.once, t = o = !0; a.length; l = -1)
          for (e = a.shift(); ++l < s.length; )
            !1 === s[l].apply(e[0], e[1]) &&
              n.stopOnFalse &&
              ((l = s.length), (e = !1));
        n.memory || (e = !1), (o = !1), r && (s = e ? [] : "");
      }
      var o,
        e,
        t,
        r,
        s = [],
        a = [],
        l = -1,
        c = {
          add: function () {
            return (
              s &&
                (e && !o && ((l = s.length - 1), a.push(e)),
                (function i(e) {
                  C.each(e, function (e, t) {
                    b(t)
                      ? (n.unique && c.has(t)) || s.push(t)
                      : t && t.length && "string" !== w(t) && i(t);
                  });
                })(arguments),
                e && !o && i()),
              this
            );
          },
          remove: function () {
            return (
              C.each(arguments, function (e, t) {
                for (var i; -1 < (i = C.inArray(t, s, i)); )
                  s.splice(i, 1), i <= l && l--;
              }),
              this
            );
          },
          has: function (e) {
            return e ? -1 < C.inArray(e, s) : 0 < s.length;
          },
          empty: function () {
            return (s = s && []), this;
          },
          disable: function () {
            return (r = a = []), (s = e = ""), this;
          },
          disabled: function () {
            return !s;
          },
          lock: function () {
            return (r = a = []), e || o || (s = e = ""), this;
          },
          locked: function () {
            return !!r;
          },
          fireWith: function (e, t) {
            return (
              r ||
                ((t = [e, (t = t || []).slice ? t.slice() : t]),
                a.push(t),
                o || i()),
              this
            );
          },
          fire: function () {
            return c.fireWith(this, arguments), this;
          },
          fired: function () {
            return !!t;
          },
        };
      return c;
    }),
      C.extend({
        Deferred: function (e) {
          var r = [
              [
                "notify",
                "progress",
                C.Callbacks("memory"),
                C.Callbacks("memory"),
                2,
              ],
              [
                "resolve",
                "done",
                C.Callbacks("once memory"),
                C.Callbacks("once memory"),
                0,
                "resolved",
              ],
              [
                "reject",
                "fail",
                C.Callbacks("once memory"),
                C.Callbacks("once memory"),
                1,
                "rejected",
              ],
            ],
            o = "pending",
            s = {
              state: function () {
                return o;
              },
              always: function () {
                return a.done(arguments).fail(arguments), this;
              },
              catch: function (e) {
                return s.then(null, e);
              },
              pipe: function () {
                var o = arguments;
                return C.Deferred(function (n) {
                  C.each(r, function (e, t) {
                    var i = b(o[t[4]]) && o[t[4]];
                    a[t[1]](function () {
                      var e = i && i.apply(this, arguments);
                      e && b(e.promise)
                        ? e
                            .promise()
                            .progress(n.notify)
                            .done(n.resolve)
                            .fail(n.reject)
                        : n[t[0] + "With"](this, i ? [e] : arguments);
                    });
                  }),
                    (o = null);
                }).promise();
              },
              then: function (t, i, n) {
                var l = 0;
                function c(o, r, s, a) {
                  return function () {
                    function e() {
                      var e, t;
                      if (!(o < l)) {
                        if ((e = s.apply(i, n)) === r.promise())
                          throw new TypeError("Thenable self-resolution");
                        (t =
                          e &&
                          ("object" == typeof e || "function" == typeof e) &&
                          e.then),
                          b(t)
                            ? a
                              ? t.call(e, c(l, r, M, a), c(l, r, z, a))
                              : (l++,
                                t.call(
                                  e,
                                  c(l, r, M, a),
                                  c(l, r, z, a),
                                  c(l, r, M, r.notifyWith)
                                ))
                            : (s !== M && ((i = void 0), (n = [e])),
                              (a || r.resolveWith)(i, n));
                      }
                    }
                    var i = this,
                      n = arguments,
                      t = a
                        ? e
                        : function () {
                            try {
                              e();
                            } catch (e) {
                              C.Deferred.exceptionHook &&
                                C.Deferred.exceptionHook(e, t.stackTrace),
                                l <= o + 1 &&
                                  (s !== z && ((i = void 0), (n = [e])),
                                  r.rejectWith(i, n));
                            }
                          };
                    o
                      ? t()
                      : (C.Deferred.getStackHook &&
                          (t.stackTrace = C.Deferred.getStackHook()),
                        E.setTimeout(t));
                  };
                }
                return C.Deferred(function (e) {
                  r[0][3].add(c(0, e, b(n) ? n : M, e.notifyWith)),
                    r[1][3].add(c(0, e, b(t) ? t : M)),
                    r[2][3].add(c(0, e, b(i) ? i : z));
                }).promise();
              },
              promise: function (e) {
                return null != e ? C.extend(e, s) : s;
              },
            },
            a = {};
          return (
            C.each(r, function (e, t) {
              var i = t[2],
                n = t[5];
              (s[t[1]] = i.add),
                n &&
                  i.add(
                    function () {
                      o = n;
                    },
                    r[3 - e][2].disable,
                    r[3 - e][3].disable,
                    r[0][2].lock,
                    r[0][3].lock
                  ),
                i.add(t[3].fire),
                (a[t[0]] = function () {
                  return (
                    a[t[0] + "With"](this === a ? void 0 : this, arguments),
                    this
                  );
                }),
                (a[t[0] + "With"] = i.fireWith);
            }),
            s.promise(a),
            e && e.call(a, a),
            a
          );
        },
        when: function (e) {
          function t(t) {
            return function (e) {
              (o[t] = this),
                (r[t] = 1 < arguments.length ? a.call(arguments) : e),
                --i || s.resolveWith(o, r);
            };
          }
          var i = arguments.length,
            n = i,
            o = Array(n),
            r = a.call(arguments),
            s = C.Deferred();
          if (
            i <= 1 &&
            (B(e, s.done(t(n)).resolve, s.reject, !i),
            "pending" === s.state() || b(r[n] && r[n].then))
          )
            return s.then();
          for (; n--; ) B(r[n], t(n), s.reject);
          return s.promise();
        },
      });
    var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (C.Deferred.exceptionHook = function (e, t) {
      E.console &&
        E.console.warn &&
        e &&
        H.test(e.name) &&
        E.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t);
    }),
      (C.readyException = function (e) {
        E.setTimeout(function () {
          throw e;
        });
      });
    var R = C.Deferred();
    function q() {
      S.removeEventListener("DOMContentLoaded", q),
        E.removeEventListener("load", q),
        C.ready();
    }
    (C.fn.ready = function (e) {
      return (
        R.then(e).catch(function (e) {
          C.readyException(e);
        }),
        this
      );
    }),
      C.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
          (!0 === e ? --C.readyWait : C.isReady) ||
            ((C.isReady = !0) !== e && 0 < --C.readyWait) ||
            R.resolveWith(S, [C]);
        },
      }),
      (C.ready.then = R.then),
      "complete" === S.readyState ||
      ("loading" !== S.readyState && !S.documentElement.doScroll)
        ? E.setTimeout(C.ready)
        : (S.addEventListener("DOMContentLoaded", q),
          E.addEventListener("load", q));
    var F = function (e, t, i, n, o, r, s) {
        var a = 0,
          l = e.length,
          c = null == i;
        if ("object" === w(i))
          for (a in ((o = !0), i)) F(e, t, a, i[a], !0, r, s);
        else if (
          void 0 !== n &&
          ((o = !0),
          b(n) || (s = !0),
          c &&
            (t = s
              ? (t.call(e, n), null)
              : ((c = t),
                function (e, t, i) {
                  return c.call(C(e), i);
                })),
          t)
        )
          for (; a < l; a++) t(e[a], i, s ? n : n.call(e[a], a, t(e[a], i)));
        return o ? e : c ? t.call(e) : l ? t(e[0], i) : r;
      },
      W = /^-ms-/,
      $ = /-([a-z])/g;
    function V(e, t) {
      return t.toUpperCase();
    }
    function U(e) {
      return e.replace(W, "ms-").replace($, V);
    }
    function Y(e) {
      return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    function Q() {
      this.expando = C.expando + Q.uid++;
    }
    (Q.uid = 1),
      (Q.prototype = {
        cache: function (e) {
          var t = e[this.expando];
          return (
            t ||
              ((t = {}),
              Y(e) &&
                (e.nodeType
                  ? (e[this.expando] = t)
                  : Object.defineProperty(e, this.expando, {
                      value: t,
                      configurable: !0,
                    }))),
            t
          );
        },
        set: function (e, t, i) {
          var n,
            o = this.cache(e);
          if ("string" == typeof t) o[U(t)] = i;
          else for (n in t) o[U(n)] = t[n];
          return o;
        },
        get: function (e, t) {
          return void 0 === t
            ? this.cache(e)
            : e[this.expando] && e[this.expando][U(t)];
        },
        access: function (e, t, i) {
          return void 0 === t || (t && "string" == typeof t && void 0 === i)
            ? this.get(e, t)
            : (this.set(e, t, i), void 0 !== i ? i : t);
        },
        remove: function (e, t) {
          var i,
            n = e[this.expando];
          if (void 0 !== n) {
            if (void 0 !== t) {
              i = (t = Array.isArray(t)
                ? t.map(U)
                : (t = U(t)) in n
                ? [t]
                : t.match(O) || []).length;
              for (; i--; ) delete n[t[i]];
            }
            (void 0 !== t && !C.isEmptyObject(n)) ||
              (e.nodeType
                ? (e[this.expando] = void 0)
                : delete e[this.expando]);
          }
        },
        hasData: function (e) {
          var t = e[this.expando];
          return void 0 !== t && !C.isEmptyObject(t);
        },
      });
    var X = new Q(),
      G = new Q(),
      K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      J = /[A-Z]/g;
    function Z(e, t, i) {
      var n;
      if (void 0 === i && 1 === e.nodeType)
        if (
          ((n = "data-" + t.replace(J, "-$&").toLowerCase()),
          "string" == typeof (i = e.getAttribute(n)))
        ) {
          try {
            i = (function (e) {
              return (
                "true" === e ||
                ("false" !== e &&
                  ("null" === e
                    ? null
                    : e === +e + ""
                    ? +e
                    : K.test(e)
                    ? JSON.parse(e)
                    : e))
              );
            })(i);
          } catch (e) {}
          G.set(e, t, i);
        } else i = void 0;
      return i;
    }
    C.extend({
      hasData: function (e) {
        return G.hasData(e) || X.hasData(e);
      },
      data: function (e, t, i) {
        return G.access(e, t, i);
      },
      removeData: function (e, t) {
        G.remove(e, t);
      },
      _data: function (e, t, i) {
        return X.access(e, t, i);
      },
      _removeData: function (e, t) {
        X.remove(e, t);
      },
    }),
      C.fn.extend({
        data: function (i, e) {
          var t,
            n,
            o,
            r = this[0],
            s = r && r.attributes;
          if (void 0 !== i)
            return "object" == typeof i
              ? this.each(function () {
                  G.set(this, i);
                })
              : F(
                  this,
                  function (e) {
                    var t;
                    if (r && void 0 === e)
                      return void 0 !== (t = G.get(r, i))
                        ? t
                        : void 0 !== (t = Z(r, i))
                        ? t
                        : void 0;
                    this.each(function () {
                      G.set(this, i, e);
                    });
                  },
                  null,
                  e,
                  1 < arguments.length,
                  null,
                  !0
                );
          if (
            this.length &&
            ((o = G.get(r)), 1 === r.nodeType && !X.get(r, "hasDataAttrs"))
          ) {
            for (t = s.length; t--; )
              s[t] &&
                0 === (n = s[t].name).indexOf("data-") &&
                ((n = U(n.slice(5))), Z(r, n, o[n]));
            X.set(r, "hasDataAttrs", !0);
          }
          return o;
        },
        removeData: function (e) {
          return this.each(function () {
            G.remove(this, e);
          });
        },
      }),
      C.extend({
        queue: function (e, t, i) {
          var n;
          if (e)
            return (
              (t = (t || "fx") + "queue"),
              (n = X.get(e, t)),
              i &&
                (!n || Array.isArray(i)
                  ? (n = X.access(e, t, C.makeArray(i)))
                  : n.push(i)),
              n || []
            );
        },
        dequeue: function (e, t) {
          t = t || "fx";
          var i = C.queue(e, t),
            n = i.length,
            o = i.shift(),
            r = C._queueHooks(e, t);
          "inprogress" === o && ((o = i.shift()), n--),
            o &&
              ("fx" === t && i.unshift("inprogress"),
              delete r.stop,
              o.call(
                e,
                function () {
                  C.dequeue(e, t);
                },
                r
              )),
            !n && r && r.empty.fire();
        },
        _queueHooks: function (e, t) {
          var i = t + "queueHooks";
          return (
            X.get(e, i) ||
            X.access(e, i, {
              empty: C.Callbacks("once memory").add(function () {
                X.remove(e, [t + "queue", i]);
              }),
            })
          );
        },
      }),
      C.fn.extend({
        queue: function (t, i) {
          var e = 2;
          return (
            "string" != typeof t && ((i = t), (t = "fx"), e--),
            arguments.length < e
              ? C.queue(this[0], t)
              : void 0 === i
              ? this
              : this.each(function () {
                  var e = C.queue(this, t, i);
                  C._queueHooks(this, t),
                    "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t);
                })
          );
        },
        dequeue: function (e) {
          return this.each(function () {
            C.dequeue(this, e);
          });
        },
        clearQueue: function (e) {
          return this.queue(e || "fx", []);
        },
        promise: function (e, t) {
          function i() {
            --o || r.resolveWith(s, [s]);
          }
          var n,
            o = 1,
            r = C.Deferred(),
            s = this,
            a = this.length;
          for (
            "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
            a--;

          )
            (n = X.get(s[a], e + "queueHooks")) &&
              n.empty &&
              (o++, n.empty.add(i));
          return i(), r.promise(t);
        },
      });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
      ie = ["Top", "Right", "Bottom", "Left"],
      ne = S.documentElement,
      oe = function (e) {
        return C.contains(e.ownerDocument, e);
      },
      re = { composed: !0 };
    ne.getRootNode &&
      (oe = function (e) {
        return (
          C.contains(e.ownerDocument, e) ||
          e.getRootNode(re) === e.ownerDocument
        );
      });
    function se(e, t, i, n) {
      var o,
        r,
        s = {};
      for (r in t) (s[r] = e.style[r]), (e.style[r] = t[r]);
      for (r in ((o = i.apply(e, n || [])), t)) e.style[r] = s[r];
      return o;
    }
    var ae = function (e, t) {
      return (
        "none" === (e = t || e).style.display ||
        ("" === e.style.display && oe(e) && "none" === C.css(e, "display"))
      );
    };
    function le(e, t, i, n) {
      var o,
        r,
        s = 20,
        a = n
          ? function () {
              return n.cur();
            }
          : function () {
              return C.css(e, t, "");
            },
        l = a(),
        c = (i && i[3]) || (C.cssNumber[t] ? "" : "px"),
        u =
          e.nodeType &&
          (C.cssNumber[t] || ("px" !== c && +l)) &&
          te.exec(C.css(e, t));
      if (u && u[3] !== c) {
        for (l /= 2, c = c || u[3], u = +l || 1; s--; )
          C.style(e, t, u + c),
            (1 - r) * (1 - (r = a() / l || 0.5)) <= 0 && (s = 0),
            (u /= r);
        (u *= 2), C.style(e, t, u + c), (i = i || []);
      }
      return (
        i &&
          ((u = +u || +l || 0),
          (o = i[1] ? u + (i[1] + 1) * i[2] : +i[2]),
          n && ((n.unit = c), (n.start = u), (n.end = o))),
        o
      );
    }
    var ce = {};
    function ue(e, t) {
      for (var i, n, o, r, s, a, l, c = [], u = 0, h = e.length; u < h; u++)
        (n = e[u]).style &&
          ((i = n.style.display),
          t
            ? ("none" === i &&
                ((c[u] = X.get(n, "display") || null),
                c[u] || (n.style.display = "")),
              "" === n.style.display &&
                ae(n) &&
                (c[u] =
                  ((l = s = r = void 0),
                  (s = (o = n).ownerDocument),
                  (a = o.nodeName),
                  (l = ce[a]) ||
                    ((r = s.body.appendChild(s.createElement(a))),
                    (l = C.css(r, "display")),
                    r.parentNode.removeChild(r),
                    "none" === l && (l = "block"),
                    (ce[a] = l)))))
            : "none" !== i && ((c[u] = "none"), X.set(n, "display", i)));
      for (u = 0; u < h; u++) null != c[u] && (e[u].style.display = c[u]);
      return e;
    }
    C.fn.extend({
      show: function () {
        return ue(this, !0);
      },
      hide: function () {
        return ue(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              ae(this) ? C(this).show() : C(this).hide();
            });
      },
    });
    var he = /^(?:checkbox|radio)$/i,
      de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
      fe = /^$|^module$|\/(?:java|ecma)script/i,
      pe = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
      };
    function me(e, t) {
      var i;
      return (
        (i =
          void 0 !== e.getElementsByTagName
            ? e.getElementsByTagName(t || "*")
            : void 0 !== e.querySelectorAll
            ? e.querySelectorAll(t || "*")
            : []),
        void 0 === t || (t && k(e, t)) ? C.merge([e], i) : i
      );
    }
    function ge(e, t) {
      for (var i = 0, n = e.length; i < n; i++)
        X.set(e[i], "globalEval", !t || X.get(t[i], "globalEval"));
    }
    (pe.optgroup = pe.option),
      (pe.tbody = pe.tfoot = pe.colgroup = pe.caption = pe.thead),
      (pe.th = pe.td);
    var ve,
      ye,
      be = /<|&#?\w+;/;
    function _e(e, t, i, n, o) {
      for (
        var r,
          s,
          a,
          l,
          c,
          u,
          h = t.createDocumentFragment(),
          d = [],
          f = 0,
          p = e.length;
        f < p;
        f++
      )
        if ((r = e[f]) || 0 === r)
          if ("object" === w(r)) C.merge(d, r.nodeType ? [r] : r);
          else if (be.test(r)) {
            for (
              s = s || h.appendChild(t.createElement("div")),
                a = (de.exec(r) || ["", ""])[1].toLowerCase(),
                l = pe[a] || pe._default,
                s.innerHTML = l[1] + C.htmlPrefilter(r) + l[2],
                u = l[0];
              u--;

            )
              s = s.lastChild;
            C.merge(d, s.childNodes), ((s = h.firstChild).textContent = "");
          } else d.push(t.createTextNode(r));
      for (h.textContent = "", f = 0; (r = d[f++]); )
        if (n && -1 < C.inArray(r, n)) o && o.push(r);
        else if (
          ((c = oe(r)), (s = me(h.appendChild(r), "script")), c && ge(s), i)
        )
          for (u = 0; (r = s[u++]); ) fe.test(r.type || "") && i.push(r);
      return h;
    }
    (ve = S.createDocumentFragment().appendChild(S.createElement("div"))),
      (ye = S.createElement("input")).setAttribute("type", "radio"),
      ye.setAttribute("checked", "checked"),
      ye.setAttribute("name", "t"),
      ve.appendChild(ye),
      (y.checkClone = ve.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (ve.innerHTML = "<textarea>x</textarea>"),
      (y.noCloneChecked = !!ve.cloneNode(!0).lastChild.defaultValue);
    var we = /^key/,
      xe = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      Ee = /^([^.]*)(?:\.(.+)|)/;
    function Se() {
      return !0;
    }
    function Ce() {
      return !1;
    }
    function Te(e, t) {
      return (
        (e ===
          (function () {
            try {
              return S.activeElement;
            } catch (e) {}
          })()) ==
        ("focus" === t)
      );
    }
    function ke(e, t, i, n, o, r) {
      var s, a;
      if ("object" == typeof t) {
        for (a in ("string" != typeof i && ((n = n || i), (i = void 0)), t))
          ke(e, a, i, n, t[a], r);
        return e;
      }
      if (
        (null == n && null == o
          ? ((o = i), (n = i = void 0))
          : null == o &&
            ("string" == typeof i
              ? ((o = n), (n = void 0))
              : ((o = n), (n = i), (i = void 0))),
        !1 === o)
      )
        o = Ce;
      else if (!o) return e;
      return (
        1 === r &&
          ((s = o),
          ((o = function (e) {
            return C().off(e), s.apply(this, arguments);
          }).guid = s.guid || (s.guid = C.guid++))),
        e.each(function () {
          C.event.add(this, t, o, n, i);
        })
      );
    }
    function Ae(e, o, r) {
      r
        ? (X.set(e, o, !1),
          C.event.add(e, o, {
            namespace: !1,
            handler: function (e) {
              var t,
                i,
                n = X.get(this, o);
              if (1 & e.isTrigger && this[o]) {
                if (n.length)
                  (C.event.special[o] || {}).delegateType &&
                    e.stopPropagation();
                else if (
                  ((n = a.call(arguments)),
                  X.set(this, o, n),
                  (t = r(this, o)),
                  this[o](),
                  n !== (i = X.get(this, o)) || t
                    ? X.set(this, o, !1)
                    : (i = {}),
                  n !== i)
                )
                  return (
                    e.stopImmediatePropagation(), e.preventDefault(), i.value
                  );
              } else
                n.length &&
                  (X.set(this, o, {
                    value: C.event.trigger(
                      C.extend(n[0], C.Event.prototype),
                      n.slice(1),
                      this
                    ),
                  }),
                  e.stopImmediatePropagation());
            },
          }))
        : void 0 === X.get(e, o) && C.event.add(e, o, Se);
    }
    (C.event = {
      global: {},
      add: function (t, e, i, n, o) {
        var r,
          s,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          m,
          g = X.get(t);
        if (g)
          for (
            i.handler && ((i = (r = i).handler), (o = r.selector)),
              o && C.find.matchesSelector(ne, o),
              i.guid || (i.guid = C.guid++),
              (l = g.events) || (l = g.events = {}),
              (s = g.handle) ||
                (s = g.handle =
                  function (e) {
                    return void 0 !== C && C.event.triggered !== e.type
                      ? C.event.dispatch.apply(t, arguments)
                      : void 0;
                  }),
              c = (e = (e || "").match(O) || [""]).length;
            c--;

          )
            (f = m = (a = Ee.exec(e[c]) || [])[1]),
              (p = (a[2] || "").split(".").sort()),
              f &&
                ((h = C.event.special[f] || {}),
                (f = (o ? h.delegateType : h.bindType) || f),
                (h = C.event.special[f] || {}),
                (u = C.extend(
                  {
                    type: f,
                    origType: m,
                    data: n,
                    handler: i,
                    guid: i.guid,
                    selector: o,
                    needsContext: o && C.expr.match.needsContext.test(o),
                    namespace: p.join("."),
                  },
                  r
                )),
                (d = l[f]) ||
                  (((d = l[f] = []).delegateCount = 0),
                  (h.setup && !1 !== h.setup.call(t, n, p, s)) ||
                    (t.addEventListener && t.addEventListener(f, s))),
                h.add &&
                  (h.add.call(t, u),
                  u.handler.guid || (u.handler.guid = i.guid)),
                o ? d.splice(d.delegateCount++, 0, u) : d.push(u),
                (C.event.global[f] = !0));
      },
      remove: function (e, t, i, n, o) {
        var r,
          s,
          a,
          l,
          c,
          u,
          h,
          d,
          f,
          p,
          m,
          g = X.hasData(e) && X.get(e);
        if (g && (l = g.events)) {
          for (c = (t = (t || "").match(O) || [""]).length; c--; )
            if (
              ((f = m = (a = Ee.exec(t[c]) || [])[1]),
              (p = (a[2] || "").split(".").sort()),
              f)
            ) {
              for (
                h = C.event.special[f] || {},
                  d = l[(f = (n ? h.delegateType : h.bindType) || f)] || [],
                  a =
                    a[2] &&
                    new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                  s = r = d.length;
                r--;

              )
                (u = d[r]),
                  (!o && m !== u.origType) ||
                    (i && i.guid !== u.guid) ||
                    (a && !a.test(u.namespace)) ||
                    (n && n !== u.selector && ("**" !== n || !u.selector)) ||
                    (d.splice(r, 1),
                    u.selector && d.delegateCount--,
                    h.remove && h.remove.call(e, u));
              s &&
                !d.length &&
                ((h.teardown && !1 !== h.teardown.call(e, p, g.handle)) ||
                  C.removeEvent(e, f, g.handle),
                delete l[f]);
            } else for (f in l) C.event.remove(e, f + t[c], i, n, !0);
          C.isEmptyObject(l) && X.remove(e, "handle events");
        }
      },
      dispatch: function (e) {
        var t,
          i,
          n,
          o,
          r,
          s,
          a = C.event.fix(e),
          l = new Array(arguments.length),
          c = (X.get(this, "events") || {})[a.type] || [],
          u = C.event.special[a.type] || {};
        for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
        if (
          ((a.delegateTarget = this),
          !u.preDispatch || !1 !== u.preDispatch.call(this, a))
        ) {
          for (
            s = C.event.handlers.call(this, a, c), t = 0;
            (o = s[t++]) && !a.isPropagationStopped();

          )
            for (
              a.currentTarget = o.elem, i = 0;
              (r = o.handlers[i++]) && !a.isImmediatePropagationStopped();

            )
              (a.rnamespace &&
                !1 !== r.namespace &&
                !a.rnamespace.test(r.namespace)) ||
                ((a.handleObj = r),
                (a.data = r.data),
                void 0 !==
                  (n = (
                    (C.event.special[r.origType] || {}).handle || r.handler
                  ).apply(o.elem, l)) &&
                  !1 === (a.result = n) &&
                  (a.preventDefault(), a.stopPropagation()));
          return u.postDispatch && u.postDispatch.call(this, a), a.result;
        }
      },
      handlers: function (e, t) {
        var i,
          n,
          o,
          r,
          s,
          a = [],
          l = t.delegateCount,
          c = e.target;
        if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
          for (; c !== this; c = c.parentNode || this)
            if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
              for (r = [], s = {}, i = 0; i < l; i++)
                void 0 === s[(o = (n = t[i]).selector + " ")] &&
                  (s[o] = n.needsContext
                    ? -1 < C(o, this).index(c)
                    : C.find(o, this, null, [c]).length),
                  s[o] && r.push(n);
              r.length && a.push({ elem: c, handlers: r });
            }
        return (
          (c = this),
          l < t.length && a.push({ elem: c, handlers: t.slice(l) }),
          a
        );
      },
      addProp: function (t, e) {
        Object.defineProperty(C.Event.prototype, t, {
          enumerable: !0,
          configurable: !0,
          get: b(e)
            ? function () {
                if (this.originalEvent) return e(this.originalEvent);
              }
            : function () {
                if (this.originalEvent) return this.originalEvent[t];
              },
          set: function (e) {
            Object.defineProperty(this, t, {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: e,
            });
          },
        });
      },
      fix: function (e) {
        return e[C.expando] ? e : new C.Event(e);
      },
      special: {
        load: { noBubble: !0 },
        click: {
          setup: function (e) {
            var t = this || e;
            return (
              he.test(t.type) && t.click && k(t, "input") && Ae(t, "click", Se),
              !1
            );
          },
          trigger: function (e) {
            var t = this || e;
            return (
              he.test(t.type) && t.click && k(t, "input") && Ae(t, "click"), !0
            );
          },
          _default: function (e) {
            var t = e.target;
            return (
              (he.test(t.type) &&
                t.click &&
                k(t, "input") &&
                X.get(t, "click")) ||
              k(t, "a")
            );
          },
        },
        beforeunload: {
          postDispatch: function (e) {
            void 0 !== e.result &&
              e.originalEvent &&
              (e.originalEvent.returnValue = e.result);
          },
        },
      },
    }),
      (C.removeEvent = function (e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i);
      }),
      (C.Event = function (e, t) {
        if (!(this instanceof C.Event)) return new C.Event(e, t);
        e && e.type
          ? ((this.originalEvent = e),
            (this.type = e.type),
            (this.isDefaultPrevented =
              e.defaultPrevented ||
              (void 0 === e.defaultPrevented && !1 === e.returnValue)
                ? Se
                : Ce),
            (this.target =
              e.target && 3 === e.target.nodeType
                ? e.target.parentNode
                : e.target),
            (this.currentTarget = e.currentTarget),
            (this.relatedTarget = e.relatedTarget))
          : (this.type = e),
          t && C.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || Date.now()),
          (this[C.expando] = !0);
      }),
      (C.Event.prototype = {
        constructor: C.Event,
        isDefaultPrevented: Ce,
        isPropagationStopped: Ce,
        isImmediatePropagationStopped: Ce,
        isSimulated: !1,
        preventDefault: function () {
          var e = this.originalEvent;
          (this.isDefaultPrevented = Se),
            e && !this.isSimulated && e.preventDefault();
        },
        stopPropagation: function () {
          var e = this.originalEvent;
          (this.isPropagationStopped = Se),
            e && !this.isSimulated && e.stopPropagation();
        },
        stopImmediatePropagation: function () {
          var e = this.originalEvent;
          (this.isImmediatePropagationStopped = Se),
            e && !this.isSimulated && e.stopImmediatePropagation(),
            this.stopPropagation();
        },
      }),
      C.each(
        {
          altKey: !0,
          bubbles: !0,
          cancelable: !0,
          changedTouches: !0,
          ctrlKey: !0,
          detail: !0,
          eventPhase: !0,
          metaKey: !0,
          pageX: !0,
          pageY: !0,
          shiftKey: !0,
          view: !0,
          char: !0,
          code: !0,
          charCode: !0,
          key: !0,
          keyCode: !0,
          button: !0,
          buttons: !0,
          clientX: !0,
          clientY: !0,
          offsetX: !0,
          offsetY: !0,
          pointerId: !0,
          pointerType: !0,
          screenX: !0,
          screenY: !0,
          targetTouches: !0,
          toElement: !0,
          touches: !0,
          which: function (e) {
            var t = e.button;
            return null == e.which && we.test(e.type)
              ? null != e.charCode
                ? e.charCode
                : e.keyCode
              : !e.which && void 0 !== t && xe.test(e.type)
              ? 1 & t
                ? 1
                : 2 & t
                ? 3
                : 4 & t
                ? 2
                : 0
              : e.which;
          },
        },
        C.event.addProp
      ),
      C.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        C.event.special[e] = {
          setup: function () {
            return Ae(this, e, Te), !1;
          },
          trigger: function () {
            return Ae(this, e), !0;
          },
          delegateType: t,
        };
      }),
      C.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout",
        },
        function (e, o) {
          C.event.special[e] = {
            delegateType: o,
            bindType: o,
            handle: function (e) {
              var t,
                i = e.relatedTarget,
                n = e.handleObj;
              return (
                (i && (i === this || C.contains(this, i))) ||
                  ((e.type = n.origType),
                  (t = n.handler.apply(this, arguments)),
                  (e.type = o)),
                t
              );
            },
          };
        }
      ),
      C.fn.extend({
        on: function (e, t, i, n) {
          return ke(this, e, t, i, n);
        },
        one: function (e, t, i, n) {
          return ke(this, e, t, i, n, 1);
        },
        off: function (e, t, i) {
          var n, o;
          if (e && e.preventDefault && e.handleObj)
            return (
              (n = e.handleObj),
              C(e.delegateTarget).off(
                n.namespace ? n.origType + "." + n.namespace : n.origType,
                n.selector,
                n.handler
              ),
              this
            );
          if ("object" != typeof e)
            return (
              (!1 !== t && "function" != typeof t) || ((i = t), (t = void 0)),
              !1 === i && (i = Ce),
              this.each(function () {
                C.event.remove(this, e, i, t);
              })
            );
          for (o in e) this.off(o, t, e[o]);
          return this;
        },
      });
    var De =
        /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Ie = /<script|<style|<link/i,
      Le = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function je(e, t) {
      return (
        (k(e, "table") &&
          k(11 !== t.nodeType ? t : t.firstChild, "tr") &&
          C(e).children("tbody")[0]) ||
        e
      );
    }
    function Ne(e) {
      return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function Oe(e) {
      return (
        "true/" === (e.type || "").slice(0, 5)
          ? (e.type = e.type.slice(5))
          : e.removeAttribute("type"),
        e
      );
    }
    function Me(e, t) {
      var i, n, o, r, s, a, l, c;
      if (1 === t.nodeType) {
        if (
          X.hasData(e) &&
          ((r = X.access(e)), (s = X.set(t, r)), (c = r.events))
        )
          for (o in (delete s.handle, (s.events = {}), c))
            for (i = 0, n = c[o].length; i < n; i++) C.event.add(t, o, c[o][i]);
        G.hasData(e) && ((a = G.access(e)), (l = C.extend({}, a)), G.set(t, l));
      }
    }
    function ze(i, n, o, r) {
      n = g.apply([], n);
      var e,
        t,
        s,
        a,
        l,
        c,
        u = 0,
        h = i.length,
        d = h - 1,
        f = n[0],
        p = b(f);
      if (p || (1 < h && "string" == typeof f && !y.checkClone && Le.test(f)))
        return i.each(function (e) {
          var t = i.eq(e);
          p && (n[0] = f.call(this, e, t.html())), ze(t, n, o, r);
        });
      if (
        h &&
        ((t = (e = _e(n, i[0].ownerDocument, !1, i, r)).firstChild),
        1 === e.childNodes.length && (e = t),
        t || r)
      ) {
        for (a = (s = C.map(me(e, "script"), Ne)).length; u < h; u++)
          (l = e),
            u !== d &&
              ((l = C.clone(l, !0, !0)), a && C.merge(s, me(l, "script"))),
            o.call(i[u], l, u);
        if (a)
          for (
            c = s[s.length - 1].ownerDocument, C.map(s, Oe), u = 0;
            u < a;
            u++
          )
            (l = s[u]),
              fe.test(l.type || "") &&
                !X.access(l, "globalEval") &&
                C.contains(c, l) &&
                (l.src && "module" !== (l.type || "").toLowerCase()
                  ? C._evalUrl &&
                    !l.noModule &&
                    C._evalUrl(l.src, {
                      nonce: l.nonce || l.getAttribute("nonce"),
                    })
                  : _(l.textContent.replace(Pe, ""), l, c));
      }
      return i;
    }
    function Be(e, t, i) {
      for (var n, o = t ? C.filter(t, e) : e, r = 0; null != (n = o[r]); r++)
        i || 1 !== n.nodeType || C.cleanData(me(n)),
          n.parentNode &&
            (i && oe(n) && ge(me(n, "script")), n.parentNode.removeChild(n));
      return e;
    }
    C.extend({
      htmlPrefilter: function (e) {
        return e.replace(De, "<$1></$2>");
      },
      clone: function (e, t, i) {
        var n,
          o,
          r,
          s,
          a,
          l,
          c,
          u = e.cloneNode(!0),
          h = oe(e);
        if (
          !(
            y.noCloneChecked ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            C.isXMLDoc(e)
          )
        )
          for (s = me(u), n = 0, o = (r = me(e)).length; n < o; n++)
            (a = r[n]),
              (l = s[n]),
              void 0,
              "input" === (c = l.nodeName.toLowerCase()) && he.test(a.type)
                ? (l.checked = a.checked)
                : ("input" !== c && "textarea" !== c) ||
                  (l.defaultValue = a.defaultValue);
        if (t)
          if (i)
            for (
              r = r || me(e), s = s || me(u), n = 0, o = r.length;
              n < o;
              n++
            )
              Me(r[n], s[n]);
          else Me(e, u);
        return (
          0 < (s = me(u, "script")).length && ge(s, !h && me(e, "script")), u
        );
      },
      cleanData: function (e) {
        for (
          var t, i, n, o = C.event.special, r = 0;
          void 0 !== (i = e[r]);
          r++
        )
          if (Y(i)) {
            if ((t = i[X.expando])) {
              if (t.events)
                for (n in t.events)
                  o[n] ? C.event.remove(i, n) : C.removeEvent(i, n, t.handle);
              i[X.expando] = void 0;
            }
            i[G.expando] && (i[G.expando] = void 0);
          }
      },
    }),
      C.fn.extend({
        detach: function (e) {
          return Be(this, e, !0);
        },
        remove: function (e) {
          return Be(this, e);
        },
        text: function (e) {
          return F(
            this,
            function (e) {
              return void 0 === e
                ? C.text(this)
                : this.empty().each(function () {
                    (1 !== this.nodeType &&
                      11 !== this.nodeType &&
                      9 !== this.nodeType) ||
                      (this.textContent = e);
                  });
            },
            null,
            e,
            arguments.length
          );
        },
        append: function () {
          return ze(this, arguments, function (e) {
            (1 !== this.nodeType &&
              11 !== this.nodeType &&
              9 !== this.nodeType) ||
              je(this, e).appendChild(e);
          });
        },
        prepend: function () {
          return ze(this, arguments, function (e) {
            if (
              1 === this.nodeType ||
              11 === this.nodeType ||
              9 === this.nodeType
            ) {
              var t = je(this, e);
              t.insertBefore(e, t.firstChild);
            }
          });
        },
        before: function () {
          return ze(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        },
        after: function () {
          return ze(this, arguments, function (e) {
            this.parentNode &&
              this.parentNode.insertBefore(e, this.nextSibling);
          });
        },
        empty: function () {
          for (var e, t = 0; null != (e = this[t]); t++)
            1 === e.nodeType && (C.cleanData(me(e, !1)), (e.textContent = ""));
          return this;
        },
        clone: function (e, t) {
          return (
            (e = null != e && e),
            (t = null == t ? e : t),
            this.map(function () {
              return C.clone(this, e, t);
            })
          );
        },
        html: function (e) {
          return F(
            this,
            function (e) {
              var t = this[0] || {},
                i = 0,
                n = this.length;
              if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
              if (
                "string" == typeof e &&
                !Ie.test(e) &&
                !pe[(de.exec(e) || ["", ""])[1].toLowerCase()]
              ) {
                e = C.htmlPrefilter(e);
                try {
                  for (; i < n; i++)
                    1 === (t = this[i] || {}).nodeType &&
                      (C.cleanData(me(t, !1)), (t.innerHTML = e));
                  t = 0;
                } catch (e) {}
              }
              t && this.empty().append(e);
            },
            null,
            e,
            arguments.length
          );
        },
        replaceWith: function () {
          var i = [];
          return ze(
            this,
            arguments,
            function (e) {
              var t = this.parentNode;
              C.inArray(this, i) < 0 &&
                (C.cleanData(me(this)), t && t.replaceChild(e, this));
            },
            i
          );
        },
      }),
      C.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith",
        },
        function (e, s) {
          C.fn[e] = function (e) {
            for (var t, i = [], n = C(e), o = n.length - 1, r = 0; r <= o; r++)
              (t = r === o ? this : this.clone(!0)),
                C(n[r])[s](t),
                l.apply(i, t.get());
            return this.pushStack(i);
          };
        }
      );
    var He,
      Re,
      qe,
      Fe,
      We,
      $e,
      Ve,
      Ue = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
      Ye = function (e) {
        var t = e.ownerDocument.defaultView;
        return (t && t.opener) || (t = E), t.getComputedStyle(e);
      },
      Qe = new RegExp(ie.join("|"), "i");
    function Xe() {
      if (Ve) {
        ($e.style.cssText =
          "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
          (Ve.style.cssText =
            "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
          ne.appendChild($e).appendChild(Ve);
        var e = E.getComputedStyle(Ve);
        (He = "1%" !== e.top),
          (We = 12 === Ge(e.marginLeft)),
          (Ve.style.right = "60%"),
          (Fe = 36 === Ge(e.right)),
          (Re = 36 === Ge(e.width)),
          (Ve.style.position = "absolute"),
          (qe = 12 === Ge(Ve.offsetWidth / 3)),
          ne.removeChild($e),
          (Ve = null);
      }
    }
    function Ge(e) {
      return Math.round(parseFloat(e));
    }
    function Ke(e, t, i) {
      var n,
        o,
        r,
        s,
        a = e.style;
      return (
        (i = i || Ye(e)) &&
          ("" !== (s = i.getPropertyValue(t) || i[t]) ||
            oe(e) ||
            (s = C.style(e, t)),
          !y.pixelBoxStyles() &&
            Ue.test(s) &&
            Qe.test(t) &&
            ((n = a.width),
            (o = a.minWidth),
            (r = a.maxWidth),
            (a.minWidth = a.maxWidth = a.width = s),
            (s = i.width),
            (a.width = n),
            (a.minWidth = o),
            (a.maxWidth = r))),
        void 0 !== s ? s + "" : s
      );
    }
    function Je(e, t) {
      return {
        get: function () {
          if (!e()) return (this.get = t).apply(this, arguments);
          delete this.get;
        },
      };
    }
    ($e = S.createElement("div")),
      (Ve = S.createElement("div")).style &&
        ((Ve.style.backgroundClip = "content-box"),
        (Ve.cloneNode(!0).style.backgroundClip = ""),
        (y.clearCloneStyle = "content-box" === Ve.style.backgroundClip),
        C.extend(y, {
          boxSizingReliable: function () {
            return Xe(), Re;
          },
          pixelBoxStyles: function () {
            return Xe(), Fe;
          },
          pixelPosition: function () {
            return Xe(), He;
          },
          reliableMarginLeft: function () {
            return Xe(), We;
          },
          scrollboxSize: function () {
            return Xe(), qe;
          },
        }));
    var Ze = ["Webkit", "Moz", "ms"],
      et = S.createElement("div").style,
      tt = {};
    function it(e) {
      var t = C.cssProps[e] || tt[e];
      return (
        t ||
        (e in et
          ? e
          : (tt[e] =
              (function (e) {
                for (
                  var t = e[0].toUpperCase() + e.slice(1), i = Ze.length;
                  i--;

                )
                  if ((e = Ze[i] + t) in et) return e;
              })(e) || e))
      );
    }
    var nt = /^(none|table(?!-c[ea]).+)/,
      ot = /^--/,
      rt = { position: "absolute", visibility: "hidden", display: "block" },
      st = { letterSpacing: "0", fontWeight: "400" };
    function at(e, t, i) {
      var n = te.exec(t);
      return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : t;
    }
    function lt(e, t, i, n, o, r) {
      var s = "width" === t ? 1 : 0,
        a = 0,
        l = 0;
      if (i === (n ? "border" : "content")) return 0;
      for (; s < 4; s += 2)
        "margin" === i && (l += C.css(e, i + ie[s], !0, o)),
          n
            ? ("content" === i && (l -= C.css(e, "padding" + ie[s], !0, o)),
              "margin" !== i &&
                (l -= C.css(e, "border" + ie[s] + "Width", !0, o)))
            : ((l += C.css(e, "padding" + ie[s], !0, o)),
              "padding" !== i
                ? (l += C.css(e, "border" + ie[s] + "Width", !0, o))
                : (a += C.css(e, "border" + ie[s] + "Width", !0, o)));
      return (
        !n &&
          0 <= r &&
          (l +=
            Math.max(
              0,
              Math.ceil(
                e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - 0.5
              )
            ) || 0),
        l
      );
    }
    function ct(e, t, i) {
      var n = Ye(e),
        o =
          (!y.boxSizingReliable() || i) &&
          "border-box" === C.css(e, "boxSizing", !1, n),
        r = o,
        s = Ke(e, t, n),
        a = "offset" + t[0].toUpperCase() + t.slice(1);
      if (Ue.test(s)) {
        if (!i) return s;
        s = "auto";
      }
      return (
        ((!y.boxSizingReliable() && o) ||
          "auto" === s ||
          (!parseFloat(s) && "inline" === C.css(e, "display", !1, n))) &&
          e.getClientRects().length &&
          ((o = "border-box" === C.css(e, "boxSizing", !1, n)),
          (r = a in e) && (s = e[a])),
        (s = parseFloat(s) || 0) +
          lt(e, t, i || (o ? "border" : "content"), r, n, s) +
          "px"
      );
    }
    function ut(e, t, i, n, o) {
      return new ut.prototype.init(e, t, i, n, o);
    }
    C.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var i = Ke(e, "opacity");
              return "" === i ? "1" : i;
            }
          },
        },
      },
      cssNumber: {
        animationIterationCount: !0,
        columnCount: !0,
        fillOpacity: !0,
        flexGrow: !0,
        flexShrink: !0,
        fontWeight: !0,
        gridArea: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnStart: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowStart: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: {},
      style: function (e, t, i, n) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var o,
            r,
            s,
            a = U(t),
            l = ot.test(t),
            c = e.style;
          if (
            (l || (t = it(a)),
            (s = C.cssHooks[t] || C.cssHooks[a]),
            void 0 === i)
          )
            return s && "get" in s && void 0 !== (o = s.get(e, !1, n))
              ? o
              : c[t];
          "string" === (r = typeof i) &&
            (o = te.exec(i)) &&
            o[1] &&
            ((i = le(e, t, o)), (r = "number")),
            null != i &&
              i == i &&
              ("number" !== r ||
                l ||
                (i += (o && o[3]) || (C.cssNumber[a] ? "" : "px")),
              y.clearCloneStyle ||
                "" !== i ||
                0 !== t.indexOf("background") ||
                (c[t] = "inherit"),
              (s && "set" in s && void 0 === (i = s.set(e, i, n))) ||
                (l ? c.setProperty(t, i) : (c[t] = i)));
        }
      },
      css: function (e, t, i, n) {
        var o,
          r,
          s,
          a = U(t);
        return (
          ot.test(t) || (t = it(a)),
          (s = C.cssHooks[t] || C.cssHooks[a]) &&
            "get" in s &&
            (o = s.get(e, !0, i)),
          void 0 === o && (o = Ke(e, t, n)),
          "normal" === o && t in st && (o = st[t]),
          "" === i || i
            ? ((r = parseFloat(o)), !0 === i || isFinite(r) ? r || 0 : o)
            : o
        );
      },
    }),
      C.each(["height", "width"], function (e, l) {
        C.cssHooks[l] = {
          get: function (e, t, i) {
            if (t)
              return !nt.test(C.css(e, "display")) ||
                (e.getClientRects().length && e.getBoundingClientRect().width)
                ? ct(e, l, i)
                : se(e, rt, function () {
                    return ct(e, l, i);
                  });
          },
          set: function (e, t, i) {
            var n,
              o = Ye(e),
              r = !y.scrollboxSize() && "absolute" === o.position,
              s = (r || i) && "border-box" === C.css(e, "boxSizing", !1, o),
              a = i ? lt(e, l, i, s, o) : 0;
            return (
              s &&
                r &&
                (a -= Math.ceil(
                  e["offset" + l[0].toUpperCase() + l.slice(1)] -
                    parseFloat(o[l]) -
                    lt(e, l, "border", !1, o) -
                    0.5
                )),
              a &&
                (n = te.exec(t)) &&
                "px" !== (n[3] || "px") &&
                ((e.style[l] = t), (t = C.css(e, l))),
              at(0, t, a)
            );
          },
        };
      }),
      (C.cssHooks.marginLeft = Je(y.reliableMarginLeft, function (e, t) {
        if (t)
          return (
            (parseFloat(Ke(e, "marginLeft")) ||
              e.getBoundingClientRect().left -
                se(e, { marginLeft: 0 }, function () {
                  return e.getBoundingClientRect().left;
                })) + "px"
          );
      })),
      C.each({ margin: "", padding: "", border: "Width" }, function (o, r) {
        (C.cssHooks[o + r] = {
          expand: function (e) {
            for (
              var t = 0, i = {}, n = "string" == typeof e ? e.split(" ") : [e];
              t < 4;
              t++
            )
              i[o + ie[t] + r] = n[t] || n[t - 2] || n[0];
            return i;
          },
        }),
          "margin" !== o && (C.cssHooks[o + r].set = at);
      }),
      C.fn.extend({
        css: function (e, t) {
          return F(
            this,
            function (e, t, i) {
              var n,
                o,
                r = {},
                s = 0;
              if (Array.isArray(t)) {
                for (n = Ye(e), o = t.length; s < o; s++)
                  r[t[s]] = C.css(e, t[s], !1, n);
                return r;
              }
              return void 0 !== i ? C.style(e, t, i) : C.css(e, t);
            },
            e,
            t,
            1 < arguments.length
          );
        },
      }),
      (((C.Tween = ut).prototype = {
        constructor: ut,
        init: function (e, t, i, n, o, r) {
          (this.elem = e),
            (this.prop = i),
            (this.easing = o || C.easing._default),
            (this.options = t),
            (this.start = this.now = this.cur()),
            (this.end = n),
            (this.unit = r || (C.cssNumber[i] ? "" : "px"));
        },
        cur: function () {
          var e = ut.propHooks[this.prop];
          return e && e.get ? e.get(this) : ut.propHooks._default.get(this);
        },
        run: function (e) {
          var t,
            i = ut.propHooks[this.prop];
          return (
            this.options.duration
              ? (this.pos = t =
                  C.easing[this.easing](
                    e,
                    this.options.duration * e,
                    0,
                    1,
                    this.options.duration
                  ))
              : (this.pos = t = e),
            (this.now = (this.end - this.start) * t + this.start),
            this.options.step &&
              this.options.step.call(this.elem, this.now, this),
            i && i.set ? i.set(this) : ut.propHooks._default.set(this),
            this
          );
        },
      }).init.prototype = ut.prototype),
      ((ut.propHooks = {
        _default: {
          get: function (e) {
            var t;
            return 1 !== e.elem.nodeType ||
              (null != e.elem[e.prop] && null == e.elem.style[e.prop])
              ? e.elem[e.prop]
              : (t = C.css(e.elem, e.prop, "")) && "auto" !== t
              ? t
              : 0;
          },
          set: function (e) {
            C.fx.step[e.prop]
              ? C.fx.step[e.prop](e)
              : 1 !== e.elem.nodeType ||
                (!C.cssHooks[e.prop] && null == e.elem.style[it(e.prop)])
              ? (e.elem[e.prop] = e.now)
              : C.style(e.elem, e.prop, e.now + e.unit);
          },
        },
      }).scrollTop = ut.propHooks.scrollLeft =
        {
          set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
          },
        }),
      (C.easing = {
        linear: function (e) {
          return e;
        },
        swing: function (e) {
          return 0.5 - Math.cos(e * Math.PI) / 2;
        },
        _default: "swing",
      }),
      (C.fx = ut.prototype.init),
      (C.fx.step = {});
    var ht,
      dt,
      ft,
      pt,
      mt = /^(?:toggle|show|hide)$/,
      gt = /queueHooks$/;
    function vt() {
      dt &&
        (!1 === S.hidden && E.requestAnimationFrame
          ? E.requestAnimationFrame(vt)
          : E.setTimeout(vt, C.fx.interval),
        C.fx.tick());
    }
    function yt() {
      return (
        E.setTimeout(function () {
          ht = void 0;
        }),
        (ht = Date.now())
      );
    }
    function bt(e, t) {
      var i,
        n = 0,
        o = { height: e };
      for (t = t ? 1 : 0; n < 4; n += 2 - t)
        o["margin" + (i = ie[n])] = o["padding" + i] = e;
      return t && (o.opacity = o.width = e), o;
    }
    function _t(e, t, i) {
      for (
        var n,
          o = (wt.tweeners[t] || []).concat(wt.tweeners["*"]),
          r = 0,
          s = o.length;
        r < s;
        r++
      )
        if ((n = o[r].call(i, t, e))) return n;
    }
    function wt(r, e, t) {
      var i,
        s,
        n = 0,
        o = wt.prefilters.length,
        a = C.Deferred().always(function () {
          delete l.elem;
        }),
        l = function () {
          if (s) return !1;
          for (
            var e = ht || yt(),
              t = Math.max(0, c.startTime + c.duration - e),
              i = 1 - (t / c.duration || 0),
              n = 0,
              o = c.tweens.length;
            n < o;
            n++
          )
            c.tweens[n].run(i);
          return (
            a.notifyWith(r, [c, i, t]),
            i < 1 && o
              ? t
              : (o || a.notifyWith(r, [c, 1, 0]), a.resolveWith(r, [c]), !1)
          );
        },
        c = a.promise({
          elem: r,
          props: C.extend({}, e),
          opts: C.extend(
            !0,
            { specialEasing: {}, easing: C.easing._default },
            t
          ),
          originalProperties: e,
          originalOptions: t,
          startTime: ht || yt(),
          duration: t.duration,
          tweens: [],
          createTween: function (e, t) {
            var i = C.Tween(
              r,
              c.opts,
              e,
              t,
              c.opts.specialEasing[e] || c.opts.easing
            );
            return c.tweens.push(i), i;
          },
          stop: function (e) {
            var t = 0,
              i = e ? c.tweens.length : 0;
            if (s) return this;
            for (s = !0; t < i; t++) c.tweens[t].run(1);
            return (
              e
                ? (a.notifyWith(r, [c, 1, 0]), a.resolveWith(r, [c, e]))
                : a.rejectWith(r, [c, e]),
              this
            );
          },
        }),
        u = c.props;
      for (
        !(function (e, t) {
          var i, n, o, r, s;
          for (i in e)
            if (
              ((o = t[(n = U(i))]),
              (r = e[i]),
              Array.isArray(r) && ((o = r[1]), (r = e[i] = r[0])),
              i !== n && ((e[n] = r), delete e[i]),
              (s = C.cssHooks[n]) && ("expand" in s))
            )
              for (i in ((r = s.expand(r)), delete e[n], r))
                (i in e) || ((e[i] = r[i]), (t[i] = o));
            else t[n] = o;
        })(u, c.opts.specialEasing);
        n < o;
        n++
      )
        if ((i = wt.prefilters[n].call(c, r, u, c.opts)))
          return (
            b(i.stop) &&
              (C._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)),
            i
          );
      return (
        C.map(u, _t, c),
        b(c.opts.start) && c.opts.start.call(r, c),
        c
          .progress(c.opts.progress)
          .done(c.opts.done, c.opts.complete)
          .fail(c.opts.fail)
          .always(c.opts.always),
        C.fx.timer(C.extend(l, { elem: r, anim: c, queue: c.opts.queue })),
        c
      );
    }
    (C.Animation = C.extend(wt, {
      tweeners: {
        "*": [
          function (e, t) {
            var i = this.createTween(e, t);
            return le(i.elem, e, te.exec(t), i), i;
          },
        ],
      },
      tweener: function (e, t) {
        for (
          var i, n = 0, o = (e = b(e) ? ((t = e), ["*"]) : e.match(O)).length;
          n < o;
          n++
        )
          (i = e[n]),
            (wt.tweeners[i] = wt.tweeners[i] || []),
            wt.tweeners[i].unshift(t);
      },
      prefilters: [
        function (e, t, i) {
          var n,
            o,
            r,
            s,
            a,
            l,
            c,
            u,
            h = "width" in t || "height" in t,
            d = this,
            f = {},
            p = e.style,
            m = e.nodeType && ae(e),
            g = X.get(e, "fxshow");
          for (n in (i.queue ||
            (null == (s = C._queueHooks(e, "fx")).unqueued &&
              ((s.unqueued = 0),
              (a = s.empty.fire),
              (s.empty.fire = function () {
                s.unqueued || a();
              })),
            s.unqueued++,
            d.always(function () {
              d.always(function () {
                s.unqueued--, C.queue(e, "fx").length || s.empty.fire();
              });
            })),
          t))
            if (((o = t[n]), mt.test(o))) {
              if (
                (delete t[n],
                (r = r || "toggle" === o),
                o === (m ? "hide" : "show"))
              ) {
                if ("show" !== o || !g || void 0 === g[n]) continue;
                m = !0;
              }
              f[n] = (g && g[n]) || C.style(e, n);
            }
          if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(f))
            for (n in (h &&
              1 === e.nodeType &&
              ((i.overflow = [p.overflow, p.overflowX, p.overflowY]),
              null == (c = g && g.display) && (c = X.get(e, "display")),
              "none" === (u = C.css(e, "display")) &&
                (c
                  ? (u = c)
                  : (ue([e], !0),
                    (c = e.style.display || c),
                    (u = C.css(e, "display")),
                    ue([e]))),
              ("inline" === u || ("inline-block" === u && null != c)) &&
                "none" === C.css(e, "float") &&
                (l ||
                  (d.done(function () {
                    p.display = c;
                  }),
                  null == c && ((u = p.display), (c = "none" === u ? "" : u))),
                (p.display = "inline-block"))),
            i.overflow &&
              ((p.overflow = "hidden"),
              d.always(function () {
                (p.overflow = i.overflow[0]),
                  (p.overflowX = i.overflow[1]),
                  (p.overflowY = i.overflow[2]);
              })),
            (l = !1),
            f))
              l ||
                (g
                  ? "hidden" in g && (m = g.hidden)
                  : (g = X.access(e, "fxshow", { display: c })),
                r && (g.hidden = !m),
                m && ue([e], !0),
                d.done(function () {
                  for (n in (m || ue([e]), X.remove(e, "fxshow"), f))
                    C.style(e, n, f[n]);
                })),
                (l = _t(m ? g[n] : 0, n, d)),
                n in g ||
                  ((g[n] = l.start), m && ((l.end = l.start), (l.start = 0)));
        },
      ],
      prefilter: function (e, t) {
        t ? wt.prefilters.unshift(e) : wt.prefilters.push(e);
      },
    })),
      (C.speed = function (e, t, i) {
        var n =
          e && "object" == typeof e
            ? C.extend({}, e)
            : {
                complete: i || (!i && t) || (b(e) && e),
                duration: e,
                easing: (i && t) || (t && !b(t) && t),
              };
        return (
          C.fx.off
            ? (n.duration = 0)
            : "number" != typeof n.duration &&
              (n.duration in C.fx.speeds
                ? (n.duration = C.fx.speeds[n.duration])
                : (n.duration = C.fx.speeds._default)),
          (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
          (n.old = n.complete),
          (n.complete = function () {
            b(n.old) && n.old.call(this), n.queue && C.dequeue(this, n.queue);
          }),
          n
        );
      }),
      C.fn.extend({
        fadeTo: function (e, t, i, n) {
          return this.filter(ae)
            .css("opacity", 0)
            .show()
            .end()
            .animate({ opacity: t }, e, i, n);
        },
        animate: function (t, e, i, n) {
          function o() {
            var e = wt(this, C.extend({}, t), s);
            (r || X.get(this, "finish")) && e.stop(!0);
          }
          var r = C.isEmptyObject(t),
            s = C.speed(e, i, n);
          return (
            (o.finish = o),
            r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
          );
        },
        stop: function (o, e, r) {
          function s(e) {
            var t = e.stop;
            delete e.stop, t(r);
          }
          return (
            "string" != typeof o && ((r = e), (e = o), (o = void 0)),
            e && !1 !== o && this.queue(o || "fx", []),
            this.each(function () {
              var e = !0,
                t = null != o && o + "queueHooks",
                i = C.timers,
                n = X.get(this);
              if (t) n[t] && n[t].stop && s(n[t]);
              else for (t in n) n[t] && n[t].stop && gt.test(t) && s(n[t]);
              for (t = i.length; t--; )
                i[t].elem !== this ||
                  (null != o && i[t].queue !== o) ||
                  (i[t].anim.stop(r), (e = !1), i.splice(t, 1));
              (!e && r) || C.dequeue(this, o);
            })
          );
        },
        finish: function (s) {
          return (
            !1 !== s && (s = s || "fx"),
            this.each(function () {
              var e,
                t = X.get(this),
                i = t[s + "queue"],
                n = t[s + "queueHooks"],
                o = C.timers,
                r = i ? i.length : 0;
              for (
                t.finish = !0,
                  C.queue(this, s, []),
                  n && n.stop && n.stop.call(this, !0),
                  e = o.length;
                e--;

              )
                o[e].elem === this &&
                  o[e].queue === s &&
                  (o[e].anim.stop(!0), o.splice(e, 1));
              for (e = 0; e < r; e++)
                i[e] && i[e].finish && i[e].finish.call(this);
              delete t.finish;
            })
          );
        },
      }),
      C.each(["toggle", "show", "hide"], function (e, n) {
        var o = C.fn[n];
        C.fn[n] = function (e, t, i) {
          return null == e || "boolean" == typeof e
            ? o.apply(this, arguments)
            : this.animate(bt(n, !0), e, t, i);
        };
      }),
      C.each(
        {
          slideDown: bt("show"),
          slideUp: bt("hide"),
          slideToggle: bt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" },
        },
        function (e, n) {
          C.fn[e] = function (e, t, i) {
            return this.animate(n, e, t, i);
          };
        }
      ),
      (C.timers = []),
      (C.fx.tick = function () {
        var e,
          t = 0,
          i = C.timers;
        for (ht = Date.now(); t < i.length; t++)
          (e = i[t])() || i[t] !== e || i.splice(t--, 1);
        i.length || C.fx.stop(), (ht = void 0);
      }),
      (C.fx.timer = function (e) {
        C.timers.push(e), C.fx.start();
      }),
      (C.fx.interval = 13),
      (C.fx.start = function () {
        dt || ((dt = !0), vt());
      }),
      (C.fx.stop = function () {
        dt = null;
      }),
      (C.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
      (C.fn.delay = function (n, e) {
        return (
          (n = (C.fx && C.fx.speeds[n]) || n),
          (e = e || "fx"),
          this.queue(e, function (e, t) {
            var i = E.setTimeout(e, n);
            t.stop = function () {
              E.clearTimeout(i);
            };
          })
        );
      }),
      (ft = S.createElement("input")),
      (pt = S.createElement("select").appendChild(S.createElement("option"))),
      (ft.type = "checkbox"),
      (y.checkOn = "" !== ft.value),
      (y.optSelected = pt.selected),
      ((ft = S.createElement("input")).value = "t"),
      (ft.type = "radio"),
      (y.radioValue = "t" === ft.value);
    var xt,
      Et = C.expr.attrHandle;
    C.fn.extend({
      attr: function (e, t) {
        return F(this, C.attr, e, t, 1 < arguments.length);
      },
      removeAttr: function (e) {
        return this.each(function () {
          C.removeAttr(this, e);
        });
      },
    }),
      C.extend({
        attr: function (e, t, i) {
          var n,
            o,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return void 0 === e.getAttribute
              ? C.prop(e, t, i)
              : ((1 === r && C.isXMLDoc(e)) ||
                  (o =
                    C.attrHooks[t.toLowerCase()] ||
                    (C.expr.match.bool.test(t) ? xt : void 0)),
                void 0 !== i
                  ? null === i
                    ? void C.removeAttr(e, t)
                    : o && "set" in o && void 0 !== (n = o.set(e, i, t))
                    ? n
                    : (e.setAttribute(t, i + ""), i)
                  : o && "get" in o && null !== (n = o.get(e, t))
                  ? n
                  : null == (n = C.find.attr(e, t))
                  ? void 0
                  : n);
        },
        attrHooks: {
          type: {
            set: function (e, t) {
              if (!y.radioValue && "radio" === t && k(e, "input")) {
                var i = e.value;
                return e.setAttribute("type", t), i && (e.value = i), t;
              }
            },
          },
        },
        removeAttr: function (e, t) {
          var i,
            n = 0,
            o = t && t.match(O);
          if (o && 1 === e.nodeType)
            for (; (i = o[n++]); ) e.removeAttribute(i);
        },
      }),
      (xt = {
        set: function (e, t, i) {
          return !1 === t ? C.removeAttr(e, i) : e.setAttribute(i, i), i;
        },
      }),
      C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var s = Et[t] || C.find.attr;
        Et[t] = function (e, t, i) {
          var n,
            o,
            r = t.toLowerCase();
          return (
            i ||
              ((o = Et[r]),
              (Et[r] = n),
              (n = null != s(e, t, i) ? r : null),
              (Et[r] = o)),
            n
          );
        };
      });
    var St = /^(?:input|select|textarea|button)$/i,
      Ct = /^(?:a|area)$/i;
    function Tt(e) {
      return (e.match(O) || []).join(" ");
    }
    function kt(e) {
      return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function At(e) {
      return Array.isArray(e) ? e : ("string" == typeof e && e.match(O)) || [];
    }
    C.fn.extend({
      prop: function (e, t) {
        return F(this, C.prop, e, t, 1 < arguments.length);
      },
      removeProp: function (e) {
        return this.each(function () {
          delete this[C.propFix[e] || e];
        });
      },
    }),
      C.extend({
        prop: function (e, t, i) {
          var n,
            o,
            r = e.nodeType;
          if (3 !== r && 8 !== r && 2 !== r)
            return (
              (1 === r && C.isXMLDoc(e)) ||
                ((t = C.propFix[t] || t), (o = C.propHooks[t])),
              void 0 !== i
                ? o && "set" in o && void 0 !== (n = o.set(e, i, t))
                  ? n
                  : (e[t] = i)
                : o && "get" in o && null !== (n = o.get(e, t))
                ? n
                : e[t]
            );
        },
        propHooks: {
          tabIndex: {
            get: function (e) {
              var t = C.find.attr(e, "tabindex");
              return t
                ? parseInt(t, 10)
                : St.test(e.nodeName) || (Ct.test(e.nodeName) && e.href)
                ? 0
                : -1;
            },
          },
        },
        propFix: { for: "htmlFor", class: "className" },
      }),
      y.optSelected ||
        (C.propHooks.selected = {
          get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null;
          },
          set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
          },
        }),
      C.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable",
        ],
        function () {
          C.propFix[this.toLowerCase()] = this;
        }
      ),
      C.fn.extend({
        addClass: function (t) {
          var e,
            i,
            n,
            o,
            r,
            s,
            a,
            l = 0;
          if (b(t))
            return this.each(function (e) {
              C(this).addClass(t.call(this, e, kt(this)));
            });
          if ((e = At(t)).length)
            for (; (i = this[l++]); )
              if (((o = kt(i)), (n = 1 === i.nodeType && " " + Tt(o) + " "))) {
                for (s = 0; (r = e[s++]); )
                  n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                o !== (a = Tt(n)) && i.setAttribute("class", a);
              }
          return this;
        },
        removeClass: function (t) {
          var e,
            i,
            n,
            o,
            r,
            s,
            a,
            l = 0;
          if (b(t))
            return this.each(function (e) {
              C(this).removeClass(t.call(this, e, kt(this)));
            });
          if (!arguments.length) return this.attr("class", "");
          if ((e = At(t)).length)
            for (; (i = this[l++]); )
              if (((o = kt(i)), (n = 1 === i.nodeType && " " + Tt(o) + " "))) {
                for (s = 0; (r = e[s++]); )
                  for (; -1 < n.indexOf(" " + r + " "); )
                    n = n.replace(" " + r + " ", " ");
                o !== (a = Tt(n)) && i.setAttribute("class", a);
              }
          return this;
        },
        toggleClass: function (o, t) {
          var r = typeof o,
            s = "string" == r || Array.isArray(o);
          return "boolean" == typeof t && s
            ? t
              ? this.addClass(o)
              : this.removeClass(o)
            : b(o)
            ? this.each(function (e) {
                C(this).toggleClass(o.call(this, e, kt(this), t), t);
              })
            : this.each(function () {
                var e, t, i, n;
                if (s)
                  for (t = 0, i = C(this), n = At(o); (e = n[t++]); )
                    i.hasClass(e) ? i.removeClass(e) : i.addClass(e);
                else
                  (void 0 !== o && "boolean" != r) ||
                    ((e = kt(this)) && X.set(this, "__className__", e),
                    this.setAttribute &&
                      this.setAttribute(
                        "class",
                        e || !1 === o ? "" : X.get(this, "__className__") || ""
                      ));
              });
        },
        hasClass: function (e) {
          var t,
            i,
            n = 0;
          for (t = " " + e + " "; (i = this[n++]); )
            if (1 === i.nodeType && -1 < (" " + Tt(kt(i)) + " ").indexOf(t))
              return !0;
          return !1;
        },
      });
    var Dt = /\r/g;
    C.fn.extend({
      val: function (i) {
        var n,
          e,
          o,
          t = this[0];
        return arguments.length
          ? ((o = b(i)),
            this.each(function (e) {
              var t;
              1 === this.nodeType &&
                (null == (t = o ? i.call(this, e, C(this).val()) : i)
                  ? (t = "")
                  : "number" == typeof t
                  ? (t += "")
                  : Array.isArray(t) &&
                    (t = C.map(t, function (e) {
                      return null == e ? "" : e + "";
                    })),
                ((n =
                  C.valHooks[this.type] ||
                  C.valHooks[this.nodeName.toLowerCase()]) &&
                  "set" in n &&
                  void 0 !== n.set(this, t, "value")) ||
                  (this.value = t));
            }))
          : t
          ? (n = C.valHooks[t.type] || C.valHooks[t.nodeName.toLowerCase()]) &&
            "get" in n &&
            void 0 !== (e = n.get(t, "value"))
            ? e
            : "string" == typeof (e = t.value)
            ? e.replace(Dt, "")
            : null == e
            ? ""
            : e
          : void 0;
      },
    }),
      C.extend({
        valHooks: {
          option: {
            get: function (e) {
              var t = C.find.attr(e, "value");
              return null != t ? t : Tt(C.text(e));
            },
          },
          select: {
            get: function (e) {
              var t,
                i,
                n,
                o = e.options,
                r = e.selectedIndex,
                s = "select-one" === e.type,
                a = s ? null : [],
                l = s ? r + 1 : o.length;
              for (n = r < 0 ? l : s ? r : 0; n < l; n++)
                if (
                  ((i = o[n]).selected || n === r) &&
                  !i.disabled &&
                  (!i.parentNode.disabled || !k(i.parentNode, "optgroup"))
                ) {
                  if (((t = C(i).val()), s)) return t;
                  a.push(t);
                }
              return a;
            },
            set: function (e, t) {
              for (
                var i, n, o = e.options, r = C.makeArray(t), s = o.length;
                s--;

              )
                ((n = o[s]).selected =
                  -1 < C.inArray(C.valHooks.option.get(n), r)) && (i = !0);
              return i || (e.selectedIndex = -1), r;
            },
          },
        },
      }),
      C.each(["radio", "checkbox"], function () {
        (C.valHooks[this] = {
          set: function (e, t) {
            if (Array.isArray(t))
              return (e.checked = -1 < C.inArray(C(e).val(), t));
          },
        }),
          y.checkOn ||
            (C.valHooks[this].get = function (e) {
              return null === e.getAttribute("value") ? "on" : e.value;
            });
      }),
      (y.focusin = "onfocusin" in E);
    function It(e) {
      e.stopPropagation();
    }
    var Lt = /^(?:focusinfocus|focusoutblur)$/;
    C.extend(C.event, {
      trigger: function (e, t, i, n) {
        var o,
          r,
          s,
          a,
          l,
          c,
          u,
          h,
          d = [i || S],
          f = v.call(e, "type") ? e.type : e,
          p = v.call(e, "namespace") ? e.namespace.split(".") : [];
        if (
          ((r = h = s = i = i || S),
          3 !== i.nodeType &&
            8 !== i.nodeType &&
            !Lt.test(f + C.event.triggered) &&
            (-1 < f.indexOf(".") &&
              ((f = (p = f.split(".")).shift()), p.sort()),
            (l = f.indexOf(":") < 0 && "on" + f),
            ((e = e[C.expando]
              ? e
              : new C.Event(f, "object" == typeof e && e)).isTrigger = n
              ? 2
              : 3),
            (e.namespace = p.join(".")),
            (e.rnamespace = e.namespace
              ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)")
              : null),
            (e.result = void 0),
            e.target || (e.target = i),
            (t = null == t ? [e] : C.makeArray(t, [e])),
            (u = C.event.special[f] || {}),
            n || !u.trigger || !1 !== u.trigger.apply(i, t)))
        ) {
          if (!n && !u.noBubble && !m(i)) {
            for (
              a = u.delegateType || f, Lt.test(a + f) || (r = r.parentNode);
              r;
              r = r.parentNode
            )
              d.push(r), (s = r);
            s === (i.ownerDocument || S) &&
              d.push(s.defaultView || s.parentWindow || E);
          }
          for (o = 0; (r = d[o++]) && !e.isPropagationStopped(); )
            (h = r),
              (e.type = 1 < o ? a : u.bindType || f),
              (c = (X.get(r, "events") || {})[e.type] && X.get(r, "handle")) &&
                c.apply(r, t),
              (c = l && r[l]) &&
                c.apply &&
                Y(r) &&
                ((e.result = c.apply(r, t)),
                !1 === e.result && e.preventDefault());
          return (
            (e.type = f),
            n ||
              e.isDefaultPrevented() ||
              (u._default && !1 !== u._default.apply(d.pop(), t)) ||
              !Y(i) ||
              (l &&
                b(i[f]) &&
                !m(i) &&
                ((s = i[l]) && (i[l] = null),
                (C.event.triggered = f),
                e.isPropagationStopped() && h.addEventListener(f, It),
                i[f](),
                e.isPropagationStopped() && h.removeEventListener(f, It),
                (C.event.triggered = void 0),
                s && (i[l] = s))),
            e.result
          );
        }
      },
      simulate: function (e, t, i) {
        var n = C.extend(new C.Event(), i, { type: e, isSimulated: !0 });
        C.event.trigger(n, null, t);
      },
    }),
      C.fn.extend({
        trigger: function (e, t) {
          return this.each(function () {
            C.event.trigger(e, t, this);
          });
        },
        triggerHandler: function (e, t) {
          var i = this[0];
          if (i) return C.event.trigger(e, t, i, !0);
        },
      }),
      y.focusin ||
        C.each({ focus: "focusin", blur: "focusout" }, function (i, n) {
          function o(e) {
            C.event.simulate(n, e.target, C.event.fix(e));
          }
          C.event.special[n] = {
            setup: function () {
              var e = this.ownerDocument || this,
                t = X.access(e, n);
              t || e.addEventListener(i, o, !0), X.access(e, n, (t || 0) + 1);
            },
            teardown: function () {
              var e = this.ownerDocument || this,
                t = X.access(e, n) - 1;
              t
                ? X.access(e, n, t)
                : (e.removeEventListener(i, o, !0), X.remove(e, n));
            },
          };
        });
    var Pt = E.location,
      jt = Date.now(),
      Nt = /\?/;
    C.parseXML = function (e) {
      var t;
      if (!e || "string" != typeof e) return null;
      try {
        t = new E.DOMParser().parseFromString(e, "text/xml");
      } catch (e) {
        t = void 0;
      }
      return (
        (t && !t.getElementsByTagName("parsererror").length) ||
          C.error("Invalid XML: " + e),
        t
      );
    };
    var Ot = /\[\]$/,
      Mt = /\r?\n/g,
      zt = /^(?:submit|button|image|reset|file)$/i,
      Bt = /^(?:input|select|textarea|keygen)/i;
    function Ht(i, e, n, o) {
      var t;
      if (Array.isArray(e))
        C.each(e, function (e, t) {
          n || Ot.test(i)
            ? o(i, t)
            : Ht(
                i + "[" + ("object" == typeof t && null != t ? e : "") + "]",
                t,
                n,
                o
              );
        });
      else if (n || "object" !== w(e)) o(i, e);
      else for (t in e) Ht(i + "[" + t + "]", e[t], n, o);
    }
    (C.param = function (e, t) {
      function i(e, t) {
        var i = b(t) ? t() : t;
        o[o.length] =
          encodeURIComponent(e) + "=" + encodeURIComponent(null == i ? "" : i);
      }
      var n,
        o = [];
      if (null == e) return "";
      if (Array.isArray(e) || (e.jquery && !C.isPlainObject(e)))
        C.each(e, function () {
          i(this.name, this.value);
        });
      else for (n in e) Ht(n, e[n], t, i);
      return o.join("&");
    }),
      C.fn.extend({
        serialize: function () {
          return C.param(this.serializeArray());
        },
        serializeArray: function () {
          return this.map(function () {
            var e = C.prop(this, "elements");
            return e ? C.makeArray(e) : this;
          })
            .filter(function () {
              var e = this.type;
              return (
                this.name &&
                !C(this).is(":disabled") &&
                Bt.test(this.nodeName) &&
                !zt.test(e) &&
                (this.checked || !he.test(e))
              );
            })
            .map(function (e, t) {
              var i = C(this).val();
              return null == i
                ? null
                : Array.isArray(i)
                ? C.map(i, function (e) {
                    return { name: t.name, value: e.replace(Mt, "\r\n") };
                  })
                : { name: t.name, value: i.replace(Mt, "\r\n") };
            })
            .get();
        },
      });
    var Rt = /%20/g,
      qt = /#.*$/,
      Ft = /([?&])_=[^&]*/,
      Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      $t = /^(?:GET|HEAD)$/,
      Vt = /^\/\//,
      Ut = {},
      Yt = {},
      Qt = "*/".concat("*"),
      Xt = S.createElement("a");
    function Gt(r) {
      return function (e, t) {
        "string" != typeof e && ((t = e), (e = "*"));
        var i,
          n = 0,
          o = e.toLowerCase().match(O) || [];
        if (b(t))
          for (; (i = o[n++]); )
            "+" === i[0]
              ? ((i = i.slice(1) || "*"), (r[i] = r[i] || []).unshift(t))
              : (r[i] = r[i] || []).push(t);
      };
    }
    function Kt(t, o, r, s) {
      var a = {},
        l = t === Yt;
      function c(e) {
        var n;
        return (
          (a[e] = !0),
          C.each(t[e] || [], function (e, t) {
            var i = t(o, r, s);
            return "string" != typeof i || l || a[i]
              ? l
                ? !(n = i)
                : void 0
              : (o.dataTypes.unshift(i), c(i), !1);
          }),
          n
        );
      }
      return c(o.dataTypes[0]) || (!a["*"] && c("*"));
    }
    function Jt(e, t) {
      var i,
        n,
        o = C.ajaxSettings.flatOptions || {};
      for (i in t) void 0 !== t[i] && ((o[i] ? e : (n = n || {}))[i] = t[i]);
      return n && C.extend(!0, e, n), e;
    }
    (Xt.href = Pt.href),
      C.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: Pt.href,
          type: "GET",
          isLocal:
            /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
              Pt.protocol
            ),
          global: !0,
          processData: !0,
          async: !0,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": Qt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript",
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON",
          },
          converters: {
            "* text": String,
            "text html": !0,
            "text json": JSON.parse,
            "text xml": C.parseXML,
          },
          flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
          return t ? Jt(Jt(e, C.ajaxSettings), t) : Jt(C.ajaxSettings, e);
        },
        ajaxPrefilter: Gt(Ut),
        ajaxTransport: Gt(Yt),
        ajax: function (e, t) {
          "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
          var u,
            h,
            d,
            i,
            f,
            n,
            p,
            m,
            o,
            r,
            g = C.ajaxSetup({}, t),
            v = g.context || g,
            y = g.context && (v.nodeType || v.jquery) ? C(v) : C.event,
            b = C.Deferred(),
            _ = C.Callbacks("once memory"),
            w = g.statusCode || {},
            s = {},
            a = {},
            l = "canceled",
            x = {
              readyState: 0,
              getResponseHeader: function (e) {
                var t;
                if (p) {
                  if (!i)
                    for (i = {}; (t = Wt.exec(d)); )
                      i[t[1].toLowerCase() + " "] = (
                        i[t[1].toLowerCase() + " "] || []
                      ).concat(t[2]);
                  t = i[e.toLowerCase() + " "];
                }
                return null == t ? null : t.join(", ");
              },
              getAllResponseHeaders: function () {
                return p ? d : null;
              },
              setRequestHeader: function (e, t) {
                return (
                  null == p &&
                    ((e = a[e.toLowerCase()] = a[e.toLowerCase()] || e),
                    (s[e] = t)),
                  this
                );
              },
              overrideMimeType: function (e) {
                return null == p && (g.mimeType = e), this;
              },
              statusCode: function (e) {
                var t;
                if (e)
                  if (p) x.always(e[x.status]);
                  else for (t in e) w[t] = [w[t], e[t]];
                return this;
              },
              abort: function (e) {
                var t = e || l;
                return u && u.abort(t), c(0, t), this;
              },
            };
          if (
            (b.promise(x),
            (g.url = ((e || g.url || Pt.href) + "").replace(
              Vt,
              Pt.protocol + "//"
            )),
            (g.type = t.method || t.type || g.method || g.type),
            (g.dataTypes = (g.dataType || "*").toLowerCase().match(O) || [""]),
            null == g.crossDomain)
          ) {
            n = S.createElement("a");
            try {
              (n.href = g.url),
                (n.href = n.href),
                (g.crossDomain =
                  Xt.protocol + "//" + Xt.host != n.protocol + "//" + n.host);
            } catch (e) {
              g.crossDomain = !0;
            }
          }
          if (
            (g.data &&
              g.processData &&
              "string" != typeof g.data &&
              (g.data = C.param(g.data, g.traditional)),
            Kt(Ut, g, t, x),
            p)
          )
            return x;
          for (o in ((m = C.event && g.global) &&
            0 == C.active++ &&
            C.event.trigger("ajaxStart"),
          (g.type = g.type.toUpperCase()),
          (g.hasContent = !$t.test(g.type)),
          (h = g.url.replace(qt, "")),
          g.hasContent
            ? g.data &&
              g.processData &&
              0 ===
                (g.contentType || "").indexOf(
                  "application/x-www-form-urlencoded"
                ) &&
              (g.data = g.data.replace(Rt, "+"))
            : ((r = g.url.slice(h.length)),
              g.data &&
                (g.processData || "string" == typeof g.data) &&
                ((h += (Nt.test(h) ? "&" : "?") + g.data), delete g.data),
              !1 === g.cache &&
                ((h = h.replace(Ft, "$1")),
                (r = (Nt.test(h) ? "&" : "?") + "_=" + jt++ + r)),
              (g.url = h + r)),
          g.ifModified &&
            (C.lastModified[h] &&
              x.setRequestHeader("If-Modified-Since", C.lastModified[h]),
            C.etag[h] && x.setRequestHeader("If-None-Match", C.etag[h])),
          ((g.data && g.hasContent && !1 !== g.contentType) || t.contentType) &&
            x.setRequestHeader("Content-Type", g.contentType),
          x.setRequestHeader(
            "Accept",
            g.dataTypes[0] && g.accepts[g.dataTypes[0]]
              ? g.accepts[g.dataTypes[0]] +
                  ("*" !== g.dataTypes[0] ? ", " + Qt + "; q=0.01" : "")
              : g.accepts["*"]
          ),
          g.headers))
            x.setRequestHeader(o, g.headers[o]);
          if (g.beforeSend && (!1 === g.beforeSend.call(v, x, g) || p))
            return x.abort();
          if (
            ((l = "abort"),
            _.add(g.complete),
            x.done(g.success),
            x.fail(g.error),
            (u = Kt(Yt, g, t, x)))
          ) {
            if (((x.readyState = 1), m && y.trigger("ajaxSend", [x, g]), p))
              return x;
            g.async &&
              0 < g.timeout &&
              (f = E.setTimeout(function () {
                x.abort("timeout");
              }, g.timeout));
            try {
              (p = !1), u.send(s, c);
            } catch (e) {
              if (p) throw e;
              c(-1, e);
            }
          } else c(-1, "No Transport");
          function c(e, t, i, n) {
            var o,
              r,
              s,
              a,
              l,
              c = t;
            p ||
              ((p = !0),
              f && E.clearTimeout(f),
              (u = void 0),
              (d = n || ""),
              (x.readyState = 0 < e ? 4 : 0),
              (o = (200 <= e && e < 300) || 304 === e),
              i &&
                (a = (function (e, t, i) {
                  for (
                    var n, o, r, s, a = e.contents, l = e.dataTypes;
                    "*" === l[0];

                  )
                    l.shift(),
                      void 0 === n &&
                        (n = e.mimeType || t.getResponseHeader("Content-Type"));
                  if (n)
                    for (o in a)
                      if (a[o] && a[o].test(n)) {
                        l.unshift(o);
                        break;
                      }
                  if (l[0] in i) r = l[0];
                  else {
                    for (o in i) {
                      if (!l[0] || e.converters[o + " " + l[0]]) {
                        r = o;
                        break;
                      }
                      s = s || o;
                    }
                    r = r || s;
                  }
                  if (r) return r !== l[0] && l.unshift(r), i[r];
                })(g, x, i)),
              (a = (function (e, t, i, n) {
                var o,
                  r,
                  s,
                  a,
                  l,
                  c = {},
                  u = e.dataTypes.slice();
                if (u[1])
                  for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
                for (r = u.shift(); r; )
                  if (
                    (e.responseFields[r] && (i[e.responseFields[r]] = t),
                    !l &&
                      n &&
                      e.dataFilter &&
                      (t = e.dataFilter(t, e.dataType)),
                    (l = r),
                    (r = u.shift()))
                  )
                    if ("*" === r) r = l;
                    else if ("*" !== l && l !== r) {
                      if (!(s = c[l + " " + r] || c["* " + r]))
                        for (o in c)
                          if (
                            (a = o.split(" "))[1] === r &&
                            (s = c[l + " " + a[0]] || c["* " + a[0]])
                          ) {
                            !0 === s
                              ? (s = c[o])
                              : !0 !== c[o] && ((r = a[0]), u.unshift(a[1]));
                            break;
                          }
                      if (!0 !== s)
                        if (s && e.throws) t = s(t);
                        else
                          try {
                            t = s(t);
                          } catch (e) {
                            return {
                              state: "parsererror",
                              error: s
                                ? e
                                : "No conversion from " + l + " to " + r,
                            };
                          }
                    }
                return { state: "success", data: t };
              })(g, a, x, o)),
              o
                ? (g.ifModified &&
                    ((l = x.getResponseHeader("Last-Modified")) &&
                      (C.lastModified[h] = l),
                    (l = x.getResponseHeader("etag")) && (C.etag[h] = l)),
                  204 === e || "HEAD" === g.type
                    ? (c = "nocontent")
                    : 304 === e
                    ? (c = "notmodified")
                    : ((c = a.state), (r = a.data), (o = !(s = a.error))))
                : ((s = c), (!e && c) || ((c = "error"), e < 0 && (e = 0))),
              (x.status = e),
              (x.statusText = (t || c) + ""),
              o ? b.resolveWith(v, [r, c, x]) : b.rejectWith(v, [x, c, s]),
              x.statusCode(w),
              (w = void 0),
              m &&
                y.trigger(o ? "ajaxSuccess" : "ajaxError", [x, g, o ? r : s]),
              _.fireWith(v, [x, c]),
              m &&
                (y.trigger("ajaxComplete", [x, g]),
                --C.active || C.event.trigger("ajaxStop")));
          }
          return x;
        },
        getJSON: function (e, t, i) {
          return C.get(e, t, i, "json");
        },
        getScript: function (e, t) {
          return C.get(e, void 0, t, "script");
        },
      }),
      C.each(["get", "post"], function (e, o) {
        C[o] = function (e, t, i, n) {
          return (
            b(t) && ((n = n || i), (i = t), (t = void 0)),
            C.ajax(
              C.extend(
                { url: e, type: o, dataType: n, data: t, success: i },
                C.isPlainObject(e) && e
              )
            )
          );
        };
      }),
      (C._evalUrl = function (e, t) {
        return C.ajax({
          url: e,
          type: "GET",
          dataType: "script",
          cache: !0,
          async: !1,
          global: !1,
          converters: { "text script": function () {} },
          dataFilter: function (e) {
            C.globalEval(e, t);
          },
        });
      }),
      C.fn.extend({
        wrapAll: function (e) {
          var t;
          return (
            this[0] &&
              (b(e) && (e = e.call(this[0])),
              (t = C(e, this[0].ownerDocument).eq(0).clone(!0)),
              this[0].parentNode && t.insertBefore(this[0]),
              t
                .map(function () {
                  for (var e = this; e.firstElementChild; )
                    e = e.firstElementChild;
                  return e;
                })
                .append(this)),
            this
          );
        },
        wrapInner: function (i) {
          return b(i)
            ? this.each(function (e) {
                C(this).wrapInner(i.call(this, e));
              })
            : this.each(function () {
                var e = C(this),
                  t = e.contents();
                t.length ? t.wrapAll(i) : e.append(i);
              });
        },
        wrap: function (t) {
          var i = b(t);
          return this.each(function (e) {
            C(this).wrapAll(i ? t.call(this, e) : t);
          });
        },
        unwrap: function (e) {
          return (
            this.parent(e)
              .not("body")
              .each(function () {
                C(this).replaceWith(this.childNodes);
              }),
            this
          );
        },
      }),
      (C.expr.pseudos.hidden = function (e) {
        return !C.expr.pseudos.visible(e);
      }),
      (C.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }),
      (C.ajaxSettings.xhr = function () {
        try {
          return new E.XMLHttpRequest();
        } catch (e) {}
      });
    var Zt = { 0: 200, 1223: 204 },
      ei = C.ajaxSettings.xhr();
    (y.cors = !!ei && "withCredentials" in ei),
      (y.ajax = ei = !!ei),
      C.ajaxTransport(function (o) {
        var r, s;
        if (y.cors || (ei && !o.crossDomain))
          return {
            send: function (e, t) {
              var i,
                n = o.xhr();
              if (
                (n.open(o.type, o.url, o.async, o.username, o.password),
                o.xhrFields)
              )
                for (i in o.xhrFields) n[i] = o.xhrFields[i];
              for (i in (o.mimeType &&
                n.overrideMimeType &&
                n.overrideMimeType(o.mimeType),
              o.crossDomain ||
                e["X-Requested-With"] ||
                (e["X-Requested-With"] = "XMLHttpRequest"),
              e))
                n.setRequestHeader(i, e[i]);
              (r = function (e) {
                return function () {
                  r &&
                    ((r =
                      s =
                      n.onload =
                      n.onerror =
                      n.onabort =
                      n.ontimeout =
                      n.onreadystatechange =
                        null),
                    "abort" === e
                      ? n.abort()
                      : "error" === e
                      ? "number" != typeof n.status
                        ? t(0, "error")
                        : t(n.status, n.statusText)
                      : t(
                          Zt[n.status] || n.status,
                          n.statusText,
                          "text" !== (n.responseType || "text") ||
                            "string" != typeof n.responseText
                            ? { binary: n.response }
                            : { text: n.responseText },
                          n.getAllResponseHeaders()
                        ));
                };
              }),
                (n.onload = r()),
                (s = n.onerror = n.ontimeout = r("error")),
                void 0 !== n.onabort
                  ? (n.onabort = s)
                  : (n.onreadystatechange = function () {
                      4 === n.readyState &&
                        E.setTimeout(function () {
                          r && s();
                        });
                    }),
                (r = r("abort"));
              try {
                n.send((o.hasContent && o.data) || null);
              } catch (e) {
                if (r) throw e;
              }
            },
            abort: function () {
              r && r();
            },
          };
      }),
      C.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
      }),
      C.ajaxSetup({
        accepts: {
          script:
            "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (e) {
            return C.globalEval(e), e;
          },
        },
      }),
      C.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
      }),
      C.ajaxTransport("script", function (i) {
        var n, o;
        if (i.crossDomain || i.scriptAttrs)
          return {
            send: function (e, t) {
              (n = C("<script>")
                .attr(i.scriptAttrs || {})
                .prop({ charset: i.scriptCharset, src: i.url })
                .on(
                  "load error",
                  (o = function (e) {
                    n.remove(),
                      (o = null),
                      e && t("error" === e.type ? 404 : 200, e.type);
                  })
                )),
                S.head.appendChild(n[0]);
            },
            abort: function () {
              o && o();
            },
          };
      });
    var ti,
      ii = [],
      ni = /(=)\?(?=&|$)|\?\?/;
    C.ajaxSetup({
      jsonp: "callback",
      jsonpCallback: function () {
        var e = ii.pop() || C.expando + "_" + jt++;
        return (this[e] = !0), e;
      },
    }),
      C.ajaxPrefilter("json jsonp", function (e, t, i) {
        var n,
          o,
          r,
          s =
            !1 !== e.jsonp &&
            (ni.test(e.url)
              ? "url"
              : "string" == typeof e.data &&
                0 ===
                  (e.contentType || "").indexOf(
                    "application/x-www-form-urlencoded"
                  ) &&
                ni.test(e.data) &&
                "data");
        if (s || "jsonp" === e.dataTypes[0])
          return (
            (n = e.jsonpCallback =
              b(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
            s
              ? (e[s] = e[s].replace(ni, "$1" + n))
              : !1 !== e.jsonp &&
                (e.url += (Nt.test(e.url) ? "&" : "?") + e.jsonp + "=" + n),
            (e.converters["script json"] = function () {
              return r || C.error(n + " was not called"), r[0];
            }),
            (e.dataTypes[0] = "json"),
            (o = E[n]),
            (E[n] = function () {
              r = arguments;
            }),
            i.always(function () {
              void 0 === o ? C(E).removeProp(n) : (E[n] = o),
                e[n] && ((e.jsonpCallback = t.jsonpCallback), ii.push(n)),
                r && b(o) && o(r[0]),
                (r = o = void 0);
            }),
            "script"
          );
      }),
      (y.createHTMLDocument =
        (((ti = S.implementation.createHTMLDocument("").body).innerHTML =
          "<form></form><form></form>"),
        2 === ti.childNodes.length)),
      (C.parseHTML = function (e, t, i) {
        return "string" != typeof e
          ? []
          : ("boolean" == typeof t && ((i = t), (t = !1)),
            t ||
              (y.createHTMLDocument
                ? (((n = (t =
                    S.implementation.createHTMLDocument("")).createElement(
                    "base"
                  )).href = S.location.href),
                  t.head.appendChild(n))
                : (t = S)),
            (r = !i && []),
            (o = A.exec(e))
              ? [t.createElement(o[1])]
              : ((o = _e([e], t, r)),
                r && r.length && C(r).remove(),
                C.merge([], o.childNodes)));
        var n, o, r;
      }),
      (C.fn.load = function (e, t, i) {
        var n,
          o,
          r,
          s = this,
          a = e.indexOf(" ");
        return (
          -1 < a && ((n = Tt(e.slice(a))), (e = e.slice(0, a))),
          b(t)
            ? ((i = t), (t = void 0))
            : t && "object" == typeof t && (o = "POST"),
          0 < s.length &&
            C.ajax({ url: e, type: o || "GET", dataType: "html", data: t })
              .done(function (e) {
                (r = arguments),
                  s.html(n ? C("<div>").append(C.parseHTML(e)).find(n) : e);
              })
              .always(
                i &&
                  function (e, t) {
                    s.each(function () {
                      i.apply(this, r || [e.responseText, t, e]);
                    });
                  }
              ),
          this
        );
      }),
      C.each(
        [
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend",
        ],
        function (e, t) {
          C.fn[t] = function (e) {
            return this.on(t, e);
          };
        }
      ),
      (C.expr.pseudos.animated = function (t) {
        return C.grep(C.timers, function (e) {
          return t === e.elem;
        }).length;
      }),
      (C.offset = {
        setOffset: function (e, t, i) {
          var n,
            o,
            r,
            s,
            a,
            l,
            c = C.css(e, "position"),
            u = C(e),
            h = {};
          "static" === c && (e.style.position = "relative"),
            (a = u.offset()),
            (r = C.css(e, "top")),
            (l = C.css(e, "left")),
            (o =
              ("absolute" === c || "fixed" === c) &&
              -1 < (r + l).indexOf("auto")
                ? ((s = (n = u.position()).top), n.left)
                : ((s = parseFloat(r) || 0), parseFloat(l) || 0)),
            b(t) && (t = t.call(e, i, C.extend({}, a))),
            null != t.top && (h.top = t.top - a.top + s),
            null != t.left && (h.left = t.left - a.left + o),
            "using" in t ? t.using.call(e, h) : u.css(h);
        },
      }),
      C.fn.extend({
        offset: function (t) {
          if (arguments.length)
            return void 0 === t
              ? this
              : this.each(function (e) {
                  C.offset.setOffset(this, t, e);
                });
          var e,
            i,
            n = this[0];
          return n
            ? n.getClientRects().length
              ? ((e = n.getBoundingClientRect()),
                (i = n.ownerDocument.defaultView),
                { top: e.top + i.pageYOffset, left: e.left + i.pageXOffset })
              : { top: 0, left: 0 }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var e,
              t,
              i,
              n = this[0],
              o = { top: 0, left: 0 };
            if ("fixed" === C.css(n, "position")) t = n.getBoundingClientRect();
            else {
              for (
                t = this.offset(),
                  i = n.ownerDocument,
                  e = n.offsetParent || i.documentElement;
                e &&
                (e === i.body || e === i.documentElement) &&
                "static" === C.css(e, "position");

              )
                e = e.parentNode;
              e &&
                e !== n &&
                1 === e.nodeType &&
                (((o = C(e).offset()).top += C.css(e, "borderTopWidth", !0)),
                (o.left += C.css(e, "borderLeftWidth", !0)));
            }
            return {
              top: t.top - o.top - C.css(n, "marginTop", !0),
              left: t.left - o.left - C.css(n, "marginLeft", !0),
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (
              var e = this.offsetParent;
              e && "static" === C.css(e, "position");

            )
              e = e.offsetParent;
            return e || ne;
          });
        },
      }),
      C.each(
        { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
        function (t, o) {
          var r = "pageYOffset" === o;
          C.fn[t] = function (e) {
            return F(
              this,
              function (e, t, i) {
                var n;
                if (
                  (m(e) ? (n = e) : 9 === e.nodeType && (n = e.defaultView),
                  void 0 === i)
                )
                  return n ? n[o] : e[t];
                n
                  ? n.scrollTo(r ? n.pageXOffset : i, r ? i : n.pageYOffset)
                  : (e[t] = i);
              },
              t,
              e,
              arguments.length
            );
          };
        }
      ),
      C.each(["top", "left"], function (e, i) {
        C.cssHooks[i] = Je(y.pixelPosition, function (e, t) {
          if (t)
            return (t = Ke(e, i)), Ue.test(t) ? C(e).position()[i] + "px" : t;
        });
      }),
      C.each({ Height: "height", Width: "width" }, function (s, a) {
        C.each(
          { padding: "inner" + s, content: a, "": "outer" + s },
          function (n, r) {
            C.fn[r] = function (e, t) {
              var i = arguments.length && (n || "boolean" != typeof e),
                o = n || (!0 === e || !0 === t ? "margin" : "border");
              return F(
                this,
                function (e, t, i) {
                  var n;
                  return m(e)
                    ? 0 === r.indexOf("outer")
                      ? e["inner" + s]
                      : e.document.documentElement["client" + s]
                    : 9 === e.nodeType
                    ? ((n = e.documentElement),
                      Math.max(
                        e.body["scroll" + s],
                        n["scroll" + s],
                        e.body["offset" + s],
                        n["offset" + s],
                        n["client" + s]
                      ))
                    : void 0 === i
                    ? C.css(e, t, o)
                    : C.style(e, t, i, o);
                },
                a,
                i ? e : void 0,
                i
              );
            };
          }
        );
      }),
      C.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (e, i) {
          C.fn[i] = function (e, t) {
            return 0 < arguments.length
              ? this.on(i, null, e, t)
              : this.trigger(i);
          };
        }
      ),
      C.fn.extend({
        hover: function (e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        },
      }),
      C.fn.extend({
        bind: function (e, t, i) {
          return this.on(e, null, t, i);
        },
        unbind: function (e, t) {
          return this.off(e, null, t);
        },
        delegate: function (e, t, i, n) {
          return this.on(t, e, i, n);
        },
        undelegate: function (e, t, i) {
          return 1 === arguments.length
            ? this.off(e, "**")
            : this.off(t, e || "**", i);
        },
      }),
      (C.proxy = function (e, t) {
        var i, n, o;
        if (("string" == typeof t && ((i = e[t]), (t = e), (e = i)), b(e)))
          return (
            (n = a.call(arguments, 2)),
            ((o = function () {
              return e.apply(t || this, n.concat(a.call(arguments)));
            }).guid = e.guid =
              e.guid || C.guid++),
            o
          );
      }),
      (C.holdReady = function (e) {
        e ? C.readyWait++ : C.ready(!0);
      }),
      (C.isArray = Array.isArray),
      (C.parseJSON = JSON.parse),
      (C.nodeName = k),
      (C.isFunction = b),
      (C.isWindow = m),
      (C.camelCase = U),
      (C.type = w),
      (C.now = Date.now),
      (C.isNumeric = function (e) {
        var t = C.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return C;
        });
    var oi = E.jQuery,
      ri = E.$;
    return (
      (C.noConflict = function (e) {
        return (
          E.$ === C && (E.$ = ri), e && E.jQuery === C && (E.jQuery = oi), C
        );
      }),
      e || (E.jQuery = E.$ = C),
      C
    );
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? t(exports, require("jquery"))
      : "function" == typeof define && define.amd
      ? define(["exports", "jquery"], t)
      : t(((e = e || self).bootstrap = {}), e.jQuery);
  })(this, function (e, p) {
    "use strict";
    function n(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    function s(e, t, i) {
      return t && n(e.prototype, t), i && n(e, i), e;
    }
    function t(t, e) {
      var i = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        e &&
          (n = n.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable;
          })),
          i.push.apply(i, n);
      }
      return i;
    }
    function l(o) {
      for (var e = 1; e < arguments.length; e++) {
        var r = null != arguments[e] ? arguments[e] : {};
        e % 2
          ? t(Object(r), !0).forEach(function (e) {
              var t, i, n;
              (t = o),
                (n = r[(i = e)]),
                i in t
                  ? Object.defineProperty(t, i, {
                      value: n,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (t[i] = n);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r))
          : t(Object(r)).forEach(function (e) {
              Object.defineProperty(
                o,
                e,
                Object.getOwnPropertyDescriptor(r, e)
              );
            });
      }
      return o;
    }
    p = p && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
    var i = "transitionend";
    function o(e) {
      var t = this,
        i = !1;
      return (
        p(this).one(m.TRANSITION_END, function () {
          i = !0;
        }),
        setTimeout(function () {
          i || m.triggerTransitionEnd(t);
        }, e),
        this
      );
    }
    var m = {
      TRANSITION_END: "bsTransitionEnd",
      getUID: function (e) {
        for (; (e += ~~(1e6 * Math.random())), document.getElementById(e); );
        return e;
      },
      getSelectorFromElement: function (e) {
        var t = e.getAttribute("data-target");
        if (!t || "#" === t) {
          var i = e.getAttribute("href");
          t = i && "#" !== i ? i.trim() : "";
        }
        try {
          return document.querySelector(t) ? t : null;
        } catch (e) {
          return null;
        }
      },
      getTransitionDurationFromElement: function (e) {
        if (!e) return 0;
        var t = p(e).css("transition-duration"),
          i = p(e).css("transition-delay"),
          n = parseFloat(t),
          o = parseFloat(i);
        return n || o
          ? ((t = t.split(",")[0]),
            (i = i.split(",")[0]),
            1e3 * (parseFloat(t) + parseFloat(i)))
          : 0;
      },
      reflow: function (e) {
        return e.offsetHeight;
      },
      triggerTransitionEnd: function (e) {
        p(e).trigger(i);
      },
      supportsTransitionEnd: function () {
        return Boolean(i);
      },
      isElement: function (e) {
        return (e[0] || e).nodeType;
      },
      typeCheckConfig: function (e, t, i) {
        for (var n in i)
          if (Object.prototype.hasOwnProperty.call(i, n)) {
            var o = i[n],
              r = t[n],
              s =
                r && m.isElement(r)
                  ? "element"
                  : null == (a = r)
                  ? "" + a
                  : {}.toString
                      .call(a)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase();
            if (!new RegExp(o).test(s))
              throw new Error(
                e.toUpperCase() +
                  ': Option "' +
                  n +
                  '" provided type "' +
                  s +
                  '" but expected type "' +
                  o +
                  '".'
              );
          }
        var a;
      },
      findShadowRoot: function (e) {
        if (!document.documentElement.attachShadow) return null;
        if ("function" != typeof e.getRootNode)
          return e instanceof ShadowRoot
            ? e
            : e.parentNode
            ? m.findShadowRoot(e.parentNode)
            : null;
        var t = e.getRootNode();
        return t instanceof ShadowRoot ? t : null;
      },
      jQueryDetection: function () {
        if (void 0 === p)
          throw new TypeError(
            "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
          );
        var e = p.fn.jquery.split(" ")[0].split(".");
        if (
          (e[0] < 2 && e[1] < 9) ||
          (1 === e[0] && 9 === e[1] && e[2] < 1) ||
          4 <= e[0]
        )
          throw new Error(
            "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
          );
      },
    };
    m.jQueryDetection(),
      (p.fn.emulateTransitionEnd = o),
      (p.event.special[m.TRANSITION_END] = {
        bindType: i,
        delegateType: i,
        handle: function (e) {
          if (p(e.target).is(this))
            return e.handleObj.handler.apply(this, arguments);
        },
      });
    var r = "alert",
      a = "bs.alert",
      c = p.fn[r],
      u = (function () {
        function n(e) {
          this._element = e;
        }
        var e = n.prototype;
        return (
          (e.close = function (e) {
            var t = this._element;
            e && (t = this._getRootElement(e)),
              this._triggerCloseEvent(t).isDefaultPrevented() ||
                this._removeElement(t);
          }),
          (e.dispose = function () {
            p.removeData(this._element, a), (this._element = null);
          }),
          (e._getRootElement = function (e) {
            var t = m.getSelectorFromElement(e),
              i = !1;
            return (
              t && (i = document.querySelector(t)),
              (i = i || p(e).closest(".alert")[0])
            );
          }),
          (e._triggerCloseEvent = function (e) {
            var t = p.Event("close.bs.alert");
            return p(e).trigger(t), t;
          }),
          (e._removeElement = function (t) {
            var i = this;
            if ((p(t).removeClass("show"), p(t).hasClass("fade"))) {
              var e = m.getTransitionDurationFromElement(t);
              p(t)
                .one(m.TRANSITION_END, function (e) {
                  return i._destroyElement(t, e);
                })
                .emulateTransitionEnd(e);
            } else this._destroyElement(t);
          }),
          (e._destroyElement = function (e) {
            p(e).detach().trigger("closed.bs.alert").remove();
          }),
          (n._jQueryInterface = function (i) {
            return this.each(function () {
              var e = p(this),
                t = e.data(a);
              t || ((t = new n(this)), e.data(a, t)),
                "close" === i && t[i](this);
            });
          }),
          (n._handleDismiss = function (t) {
            return function (e) {
              e && e.preventDefault(), t.close(this);
            };
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
          ]),
          n
        );
      })();
    p(document).on(
      "click.bs.alert.data-api",
      '[data-dismiss="alert"]',
      u._handleDismiss(new u())
    ),
      (p.fn[r] = u._jQueryInterface),
      (p.fn[r].Constructor = u),
      (p.fn[r].noConflict = function () {
        return (p.fn[r] = c), u._jQueryInterface;
      });
    var h = "button",
      d = "bs.button",
      f = p.fn[h],
      g = "active",
      v = '[data-toggle^="button"]',
      y = 'input:not([type="hidden"])',
      b = (function () {
        function i(e) {
          this._element = e;
        }
        var e = i.prototype;
        return (
          (e.toggle = function () {
            var e = !0,
              t = !0,
              i = p(this._element).closest('[data-toggle="buttons"]')[0];
            if (i) {
              var n = this._element.querySelector(y);
              if (n) {
                if ("radio" === n.type)
                  if (n.checked && this._element.classList.contains(g)) e = !1;
                  else {
                    var o = i.querySelector(".active");
                    o && p(o).removeClass(g);
                  }
                e &&
                  (("checkbox" !== n.type && "radio" !== n.type) ||
                    (n.checked = !this._element.classList.contains(g)),
                  p(n).trigger("change")),
                  n.focus(),
                  (t = !1);
              }
            }
            this._element.hasAttribute("disabled") ||
              this._element.classList.contains("disabled") ||
              (t &&
                this._element.setAttribute(
                  "aria-pressed",
                  !this._element.classList.contains(g)
                ),
              e && p(this._element).toggleClass(g));
          }),
          (e.dispose = function () {
            p.removeData(this._element, d), (this._element = null);
          }),
          (i._jQueryInterface = function (t) {
            return this.each(function () {
              var e = p(this).data(d);
              e || ((e = new i(this)), p(this).data(d, e)),
                "toggle" === t && e[t]();
            });
          }),
          s(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
          ]),
          i
        );
      })();
    p(document)
      .on("click.bs.button.data-api", v, function (e) {
        var t = e.target,
          i = t;
        if (
          (p(t).hasClass("btn") || (t = p(t).closest(".btn")[0]),
          !t || t.hasAttribute("disabled") || t.classList.contains("disabled"))
        )
          e.preventDefault();
        else {
          var n = t.querySelector(y);
          if (
            n &&
            (n.hasAttribute("disabled") || n.classList.contains("disabled"))
          )
            return void e.preventDefault();
          "LABEL" === i.tagName &&
            n &&
            "checkbox" === n.type &&
            e.preventDefault(),
            b._jQueryInterface.call(p(t), "toggle");
        }
      })
      .on("focus.bs.button.data-api blur.bs.button.data-api", v, function (e) {
        var t = p(e.target).closest(".btn")[0];
        p(t).toggleClass("focus", /^focus(in)?$/.test(e.type));
      }),
      p(window).on("load.bs.button.data-api", function () {
        for (
          var e = [].slice.call(
              document.querySelectorAll('[data-toggle="buttons"] .btn')
            ),
            t = 0,
            i = e.length;
          t < i;
          t++
        ) {
          var n = e[t],
            o = n.querySelector(y);
          o.checked || o.hasAttribute("checked")
            ? n.classList.add(g)
            : n.classList.remove(g);
        }
        for (
          var r = 0,
            s = (e = [].slice.call(
              document.querySelectorAll('[data-toggle="button"]')
            )).length;
          r < s;
          r++
        ) {
          var a = e[r];
          "true" === a.getAttribute("aria-pressed")
            ? a.classList.add(g)
            : a.classList.remove(g);
        }
      }),
      (p.fn[h] = b._jQueryInterface),
      (p.fn[h].Constructor = b),
      (p.fn[h].noConflict = function () {
        return (p.fn[h] = f), b._jQueryInterface;
      });
    var _ = "carousel",
      w = "bs.carousel",
      x = "." + w,
      E = p.fn[_],
      S = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0,
      },
      C = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean",
      },
      T = "next",
      k = "prev",
      A = "slid" + x,
      D = "active",
      I = ".active.carousel-item",
      L = { TOUCH: "touch", PEN: "pen" },
      P = (function () {
        function r(e, t) {
          (this._items = null),
            (this._interval = null),
            (this._activeElement = null),
            (this._isPaused = !1),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this.touchStartX = 0),
            (this.touchDeltaX = 0),
            (this._config = this._getConfig(t)),
            (this._element = e),
            (this._indicatorsElement = this._element.querySelector(
              ".carousel-indicators"
            )),
            (this._touchSupported =
              "ontouchstart" in document.documentElement ||
              0 < navigator.maxTouchPoints),
            (this._pointerEvent = Boolean(
              window.PointerEvent || window.MSPointerEvent
            )),
            this._addEventListeners();
        }
        var e = r.prototype;
        return (
          (e.next = function () {
            this._isSliding || this._slide(T);
          }),
          (e.nextWhenVisible = function () {
            !document.hidden &&
              p(this._element).is(":visible") &&
              "hidden" !== p(this._element).css("visibility") &&
              this.next();
          }),
          (e.prev = function () {
            this._isSliding || this._slide(k);
          }),
          (e.pause = function (e) {
            e || (this._isPaused = !0),
              this._element.querySelector(
                ".carousel-item-next, .carousel-item-prev"
              ) && (m.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (e.cycle = function (e) {
            e || (this._isPaused = !1),
              this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
                !this._isPaused &&
                (this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                ));
          }),
          (e.to = function (e) {
            var t = this;
            this._activeElement = this._element.querySelector(I);
            var i = this._getItemIndex(this._activeElement);
            if (!(e > this._items.length - 1 || e < 0))
              if (this._isSliding)
                p(this._element).one(A, function () {
                  return t.to(e);
                });
              else {
                if (i === e) return this.pause(), void this.cycle();
                var n = i < e ? T : k;
                this._slide(n, this._items[e]);
              }
          }),
          (e.dispose = function () {
            p(this._element).off(x),
              p.removeData(this._element, w),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (e._getConfig = function (e) {
            return (e = l(l({}, S), e)), m.typeCheckConfig(_, e, C), e;
          }),
          (e._handleSwipe = function () {
            var e = Math.abs(this.touchDeltaX);
            if (!(e <= 40)) {
              var t = e / this.touchDeltaX;
              (this.touchDeltaX = 0) < t && this.prev(), t < 0 && this.next();
            }
          }),
          (e._addEventListeners = function () {
            var t = this;
            this._config.keyboard &&
              p(this._element).on("keydown.bs.carousel", function (e) {
                return t._keydown(e);
              }),
              "hover" === this._config.pause &&
                p(this._element)
                  .on("mouseenter.bs.carousel", function (e) {
                    return t.pause(e);
                  })
                  .on("mouseleave.bs.carousel", function (e) {
                    return t.cycle(e);
                  }),
              this._config.touch && this._addTouchEventListeners();
          }),
          (e._addTouchEventListeners = function () {
            var t = this;
            if (this._touchSupported) {
              var i = function (e) {
                  t._pointerEvent &&
                  L[e.originalEvent.pointerType.toUpperCase()]
                    ? (t.touchStartX = e.originalEvent.clientX)
                    : t._pointerEvent ||
                      (t.touchStartX = e.originalEvent.touches[0].clientX);
                },
                n = function (e) {
                  t._pointerEvent &&
                    L[e.originalEvent.pointerType.toUpperCase()] &&
                    (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                    t._handleSwipe(),
                    "hover" === t._config.pause &&
                      (t.pause(),
                      t.touchTimeout && clearTimeout(t.touchTimeout),
                      (t.touchTimeout = setTimeout(function (e) {
                        return t.cycle(e);
                      }, 500 + t._config.interval)));
                };
              p(this._element.querySelectorAll(".carousel-item img")).on(
                "dragstart.bs.carousel",
                function (e) {
                  return e.preventDefault();
                }
              ),
                this._pointerEvent
                  ? (p(this._element).on(
                      "pointerdown.bs.carousel",
                      function (e) {
                        return i(e);
                      }
                    ),
                    p(this._element).on("pointerup.bs.carousel", function (e) {
                      return n(e);
                    }),
                    this._element.classList.add("pointer-event"))
                  : (p(this._element).on(
                      "touchstart.bs.carousel",
                      function (e) {
                        return i(e);
                      }
                    ),
                    p(this._element).on("touchmove.bs.carousel", function (e) {
                      return (function (e) {
                        e.originalEvent.touches &&
                        1 < e.originalEvent.touches.length
                          ? (t.touchDeltaX = 0)
                          : (t.touchDeltaX =
                              e.originalEvent.touches[0].clientX -
                              t.touchStartX);
                      })(e);
                    }),
                    p(this._element).on("touchend.bs.carousel", function (e) {
                      return n(e);
                    }));
            }
          }),
          (e._keydown = function (e) {
            if (!/input|textarea/i.test(e.target.tagName))
              switch (e.which) {
                case 37:
                  e.preventDefault(), this.prev();
                  break;
                case 39:
                  e.preventDefault(), this.next();
              }
          }),
          (e._getItemIndex = function (e) {
            return (
              (this._items =
                e && e.parentNode
                  ? [].slice.call(
                      e.parentNode.querySelectorAll(".carousel-item")
                    )
                  : []),
              this._items.indexOf(e)
            );
          }),
          (e._getItemByDirection = function (e, t) {
            var i = e === T,
              n = e === k,
              o = this._getItemIndex(t),
              r = this._items.length - 1;
            if (((n && 0 === o) || (i && o === r)) && !this._config.wrap)
              return t;
            var s = (o + (e === k ? -1 : 1)) % this._items.length;
            return -1 == s
              ? this._items[this._items.length - 1]
              : this._items[s];
          }),
          (e._triggerSlideEvent = function (e, t) {
            var i = this._getItemIndex(e),
              n = this._getItemIndex(this._element.querySelector(I)),
              o = p.Event("slide.bs.carousel", {
                relatedTarget: e,
                direction: t,
                from: n,
                to: i,
              });
            return p(this._element).trigger(o), o;
          }),
          (e._setActiveIndicatorElement = function (e) {
            if (this._indicatorsElement) {
              var t = [].slice.call(
                this._indicatorsElement.querySelectorAll(".active")
              );
              p(t).removeClass(D);
              var i = this._indicatorsElement.children[this._getItemIndex(e)];
              i && p(i).addClass(D);
            }
          }),
          (e._slide = function (e, t) {
            var i,
              n,
              o,
              r = this,
              s = this._element.querySelector(I),
              a = this._getItemIndex(s),
              l = t || (s && this._getItemByDirection(e, s)),
              c = this._getItemIndex(l),
              u = Boolean(this._interval);
            if (
              ((o =
                e === T
                  ? ((i = "carousel-item-left"),
                    (n = "carousel-item-next"),
                    "left")
                  : ((i = "carousel-item-right"),
                    (n = "carousel-item-prev"),
                    "right")),
              l && p(l).hasClass(D))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(l, o).isDefaultPrevented() &&
              s &&
              l
            ) {
              (this._isSliding = !0),
                u && this.pause(),
                this._setActiveIndicatorElement(l);
              var h = p.Event(A, {
                relatedTarget: l,
                direction: o,
                from: a,
                to: c,
              });
              if (p(this._element).hasClass("slide")) {
                p(l).addClass(n),
                  m.reflow(l),
                  p(s).addClass(i),
                  p(l).addClass(i);
                var d = parseInt(l.getAttribute("data-interval"), 10);
                d
                  ? ((this._config.defaultInterval =
                      this._config.defaultInterval || this._config.interval),
                    (this._config.interval = d))
                  : (this._config.interval =
                      this._config.defaultInterval || this._config.interval);
                var f = m.getTransitionDurationFromElement(s);
                p(s)
                  .one(m.TRANSITION_END, function () {
                    p(l)
                      .removeClass(i + " " + n)
                      .addClass(D),
                      p(s).removeClass(D + " " + n + " " + i),
                      (r._isSliding = !1),
                      setTimeout(function () {
                        return p(r._element).trigger(h);
                      }, 0);
                  })
                  .emulateTransitionEnd(f);
              } else
                p(s).removeClass(D),
                  p(l).addClass(D),
                  (this._isSliding = !1),
                  p(this._element).trigger(h);
              u && this.cycle();
            }
          }),
          (r._jQueryInterface = function (n) {
            return this.each(function () {
              var e = p(this).data(w),
                t = l(l({}, S), p(this).data());
              "object" == typeof n && (t = l(l({}, t), n));
              var i = "string" == typeof n ? n : t.slide;
              if (
                (e || ((e = new r(this, t)), p(this).data(w, e)),
                "number" == typeof n)
              )
                e.to(n);
              else if ("string" == typeof i) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i]();
              } else t.interval && t.ride && (e.pause(), e.cycle());
            });
          }),
          (r._dataApiClickHandler = function (e) {
            var t = m.getSelectorFromElement(this);
            if (t) {
              var i = p(t)[0];
              if (i && p(i).hasClass("carousel")) {
                var n = l(l({}, p(i).data()), p(this).data()),
                  o = this.getAttribute("data-slide-to");
                o && (n.interval = !1),
                  r._jQueryInterface.call(p(i), n),
                  o && p(i).data(w).to(o),
                  e.preventDefault();
              }
            }
          }),
          s(r, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return S;
              },
            },
          ]),
          r
        );
      })();
    p(document).on(
      "click.bs.carousel.data-api",
      "[data-slide], [data-slide-to]",
      P._dataApiClickHandler
    ),
      p(window).on("load.bs.carousel.data-api", function () {
        for (
          var e = [].slice.call(
              document.querySelectorAll('[data-ride="carousel"]')
            ),
            t = 0,
            i = e.length;
          t < i;
          t++
        ) {
          var n = p(e[t]);
          P._jQueryInterface.call(n, n.data());
        }
      }),
      (p.fn[_] = P._jQueryInterface),
      (p.fn[_].Constructor = P),
      (p.fn[_].noConflict = function () {
        return (p.fn[_] = E), P._jQueryInterface;
      });
    var j = "collapse",
      N = "bs.collapse",
      O = p.fn[j],
      M = { toggle: !0, parent: "" },
      z = { toggle: "boolean", parent: "(string|element)" },
      B = "show",
      H = "collapse",
      R = "collapsing",
      q = "collapsed",
      F = '[data-toggle="collapse"]',
      W = (function () {
        function a(t, e) {
          (this._isTransitioning = !1),
            (this._element = t),
            (this._config = this._getConfig(e)),
            (this._triggerArray = [].slice.call(
              document.querySelectorAll(
                '[data-toggle="collapse"][href="#' +
                  t.id +
                  '"],[data-toggle="collapse"][data-target="#' +
                  t.id +
                  '"]'
              )
            ));
          for (
            var i = [].slice.call(document.querySelectorAll(F)),
              n = 0,
              o = i.length;
            n < o;
            n++
          ) {
            var r = i[n],
              s = m.getSelectorFromElement(r),
              a = [].slice
                .call(document.querySelectorAll(s))
                .filter(function (e) {
                  return e === t;
                });
            null !== s &&
              0 < a.length &&
              ((this._selector = s), this._triggerArray.push(r));
          }
          (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
              this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle();
        }
        var e = a.prototype;
        return (
          (e.toggle = function () {
            p(this._element).hasClass(B) ? this.hide() : this.show();
          }),
          (e.show = function () {
            var e,
              t,
              i = this;
            if (
              !this._isTransitioning &&
              !p(this._element).hasClass(B) &&
              (this._parent &&
                0 ===
                  (e = [].slice
                    .call(this._parent.querySelectorAll(".show, .collapsing"))
                    .filter(function (e) {
                      return "string" == typeof i._config.parent
                        ? e.getAttribute("data-parent") === i._config.parent
                        : e.classList.contains(H);
                    })).length &&
                (e = null),
              !(
                e &&
                (t = p(e).not(this._selector).data(N)) &&
                t._isTransitioning
              ))
            ) {
              var n = p.Event("show.bs.collapse");
              if ((p(this._element).trigger(n), !n.isDefaultPrevented())) {
                e &&
                  (a._jQueryInterface.call(p(e).not(this._selector), "hide"),
                  t || p(e).data(N, null));
                var o = this._getDimension();
                p(this._element).removeClass(H).addClass(R),
                  (this._element.style[o] = 0),
                  this._triggerArray.length &&
                    p(this._triggerArray)
                      .removeClass(q)
                      .attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                  s = m.getTransitionDurationFromElement(this._element);
                p(this._element)
                  .one(m.TRANSITION_END, function () {
                    p(i._element)
                      .removeClass(R)
                      .addClass(H + " " + B),
                      (i._element.style[o] = ""),
                      i.setTransitioning(!1),
                      p(i._element).trigger("shown.bs.collapse");
                  })
                  .emulateTransitionEnd(s),
                  (this._element.style[o] = this._element[r] + "px");
              }
            }
          }),
          (e.hide = function () {
            var e = this;
            if (!this._isTransitioning && p(this._element).hasClass(B)) {
              var t = p.Event("hide.bs.collapse");
              if ((p(this._element).trigger(t), !t.isDefaultPrevented())) {
                var i = this._getDimension();
                (this._element.style[i] =
                  this._element.getBoundingClientRect()[i] + "px"),
                  m.reflow(this._element),
                  p(this._element)
                    .addClass(R)
                    .removeClass(H + " " + B);
                var n = this._triggerArray.length;
                if (0 < n)
                  for (var o = 0; o < n; o++) {
                    var r = this._triggerArray[o],
                      s = m.getSelectorFromElement(r);
                    if (null !== s)
                      p([].slice.call(document.querySelectorAll(s))).hasClass(
                        B
                      ) || p(r).addClass(q).attr("aria-expanded", !1);
                  }
                this.setTransitioning(!0);
                this._element.style[i] = "";
                var a = m.getTransitionDurationFromElement(this._element);
                p(this._element)
                  .one(m.TRANSITION_END, function () {
                    e.setTransitioning(!1),
                      p(e._element)
                        .removeClass(R)
                        .addClass(H)
                        .trigger("hidden.bs.collapse");
                  })
                  .emulateTransitionEnd(a);
              }
            }
          }),
          (e.setTransitioning = function (e) {
            this._isTransitioning = e;
          }),
          (e.dispose = function () {
            p.removeData(this._element, N),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (e._getConfig = function (e) {
            return (
              ((e = l(l({}, M), e)).toggle = Boolean(e.toggle)),
              m.typeCheckConfig(j, e, z),
              e
            );
          }),
          (e._getDimension = function () {
            return p(this._element).hasClass("width") ? "width" : "height";
          }),
          (e._getParent = function () {
            var e,
              i = this;
            m.isElement(this._config.parent)
              ? ((e = this._config.parent),
                void 0 !== this._config.parent.jquery &&
                  (e = this._config.parent[0]))
              : (e = document.querySelector(this._config.parent));
            var t =
                '[data-toggle="collapse"][data-parent="' +
                this._config.parent +
                '"]',
              n = [].slice.call(e.querySelectorAll(t));
            return (
              p(n).each(function (e, t) {
                i._addAriaAndCollapsedClass(a._getTargetFromElement(t), [t]);
              }),
              e
            );
          }),
          (e._addAriaAndCollapsedClass = function (e, t) {
            var i = p(e).hasClass(B);
            t.length && p(t).toggleClass(q, !i).attr("aria-expanded", i);
          }),
          (a._getTargetFromElement = function (e) {
            var t = m.getSelectorFromElement(e);
            return t ? document.querySelector(t) : null;
          }),
          (a._jQueryInterface = function (n) {
            return this.each(function () {
              var e = p(this),
                t = e.data(N),
                i = l(
                  l(l({}, M), e.data()),
                  "object" == typeof n && n ? n : {}
                );
              if (
                (!t &&
                  i.toggle &&
                  "string" == typeof n &&
                  /show|hide/.test(n) &&
                  (i.toggle = !1),
                t || ((t = new a(this, i)), e.data(N, t)),
                "string" == typeof n)
              ) {
                if (void 0 === t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              }
            });
          }),
          s(a, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return M;
              },
            },
          ]),
          a
        );
      })();
    p(document).on("click.bs.collapse.data-api", F, function (e) {
      "A" === e.currentTarget.tagName && e.preventDefault();
      var i = p(this),
        t = m.getSelectorFromElement(this),
        n = [].slice.call(document.querySelectorAll(t));
      p(n).each(function () {
        var e = p(this),
          t = e.data(N) ? "toggle" : i.data();
        W._jQueryInterface.call(e, t);
      });
    }),
      (p.fn[j] = W._jQueryInterface),
      (p.fn[j].Constructor = W),
      (p.fn[j].noConflict = function () {
        return (p.fn[j] = O), W._jQueryInterface;
      });
    var $ =
        "undefined" != typeof window &&
        "undefined" != typeof document &&
        "undefined" != typeof navigator,
      V = (function () {
        for (
          var e = ["Edge", "Trident", "Firefox"], t = 0;
          t < e.length;
          t += 1
        )
          if ($ && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
        return 0;
      })();
    var U =
      $ && window.Promise
        ? function (e) {
            var t = !1;
            return function () {
              t ||
                ((t = !0),
                window.Promise.resolve().then(function () {
                  (t = !1), e();
                }));
            };
          }
        : function (e) {
            var t = !1;
            return function () {
              t ||
                ((t = !0),
                setTimeout(function () {
                  (t = !1), e();
                }, V));
            };
          };
    function Y(e) {
      return e && "[object Function]" === {}.toString.call(e);
    }
    function Q(e, t) {
      if (1 !== e.nodeType) return [];
      var i = e.ownerDocument.defaultView.getComputedStyle(e, null);
      return t ? i[t] : i;
    }
    function X(e) {
      return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function G(e) {
      if (!e) return document.body;
      switch (e.nodeName) {
        case "HTML":
        case "BODY":
          return e.ownerDocument.body;
        case "#document":
          return e.body;
      }
      var t = Q(e),
        i = t.overflow,
        n = t.overflowX,
        o = t.overflowY;
      return /(auto|scroll|overlay)/.test(i + o + n) ? e : G(X(e));
    }
    function K(e) {
      return e && e.referenceNode ? e.referenceNode : e;
    }
    var J = $ && !(!window.MSInputMethodContext || !document.documentMode),
      Z = $ && /MSIE 10/.test(navigator.userAgent);
    function ee(e) {
      return 11 === e ? J : 10 === e ? Z : J || Z;
    }
    function te(e) {
      if (!e) return document.documentElement;
      for (
        var t = ee(10) ? document.body : null, i = e.offsetParent || null;
        i === t && e.nextElementSibling;

      )
        i = (e = e.nextElementSibling).offsetParent;
      var n = i && i.nodeName;
      return n && "BODY" !== n && "HTML" !== n
        ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) &&
          "static" === Q(i, "position")
          ? te(i)
          : i
        : e
        ? e.ownerDocument.documentElement
        : document.documentElement;
    }
    function ie(e) {
      return null !== e.parentNode ? ie(e.parentNode) : e;
    }
    function ne(e, t) {
      if (!(e && e.nodeType && t && t.nodeType))
        return document.documentElement;
      var i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        n = i ? e : t,
        o = i ? t : e,
        r = document.createRange();
      r.setStart(n, 0), r.setEnd(o, 0);
      var s = r.commonAncestorContainer;
      if ((e !== s && t !== s) || n.contains(o))
        return (function (e) {
          var t = e.nodeName;
          return (
            "BODY" !== t && ("HTML" === t || te(e.firstElementChild) === e)
          );
        })(s)
          ? s
          : te(s);
      var a = ie(e);
      return a.host ? ne(a.host, t) : ne(e, ie(t).host);
    }
    function oe(e, t) {
      var i =
          "top" === (1 < arguments.length && void 0 !== t ? t : "top")
            ? "scrollTop"
            : "scrollLeft",
        n = e.nodeName;
      if ("BODY" !== n && "HTML" !== n) return e[i];
      var o = e.ownerDocument.documentElement;
      return (e.ownerDocument.scrollingElement || o)[i];
    }
    function re(e, t) {
      var i = "x" === t ? "Left" : "Top",
        n = "Left" == i ? "Right" : "Bottom";
      return (
        parseFloat(e["border" + i + "Width"], 10) +
        parseFloat(e["border" + n + "Width"], 10)
      );
    }
    function se(e, t, i, n) {
      return Math.max(
        t["offset" + e],
        t["scroll" + e],
        i["client" + e],
        i["offset" + e],
        i["scroll" + e],
        ee(10)
          ? parseInt(i["offset" + e]) +
              parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) +
              parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")])
          : 0
      );
    }
    function ae(e) {
      var t = e.body,
        i = e.documentElement,
        n = ee(10) && getComputedStyle(i);
      return { height: se("Height", t, i, n), width: se("Width", t, i, n) };
    }
    var le = function (e, t, i) {
      return t && ce(e.prototype, t), i && ce(e, i), e;
    };
    function ce(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    function ue(e, t, i) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = i),
        e
      );
    }
    var he =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var i = arguments[t];
          for (var n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
        }
        return e;
      };
    function de(e) {
      return he({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }
    function fe(e) {
      var t = {};
      try {
        if (ee(10)) {
          t = e.getBoundingClientRect();
          var i = oe(e, "top"),
            n = oe(e, "left");
          (t.top += i), (t.left += n), (t.bottom += i), (t.right += n);
        } else t = e.getBoundingClientRect();
      } catch (e) {}
      var o = {
          left: t.left,
          top: t.top,
          width: t.right - t.left,
          height: t.bottom - t.top,
        },
        r = "HTML" === e.nodeName ? ae(e.ownerDocument) : {},
        s = r.width || e.clientWidth || o.width,
        a = r.height || e.clientHeight || o.height,
        l = e.offsetWidth - s,
        c = e.offsetHeight - a;
      if (l || c) {
        var u = Q(e);
        (l -= re(u, "x")), (c -= re(u, "y")), (o.width -= l), (o.height -= c);
      }
      return de(o);
    }
    function pe(e, t, i) {
      var n = 2 < arguments.length && void 0 !== i && i,
        o = ee(10),
        r = "HTML" === t.nodeName,
        s = fe(e),
        a = fe(t),
        l = G(e),
        c = Q(t),
        u = parseFloat(c.borderTopWidth, 10),
        h = parseFloat(c.borderLeftWidth, 10);
      n && r && ((a.top = Math.max(a.top, 0)), (a.left = Math.max(a.left, 0)));
      var d = de({
        top: s.top - a.top - u,
        left: s.left - a.left - h,
        width: s.width,
        height: s.height,
      });
      if (((d.marginTop = 0), (d.marginLeft = 0), !o && r)) {
        var f = parseFloat(c.marginTop, 10),
          p = parseFloat(c.marginLeft, 10);
        (d.top -= u - f),
          (d.bottom -= u - f),
          (d.left -= h - p),
          (d.right -= h - p),
          (d.marginTop = f),
          (d.marginLeft = p);
      }
      return (
        (o && !n ? t.contains(l) : t === l && "BODY" !== l.nodeName) &&
          (d = (function (e, t, i) {
            var n = 2 < arguments.length && void 0 !== i && i,
              o = oe(t, "top"),
              r = oe(t, "left"),
              s = n ? -1 : 1;
            return (
              (e.top += o * s),
              (e.bottom += o * s),
              (e.left += r * s),
              (e.right += r * s),
              e
            );
          })(d, t)),
        d
      );
    }
    function me(e) {
      if (!e || !e.parentElement || ee()) return document.documentElement;
      for (var t = e.parentElement; t && "none" === Q(t, "transform"); )
        t = t.parentElement;
      return t || document.documentElement;
    }
    function ge(e, t, i, n, o) {
      var r = 4 < arguments.length && void 0 !== o && o,
        s = { top: 0, left: 0 },
        a = r ? me(e) : ne(e, K(t));
      if ("viewport" === n)
        s = (function (e, t) {
          var i = 1 < arguments.length && void 0 !== t && t,
            n = e.ownerDocument.documentElement,
            o = pe(e, n),
            r = Math.max(n.clientWidth, window.innerWidth || 0),
            s = Math.max(n.clientHeight, window.innerHeight || 0),
            a = i ? 0 : oe(n),
            l = i ? 0 : oe(n, "left");
          return de({
            top: a - o.top + o.marginTop,
            left: l - o.left + o.marginLeft,
            width: r,
            height: s,
          });
        })(a, r);
      else {
        var l = void 0;
        "scrollParent" === n
          ? "BODY" === (l = G(X(t))).nodeName &&
            (l = e.ownerDocument.documentElement)
          : (l = "window" === n ? e.ownerDocument.documentElement : n);
        var c = pe(l, a, r);
        if (
          "HTML" !== l.nodeName ||
          (function e(t) {
            var i = t.nodeName;
            if ("BODY" === i || "HTML" === i) return !1;
            if ("fixed" === Q(t, "position")) return !0;
            var n = X(t);
            return !!n && e(n);
          })(a)
        )
          s = c;
        else {
          var u = ae(e.ownerDocument),
            h = u.height,
            d = u.width;
          (s.top += c.top - c.marginTop),
            (s.bottom = h + c.top),
            (s.left += c.left - c.marginLeft),
            (s.right = d + c.left);
        }
      }
      var f = "number" == typeof (i = i || 0);
      return (
        (s.left += f ? i : i.left || 0),
        (s.top += f ? i : i.top || 0),
        (s.right -= f ? i : i.right || 0),
        (s.bottom -= f ? i : i.bottom || 0),
        s
      );
    }
    function ve(e, t, n, i, o, r) {
      var s = 5 < arguments.length && void 0 !== r ? r : 0;
      if (-1 === e.indexOf("auto")) return e;
      var a = ge(n, i, s, o),
        l = {
          top: { width: a.width, height: t.top - a.top },
          right: { width: a.right - t.right, height: a.height },
          bottom: { width: a.width, height: a.bottom - t.bottom },
          left: { width: t.left - a.left, height: a.height },
        },
        c = Object.keys(l)
          .map(function (e) {
            return he({ key: e }, l[e], {
              area: (function (e) {
                return e.width * e.height;
              })(l[e]),
            });
          })
          .sort(function (e, t) {
            return t.area - e.area;
          }),
        u = c.filter(function (e) {
          var t = e.width,
            i = e.height;
          return t >= n.clientWidth && i >= n.clientHeight;
        }),
        h = 0 < u.length ? u[0].key : c[0].key,
        d = e.split("-")[1];
      return h + (d ? "-" + d : "");
    }
    function ye(e, t, i, n) {
      var o = 3 < arguments.length && void 0 !== n ? n : null;
      return pe(i, o ? me(t) : ne(t, K(i)), o);
    }
    function be(e) {
      var t = e.ownerDocument.defaultView.getComputedStyle(e),
        i = parseFloat(t.marginTop || 0) + parseFloat(t.marginBottom || 0),
        n = parseFloat(t.marginLeft || 0) + parseFloat(t.marginRight || 0);
      return { width: e.offsetWidth + n, height: e.offsetHeight + i };
    }
    function _e(e) {
      var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
      return e.replace(/left|right|bottom|top/g, function (e) {
        return t[e];
      });
    }
    function we(e, t, i) {
      i = i.split("-")[0];
      var n = be(e),
        o = { width: n.width, height: n.height },
        r = -1 !== ["right", "left"].indexOf(i),
        s = r ? "top" : "left",
        a = r ? "left" : "top",
        l = r ? "height" : "width",
        c = r ? "width" : "height";
      return (
        (o[s] = t[s] + t[l] / 2 - n[l] / 2),
        (o[a] = i === a ? t[a] - n[c] : t[_e(a)]),
        o
      );
    }
    function xe(e, t) {
      return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function Ee(e, i, t) {
      return (
        (void 0 === t
          ? e
          : e.slice(
              0,
              (function (e, t, i) {
                if (Array.prototype.findIndex)
                  return e.findIndex(function (e) {
                    return e[t] === i;
                  });
                var n = xe(e, function (e) {
                  return e[t] === i;
                });
                return e.indexOf(n);
              })(e, "name", t)
            )
        ).forEach(function (e) {
          e.function &&
            console.warn(
              "`modifier.function` is deprecated, use `modifier.fn`!"
            );
          var t = e.function || e.fn;
          e.enabled &&
            Y(t) &&
            ((i.offsets.popper = de(i.offsets.popper)),
            (i.offsets.reference = de(i.offsets.reference)),
            (i = t(i, e)));
        }),
        i
      );
    }
    function Se(e, i) {
      return e.some(function (e) {
        var t = e.name;
        return e.enabled && t === i;
      });
    }
    function Ce(e) {
      for (
        var t = [!1, "ms", "Webkit", "Moz", "O"],
          i = e.charAt(0).toUpperCase() + e.slice(1),
          n = 0;
        n < t.length;
        n++
      ) {
        var o = t[n],
          r = o ? "" + o + i : e;
        if (void 0 !== document.body.style[r]) return r;
      }
      return null;
    }
    function Te(e) {
      var t = e.ownerDocument;
      return t ? t.defaultView : window;
    }
    function ke(e, t, i, n) {
      (i.updateBound = n),
        Te(e).addEventListener("resize", i.updateBound, { passive: !0 });
      var o = G(e);
      return (
        (function e(t, i, n, o) {
          var r = "BODY" === t.nodeName,
            s = r ? t.ownerDocument.defaultView : t;
          s.addEventListener(i, n, { passive: !0 }),
            r || e(G(s.parentNode), i, n, o),
            o.push(s);
        })(o, "scroll", i.updateBound, i.scrollParents),
        (i.scrollElement = o),
        (i.eventsEnabled = !0),
        i
      );
    }
    function Ae() {
      this.state.eventsEnabled &&
        (cancelAnimationFrame(this.scheduleUpdate),
        (this.state = (function (e, t) {
          return (
            Te(e).removeEventListener("resize", t.updateBound),
            t.scrollParents.forEach(function (e) {
              e.removeEventListener("scroll", t.updateBound);
            }),
            (t.updateBound = null),
            (t.scrollParents = []),
            (t.scrollElement = null),
            (t.eventsEnabled = !1),
            t
          );
        })(this.reference, this.state)));
    }
    function De(e) {
      return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function Ie(i, n) {
      Object.keys(n).forEach(function (e) {
        var t = "";
        -1 !==
          ["width", "height", "top", "right", "bottom", "left"].indexOf(e) &&
          De(n[e]) &&
          (t = "px"),
          (i.style[e] = n[e] + t);
      });
    }
    var Le = $ && /Firefox/i.test(navigator.userAgent);
    function Pe(e, t, i) {
      var n = xe(e, function (e) {
          return e.name === t;
        }),
        o =
          !!n &&
          e.some(function (e) {
            return e.name === i && e.enabled && e.order < n.order;
          });
      if (!o) {
        var r = "`" + t + "`",
          s = "`" + i + "`";
        console.warn(
          s +
            " modifier is required by " +
            r +
            " modifier in order to work, be sure to include it before " +
            r +
            "!"
        );
      }
      return o;
    }
    var je = [
        "auto-start",
        "auto",
        "auto-end",
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-end",
        "bottom",
        "bottom-start",
        "left-end",
        "left",
        "left-start",
      ],
      Ne = je.slice(3);
    function Oe(e, t) {
      var i = 1 < arguments.length && void 0 !== t && t,
        n = Ne.indexOf(e),
        o = Ne.slice(n + 1).concat(Ne.slice(0, n));
      return i ? o.reverse() : o;
    }
    var Me = "flip",
      ze = "clockwise",
      Be = "counterclockwise";
    function He(e, o, r, t) {
      var s = [0, 0],
        a = -1 !== ["right", "left"].indexOf(t),
        i = e.split(/(\+|\-)/).map(function (e) {
          return e.trim();
        }),
        n = i.indexOf(
          xe(i, function (e) {
            return -1 !== e.search(/,|\s/);
          })
        );
      i[n] &&
        -1 === i[n].indexOf(",") &&
        console.warn(
          "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
        );
      var l = /\s*,\s*|\s+/,
        c =
          -1 !== n
            ? [
                i.slice(0, n).concat([i[n].split(l)[0]]),
                [i[n].split(l)[1]].concat(i.slice(n + 1)),
              ]
            : [i];
      return (
        (c = c.map(function (e, t) {
          var i = (1 === t ? !a : a) ? "height" : "width",
            n = !1;
          return e
            .reduce(function (e, t) {
              return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
                ? ((e[e.length - 1] = t), (n = !0), e)
                : n
                ? ((e[e.length - 1] += t), (n = !1), e)
                : e.concat(t);
            }, [])
            .map(function (e) {
              return (function (e, t, i, n) {
                var o = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                  r = +o[1],
                  s = o[2];
                if (!r) return e;
                if (0 !== s.indexOf("%"))
                  return "vh" !== s && "vw" !== s
                    ? r
                    : (("vh" === s
                        ? Math.max(
                            document.documentElement.clientHeight,
                            window.innerHeight || 0
                          )
                        : Math.max(
                            document.documentElement.clientWidth,
                            window.innerWidth || 0
                          )) /
                        100) *
                        r;
                var a = void 0;
                switch (s) {
                  case "%p":
                    a = i;
                    break;
                  case "%":
                  case "%r":
                  default:
                    a = n;
                }
                return (de(a)[t] / 100) * r;
              })(e, i, o, r);
            });
        })).forEach(function (i, n) {
          i.forEach(function (e, t) {
            De(e) && (s[n] += e * ("-" === i[t - 1] ? -1 : 1));
          });
        }),
        s
      );
    }
    var Re = {
        placement: "bottom",
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function () {},
        onUpdate: function () {},
        modifiers: {
          shift: {
            order: 100,
            enabled: !0,
            fn: function (e) {
              var t = e.placement,
                i = t.split("-")[0],
                n = t.split("-")[1];
              if (n) {
                var o = e.offsets,
                  r = o.reference,
                  s = o.popper,
                  a = -1 !== ["bottom", "top"].indexOf(i),
                  l = a ? "left" : "top",
                  c = a ? "width" : "height",
                  u = {
                    start: ue({}, l, r[l]),
                    end: ue({}, l, r[l] + r[c] - s[c]),
                  };
                e.offsets.popper = he({}, s, u[n]);
              }
              return e;
            },
          },
          offset: {
            order: 200,
            enabled: !0,
            fn: function (e, t) {
              var i = t.offset,
                n = e.placement,
                o = e.offsets,
                r = o.popper,
                s = o.reference,
                a = n.split("-")[0],
                l = void 0;
              return (
                (l = De(+i) ? [+i, 0] : He(i, r, s, a)),
                "left" === a
                  ? ((r.top += l[0]), (r.left -= l[1]))
                  : "right" === a
                  ? ((r.top += l[0]), (r.left += l[1]))
                  : "top" === a
                  ? ((r.left += l[0]), (r.top -= l[1]))
                  : "bottom" === a && ((r.left += l[0]), (r.top += l[1])),
                (e.popper = r),
                e
              );
            },
            offset: 0,
          },
          preventOverflow: {
            order: 300,
            enabled: !0,
            fn: function (e, n) {
              var t = n.boundariesElement || te(e.instance.popper);
              e.instance.reference === t && (t = te(t));
              var i = Ce("transform"),
                o = e.instance.popper.style,
                r = o.top,
                s = o.left,
                a = o[i];
              (o.top = ""), (o.left = ""), (o[i] = "");
              var l = ge(
                e.instance.popper,
                e.instance.reference,
                n.padding,
                t,
                e.positionFixed
              );
              (o.top = r), (o.left = s), (o[i] = a), (n.boundaries = l);
              var c = n.priority,
                u = e.offsets.popper,
                h = {
                  primary: function (e) {
                    var t = u[e];
                    return (
                      u[e] < l[e] &&
                        !n.escapeWithReference &&
                        (t = Math.max(u[e], l[e])),
                      ue({}, e, t)
                    );
                  },
                  secondary: function (e) {
                    var t = "right" === e ? "left" : "top",
                      i = u[t];
                    return (
                      u[e] > l[e] &&
                        !n.escapeWithReference &&
                        (i = Math.min(
                          u[t],
                          l[e] - ("right" === e ? u.width : u.height)
                        )),
                      ue({}, t, i)
                    );
                  },
                };
              return (
                c.forEach(function (e) {
                  var t =
                    -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                  u = he({}, u, h[t](e));
                }),
                (e.offsets.popper = u),
                e
              );
            },
            priority: ["left", "right", "top", "bottom"],
            padding: 5,
            boundariesElement: "scrollParent",
          },
          keepTogether: {
            order: 400,
            enabled: !0,
            fn: function (e) {
              var t = e.offsets,
                i = t.popper,
                n = t.reference,
                o = e.placement.split("-")[0],
                r = Math.floor,
                s = -1 !== ["top", "bottom"].indexOf(o),
                a = s ? "right" : "bottom",
                l = s ? "left" : "top",
                c = s ? "width" : "height";
              return (
                i[a] < r(n[l]) && (e.offsets.popper[l] = r(n[l]) - i[c]),
                i[l] > r(n[a]) && (e.offsets.popper[l] = r(n[a])),
                e
              );
            },
          },
          arrow: {
            order: 500,
            enabled: !0,
            fn: function (e, t) {
              var i;
              if (!Pe(e.instance.modifiers, "arrow", "keepTogether")) return e;
              var n = t.element;
              if ("string" == typeof n) {
                if (!(n = e.instance.popper.querySelector(n))) return e;
              } else if (!e.instance.popper.contains(n))
                return (
                  console.warn(
                    "WARNING: `arrow.element` must be child of its popper element!"
                  ),
                  e
                );
              var o = e.placement.split("-")[0],
                r = e.offsets,
                s = r.popper,
                a = r.reference,
                l = -1 !== ["left", "right"].indexOf(o),
                c = l ? "height" : "width",
                u = l ? "Top" : "Left",
                h = u.toLowerCase(),
                d = l ? "left" : "top",
                f = l ? "bottom" : "right",
                p = be(n)[c];
              a[f] - p < s[h] && (e.offsets.popper[h] -= s[h] - (a[f] - p)),
                a[h] + p > s[f] && (e.offsets.popper[h] += a[h] + p - s[f]),
                (e.offsets.popper = de(e.offsets.popper));
              var m = a[h] + a[c] / 2 - p / 2,
                g = Q(e.instance.popper),
                v = parseFloat(g["margin" + u], 10),
                y = parseFloat(g["border" + u + "Width"], 10),
                b = m - e.offsets.popper[h] - v - y;
              return (
                (b = Math.max(Math.min(s[c] - p, b), 0)),
                (e.arrowElement = n),
                (e.offsets.arrow =
                  (ue((i = {}), h, Math.round(b)), ue(i, d, ""), i)),
                e
              );
            },
            element: "[x-arrow]",
          },
          flip: {
            order: 600,
            enabled: !0,
            fn: function (m, g) {
              if (Se(m.instance.modifiers, "inner")) return m;
              if (m.flipped && m.placement === m.originalPlacement) return m;
              var v = ge(
                  m.instance.popper,
                  m.instance.reference,
                  g.padding,
                  g.boundariesElement,
                  m.positionFixed
                ),
                y = m.placement.split("-")[0],
                b = _e(y),
                _ = m.placement.split("-")[1] || "",
                w = [];
              switch (g.behavior) {
                case Me:
                  w = [y, b];
                  break;
                case ze:
                  w = Oe(y);
                  break;
                case Be:
                  w = Oe(y, !0);
                  break;
                default:
                  w = g.behavior;
              }
              return (
                w.forEach(function (e, t) {
                  if (y !== e || w.length === t + 1) return m;
                  (y = m.placement.split("-")[0]), (b = _e(y));
                  var i = m.offsets.popper,
                    n = m.offsets.reference,
                    o = Math.floor,
                    r =
                      ("left" === y && o(i.right) > o(n.left)) ||
                      ("right" === y && o(i.left) < o(n.right)) ||
                      ("top" === y && o(i.bottom) > o(n.top)) ||
                      ("bottom" === y && o(i.top) < o(n.bottom)),
                    s = o(i.left) < o(v.left),
                    a = o(i.right) > o(v.right),
                    l = o(i.top) < o(v.top),
                    c = o(i.bottom) > o(v.bottom),
                    u =
                      ("left" === y && s) ||
                      ("right" === y && a) ||
                      ("top" === y && l) ||
                      ("bottom" === y && c),
                    h = -1 !== ["top", "bottom"].indexOf(y),
                    d =
                      !!g.flipVariations &&
                      ((h && "start" === _ && s) ||
                        (h && "end" === _ && a) ||
                        (!h && "start" === _ && l) ||
                        (!h && "end" === _ && c)),
                    f =
                      !!g.flipVariationsByContent &&
                      ((h && "start" === _ && a) ||
                        (h && "end" === _ && s) ||
                        (!h && "start" === _ && c) ||
                        (!h && "end" === _ && l)),
                    p = d || f;
                  (r || u || p) &&
                    ((m.flipped = !0),
                    (r || u) && (y = w[t + 1]),
                    p &&
                      (_ = (function (e) {
                        return "end" === e
                          ? "start"
                          : "start" === e
                          ? "end"
                          : e;
                      })(_)),
                    (m.placement = y + (_ ? "-" + _ : "")),
                    (m.offsets.popper = he(
                      {},
                      m.offsets.popper,
                      we(m.instance.popper, m.offsets.reference, m.placement)
                    )),
                    (m = Ee(m.instance.modifiers, m, "flip")));
                }),
                m
              );
            },
            behavior: "flip",
            padding: 5,
            boundariesElement: "viewport",
            flipVariations: !1,
            flipVariationsByContent: !1,
          },
          inner: {
            order: 700,
            enabled: !1,
            fn: function (e) {
              var t = e.placement,
                i = t.split("-")[0],
                n = e.offsets,
                o = n.popper,
                r = n.reference,
                s = -1 !== ["left", "right"].indexOf(i),
                a = -1 === ["top", "left"].indexOf(i);
              return (
                (o[s ? "left" : "top"] =
                  r[i] - (a ? o[s ? "width" : "height"] : 0)),
                (e.placement = _e(t)),
                (e.offsets.popper = de(o)),
                e
              );
            },
          },
          hide: {
            order: 800,
            enabled: !0,
            fn: function (e) {
              if (!Pe(e.instance.modifiers, "hide", "preventOverflow"))
                return e;
              var t = e.offsets.reference,
                i = xe(e.instance.modifiers, function (e) {
                  return "preventOverflow" === e.name;
                }).boundaries;
              if (
                t.bottom < i.top ||
                t.left > i.right ||
                t.top > i.bottom ||
                t.right < i.left
              ) {
                if (!0 === e.hide) return e;
                (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
              } else {
                if (!1 === e.hide) return e;
                (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
              }
              return e;
            },
          },
          computeStyle: {
            order: 850,
            enabled: !0,
            fn: function (e, t) {
              var i = t.x,
                n = t.y,
                o = e.offsets.popper,
                r = xe(e.instance.modifiers, function (e) {
                  return "applyStyle" === e.name;
                }).gpuAcceleration;
              void 0 !== r &&
                console.warn(
                  "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                );
              var s = void 0 !== r ? r : t.gpuAcceleration,
                a = te(e.instance.popper),
                l = fe(a),
                c = { position: o.position },
                u = (function (e, t) {
                  function i(e) {
                    return e;
                  }
                  var n = e.offsets,
                    o = n.popper,
                    r = n.reference,
                    s = Math.round,
                    a = Math.floor,
                    l = s(r.width),
                    c = s(o.width),
                    u = -1 !== ["left", "right"].indexOf(e.placement),
                    h = -1 !== e.placement.indexOf("-"),
                    d = t ? (u || h || l % 2 == c % 2 ? s : a) : i,
                    f = t ? s : i;
                  return {
                    left: d(
                      l % 2 == 1 && c % 2 == 1 && !h && t ? o.left - 1 : o.left
                    ),
                    top: f(o.top),
                    bottom: f(o.bottom),
                    right: d(o.right),
                  };
                })(e, window.devicePixelRatio < 2 || !Le),
                h = "bottom" === i ? "top" : "bottom",
                d = "right" === n ? "left" : "right",
                f = Ce("transform"),
                p = void 0,
                m = void 0;
              if (
                ((m =
                  "bottom" == h
                    ? "HTML" === a.nodeName
                      ? -a.clientHeight + u.bottom
                      : -l.height + u.bottom
                    : u.top),
                (p =
                  "right" == d
                    ? "HTML" === a.nodeName
                      ? -a.clientWidth + u.right
                      : -l.width + u.right
                    : u.left),
                s && f)
              )
                (c[f] = "translate3d(" + p + "px, " + m + "px, 0)"),
                  (c[h] = 0),
                  (c[d] = 0),
                  (c.willChange = "transform");
              else {
                var g = "bottom" == h ? -1 : 1,
                  v = "right" == d ? -1 : 1;
                (c[h] = m * g), (c[d] = p * v), (c.willChange = h + ", " + d);
              }
              var y = { "x-placement": e.placement };
              return (
                (e.attributes = he({}, y, e.attributes)),
                (e.styles = he({}, c, e.styles)),
                (e.arrowStyles = he({}, e.offsets.arrow, e.arrowStyles)),
                e
              );
            },
            gpuAcceleration: !0,
            x: "bottom",
            y: "right",
          },
          applyStyle: {
            order: 900,
            enabled: !0,
            fn: function (e) {
              return (
                Ie(e.instance.popper, e.styles),
                (function (t, i) {
                  Object.keys(i).forEach(function (e) {
                    !1 !== i[e]
                      ? t.setAttribute(e, i[e])
                      : t.removeAttribute(e);
                  });
                })(e.instance.popper, e.attributes),
                e.arrowElement &&
                  Object.keys(e.arrowStyles).length &&
                  Ie(e.arrowElement, e.arrowStyles),
                e
              );
            },
            onLoad: function (e, t, i, n, o) {
              var r = ye(o, t, e, i.positionFixed),
                s = ve(
                  i.placement,
                  r,
                  t,
                  e,
                  i.modifiers.flip.boundariesElement,
                  i.modifiers.flip.padding
                );
              return (
                t.setAttribute("x-placement", s),
                Ie(t, { position: i.positionFixed ? "fixed" : "absolute" }),
                i
              );
            },
            gpuAcceleration: void 0,
          },
        },
      },
      qe =
        (le(Fe, [
          {
            key: "update",
            value: function () {
              return function () {
                if (!this.state.isDestroyed) {
                  var e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {},
                  };
                  (e.offsets.reference = ye(
                    this.state,
                    this.popper,
                    this.reference,
                    this.options.positionFixed
                  )),
                    (e.placement = ve(
                      this.options.placement,
                      e.offsets.reference,
                      this.popper,
                      this.reference,
                      this.options.modifiers.flip.boundariesElement,
                      this.options.modifiers.flip.padding
                    )),
                    (e.originalPlacement = e.placement),
                    (e.positionFixed = this.options.positionFixed),
                    (e.offsets.popper = we(
                      this.popper,
                      e.offsets.reference,
                      e.placement
                    )),
                    (e.offsets.popper.position = this.options.positionFixed
                      ? "fixed"
                      : "absolute"),
                    (e = Ee(this.modifiers, e)),
                    this.state.isCreated
                      ? this.options.onUpdate(e)
                      : ((this.state.isCreated = !0), this.options.onCreate(e));
                }
              }.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return function () {
                return (
                  (this.state.isDestroyed = !0),
                  Se(this.modifiers, "applyStyle") &&
                    (this.popper.removeAttribute("x-placement"),
                    (this.popper.style.position = ""),
                    (this.popper.style.top = ""),
                    (this.popper.style.left = ""),
                    (this.popper.style.right = ""),
                    (this.popper.style.bottom = ""),
                    (this.popper.style.willChange = ""),
                    (this.popper.style[Ce("transform")] = "")),
                  this.disableEventListeners(),
                  this.options.removeOnDestroy &&
                    this.popper.parentNode.removeChild(this.popper),
                  this
                );
              }.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return function () {
                this.state.eventsEnabled ||
                  (this.state = ke(
                    this.reference,
                    this.options,
                    this.state,
                    this.scheduleUpdate
                  ));
              }.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return Ae.call(this);
            },
          },
        ]),
        Fe);
    function Fe(e, t) {
      var i = this,
        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      !(function (e, t) {
        if (!(e instanceof t))
          throw new TypeError("Cannot call a class as a function");
      })(this, Fe),
        (this.scheduleUpdate = function () {
          return requestAnimationFrame(i.update);
        }),
        (this.update = U(this.update.bind(this))),
        (this.options = he({}, Fe.Defaults, n)),
        (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
        (this.reference = e && e.jquery ? e[0] : e),
        (this.popper = t && t.jquery ? t[0] : t),
        (this.options.modifiers = {}),
        Object.keys(he({}, Fe.Defaults.modifiers, n.modifiers)).forEach(
          function (e) {
            i.options.modifiers[e] = he(
              {},
              Fe.Defaults.modifiers[e] || {},
              n.modifiers ? n.modifiers[e] : {}
            );
          }
        ),
        (this.modifiers = Object.keys(this.options.modifiers)
          .map(function (e) {
            return he({ name: e }, i.options.modifiers[e]);
          })
          .sort(function (e, t) {
            return e.order - t.order;
          })),
        this.modifiers.forEach(function (e) {
          e.enabled &&
            Y(e.onLoad) &&
            e.onLoad(i.reference, i.popper, i.options, e, i.state);
        }),
        this.update();
      var o = this.options.eventsEnabled;
      o && this.enableEventListeners(), (this.state.eventsEnabled = o);
    }
    (qe.Utils = ("undefined" != typeof window ? window : global).PopperUtils),
      (qe.placements = je),
      (qe.Defaults = Re);
    var We = "dropdown",
      $e = "bs.dropdown",
      Ve = "." + $e,
      Ue = ".data-api",
      Ye = p.fn[We],
      Qe = new RegExp("38|40|27"),
      Xe = "hide" + Ve,
      Ge = "hidden" + Ve,
      Ke = "click" + Ve + Ue,
      Je = "keydown" + Ve + Ue,
      Ze = "disabled",
      et = "show",
      tt = "dropdown-menu-right",
      it = '[data-toggle="dropdown"]',
      nt = ".dropdown-menu",
      ot = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null,
      },
      rt = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
        popperConfig: "(null|object)",
      },
      st = (function () {
        function c(e, t) {
          (this._element = e),
            (this._popper = null),
            (this._config = this._getConfig(t)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var e = c.prototype;
        return (
          (e.toggle = function () {
            if (!this._element.disabled && !p(this._element).hasClass(Ze)) {
              var e = p(this._menu).hasClass(et);
              c._clearMenus(), e || this.show(!0);
            }
          }),
          (e.show = function (e) {
            if (
              (void 0 === e && (e = !1),
              !(
                this._element.disabled ||
                p(this._element).hasClass(Ze) ||
                p(this._menu).hasClass(et)
              ))
            ) {
              var t = { relatedTarget: this._element },
                i = p.Event("show.bs.dropdown", t),
                n = c._getParentFromElement(this._element);
              if ((p(n).trigger(i), !i.isDefaultPrevented())) {
                if (!this._inNavbar && e) {
                  if (void 0 === qe)
                    throw new TypeError(
                      "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                    );
                  var o = this._element;
                  "parent" === this._config.reference
                    ? (o = n)
                    : m.isElement(this._config.reference) &&
                      ((o = this._config.reference),
                      void 0 !== this._config.reference.jquery &&
                        (o = this._config.reference[0])),
                    "scrollParent" !== this._config.boundary &&
                      p(n).addClass("position-static"),
                    (this._popper = new qe(
                      o,
                      this._menu,
                      this._getPopperConfig()
                    ));
                }
                "ontouchstart" in document.documentElement &&
                  0 === p(n).closest(".navbar-nav").length &&
                  p(document.body).children().on("mouseover", null, p.noop),
                  this._element.focus(),
                  this._element.setAttribute("aria-expanded", !0),
                  p(this._menu).toggleClass(et),
                  p(n).toggleClass(et).trigger(p.Event("shown.bs.dropdown", t));
              }
            }
          }),
          (e.hide = function () {
            if (
              !this._element.disabled &&
              !p(this._element).hasClass(Ze) &&
              p(this._menu).hasClass(et)
            ) {
              var e = { relatedTarget: this._element },
                t = p.Event(Xe, e),
                i = c._getParentFromElement(this._element);
              p(i).trigger(t),
                t.isDefaultPrevented() ||
                  (this._popper && this._popper.destroy(),
                  p(this._menu).toggleClass(et),
                  p(i).toggleClass(et).trigger(p.Event(Ge, e)));
            }
          }),
          (e.dispose = function () {
            p.removeData(this._element, $e),
              p(this._element).off(Ve),
              (this._element = null),
              (this._menu = null) !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (e.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (e._addEventListeners = function () {
            var t = this;
            p(this._element).on("click.bs.dropdown", function (e) {
              e.preventDefault(), e.stopPropagation(), t.toggle();
            });
          }),
          (e._getConfig = function (e) {
            return (
              (e = l(
                l(l({}, this.constructor.Default), p(this._element).data()),
                e
              )),
              m.typeCheckConfig(We, e, this.constructor.DefaultType),
              e
            );
          }),
          (e._getMenuElement = function () {
            if (!this._menu) {
              var e = c._getParentFromElement(this._element);
              e && (this._menu = e.querySelector(nt));
            }
            return this._menu;
          }),
          (e._getPlacement = function () {
            var e = p(this._element.parentNode),
              t = "bottom-start";
            return (
              e.hasClass("dropup")
                ? (t = p(this._menu).hasClass(tt) ? "top-end" : "top-start")
                : e.hasClass("dropright")
                ? (t = "right-start")
                : e.hasClass("dropleft")
                ? (t = "left-start")
                : p(this._menu).hasClass(tt) && (t = "bottom-end"),
              t
            );
          }),
          (e._detectNavbar = function () {
            return 0 < p(this._element).closest(".navbar").length;
          }),
          (e._getOffset = function () {
            var t = this,
              e = {};
            return (
              "function" == typeof this._config.offset
                ? (e.fn = function (e) {
                    return (
                      (e.offsets = l(
                        l({}, e.offsets),
                        t._config.offset(e.offsets, t._element) || {}
                      )),
                      e
                    );
                  })
                : (e.offset = this._config.offset),
              e
            );
          }),
          (e._getPopperConfig = function () {
            var e = {
              placement: this._getPlacement(),
              modifiers: {
                offset: this._getOffset(),
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
                (e.modifiers.applyStyle = { enabled: !1 }),
              l(l({}, e), this._config.popperConfig)
            );
          }),
          (c._jQueryInterface = function (t) {
            return this.each(function () {
              var e = p(this).data($e);
              if (
                (e ||
                  ((e = new c(this, "object" == typeof t ? t : null)),
                  p(this).data($e, e)),
                "string" == typeof t)
              ) {
                if (void 0 === e[t])
                  throw new TypeError('No method named "' + t + '"');
                e[t]();
              }
            });
          }),
          (c._clearMenus = function (e) {
            if (!e || (3 !== e.which && ("keyup" !== e.type || 9 === e.which)))
              for (
                var t = [].slice.call(document.querySelectorAll(it)),
                  i = 0,
                  n = t.length;
                i < n;
                i++
              ) {
                var o = c._getParentFromElement(t[i]),
                  r = p(t[i]).data($e),
                  s = { relatedTarget: t[i] };
                if ((e && "click" === e.type && (s.clickEvent = e), r)) {
                  var a = r._menu;
                  if (
                    p(o).hasClass(et) &&
                    !(
                      e &&
                      (("click" === e.type &&
                        /input|textarea/i.test(e.target.tagName)) ||
                        ("keyup" === e.type && 9 === e.which)) &&
                      p.contains(o, e.target)
                    )
                  ) {
                    var l = p.Event(Xe, s);
                    p(o).trigger(l),
                      l.isDefaultPrevented() ||
                        ("ontouchstart" in document.documentElement &&
                          p(document.body)
                            .children()
                            .off("mouseover", null, p.noop),
                        t[i].setAttribute("aria-expanded", "false"),
                        r._popper && r._popper.destroy(),
                        p(a).removeClass(et),
                        p(o).removeClass(et).trigger(p.Event(Ge, s)));
                  }
                }
              }
          }),
          (c._getParentFromElement = function (e) {
            var t,
              i = m.getSelectorFromElement(e);
            return i && (t = document.querySelector(i)), t || e.parentNode;
          }),
          (c._dataApiKeydownHandler = function (e) {
            if (
              (/input|textarea/i.test(e.target.tagName)
                ? !(
                    32 === e.which ||
                    (27 !== e.which &&
                      ((40 !== e.which && 38 !== e.which) ||
                        p(e.target).closest(nt).length))
                  )
                : Qe.test(e.which)) &&
              !this.disabled &&
              !p(this).hasClass(Ze)
            ) {
              var t = c._getParentFromElement(this),
                i = p(t).hasClass(et);
              if (i || 27 !== e.which) {
                if (
                  (e.preventDefault(),
                  e.stopPropagation(),
                  !i || (i && (27 === e.which || 32 === e.which)))
                )
                  return (
                    27 === e.which && p(t.querySelector(it)).trigger("focus"),
                    void p(this).trigger("click")
                  );
                var n = [].slice
                  .call(
                    t.querySelectorAll(
                      ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"
                    )
                  )
                  .filter(function (e) {
                    return p(e).is(":visible");
                  });
                if (0 !== n.length) {
                  var o = n.indexOf(e.target);
                  38 === e.which && 0 < o && o--,
                    40 === e.which && o < n.length - 1 && o++,
                    o < 0 && (o = 0),
                    n[o].focus();
                }
              }
            }
          }),
          s(c, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return ot;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return rt;
              },
            },
          ]),
          c
        );
      })();
    p(document)
      .on(Je, it, st._dataApiKeydownHandler)
      .on(Je, nt, st._dataApiKeydownHandler)
      .on(Ke + " keyup.bs.dropdown.data-api", st._clearMenus)
      .on(Ke, it, function (e) {
        e.preventDefault(),
          e.stopPropagation(),
          st._jQueryInterface.call(p(this), "toggle");
      })
      .on(Ke, ".dropdown form", function (e) {
        e.stopPropagation();
      }),
      (p.fn[We] = st._jQueryInterface),
      (p.fn[We].Constructor = st),
      (p.fn[We].noConflict = function () {
        return (p.fn[We] = Ye), st._jQueryInterface;
      });
    var at = "modal",
      lt = "bs.modal",
      ct = "." + lt,
      ut = p.fn[at],
      ht = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
      dt = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      },
      ft = "hidden" + ct,
      pt = "show" + ct,
      mt = "focusin" + ct,
      gt = "resize" + ct,
      vt = "click.dismiss" + ct,
      yt = "keydown.dismiss" + ct,
      bt = "mousedown.dismiss" + ct,
      _t = "modal-open",
      wt = "fade",
      xt = "show",
      Et = "modal-static",
      St = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      Ct = ".sticky-top",
      Tt = (function () {
        function o(e, t) {
          (this._config = this._getConfig(t)),
            (this._element = e),
            (this._dialog = e.querySelector(".modal-dialog")),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._isTransitioning = !1),
            (this._scrollbarWidth = 0);
        }
        var e = o.prototype;
        return (
          (e.toggle = function (e) {
            return this._isShown ? this.hide() : this.show(e);
          }),
          (e.show = function (e) {
            var t = this;
            if (!this._isShown && !this._isTransitioning) {
              p(this._element).hasClass(wt) && (this._isTransitioning = !0);
              var i = p.Event(pt, { relatedTarget: e });
              p(this._element).trigger(i),
                this._isShown ||
                  i.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  p(this._element).on(
                    vt,
                    '[data-dismiss="modal"]',
                    function (e) {
                      return t.hide(e);
                    }
                  ),
                  p(this._dialog).on(bt, function () {
                    p(t._element).one("mouseup.dismiss.bs.modal", function (e) {
                      p(e.target).is(t._element) &&
                        (t._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return t._showElement(e);
                  }));
            }
          }),
          (e.hide = function (e) {
            var t = this;
            if (
              (e && e.preventDefault(), this._isShown && !this._isTransitioning)
            ) {
              var i = p.Event("hide.bs.modal");
              if (
                (p(this._element).trigger(i),
                this._isShown && !i.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var n = p(this._element).hasClass(wt);
                if (
                  (n && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  p(document).off(mt),
                  p(this._element).removeClass(xt),
                  p(this._element).off(vt),
                  p(this._dialog).off(bt),
                  n)
                ) {
                  var o = m.getTransitionDurationFromElement(this._element);
                  p(this._element)
                    .one(m.TRANSITION_END, function (e) {
                      return t._hideModal(e);
                    })
                    .emulateTransitionEnd(o);
                } else this._hideModal();
              }
            }
          }),
          (e.dispose = function () {
            [window, this._element, this._dialog].forEach(function (e) {
              return p(e).off(ct);
            }),
              p(document).off(mt),
              p.removeData(this._element, lt),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._isTransitioning = null),
              (this._scrollbarWidth = null);
          }),
          (e.handleUpdate = function () {
            this._adjustDialog();
          }),
          (e._getConfig = function (e) {
            return (e = l(l({}, ht), e)), m.typeCheckConfig(at, e, dt), e;
          }),
          (e._triggerBackdropTransition = function () {
            var e = this;
            if ("static" === this._config.backdrop) {
              var t = p.Event("hidePrevented.bs.modal");
              if ((p(this._element).trigger(t), t.defaultPrevented)) return;
              this._element.classList.add(Et);
              var i = m.getTransitionDurationFromElement(this._element);
              p(this._element)
                .one(m.TRANSITION_END, function () {
                  e._element.classList.remove(Et);
                })
                .emulateTransitionEnd(i),
                this._element.focus();
            } else this.hide();
          }),
          (e._showElement = function (e) {
            var t = this,
              i = p(this._element).hasClass(wt),
              n = this._dialog
                ? this._dialog.querySelector(".modal-body")
                : null;
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              this._element.setAttribute("aria-modal", !0),
              p(this._dialog).hasClass("modal-dialog-scrollable") && n
                ? (n.scrollTop = 0)
                : (this._element.scrollTop = 0),
              i && m.reflow(this._element),
              p(this._element).addClass(xt),
              this._config.focus && this._enforceFocus();
            function o() {
              t._config.focus && t._element.focus(),
                (t._isTransitioning = !1),
                p(t._element).trigger(r);
            }
            var r = p.Event("shown.bs.modal", { relatedTarget: e });
            if (i) {
              var s = m.getTransitionDurationFromElement(this._dialog);
              p(this._dialog).one(m.TRANSITION_END, o).emulateTransitionEnd(s);
            } else o();
          }),
          (e._enforceFocus = function () {
            var t = this;
            p(document)
              .off(mt)
              .on(mt, function (e) {
                document !== e.target &&
                  t._element !== e.target &&
                  0 === p(t._element).has(e.target).length &&
                  t._element.focus();
              });
          }),
          (e._setEscapeEvent = function () {
            var t = this;
            this._isShown
              ? p(this._element).on(yt, function (e) {
                  t._config.keyboard && 27 === e.which
                    ? (e.preventDefault(), t.hide())
                    : t._config.keyboard ||
                      27 !== e.which ||
                      t._triggerBackdropTransition();
                })
              : this._isShown || p(this._element).off(yt);
          }),
          (e._setResizeEvent = function () {
            var t = this;
            this._isShown
              ? p(window).on(gt, function (e) {
                  return t.handleUpdate(e);
                })
              : p(window).off(gt);
          }),
          (e._hideModal = function () {
            var e = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              this._element.removeAttribute("aria-modal"),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                p(document.body).removeClass(_t),
                  e._resetAdjustments(),
                  e._resetScrollbar(),
                  p(e._element).trigger(ft);
              });
          }),
          (e._removeBackdrop = function () {
            this._backdrop &&
              (p(this._backdrop).remove(), (this._backdrop = null));
          }),
          (e._showBackdrop = function (e) {
            var t = this,
              i = p(this._element).hasClass(wt) ? wt : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                (this._backdrop.className = "modal-backdrop"),
                i && this._backdrop.classList.add(i),
                p(this._backdrop).appendTo(document.body),
                p(this._element).on(vt, function (e) {
                  t._ignoreBackdropClick
                    ? (t._ignoreBackdropClick = !1)
                    : e.target === e.currentTarget &&
                      t._triggerBackdropTransition();
                }),
                i && m.reflow(this._backdrop),
                p(this._backdrop).addClass(xt),
                !e)
              )
                return;
              if (!i) return void e();
              var n = m.getTransitionDurationFromElement(this._backdrop);
              p(this._backdrop)
                .one(m.TRANSITION_END, e)
                .emulateTransitionEnd(n);
            } else if (!this._isShown && this._backdrop) {
              p(this._backdrop).removeClass(xt);
              var o = function () {
                t._removeBackdrop(), e && e();
              };
              if (p(this._element).hasClass(wt)) {
                var r = m.getTransitionDurationFromElement(this._backdrop);
                p(this._backdrop)
                  .one(m.TRANSITION_END, o)
                  .emulateTransitionEnd(r);
              } else o();
            } else e && e();
          }),
          (e._adjustDialog = function () {
            var e =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              e &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
                !e &&
                (this._element.style.paddingRight =
                  this._scrollbarWidth + "px");
          }),
          (e._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (e._checkScrollbar = function () {
            var e = document.body.getBoundingClientRect();
            (this._isBodyOverflowing =
              Math.round(e.left + e.right) < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (e._setScrollbar = function () {
            var o = this;
            if (this._isBodyOverflowing) {
              var e = [].slice.call(document.querySelectorAll(St)),
                t = [].slice.call(document.querySelectorAll(Ct));
              p(e).each(function (e, t) {
                var i = t.style.paddingRight,
                  n = p(t).css("padding-right");
                p(t)
                  .data("padding-right", i)
                  .css(
                    "padding-right",
                    parseFloat(n) + o._scrollbarWidth + "px"
                  );
              }),
                p(t).each(function (e, t) {
                  var i = t.style.marginRight,
                    n = p(t).css("margin-right");
                  p(t)
                    .data("margin-right", i)
                    .css(
                      "margin-right",
                      parseFloat(n) - o._scrollbarWidth + "px"
                    );
                });
              var i = document.body.style.paddingRight,
                n = p(document.body).css("padding-right");
              p(document.body)
                .data("padding-right", i)
                .css(
                  "padding-right",
                  parseFloat(n) + this._scrollbarWidth + "px"
                );
            }
            p(document.body).addClass(_t);
          }),
          (e._resetScrollbar = function () {
            var e = [].slice.call(document.querySelectorAll(St));
            p(e).each(function (e, t) {
              var i = p(t).data("padding-right");
              p(t).removeData("padding-right"),
                (t.style.paddingRight = i || "");
            });
            var t = [].slice.call(document.querySelectorAll(Ct));
            p(t).each(function (e, t) {
              var i = p(t).data("margin-right");
              void 0 !== i &&
                p(t).css("margin-right", i).removeData("margin-right");
            });
            var i = p(document.body).data("padding-right");
            p(document.body).removeData("padding-right"),
              (document.body.style.paddingRight = i || "");
          }),
          (e._getScrollbarWidth = function () {
            var e = document.createElement("div");
            (e.className = "modal-scrollbar-measure"),
              document.body.appendChild(e);
            var t = e.getBoundingClientRect().width - e.clientWidth;
            return document.body.removeChild(e), t;
          }),
          (o._jQueryInterface = function (i, n) {
            return this.each(function () {
              var e = p(this).data(lt),
                t = l(
                  l(l({}, ht), p(this).data()),
                  "object" == typeof i && i ? i : {}
                );
              if (
                (e || ((e = new o(this, t)), p(this).data(lt, e)),
                "string" == typeof i)
              ) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i](n);
              } else t.show && e.show(n);
            });
          }),
          s(o, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return ht;
              },
            },
          ]),
          o
        );
      })();
    p(document).on(
      "click.bs.modal.data-api",
      '[data-toggle="modal"]',
      function (e) {
        var t,
          i = this,
          n = m.getSelectorFromElement(this);
        n && (t = document.querySelector(n));
        var o = p(t).data(lt)
          ? "toggle"
          : l(l({}, p(t).data()), p(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || e.preventDefault();
        var r = p(t).one(pt, function (e) {
          e.isDefaultPrevented() ||
            r.one(ft, function () {
              p(i).is(":visible") && i.focus();
            });
        });
        Tt._jQueryInterface.call(p(t), o, this);
      }
    ),
      (p.fn[at] = Tt._jQueryInterface),
      (p.fn[at].Constructor = Tt),
      (p.fn[at].noConflict = function () {
        return (p.fn[at] = ut), Tt._jQueryInterface;
      });
    var kt = [
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
      ],
      At = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      Dt = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
      It =
        /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    function Lt(e, s, t) {
      if (0 === e.length) return e;
      if (t && "function" == typeof t) return t(e);
      for (
        var i = new window.DOMParser().parseFromString(e, "text/html"),
          a = Object.keys(s),
          l = [].slice.call(i.body.querySelectorAll("*")),
          n = function (e, t) {
            var i = l[e],
              n = i.nodeName.toLowerCase();
            if (-1 === a.indexOf(i.nodeName.toLowerCase()))
              return i.parentNode.removeChild(i), "continue";
            var o = [].slice.call(i.attributes),
              r = [].concat(s["*"] || [], s[n] || []);
            o.forEach(function (e) {
              !(function (e, t) {
                var i = e.nodeName.toLowerCase();
                if (-1 !== t.indexOf(i))
                  return (
                    -1 === kt.indexOf(i) ||
                    Boolean(e.nodeValue.match(Dt) || e.nodeValue.match(It))
                  );
                for (
                  var n = t.filter(function (e) {
                      return e instanceof RegExp;
                    }),
                    o = 0,
                    r = n.length;
                  o < r;
                  o++
                )
                  if (i.match(n[o])) return !0;
                return !1;
              })(e, r) && i.removeAttribute(e.nodeName);
            });
          },
          o = 0,
          r = l.length;
        o < r;
        o++
      )
        n(o);
      return i.body.innerHTML;
    }
    var Pt = "tooltip",
      jt = "bs.tooltip",
      Nt = "." + jt,
      Ot = p.fn[Pt],
      Mt = "bs-tooltip",
      zt = new RegExp("(^|\\s)" + Mt + "\\S+", "g"),
      Bt = ["sanitize", "whiteList", "sanitizeFn"],
      Ht = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object",
        popperConfig: "(null|object)",
      },
      Rt = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left",
      },
      qt = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        sanitize: !0,
        sanitizeFn: null,
        whiteList: At,
        popperConfig: null,
      },
      Ft = "show",
      Wt = {
        HIDE: "hide" + Nt,
        HIDDEN: "hidden" + Nt,
        SHOW: "show" + Nt,
        SHOWN: "shown" + Nt,
        INSERTED: "inserted" + Nt,
        CLICK: "click" + Nt,
        FOCUSIN: "focusin" + Nt,
        FOCUSOUT: "focusout" + Nt,
        MOUSEENTER: "mouseenter" + Nt,
        MOUSELEAVE: "mouseleave" + Nt,
      },
      $t = "fade",
      Vt = "show",
      Ut = "hover",
      Yt = "focus",
      Qt = (function () {
        function n(e, t) {
          if (void 0 === qe)
            throw new TypeError(
              "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
            );
          (this._isEnabled = !0),
            (this._timeout = 0),
            (this._hoverState = ""),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this.element = e),
            (this.config = this._getConfig(t)),
            (this.tip = null),
            this._setListeners();
        }
        var e = n.prototype;
        return (
          (e.enable = function () {
            this._isEnabled = !0;
          }),
          (e.disable = function () {
            this._isEnabled = !1;
          }),
          (e.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }),
          (e.toggle = function (e) {
            if (this._isEnabled)
              if (e) {
                var t = this.constructor.DATA_KEY,
                  i = p(e.currentTarget).data(t);
                i ||
                  ((i = new this.constructor(
                    e.currentTarget,
                    this._getDelegateConfig()
                  )),
                  p(e.currentTarget).data(t, i)),
                  (i._activeTrigger.click = !i._activeTrigger.click),
                  i._isWithActiveTrigger()
                    ? i._enter(null, i)
                    : i._leave(null, i);
              } else {
                if (p(this.getTipElement()).hasClass(Vt))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (e.dispose = function () {
            clearTimeout(this._timeout),
              p.removeData(this.element, this.constructor.DATA_KEY),
              p(this.element).off(this.constructor.EVENT_KEY),
              p(this.element)
                .closest(".modal")
                .off("hide.bs.modal", this._hideModalHandler),
              this.tip && p(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null),
              this._popper && this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (e.show = function () {
            var t = this;
            if ("none" === p(this.element).css("display"))
              throw new Error("Please use show on visible elements");
            var e = p.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              p(this.element).trigger(e);
              var i = m.findShadowRoot(this.element),
                n = p.contains(
                  null !== i ? i : this.element.ownerDocument.documentElement,
                  this.element
                );
              if (e.isDefaultPrevented() || !n) return;
              var o = this.getTipElement(),
                r = m.getUID(this.constructor.NAME);
              o.setAttribute("id", r),
                this.element.setAttribute("aria-describedby", r),
                this.setContent(),
                this.config.animation && p(o).addClass($t);
              var s =
                  "function" == typeof this.config.placement
                    ? this.config.placement.call(this, o, this.element)
                    : this.config.placement,
                a = this._getAttachment(s);
              this.addAttachmentClass(a);
              var l = this._getContainer();
              p(o).data(this.constructor.DATA_KEY, this),
                p.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || p(o).appendTo(l),
                p(this.element).trigger(this.constructor.Event.INSERTED),
                (this._popper = new qe(
                  this.element,
                  o,
                  this._getPopperConfig(a)
                )),
                p(o).addClass(Vt),
                "ontouchstart" in document.documentElement &&
                  p(document.body).children().on("mouseover", null, p.noop);
              var c = function () {
                t.config.animation && t._fixTransition();
                var e = t._hoverState;
                (t._hoverState = null),
                  p(t.element).trigger(t.constructor.Event.SHOWN),
                  "out" === e && t._leave(null, t);
              };
              if (p(this.tip).hasClass($t)) {
                var u = m.getTransitionDurationFromElement(this.tip);
                p(this.tip).one(m.TRANSITION_END, c).emulateTransitionEnd(u);
              } else c();
            }
          }),
          (e.hide = function (e) {
            function t() {
              i._hoverState !== Ft &&
                n.parentNode &&
                n.parentNode.removeChild(n),
                i._cleanTipClass(),
                i.element.removeAttribute("aria-describedby"),
                p(i.element).trigger(i.constructor.Event.HIDDEN),
                null !== i._popper && i._popper.destroy(),
                e && e();
            }
            var i = this,
              n = this.getTipElement(),
              o = p.Event(this.constructor.Event.HIDE);
            if ((p(this.element).trigger(o), !o.isDefaultPrevented())) {
              if (
                (p(n).removeClass(Vt),
                "ontouchstart" in document.documentElement &&
                  p(document.body).children().off("mouseover", null, p.noop),
                (this._activeTrigger.click = !1),
                (this._activeTrigger[Yt] = !1),
                (this._activeTrigger[Ut] = !1),
                p(this.tip).hasClass($t))
              ) {
                var r = m.getTransitionDurationFromElement(n);
                p(n).one(m.TRANSITION_END, t).emulateTransitionEnd(r);
              } else t();
              this._hoverState = "";
            }
          }),
          (e.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (e.isWithContent = function () {
            return Boolean(this.getTitle());
          }),
          (e.addAttachmentClass = function (e) {
            p(this.getTipElement()).addClass(Mt + "-" + e);
          }),
          (e.getTipElement = function () {
            return (
              (this.tip = this.tip || p(this.config.template)[0]), this.tip
            );
          }),
          (e.setContent = function () {
            var e = this.getTipElement();
            this.setElementContent(
              p(e.querySelectorAll(".tooltip-inner")),
              this.getTitle()
            ),
              p(e).removeClass($t + " " + Vt);
          }),
          (e.setElementContent = function (e, t) {
            "object" != typeof t || (!t.nodeType && !t.jquery)
              ? this.config.html
                ? (this.config.sanitize &&
                    (t = Lt(t, this.config.whiteList, this.config.sanitizeFn)),
                  e.html(t))
                : e.text(t)
              : this.config.html
              ? p(t).parent().is(e) || e.empty().append(t)
              : e.text(p(t).text());
          }),
          (e.getTitle = function () {
            var e = this.element.getAttribute("data-original-title");
            return (e =
              e ||
              ("function" == typeof this.config.title
                ? this.config.title.call(this.element)
                : this.config.title));
          }),
          (e._getPopperConfig = function (e) {
            var t = this;
            return l(
              l(
                {},
                {
                  placement: e,
                  modifiers: {
                    offset: this._getOffset(),
                    flip: { behavior: this.config.fallbackPlacement },
                    arrow: { element: ".arrow" },
                    preventOverflow: {
                      boundariesElement: this.config.boundary,
                    },
                  },
                  onCreate: function (e) {
                    e.originalPlacement !== e.placement &&
                      t._handlePopperPlacementChange(e);
                  },
                  onUpdate: function (e) {
                    return t._handlePopperPlacementChange(e);
                  },
                }
              ),
              this.config.popperConfig
            );
          }),
          (e._getOffset = function () {
            var t = this,
              e = {};
            return (
              "function" == typeof this.config.offset
                ? (e.fn = function (e) {
                    return (
                      (e.offsets = l(
                        l({}, e.offsets),
                        t.config.offset(e.offsets, t.element) || {}
                      )),
                      e
                    );
                  })
                : (e.offset = this.config.offset),
              e
            );
          }),
          (e._getContainer = function () {
            return !1 === this.config.container
              ? document.body
              : m.isElement(this.config.container)
              ? p(this.config.container)
              : p(document).find(this.config.container);
          }),
          (e._getAttachment = function (e) {
            return Rt[e.toUpperCase()];
          }),
          (e._setListeners = function () {
            var n = this;
            this.config.trigger.split(" ").forEach(function (e) {
              if ("click" === e)
                p(n.element).on(
                  n.constructor.Event.CLICK,
                  n.config.selector,
                  function (e) {
                    return n.toggle(e);
                  }
                );
              else if ("manual" !== e) {
                var t =
                    e === Ut
                      ? n.constructor.Event.MOUSEENTER
                      : n.constructor.Event.FOCUSIN,
                  i =
                    e === Ut
                      ? n.constructor.Event.MOUSELEAVE
                      : n.constructor.Event.FOCUSOUT;
                p(n.element)
                  .on(t, n.config.selector, function (e) {
                    return n._enter(e);
                  })
                  .on(i, n.config.selector, function (e) {
                    return n._leave(e);
                  });
              }
            }),
              (this._hideModalHandler = function () {
                n.element && n.hide();
              }),
              p(this.element)
                .closest(".modal")
                .on("hide.bs.modal", this._hideModalHandler),
              this.config.selector
                ? (this.config = l(
                    l({}, this.config),
                    {},
                    { trigger: "manual", selector: "" }
                  ))
                : this._fixTitle();
          }),
          (e._fixTitle = function () {
            var e = typeof this.element.getAttribute("data-original-title");
            (!this.element.getAttribute("title") && "string" == e) ||
              (this.element.setAttribute(
                "data-original-title",
                this.element.getAttribute("title") || ""
              ),
              this.element.setAttribute("title", ""));
          }),
          (e._enter = function (e, t) {
            var i = this.constructor.DATA_KEY;
            (t = t || p(e.currentTarget).data(i)) ||
              ((t = new this.constructor(
                e.currentTarget,
                this._getDelegateConfig()
              )),
              p(e.currentTarget).data(i, t)),
              e && (t._activeTrigger["focusin" === e.type ? Yt : Ut] = !0),
              p(t.getTipElement()).hasClass(Vt) || t._hoverState === Ft
                ? (t._hoverState = Ft)
                : (clearTimeout(t._timeout),
                  (t._hoverState = Ft),
                  t.config.delay && t.config.delay.show
                    ? (t._timeout = setTimeout(function () {
                        t._hoverState === Ft && t.show();
                      }, t.config.delay.show))
                    : t.show());
          }),
          (e._leave = function (e, t) {
            var i = this.constructor.DATA_KEY;
            (t = t || p(e.currentTarget).data(i)) ||
              ((t = new this.constructor(
                e.currentTarget,
                this._getDelegateConfig()
              )),
              p(e.currentTarget).data(i, t)),
              e && (t._activeTrigger["focusout" === e.type ? Yt : Ut] = !1),
              t._isWithActiveTrigger() ||
                (clearTimeout(t._timeout),
                (t._hoverState = "out"),
                t.config.delay && t.config.delay.hide
                  ? (t._timeout = setTimeout(function () {
                      "out" === t._hoverState && t.hide();
                    }, t.config.delay.hide))
                  : t.hide());
          }),
          (e._isWithActiveTrigger = function () {
            for (var e in this._activeTrigger)
              if (this._activeTrigger[e]) return !0;
            return !1;
          }),
          (e._getConfig = function (e) {
            var t = p(this.element).data();
            return (
              Object.keys(t).forEach(function (e) {
                -1 !== Bt.indexOf(e) && delete t[e];
              }),
              "number" ==
                typeof (e = l(
                  l(l({}, this.constructor.Default), t),
                  "object" == typeof e && e ? e : {}
                )).delay && (e.delay = { show: e.delay, hide: e.delay }),
              "number" == typeof e.title && (e.title = e.title.toString()),
              "number" == typeof e.content &&
                (e.content = e.content.toString()),
              m.typeCheckConfig(Pt, e, this.constructor.DefaultType),
              e.sanitize &&
                (e.template = Lt(e.template, e.whiteList, e.sanitizeFn)),
              e
            );
          }),
          (e._getDelegateConfig = function () {
            var e = {};
            if (this.config)
              for (var t in this.config)
                this.constructor.Default[t] !== this.config[t] &&
                  (e[t] = this.config[t]);
            return e;
          }),
          (e._cleanTipClass = function () {
            var e = p(this.getTipElement()),
              t = e.attr("class").match(zt);
            null !== t && t.length && e.removeClass(t.join(""));
          }),
          (e._handlePopperPlacementChange = function (e) {
            (this.tip = e.instance.popper),
              this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(e.placement));
          }),
          (e._fixTransition = function () {
            var e = this.getTipElement(),
              t = this.config.animation;
            null === e.getAttribute("x-placement") &&
              (p(e).removeClass($t),
              (this.config.animation = !1),
              this.hide(),
              this.show(),
              (this.config.animation = t));
          }),
          (n._jQueryInterface = function (i) {
            return this.each(function () {
              var e = p(this).data(jt),
                t = "object" == typeof i && i;
              if (
                (e || !/dispose|hide/.test(i)) &&
                (e || ((e = new n(this, t)), p(this).data(jt, e)),
                "string" == typeof i)
              ) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i]();
              }
            });
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return qt;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Pt;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return jt;
              },
            },
            {
              key: "Event",
              get: function () {
                return Wt;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Nt;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Ht;
              },
            },
          ]),
          n
        );
      })();
    (p.fn[Pt] = Qt._jQueryInterface),
      (p.fn[Pt].Constructor = Qt),
      (p.fn[Pt].noConflict = function () {
        return (p.fn[Pt] = Ot), Qt._jQueryInterface;
      });
    var Xt = "popover",
      Gt = "bs.popover",
      Kt = "." + Gt,
      Jt = p.fn[Xt],
      Zt = "bs-popover",
      ei = new RegExp("(^|\\s)" + Zt + "\\S+", "g"),
      ti = l(
        l({}, Qt.Default),
        {},
        {
          placement: "right",
          trigger: "click",
          content: "",
          template:
            '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        }
      ),
      ii = l(
        l({}, Qt.DefaultType),
        {},
        { content: "(string|element|function)" }
      ),
      ni = {
        HIDE: "hide" + Kt,
        HIDDEN: "hidden" + Kt,
        SHOW: "show" + Kt,
        SHOWN: "shown" + Kt,
        INSERTED: "inserted" + Kt,
        CLICK: "click" + Kt,
        FOCUSIN: "focusin" + Kt,
        FOCUSOUT: "focusout" + Kt,
        MOUSEENTER: "mouseenter" + Kt,
        MOUSELEAVE: "mouseleave" + Kt,
      },
      oi = (function (e) {
        function n() {
          return e.apply(this, arguments) || this;
        }
        !(function (e, t) {
          (e.prototype = Object.create(t.prototype)),
            ((e.prototype.constructor = e).__proto__ = t);
        })(n, e);
        var t = n.prototype;
        return (
          (t.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }),
          (t.addAttachmentClass = function (e) {
            p(this.getTipElement()).addClass(Zt + "-" + e);
          }),
          (t.getTipElement = function () {
            return (
              (this.tip = this.tip || p(this.config.template)[0]), this.tip
            );
          }),
          (t.setContent = function () {
            var e = p(this.getTipElement());
            this.setElementContent(e.find(".popover-header"), this.getTitle());
            var t = this._getContent();
            "function" == typeof t && (t = t.call(this.element)),
              this.setElementContent(e.find(".popover-body"), t),
              e.removeClass("fade show");
          }),
          (t._getContent = function () {
            return (
              this.element.getAttribute("data-content") || this.config.content
            );
          }),
          (t._cleanTipClass = function () {
            var e = p(this.getTipElement()),
              t = e.attr("class").match(ei);
            null !== t && 0 < t.length && e.removeClass(t.join(""));
          }),
          (n._jQueryInterface = function (i) {
            return this.each(function () {
              var e = p(this).data(Gt),
                t = "object" == typeof i ? i : null;
              if (
                (e || !/dispose|hide/.test(i)) &&
                (e || ((e = new n(this, t)), p(this).data(Gt, e)),
                "string" == typeof i)
              ) {
                if (void 0 === e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i]();
              }
            });
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return ti;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Xt;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return Gt;
              },
            },
            {
              key: "Event",
              get: function () {
                return ni;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return Kt;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return ii;
              },
            },
          ]),
          n
        );
      })(Qt);
    (p.fn[Xt] = oi._jQueryInterface),
      (p.fn[Xt].Constructor = oi),
      (p.fn[Xt].noConflict = function () {
        return (p.fn[Xt] = Jt), oi._jQueryInterface;
      });
    var ri = "scrollspy",
      si = "bs.scrollspy",
      ai = "." + si,
      li = p.fn[ri],
      ci = { offset: 10, method: "auto", target: "" },
      ui = { offset: "number", method: "string", target: "(string|element)" },
      hi = "active",
      di = ".nav, .list-group",
      fi = ".nav-link",
      pi = ".list-group-item",
      mi = "position",
      gi = (function () {
        function i(e, t) {
          var i = this;
          (this._element = e),
            (this._scrollElement = "BODY" === e.tagName ? window : e),
            (this._config = this._getConfig(t)),
            (this._selector =
              this._config.target +
              " " +
              fi +
              "," +
              this._config.target +
              " " +
              pi +
              "," +
              this._config.target +
              " .dropdown-item"),
            (this._offsets = []),
            (this._targets = []),
            (this._activeTarget = null),
            (this._scrollHeight = 0),
            p(this._scrollElement).on("scroll.bs.scrollspy", function (e) {
              return i._process(e);
            }),
            this.refresh(),
            this._process();
        }
        var e = i.prototype;
        return (
          (e.refresh = function () {
            var t = this,
              e =
                this._scrollElement === this._scrollElement.window
                  ? "offset"
                  : mi,
              o = "auto" === this._config.method ? e : this._config.method,
              r = o === mi ? this._getScrollTop() : 0;
            (this._offsets = []),
              (this._targets = []),
              (this._scrollHeight = this._getScrollHeight()),
              [].slice
                .call(document.querySelectorAll(this._selector))
                .map(function (e) {
                  var t,
                    i = m.getSelectorFromElement(e);
                  if ((i && (t = document.querySelector(i)), t)) {
                    var n = t.getBoundingClientRect();
                    if (n.width || n.height) return [p(t)[o]().top + r, i];
                  }
                  return null;
                })
                .filter(function (e) {
                  return e;
                })
                .sort(function (e, t) {
                  return e[0] - t[0];
                })
                .forEach(function (e) {
                  t._offsets.push(e[0]), t._targets.push(e[1]);
                });
          }),
          (e.dispose = function () {
            p.removeData(this._element, si),
              p(this._scrollElement).off(ai),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (e._getConfig = function (e) {
            if (
              "string" !=
                typeof (e = l(l({}, ci), "object" == typeof e && e ? e : {}))
                  .target &&
              m.isElement(e.target)
            ) {
              var t = p(e.target).attr("id");
              t || ((t = m.getUID(ri)), p(e.target).attr("id", t)),
                (e.target = "#" + t);
            }
            return m.typeCheckConfig(ri, e, ui), e;
          }),
          (e._getScrollTop = function () {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (e._getScrollHeight = function () {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (e._getOffsetHeight = function () {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (e._process = function () {
            var e = this._getScrollTop() + this._config.offset,
              t = this._getScrollHeight(),
              i = this._config.offset + t - this._getOffsetHeight();
            if ((this._scrollHeight !== t && this.refresh(), i <= e)) {
              var n = this._targets[this._targets.length - 1];
              this._activeTarget !== n && this._activate(n);
            } else {
              if (
                this._activeTarget &&
                e < this._offsets[0] &&
                0 < this._offsets[0]
              )
                return (this._activeTarget = null), void this._clear();
              for (var o = this._offsets.length; o--; ) {
                this._activeTarget !== this._targets[o] &&
                  e >= this._offsets[o] &&
                  (void 0 === this._offsets[o + 1] ||
                    e < this._offsets[o + 1]) &&
                  this._activate(this._targets[o]);
              }
            }
          }),
          (e._activate = function (t) {
            (this._activeTarget = t), this._clear();
            var e = this._selector.split(",").map(function (e) {
                return (
                  e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                );
              }),
              i = p([].slice.call(document.querySelectorAll(e.join(","))));
            i.hasClass("dropdown-item")
              ? (i.closest(".dropdown").find(".dropdown-toggle").addClass(hi),
                i.addClass(hi))
              : (i.addClass(hi),
                i
                  .parents(di)
                  .prev(fi + ", " + pi)
                  .addClass(hi),
                i.parents(di).prev(".nav-item").children(fi).addClass(hi)),
              p(this._scrollElement).trigger("activate.bs.scrollspy", {
                relatedTarget: t,
              });
          }),
          (e._clear = function () {
            [].slice
              .call(document.querySelectorAll(this._selector))
              .filter(function (e) {
                return e.classList.contains(hi);
              })
              .forEach(function (e) {
                return e.classList.remove(hi);
              });
          }),
          (i._jQueryInterface = function (t) {
            return this.each(function () {
              var e = p(this).data(si);
              if (
                (e ||
                  ((e = new i(this, "object" == typeof t && t)),
                  p(this).data(si, e)),
                "string" == typeof t)
              ) {
                if (void 0 === e[t])
                  throw new TypeError('No method named "' + t + '"');
                e[t]();
              }
            });
          }),
          s(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "Default",
              get: function () {
                return ci;
              },
            },
          ]),
          i
        );
      })();
    p(window).on("load.bs.scrollspy.data-api", function () {
      for (
        var e = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')),
          t = e.length;
        t--;

      ) {
        var i = p(e[t]);
        gi._jQueryInterface.call(i, i.data());
      }
    }),
      (p.fn[ri] = gi._jQueryInterface),
      (p.fn[ri].Constructor = gi),
      (p.fn[ri].noConflict = function () {
        return (p.fn[ri] = li), gi._jQueryInterface;
      });
    var vi = "bs.tab",
      yi = p.fn.tab,
      bi = "active",
      _i = ".active",
      wi = "> li > .active",
      xi = (function () {
        function n(e) {
          this._element = e;
        }
        var e = n.prototype;
        return (
          (e.show = function () {
            var i = this;
            if (
              !(
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  p(this._element).hasClass(bi)) ||
                p(this._element).hasClass("disabled")
              )
            ) {
              var e,
                n,
                t = p(this._element).closest(".nav, .list-group")[0],
                o = m.getSelectorFromElement(this._element);
              if (t) {
                var r = "UL" === t.nodeName || "OL" === t.nodeName ? wi : _i;
                n = (n = p.makeArray(p(t).find(r)))[n.length - 1];
              }
              var s = p.Event("hide.bs.tab", { relatedTarget: this._element }),
                a = p.Event("show.bs.tab", { relatedTarget: n });
              if (
                (n && p(n).trigger(s),
                p(this._element).trigger(a),
                !a.isDefaultPrevented() && !s.isDefaultPrevented())
              ) {
                o && (e = document.querySelector(o)),
                  this._activate(this._element, t);
                var l = function () {
                  var e = p.Event("hidden.bs.tab", {
                      relatedTarget: i._element,
                    }),
                    t = p.Event("shown.bs.tab", { relatedTarget: n });
                  p(n).trigger(e), p(i._element).trigger(t);
                };
                e ? this._activate(e, e.parentNode, l) : l();
              }
            }
          }),
          (e.dispose = function () {
            p.removeData(this._element, vi), (this._element = null);
          }),
          (e._activate = function (e, t, i) {
            function n() {
              return o._transitionComplete(e, r, i);
            }
            var o = this,
              r = (
                !t || ("UL" !== t.nodeName && "OL" !== t.nodeName)
                  ? p(t).children(_i)
                  : p(t).find(wi)
              )[0],
              s = i && r && p(r).hasClass("fade");
            if (r && s) {
              var a = m.getTransitionDurationFromElement(r);
              p(r)
                .removeClass("show")
                .one(m.TRANSITION_END, n)
                .emulateTransitionEnd(a);
            } else n();
          }),
          (e._transitionComplete = function (e, t, i) {
            if (t) {
              p(t).removeClass(bi);
              var n = p(t.parentNode).find("> .dropdown-menu .active")[0];
              n && p(n).removeClass(bi),
                "tab" === t.getAttribute("role") &&
                  t.setAttribute("aria-selected", !1);
            }
            if (
              (p(e).addClass(bi),
              "tab" === e.getAttribute("role") &&
                e.setAttribute("aria-selected", !0),
              m.reflow(e),
              e.classList.contains("fade") && e.classList.add("show"),
              e.parentNode && p(e.parentNode).hasClass("dropdown-menu"))
            ) {
              var o = p(e).closest(".dropdown")[0];
              if (o) {
                var r = [].slice.call(o.querySelectorAll(".dropdown-toggle"));
                p(r).addClass(bi);
              }
              e.setAttribute("aria-expanded", !0);
            }
            i && i();
          }),
          (n._jQueryInterface = function (i) {
            return this.each(function () {
              var e = p(this),
                t = e.data(vi);
              if (
                (t || ((t = new n(this)), e.data(vi, t)), "string" == typeof i)
              ) {
                if (void 0 === t[i])
                  throw new TypeError('No method named "' + i + '"');
                t[i]();
              }
            });
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
          ]),
          n
        );
      })();
    p(document).on(
      "click.bs.tab.data-api",
      '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      function (e) {
        e.preventDefault(), xi._jQueryInterface.call(p(this), "show");
      }
    ),
      (p.fn.tab = xi._jQueryInterface),
      (p.fn.tab.Constructor = xi),
      (p.fn.tab.noConflict = function () {
        return (p.fn.tab = yi), xi._jQueryInterface;
      });
    var Ei = "toast",
      Si = "bs.toast",
      Ci = "." + Si,
      Ti = p.fn[Ei],
      ki = "click.dismiss" + Ci,
      Ai = "show",
      Di = "showing",
      Ii = { animation: "boolean", autohide: "boolean", delay: "number" },
      Li = { animation: !0, autohide: !0, delay: 500 },
      Pi = (function () {
        function n(e, t) {
          (this._element = e),
            (this._config = this._getConfig(t)),
            (this._timeout = null),
            this._setListeners();
        }
        var e = n.prototype;
        return (
          (e.show = function () {
            var e = this,
              t = p.Event("show.bs.toast");
            if ((p(this._element).trigger(t), !t.isDefaultPrevented())) {
              this._config.animation && this._element.classList.add("fade");
              var i = function () {
                e._element.classList.remove(Di),
                  e._element.classList.add(Ai),
                  p(e._element).trigger("shown.bs.toast"),
                  e._config.autohide &&
                    (e._timeout = setTimeout(function () {
                      e.hide();
                    }, e._config.delay));
              };
              if (
                (this._element.classList.remove("hide"),
                m.reflow(this._element),
                this._element.classList.add(Di),
                this._config.animation)
              ) {
                var n = m.getTransitionDurationFromElement(this._element);
                p(this._element)
                  .one(m.TRANSITION_END, i)
                  .emulateTransitionEnd(n);
              } else i();
            }
          }),
          (e.hide = function () {
            if (this._element.classList.contains(Ai)) {
              var e = p.Event("hide.bs.toast");
              p(this._element).trigger(e),
                e.isDefaultPrevented() || this._close();
            }
          }),
          (e.dispose = function () {
            clearTimeout(this._timeout),
              (this._timeout = null),
              this._element.classList.contains(Ai) &&
                this._element.classList.remove(Ai),
              p(this._element).off(ki),
              p.removeData(this._element, Si),
              (this._element = null),
              (this._config = null);
          }),
          (e._getConfig = function (e) {
            return (
              (e = l(
                l(l({}, Li), p(this._element).data()),
                "object" == typeof e && e ? e : {}
              )),
              m.typeCheckConfig(Ei, e, this.constructor.DefaultType),
              e
            );
          }),
          (e._setListeners = function () {
            var e = this;
            p(this._element).on(ki, '[data-dismiss="toast"]', function () {
              return e.hide();
            });
          }),
          (e._close = function () {
            function e() {
              t._element.classList.add("hide"),
                p(t._element).trigger("hidden.bs.toast");
            }
            var t = this;
            if ((this._element.classList.remove(Ai), this._config.animation)) {
              var i = m.getTransitionDurationFromElement(this._element);
              p(this._element).one(m.TRANSITION_END, e).emulateTransitionEnd(i);
            } else e();
          }),
          (n._jQueryInterface = function (i) {
            return this.each(function () {
              var e = p(this),
                t = e.data(Si);
              if (
                (t ||
                  ((t = new n(this, "object" == typeof i && i)), e.data(Si, t)),
                "string" == typeof i)
              ) {
                if (void 0 === t[i])
                  throw new TypeError('No method named "' + i + '"');
                t[i](this);
              }
            });
          }),
          s(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.5.0";
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Ii;
              },
            },
            {
              key: "Default",
              get: function () {
                return Li;
              },
            },
          ]),
          n
        );
      })();
    (p.fn[Ei] = Pi._jQueryInterface),
      (p.fn[Ei].Constructor = Pi),
      (p.fn[Ei].noConflict = function () {
        return (p.fn[Ei] = Ti), Pi._jQueryInterface;
      }),
      (e.Alert = u),
      (e.Button = b),
      (e.Carousel = P),
      (e.Collapse = W),
      (e.Dropdown = st),
      (e.Modal = Tt),
      (e.Popover = oi),
      (e.Scrollspy = gi),
      (e.Tab = xi),
      (e.Toast = Pi),
      (e.Tooltip = Qt),
      (e.Util = m),
      Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  (function (t, i) {
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery-bridget", ["jquery"], function (e) {
          return i(t, e);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("jquery")))
      : (t.jQueryBridget = i(t, t.jQuery));
  })(window, function (e, t) {
    "use strict";
    var i = Array.prototype.slice,
      n = e.console,
      h =
        void 0 === n
          ? function () {}
          : function (e) {
              n.error(e);
            };
    function o(c, o, u) {
      (u = u || t || e.jQuery) &&
        (o.prototype.option ||
          (o.prototype.option = function (e) {
            u.isPlainObject(e) &&
              (this.options = u.extend(!0, this.options, e));
          }),
        (u.fn[c] = function (e) {
          return "string" == typeof e
            ? (function (e, r, s) {
                var a,
                  l = "$()." + c + '("' + r + '")';
                return (
                  e.each(function (e, t) {
                    var i = u.data(t, c);
                    if (i) {
                      var n = i[r];
                      if (n && "_" != r.charAt(0)) {
                        var o = n.apply(i, s);
                        a = void 0 === a ? o : a;
                      } else h(l + " is not a valid method");
                    } else h(c + " not initialized. Cannot call methods, i.e. " + l);
                  }),
                  void 0 !== a ? a : e
                );
              })(this, e, i.call(arguments, 1))
            : ((function (e, n) {
                e.each(function (e, t) {
                  var i = u.data(t, c);
                  i
                    ? (i.option(n), i._init())
                    : ((i = new o(t, n)), u.data(t, c, i));
                });
              })(this, e),
              this);
        }),
        r(u));
    }
    function r(e) {
      !e || (e && e.bridget) || (e.bridget = o);
    }
    return r(t || e.jQuery), o;
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", t)
      : "object" == typeof module && module.exports
      ? (module.exports = t())
      : (e.EvEmitter = t());
  })("undefined" != typeof window ? window : this, function () {
    function e() {}
    var t = e.prototype;
    return (
      (t.on = function (e, t) {
        if (e && t) {
          var i = (this._events = this._events || {}),
            n = (i[e] = i[e] || []);
          return -1 == n.indexOf(t) && n.push(t), this;
        }
      }),
      (t.once = function (e, t) {
        if (e && t) {
          this.on(e, t);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[e] = i[e] || {})[t] = !0), this;
        }
      }),
      (t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
          var n = i.indexOf(t);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
          (i = i.slice(0)), (t = t || []);
          for (
            var n = this._onceEvents && this._onceEvents[e], o = 0;
            o < i.length;
            o++
          ) {
            var r = i[o];
            n && n[r] && (this.off(e, r), delete n[r]), r.apply(this, t);
          }
          return this;
        }
      }),
      (t.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      e
    );
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", t)
      : "object" == typeof module && module.exports
      ? (module.exports = t())
      : (e.getSize = t());
  })(window, function () {
    "use strict";
    function v(e) {
      var t = parseFloat(e);
      return -1 == e.indexOf("%") && !isNaN(t) && t;
    }
    var i =
        "undefined" == typeof console
          ? function () {}
          : function (e) {
              console.error(e);
            },
      y = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      b = y.length;
    function _(e) {
      var t = getComputedStyle(e);
      return (
        t ||
          i(
            "Style returned " +
              t +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        t
      );
    }
    var w,
      x = !1;
    function E(e) {
      if (
        ((function () {
          if (!x) {
            x = !0;
            var e = document.createElement("div");
            (e.style.width = "200px"),
              (e.style.padding = "1px 2px 3px 4px"),
              (e.style.borderStyle = "solid"),
              (e.style.borderWidth = "1px 2px 3px 4px"),
              (e.style.boxSizing = "border-box");
            var t = document.body || document.documentElement;
            t.appendChild(e);
            var i = _(e);
            (w = 200 == Math.round(v(i.width))),
              (E.isBoxSizeOuter = w),
              t.removeChild(e);
          }
        })(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var t = _(e);
        if ("none" == t.display)
          return (function () {
            for (
              var e = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0,
                },
                t = 0;
              t < b;
              t++
            ) {
              e[y[t]] = 0;
            }
            return e;
          })();
        var i = {};
        (i.width = e.offsetWidth), (i.height = e.offsetHeight);
        for (
          var n = (i.isBorderBox = "border-box" == t.boxSizing), o = 0;
          o < b;
          o++
        ) {
          var r = y[o],
            s = t[r],
            a = parseFloat(s);
          i[r] = isNaN(a) ? 0 : a;
        }
        var l = i.paddingLeft + i.paddingRight,
          c = i.paddingTop + i.paddingBottom,
          u = i.marginLeft + i.marginRight,
          h = i.marginTop + i.marginBottom,
          d = i.borderLeftWidth + i.borderRightWidth,
          f = i.borderTopWidth + i.borderBottomWidth,
          p = n && w,
          m = v(t.width);
        !1 !== m && (i.width = m + (p ? 0 : l + d));
        var g = v(t.height);
        return (
          !1 !== g && (i.height = g + (p ? 0 : c + f)),
          (i.innerWidth = i.width - (l + d)),
          (i.innerHeight = i.height - (c + f)),
          (i.outerWidth = i.width + u),
          (i.outerHeight = i.height + h),
          i
        );
      }
    }
    return E;
  }),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", t)
      : "object" == typeof module && module.exports
      ? (module.exports = t())
      : (e.matchesSelector = t());
  })(window, function () {
    "use strict";
    var i = (function () {
      var e = window.Element.prototype;
      if (e.matches) return "matches";
      if (e.matchesSelector) return "matchesSelector";
      for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
        var n = t[i] + "MatchesSelector";
        if (e[n]) return n;
      }
    })();
    return function (e, t) {
      return e[i](t);
    };
  }),
  (function (t, i) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (e) {
            return i(t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = i(t, t.matchesSelector));
  })(window, function (c, r) {
    var u = {
        extend: function (e, t) {
          for (var i in t) e[i] = t[i];
          return e;
        },
        modulo: function (e, t) {
          return ((e % t) + t) % t;
        },
      },
      t = Array.prototype.slice;
    (u.makeArray = function (e) {
      return Array.isArray(e)
        ? e
        : null == e
        ? []
        : "object" == typeof e && "number" == typeof e.length
        ? t.call(e)
        : [e];
    }),
      (u.removeFrom = function (e, t) {
        var i = e.indexOf(t);
        -1 != i && e.splice(i, 1);
      }),
      (u.getParent = function (e, t) {
        for (; e.parentNode && e != document.body; )
          if (((e = e.parentNode), r(e, t))) return e;
      }),
      (u.getQueryElement = function (e) {
        return "string" == typeof e ? document.querySelector(e) : e;
      }),
      (u.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (u.filterFindElements = function (e, n) {
        e = u.makeArray(e);
        var o = [];
        return (
          e.forEach(function (e) {
            if (e instanceof HTMLElement)
              if (n) {
                r(e, n) && o.push(e);
                for (var t = e.querySelectorAll(n), i = 0; i < t.length; i++)
                  o.push(t[i]);
              } else o.push(e);
          }),
          o
        );
      }),
      (u.debounceMethod = function (e, t, n) {
        n = n || 100;
        var o = e.prototype[t],
          r = t + "Timeout";
        e.prototype[t] = function () {
          var e = this[r];
          clearTimeout(e);
          var t = arguments,
            i = this;
          this[r] = setTimeout(function () {
            o.apply(i, t), delete i[r];
          }, n);
        };
      }),
      (u.docReady = function (e) {
        var t = document.readyState;
        "complete" == t || "interactive" == t
          ? setTimeout(e)
          : document.addEventListener("DOMContentLoaded", e);
      }),
      (u.toDashed = function (e) {
        return e
          .replace(/(.)([A-Z])/g, function (e, t, i) {
            return t + "-" + i;
          })
          .toLowerCase();
      });
    var h = c.console;
    return (
      (u.htmlInit = function (a, l) {
        u.docReady(function () {
          var e = u.toDashed(l),
            o = "data-" + e,
            t = document.querySelectorAll("[" + o + "]"),
            i = document.querySelectorAll(".js-" + e),
            n = u.makeArray(t).concat(u.makeArray(i)),
            r = o + "-options",
            s = c.jQuery;
          n.forEach(function (t) {
            var e,
              i = t.getAttribute(o) || t.getAttribute(r);
            try {
              e = i && JSON.parse(i);
            } catch (e) {
              return void (
                h &&
                h.error("Error parsing " + o + " on " + t.className + ": " + e)
              );
            }
            var n = new a(t, e);
            s && s.data(t, l, n);
          });
        });
      }),
      u
    );
  }),
  (function (t, i) {
    "function" == typeof define && define.amd
      ? define("flickity/js/cell", ["get-size/get-size"], function (e) {
          return i(t, e);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("get-size")))
      : ((t.Flickity = t.Flickity || {}), (t.Flickity.Cell = i(t, t.getSize)));
  })(window, function (e, t) {
    function i(e, t) {
      (this.element = e), (this.parent = t), this.create();
    }
    var n = i.prototype;
    return (
      (n.create = function () {
        (this.element.style.position = "absolute"),
          this.element.setAttribute("aria-hidden", "true"),
          (this.x = 0),
          (this.shift = 0);
      }),
      (n.destroy = function () {
        this.unselect(), (this.element.style.position = "");
        var e = this.parent.originSide;
        this.element.style[e] = "";
      }),
      (n.getSize = function () {
        this.size = t(this.element);
      }),
      (n.setPosition = function (e) {
        (this.x = e), this.updateTarget(), this.renderPosition(e);
      }),
      (n.updateTarget = n.setDefaultTarget =
        function () {
          var e =
            "left" == this.parent.originSide ? "marginLeft" : "marginRight";
          this.target =
            this.x + this.size[e] + this.size.width * this.parent.cellAlign;
        }),
      (n.renderPosition = function (e) {
        var t = this.parent.originSide;
        this.element.style[t] = this.parent.getPositionValue(e);
      }),
      (n.select = function () {
        this.element.classList.add("is-selected"),
          this.element.removeAttribute("aria-hidden");
      }),
      (n.unselect = function () {
        this.element.classList.remove("is-selected"),
          this.element.setAttribute("aria-hidden", "true");
      }),
      (n.wrapShift = function (e) {
        (this.shift = e),
          this.renderPosition(this.x + this.parent.slideableWidth * e);
      }),
      (n.remove = function () {
        this.element.parentNode.removeChild(this.element);
      }),
      i
    );
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define("flickity/js/slide", t)
      : "object" == typeof module && module.exports
      ? (module.exports = t())
      : ((e.Flickity = e.Flickity || {}), (e.Flickity.Slide = t()));
  })(window, function () {
    "use strict";
    function e(e) {
      (this.parent = e),
        (this.isOriginLeft = "left" == e.originSide),
        (this.cells = []),
        (this.outerWidth = 0),
        (this.height = 0);
    }
    var t = e.prototype;
    return (
      (t.addCell = function (e) {
        if (
          (this.cells.push(e),
          (this.outerWidth += e.size.outerWidth),
          (this.height = Math.max(e.size.outerHeight, this.height)),
          1 == this.cells.length)
        ) {
          this.x = e.x;
          var t = this.isOriginLeft ? "marginLeft" : "marginRight";
          this.firstMargin = e.size[t];
        }
      }),
      (t.updateTarget = function () {
        var e = this.isOriginLeft ? "marginRight" : "marginLeft",
          t = this.getLastCell(),
          i = t ? t.size[e] : 0,
          n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
      }),
      (t.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (t.select = function () {
        this.cells.forEach(function (e) {
          e.select();
        });
      }),
      (t.unselect = function () {
        this.cells.forEach(function (e) {
          e.unselect();
        });
      }),
      (t.getCellElements = function () {
        return this.cells.map(function (e) {
          return e.element;
        });
      }),
      e
    );
  }),
  (function (t, i) {
    "function" == typeof define && define.amd
      ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (e) {
          return i(t, e);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("fizzy-ui-utils")))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.animatePrototype = i(t, t.fizzyUIUtils)));
  })(window, function (e, t) {
    var i = {
      startAnimation: function () {
        this.isAnimating ||
          ((this.isAnimating = !0), (this.restingFrames = 0), this.animate());
      },
      animate: function () {
        this.applyDragForce(), this.applySelectedAttraction();
        var e = this.x;
        if (
          (this.integratePhysics(),
          this.positionSlider(),
          this.settle(e),
          this.isAnimating)
        ) {
          var t = this;
          requestAnimationFrame(function () {
            t.animate();
          });
        }
      },
      positionSlider: function () {
        var e = this.x;
        this.options.wrapAround &&
          1 < this.cells.length &&
          ((e = t.modulo(e, this.slideableWidth)),
          (e -= this.slideableWidth),
          this.shiftWrapCells(e)),
          this.setTranslateX(e, this.isAnimating),
          this.dispatchScrollEvent();
      },
      setTranslateX: function (e, t) {
        (e += this.cursorPosition), (e = this.options.rightToLeft ? -e : e);
        var i = this.getPositionValue(e);
        this.slider.style.transform = t
          ? "translate3d(" + i + ",0,0)"
          : "translateX(" + i + ")";
      },
      dispatchScrollEvent: function () {
        var e = this.slides[0];
        if (e) {
          var t = -this.x - e.target,
            i = t / this.slidesWidth;
          this.dispatchEvent("scroll", null, [i, t]);
        }
      },
      positionSliderAtSelected: function () {
        this.cells.length &&
          ((this.x = -this.selectedSlide.target),
          (this.velocity = 0),
          this.positionSlider());
      },
      getPositionValue: function (e) {
        return this.options.percentPosition
          ? 0.01 * Math.round((e / this.size.innerWidth) * 1e4) + "%"
          : Math.round(e) + "px";
      },
      settle: function (e) {
        this.isPointerDown ||
          Math.round(100 * this.x) != Math.round(100 * e) ||
          this.restingFrames++,
          2 < this.restingFrames &&
            ((this.isAnimating = !1),
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]));
      },
      shiftWrapCells: function (e) {
        var t = this.cursorPosition + e;
        this._shiftCells(this.beforeShiftCells, t, -1);
        var i =
          this.size.innerWidth -
          (e + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1);
      },
      _shiftCells: function (e, t, i) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n],
            r = 0 < t ? i : 0;
          o.wrapShift(r), (t -= o.size.outerWidth);
        }
      },
      _unshiftCells: function (e) {
        if (e && e.length) for (var t = 0; t < e.length; t++) e[t].wrapShift(0);
      },
      integratePhysics: function () {
        (this.x += this.velocity), (this.velocity *= this.getFrictionFactor());
      },
      applyForce: function (e) {
        this.velocity += e;
      },
      getFrictionFactor: function () {
        return (
          1 -
          this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        );
      },
      getRestingPosition: function () {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
      },
      applyDragForce: function () {
        if (this.isDraggable && this.isPointerDown) {
          var e = this.dragX - this.x - this.velocity;
          this.applyForce(e);
        }
      },
      applySelectedAttraction: function () {
        if (
          !(this.isDraggable && this.isPointerDown) &&
          !this.isFreeScrolling &&
          this.slides.length
        ) {
          var e =
            (-1 * this.selectedSlide.target - this.x) *
            this.options.selectedAttraction;
          this.applyForce(e);
        }
      },
    };
    return i;
  }),
  (function (s, a) {
    if ("function" == typeof define && define.amd)
      define("flickity/js/flickity", [
        "ev-emitter/ev-emitter",
        "get-size/get-size",
        "fizzy-ui-utils/utils",
        "./cell",
        "./slide",
        "./animate",
      ], function (e, t, i, n, o, r) {
        return a(s, e, t, i, n, o, r);
      });
    else if ("object" == typeof module && module.exports)
      module.exports = a(
        s,
        require("ev-emitter"),
        require("get-size"),
        require("fizzy-ui-utils"),
        require("./cell"),
        require("./slide"),
        require("./animate")
      );
    else {
      var e = s.Flickity;
      s.Flickity = a(
        s,
        s.EvEmitter,
        s.getSize,
        s.fizzyUIUtils,
        e.Cell,
        e.Slide,
        e.animatePrototype
      );
    }
  })(window, function (n, e, t, a, i, s, o) {
    var l = n.jQuery,
      r = n.getComputedStyle,
      c = n.console;
    function u(e, t) {
      for (e = a.makeArray(e); e.length; ) t.appendChild(e.shift());
    }
    var h = 0,
      d = {};
    function f(e, t) {
      var i = a.getQueryElement(e);
      if (i) {
        if (((this.element = i), this.element.flickityGUID)) {
          var n = d[this.element.flickityGUID];
          return n.option(t), n;
        }
        l && (this.$element = l(this.element)),
          (this.options = a.extend({}, this.constructor.defaults)),
          this.option(t),
          this._create();
      } else c && c.error("Bad element for Flickity: " + (i || e));
    }
    (f.defaults = {
      accessibility: !0,
      cellAlign: "center",
      freeScrollFriction: 0.075,
      friction: 0.28,
      namespaceJQueryEvents: !0,
      percentPosition: !0,
      resize: !0,
      selectedAttraction: 0.025,
      setGallerySize: !0,
    }),
      (f.createMethods = []);
    var p = f.prototype;
    a.extend(p, e.prototype),
      (p._create = function () {
        var e = (this.guid = ++h);
        for (var t in ((this.element.flickityGUID = e),
        ((d[e] = this).selectedIndex = 0),
        (this.restingFrames = 0),
        (this.x = 0),
        (this.velocity = 0),
        (this.originSide = this.options.rightToLeft ? "right" : "left"),
        (this.viewport = document.createElement("div")),
        (this.viewport.className = "flickity-viewport"),
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) &&
          n.addEventListener("resize", this),
        this.options.on)) {
          var i = this.options.on[t];
          this.on(t, i);
        }
        f.createMethods.forEach(function (e) {
          this[e]();
        }, this),
          this.options.watchCSS ? this.watchCSS() : this.activate();
      }),
      (p.option = function (e) {
        a.extend(this.options, e);
      }),
      (p.activate = function () {
        this.isActive ||
          ((this.isActive = !0),
          this.element.classList.add("flickity-enabled"),
          this.options.rightToLeft &&
            this.element.classList.add("flickity-rtl"),
          this.getSize(),
          u(this._filterFindCellElements(this.element.children), this.slider),
          this.viewport.appendChild(this.slider),
          this.element.appendChild(this.viewport),
          this.reloadCells(),
          this.options.accessibility &&
            ((this.element.tabIndex = 0),
            this.element.addEventListener("keydown", this)),
          this.emitEvent("activate"),
          this.selectInitialIndex(),
          (this.isInitActivated = !0),
          this.dispatchEvent("ready"));
      }),
      (p._createSlider = function () {
        var e = document.createElement("div");
        (e.className = "flickity-slider"),
          (e.style[this.originSide] = 0),
          (this.slider = e);
      }),
      (p._filterFindCellElements = function (e) {
        return a.filterFindElements(e, this.options.cellSelector);
      }),
      (p.reloadCells = function () {
        (this.cells = this._makeCells(this.slider.children)),
          this.positionCells(),
          this._getWrapShiftCells(),
          this.setGallerySize();
      }),
      (p._makeCells = function (e) {
        return this._filterFindCellElements(e).map(function (e) {
          return new i(e, this);
        }, this);
      }),
      (p.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (p.getLastSlide = function () {
        return this.slides[this.slides.length - 1];
      }),
      (p.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0);
      }),
      (p._positionCells = function (e) {
        (e = e || 0), (this.maxCellHeight = (e && this.maxCellHeight) || 0);
        var t = 0;
        if (0 < e) {
          var i = this.cells[e - 1];
          t = i.x + i.size.outerWidth;
        }
        for (var n = this.cells.length, o = e; o < n; o++) {
          var r = this.cells[o];
          r.setPosition(t),
            (t += r.size.outerWidth),
            (this.maxCellHeight = Math.max(
              r.size.outerHeight,
              this.maxCellHeight
            ));
        }
        (this.slideableWidth = t),
          this.updateSlides(),
          this._containSlides(),
          (this.slidesWidth = n
            ? this.getLastSlide().target - this.slides[0].target
            : 0);
      }),
      (p._sizeCells = function (e) {
        e.forEach(function (e) {
          e.getSize();
        });
      }),
      (p.updateSlides = function () {
        if (((this.slides = []), this.cells.length)) {
          var n = new s(this);
          this.slides.push(n);
          var o = "left" == this.originSide ? "marginRight" : "marginLeft",
            r = this._getCanCellFit();
          this.cells.forEach(function (e, t) {
            if (n.cells.length) {
              var i =
                n.outerWidth - n.firstMargin + (e.size.outerWidth - e.size[o]);
              r.call(this, t, i) ||
                (n.updateTarget(), (n = new s(this)), this.slides.push(n)),
                n.addCell(e);
            } else n.addCell(e);
          }, this),
            n.updateTarget(),
            this.updateSelectedSlide();
        }
      }),
      (p._getCanCellFit = function () {
        var e = this.options.groupCells;
        if (!e)
          return function () {
            return !1;
          };
        if ("number" == typeof e) {
          var t = parseInt(e, 10);
          return function (e) {
            return e % t != 0;
          };
        }
        var i = "string" == typeof e && e.match(/^(\d+)%$/),
          n = i ? parseInt(i[1], 10) / 100 : 1;
        return function (e, t) {
          return t <= (this.size.innerWidth + 1) * n;
        };
      }),
      (p._init = p.reposition =
        function () {
          this.positionCells(), this.positionSliderAtSelected();
        }),
      (p.getSize = function () {
        (this.size = t(this.element)),
          this.setCellAlign(),
          (this.cursorPosition = this.size.innerWidth * this.cellAlign);
      });
    var m = {
      center: { left: 0.5, right: 0.5 },
      left: { left: 0, right: 1 },
      right: { right: 0, left: 1 },
    };
    return (
      (p.setCellAlign = function () {
        var e = m[this.options.cellAlign];
        this.cellAlign = e ? e[this.originSide] : this.options.cellAlign;
      }),
      (p.setGallerySize = function () {
        if (this.options.setGallerySize) {
          var e =
            this.options.adaptiveHeight && this.selectedSlide
              ? this.selectedSlide.height
              : this.maxCellHeight;
          this.viewport.style.height = e + "px";
        }
      }),
      (p._getWrapShiftCells = function () {
        if (this.options.wrapAround) {
          this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
          var e = this.cursorPosition,
            t = this.cells.length - 1;
          (this.beforeShiftCells = this._getGapCells(e, t, -1)),
            (e = this.size.innerWidth - this.cursorPosition),
            (this.afterShiftCells = this._getGapCells(e, 0, 1));
        }
      }),
      (p._getGapCells = function (e, t, i) {
        for (var n = []; 0 < e; ) {
          var o = this.cells[t];
          if (!o) break;
          n.push(o), (t += i), (e -= o.size.outerWidth);
        }
        return n;
      }),
      (p._containSlides = function () {
        if (
          this.options.contain &&
          !this.options.wrapAround &&
          this.cells.length
        ) {
          var e = this.options.rightToLeft,
            t = e ? "marginRight" : "marginLeft",
            i = e ? "marginLeft" : "marginRight",
            n = this.slideableWidth - this.getLastCell().size[i],
            o = n < this.size.innerWidth,
            r = this.cursorPosition + this.cells[0].size[t],
            s = n - this.size.innerWidth * (1 - this.cellAlign);
          this.slides.forEach(function (e) {
            o
              ? (e.target = n * this.cellAlign)
              : ((e.target = Math.max(e.target, r)),
                (e.target = Math.min(e.target, s)));
          }, this);
        }
      }),
      (p.dispatchEvent = function (e, t, i) {
        var n = t ? [t].concat(i) : i;
        if ((this.emitEvent(e, n), l && this.$element)) {
          var o = (e += this.options.namespaceJQueryEvents ? ".flickity" : "");
          if (t) {
            var r = l.Event(t);
            (r.type = e), (o = r);
          }
          this.$element.trigger(o, i);
        }
      }),
      (p.select = function (e, t, i) {
        if (
          this.isActive &&
          ((e = parseInt(e, 10)),
          this._wrapSelect(e),
          (this.options.wrapAround || t) &&
            (e = a.modulo(e, this.slides.length)),
          this.slides[e])
        ) {
          var n = this.selectedIndex;
          (this.selectedIndex = e),
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [e]),
            e != n && this.dispatchEvent("change", null, [e]),
            this.dispatchEvent("cellSelect");
        }
      }),
      (p._wrapSelect = function (e) {
        var t = this.slides.length;
        if (!(this.options.wrapAround && 1 < t)) return e;
        var i = a.modulo(e, t),
          n = Math.abs(i - this.selectedIndex),
          o = Math.abs(i + t - this.selectedIndex),
          r = Math.abs(i - t - this.selectedIndex);
        !this.isDragSelect && o < n
          ? (e += t)
          : !this.isDragSelect && r < n && (e -= t),
          e < 0
            ? (this.x -= this.slideableWidth)
            : t <= e && (this.x += this.slideableWidth);
      }),
      (p.previous = function (e, t) {
        this.select(this.selectedIndex - 1, e, t);
      }),
      (p.next = function (e, t) {
        this.select(this.selectedIndex + 1, e, t);
      }),
      (p.updateSelectedSlide = function () {
        var e = this.slides[this.selectedIndex];
        e &&
          (this.unselectSelectedSlide(),
          (this.selectedSlide = e).select(),
          (this.selectedCells = e.cells),
          (this.selectedElements = e.getCellElements()),
          (this.selectedCell = e.cells[0]),
          (this.selectedElement = this.selectedElements[0]));
      }),
      (p.unselectSelectedSlide = function () {
        this.selectedSlide && this.selectedSlide.unselect();
      }),
      (p.selectInitialIndex = function () {
        var e = this.options.initialIndex;
        if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);
        else {
          if (e && "string" == typeof e)
            if (this.queryCell(e)) return void this.selectCell(e, !1, !0);
          var t = 0;
          e && this.slides[e] && (t = e), this.select(t, !1, !0);
        }
      }),
      (p.selectCell = function (e, t, i) {
        var n = this.queryCell(e);
        if (n) {
          var o = this.getCellSlideIndex(n);
          this.select(o, t, i);
        }
      }),
      (p.getCellSlideIndex = function (e) {
        for (var t = 0; t < this.slides.length; t++) {
          if (-1 != this.slides[t].cells.indexOf(e)) return t;
        }
      }),
      (p.getCell = function (e) {
        for (var t = 0; t < this.cells.length; t++) {
          var i = this.cells[t];
          if (i.element == e) return i;
        }
      }),
      (p.getCells = function (e) {
        e = a.makeArray(e);
        var i = [];
        return (
          e.forEach(function (e) {
            var t = this.getCell(e);
            t && i.push(t);
          }, this),
          i
        );
      }),
      (p.getCellElements = function () {
        return this.cells.map(function (e) {
          return e.element;
        });
      }),
      (p.getParentCell = function (e) {
        var t = this.getCell(e);
        return (
          t || ((e = a.getParent(e, ".flickity-slider > *")), this.getCell(e))
        );
      }),
      (p.getAdjacentCellElements = function (e, t) {
        if (!e) return this.selectedSlide.getCellElements();
        t = void 0 === t ? this.selectedIndex : t;
        var i = this.slides.length;
        if (i <= 1 + 2 * e) return this.getCellElements();
        for (var n = [], o = t - e; o <= t + e; o++) {
          var r = this.options.wrapAround ? a.modulo(o, i) : o,
            s = this.slides[r];
          s && (n = n.concat(s.getCellElements()));
        }
        return n;
      }),
      (p.queryCell = function (e) {
        if ("number" == typeof e) return this.cells[e];
        if ("string" == typeof e) {
          if (e.match(/^[#\.]?[\d\/]/)) return;
          e = this.element.querySelector(e);
        }
        return this.getCell(e);
      }),
      (p.uiChange = function () {
        this.emitEvent("uiChange");
      }),
      (p.childUIPointerDown = function (e) {
        "touchstart" != e.type && e.preventDefault(), this.focus();
      }),
      (p.onresize = function () {
        this.watchCSS(), this.resize();
      }),
      a.debounceMethod(f, "onresize", 150),
      (p.resize = function () {
        if (this.isActive) {
          this.getSize(),
            this.options.wrapAround &&
              (this.x = a.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
          var e = this.selectedElements && this.selectedElements[0];
          this.selectCell(e, !1, !0);
        }
      }),
      (p.watchCSS = function () {
        this.options.watchCSS &&
          (-1 != r(this.element, ":after").content.indexOf("flickity")
            ? this.activate()
            : this.deactivate());
      }),
      (p.onkeydown = function (e) {
        var t =
          document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !t) {
          var i = f.keyboardHandlers[e.keyCode];
          i && i.call(this);
        }
      }),
      (f.keyboardHandlers = {
        37: function () {
          var e = this.options.rightToLeft ? "next" : "previous";
          this.uiChange(), this[e]();
        },
        39: function () {
          var e = this.options.rightToLeft ? "previous" : "next";
          this.uiChange(), this[e]();
        },
      }),
      (p.focus = function () {
        var e = n.pageYOffset;
        this.element.focus({ preventScroll: !0 }),
          n.pageYOffset != e && n.scrollTo(n.pageXOffset, e);
      }),
      (p.deactivate = function () {
        this.isActive &&
          (this.element.classList.remove("flickity-enabled"),
          this.element.classList.remove("flickity-rtl"),
          this.unselectSelectedSlide(),
          this.cells.forEach(function (e) {
            e.destroy();
          }),
          this.element.removeChild(this.viewport),
          u(this.slider.children, this.element),
          this.options.accessibility &&
            (this.element.removeAttribute("tabIndex"),
            this.element.removeEventListener("keydown", this)),
          (this.isActive = !1),
          this.emitEvent("deactivate"));
      }),
      (p.destroy = function () {
        this.deactivate(),
          n.removeEventListener("resize", this),
          this.allOff(),
          this.emitEvent("destroy"),
          l && this.$element && l.removeData(this.element, "flickity"),
          delete this.element.flickityGUID,
          delete d[this.guid];
      }),
      a.extend(p, o),
      (f.data = function (e) {
        var t = (e = a.getQueryElement(e)) && e.flickityGUID;
        return t && d[t];
      }),
      a.htmlInit(f, "flickity"),
      l && l.bridget && l.bridget("flickity", f),
      (f.setJQuery = function (e) {
        l = e;
      }),
      (f.Cell = i),
      (f.Slide = s),
      f
    );
  }),
  (function (t, i) {
    "function" == typeof define && define.amd
      ? define(
          "unipointer/unipointer",
          ["ev-emitter/ev-emitter"],
          function (e) {
            return i(t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("ev-emitter")))
      : (t.Unipointer = i(t, t.EvEmitter));
  })(window, function (o, e) {
    function t() {}
    var i = (t.prototype = Object.create(e.prototype));
    (i.bindStartEvent = function (e) {
      this._bindStartEvent(e, !0);
    }),
      (i.unbindStartEvent = function (e) {
        this._bindStartEvent(e, !1);
      }),
      (i._bindStartEvent = function (e, t) {
        var i = (t = void 0 === t || t)
            ? "addEventListener"
            : "removeEventListener",
          n = "mousedown";
        o.PointerEvent
          ? (n = "pointerdown")
          : "ontouchstart" in o && (n = "touchstart"),
          e[i](n, this);
      }),
      (i.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (i.getTouch = function (e) {
        for (var t = 0; t < e.length; t++) {
          var i = e[t];
          if (i.identifier == this.pointerIdentifier) return i;
        }
      }),
      (i.onmousedown = function (e) {
        var t = e.button;
        (t && 0 !== t && 1 !== t) || this._pointerDown(e, e);
      }),
      (i.ontouchstart = function (e) {
        this._pointerDown(e, e.changedTouches[0]);
      }),
      (i.onpointerdown = function (e) {
        this._pointerDown(e, e);
      }),
      (i._pointerDown = function (e, t) {
        e.button ||
          this.isPointerDown ||
          ((this.isPointerDown = !0),
          (this.pointerIdentifier =
            void 0 !== t.pointerId ? t.pointerId : t.identifier),
          this.pointerDown(e, t));
      }),
      (i.pointerDown = function (e, t) {
        this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t]);
      });
    var n = {
      mousedown: ["mousemove", "mouseup"],
      touchstart: ["touchmove", "touchend", "touchcancel"],
      pointerdown: ["pointermove", "pointerup", "pointercancel"],
    };
    return (
      (i._bindPostStartEvents = function (e) {
        if (e) {
          var t = n[e.type];
          t.forEach(function (e) {
            o.addEventListener(e, this);
          }, this),
            (this._boundPointerEvents = t);
        }
      }),
      (i._unbindPostStartEvents = function () {
        this._boundPointerEvents &&
          (this._boundPointerEvents.forEach(function (e) {
            o.removeEventListener(e, this);
          }, this),
          delete this._boundPointerEvents);
      }),
      (i.onmousemove = function (e) {
        this._pointerMove(e, e);
      }),
      (i.onpointermove = function (e) {
        e.pointerId == this.pointerIdentifier && this._pointerMove(e, e);
      }),
      (i.ontouchmove = function (e) {
        var t = this.getTouch(e.changedTouches);
        t && this._pointerMove(e, t);
      }),
      (i._pointerMove = function (e, t) {
        this.pointerMove(e, t);
      }),
      (i.pointerMove = function (e, t) {
        this.emitEvent("pointerMove", [e, t]);
      }),
      (i.onmouseup = function (e) {
        this._pointerUp(e, e);
      }),
      (i.onpointerup = function (e) {
        e.pointerId == this.pointerIdentifier && this._pointerUp(e, e);
      }),
      (i.ontouchend = function (e) {
        var t = this.getTouch(e.changedTouches);
        t && this._pointerUp(e, t);
      }),
      (i._pointerUp = function (e, t) {
        this._pointerDone(), this.pointerUp(e, t);
      }),
      (i.pointerUp = function (e, t) {
        this.emitEvent("pointerUp", [e, t]);
      }),
      (i._pointerDone = function () {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
      }),
      (i._pointerReset = function () {
        (this.isPointerDown = !1), delete this.pointerIdentifier;
      }),
      (i.pointerDone = function () {}),
      (i.onpointercancel = function (e) {
        e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e);
      }),
      (i.ontouchcancel = function (e) {
        var t = this.getTouch(e.changedTouches);
        t && this._pointerCancel(e, t);
      }),
      (i._pointerCancel = function (e, t) {
        this._pointerDone(), this.pointerCancel(e, t);
      }),
      (i.pointerCancel = function (e, t) {
        this.emitEvent("pointerCancel", [e, t]);
      }),
      (t.getPointerPoint = function (e) {
        return { x: e.pageX, y: e.pageY };
      }),
      t
    );
  }),
  (function (t, i) {
    "function" == typeof define && define.amd
      ? define(
          "unidragger/unidragger",
          ["unipointer/unipointer"],
          function (e) {
            return i(t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("unipointer")))
      : (t.Unidragger = i(t, t.Unipointer));
  })(window, function (r, e) {
    function t() {}
    var i = (t.prototype = Object.create(e.prototype));
    (i.bindHandles = function () {
      this._bindHandles(!0);
    }),
      (i.unbindHandles = function () {
        this._bindHandles(!1);
      }),
      (i._bindHandles = function (e) {
        for (
          var t = (e = void 0 === e || e)
              ? "addEventListener"
              : "removeEventListener",
            i = e ? this._touchActionValue : "",
            n = 0;
          n < this.handles.length;
          n++
        ) {
          var o = this.handles[n];
          this._bindStartEvent(o, e),
            o[t]("click", this),
            r.PointerEvent && (o.style.touchAction = i);
        }
      }),
      (i._touchActionValue = "none"),
      (i.pointerDown = function (e, t) {
        this.okayPointerDown(e) &&
          ((this.pointerDownPointer = t),
          e.preventDefault(),
          this.pointerDownBlur(),
          this._bindPostStartEvents(e),
          this.emitEvent("pointerDown", [e, t]));
      });
    var o = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
      s = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0,
      };
    return (
      (i.okayPointerDown = function (e) {
        var t = o[e.target.nodeName],
          i = s[e.target.type],
          n = !t || i;
        return n || this._pointerReset(), n;
      }),
      (i.pointerDownBlur = function () {
        var e = document.activeElement;
        e && e.blur && e != document.body && e.blur();
      }),
      (i.pointerMove = function (e, t) {
        var i = this._dragPointerMove(e, t);
        this.emitEvent("pointerMove", [e, t, i]), this._dragMove(e, t, i);
      }),
      (i._dragPointerMove = function (e, t) {
        var i = {
          x: t.pageX - this.pointerDownPointer.pageX,
          y: t.pageY - this.pointerDownPointer.pageY,
        };
        return (
          !this.isDragging && this.hasDragStarted(i) && this._dragStart(e, t), i
        );
      }),
      (i.hasDragStarted = function (e) {
        return 3 < Math.abs(e.x) || 3 < Math.abs(e.y);
      }),
      (i.pointerUp = function (e, t) {
        this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t);
      }),
      (i._dragPointerUp = function (e, t) {
        this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t);
      }),
      (i._dragStart = function (e, t) {
        (this.isDragging = !0),
          (this.isPreventingClicks = !0),
          this.dragStart(e, t);
      }),
      (i.dragStart = function (e, t) {
        this.emitEvent("dragStart", [e, t]);
      }),
      (i._dragMove = function (e, t, i) {
        this.isDragging && this.dragMove(e, t, i);
      }),
      (i.dragMove = function (e, t, i) {
        e.preventDefault(), this.emitEvent("dragMove", [e, t, i]);
      }),
      (i._dragEnd = function (e, t) {
        (this.isDragging = !1),
          setTimeout(
            function () {
              delete this.isPreventingClicks;
            }.bind(this)
          ),
          this.dragEnd(e, t);
      }),
      (i.dragEnd = function (e, t) {
        this.emitEvent("dragEnd", [e, t]);
      }),
      (i.onclick = function (e) {
        this.isPreventingClicks && e.preventDefault();
      }),
      (i._staticClick = function (e, t) {
        (this.isIgnoringMouseUp && "mouseup" == e.type) ||
          (this.staticClick(e, t),
          "mouseup" != e.type &&
            ((this.isIgnoringMouseUp = !0),
            setTimeout(
              function () {
                delete this.isIgnoringMouseUp;
              }.bind(this),
              400
            )));
      }),
      (i.staticClick = function (e, t) {
        this.emitEvent("staticClick", [e, t]);
      }),
      (t.getPointerPoint = e.getPointerPoint),
      t
    );
  }),
  (function (n, o) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/drag",
          ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"],
          function (e, t, i) {
            return o(n, e, t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = o(
          n,
          require("./flickity"),
          require("unidragger"),
          require("fizzy-ui-utils")
        ))
      : (n.Flickity = o(n, n.Flickity, n.Unidragger, n.fizzyUIUtils));
  })(window, function (i, e, t, a) {
    a.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }),
      e.createMethods.push("_createDrag");
    var n = e.prototype;
    a.extend(n, t.prototype), (n._touchActionValue = "pan-y");
    var o = "createTouch" in document,
      r = !1;
    (n._createDrag = function () {
      this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        o && !r && (i.addEventListener("touchmove", function () {}), (r = !0));
    }),
      (n.onActivateDrag = function () {
        (this.handles = [this.viewport]),
          this.bindHandles(),
          this.updateDraggable();
      }),
      (n.onDeactivateDrag = function () {
        this.unbindHandles(), this.element.classList.remove("is-draggable");
      }),
      (n.updateDraggable = function () {
        ">1" == this.options.draggable
          ? (this.isDraggable = 1 < this.slides.length)
          : (this.isDraggable = this.options.draggable),
          this.isDraggable
            ? this.element.classList.add("is-draggable")
            : this.element.classList.remove("is-draggable");
      }),
      (n.bindDrag = function () {
        (this.options.draggable = !0), this.updateDraggable();
      }),
      (n.unbindDrag = function () {
        (this.options.draggable = !1), this.updateDraggable();
      }),
      (n._uiChangeDrag = function () {
        delete this.isFreeScrolling;
      }),
      (n.pointerDown = function (e, t) {
        this.isDraggable
          ? this.okayPointerDown(e) &&
            (this._pointerDownPreventDefault(e),
            this.pointerDownFocus(e),
            document.activeElement != this.element && this.pointerDownBlur(),
            (this.dragX = this.x),
            this.viewport.classList.add("is-pointer-down"),
            (this.pointerDownScroll = l()),
            i.addEventListener("scroll", this),
            this._pointerDownDefault(e, t))
          : this._pointerDownDefault(e, t);
      }),
      (n._pointerDownDefault = function (e, t) {
        (this.pointerDownPointer = { pageX: t.pageX, pageY: t.pageY }),
          this._bindPostStartEvents(e),
          this.dispatchEvent("pointerDown", e, [t]);
      });
    var s = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };
    function l() {
      return { x: i.pageXOffset, y: i.pageYOffset };
    }
    return (
      (n.pointerDownFocus = function (e) {
        s[e.target.nodeName] || this.focus();
      }),
      (n._pointerDownPreventDefault = function (e) {
        var t = "touchstart" == e.type,
          i = "touch" == e.pointerType,
          n = s[e.target.nodeName];
        t || i || n || e.preventDefault();
      }),
      (n.hasDragStarted = function (e) {
        return Math.abs(e.x) > this.options.dragThreshold;
      }),
      (n.pointerUp = function (e, t) {
        delete this.isTouchScrolling,
          this.viewport.classList.remove("is-pointer-down"),
          this.dispatchEvent("pointerUp", e, [t]),
          this._dragPointerUp(e, t);
      }),
      (n.pointerDone = function () {
        i.removeEventListener("scroll", this), delete this.pointerDownScroll;
      }),
      (n.dragStart = function (e, t) {
        this.isDraggable &&
          ((this.dragStartPosition = this.x),
          this.startAnimation(),
          i.removeEventListener("scroll", this),
          this.dispatchEvent("dragStart", e, [t]));
      }),
      (n.pointerMove = function (e, t) {
        var i = this._dragPointerMove(e, t);
        this.dispatchEvent("pointerMove", e, [t, i]), this._dragMove(e, t, i);
      }),
      (n.dragMove = function (e, t, i) {
        if (this.isDraggable) {
          e.preventDefault(), (this.previousDragX = this.dragX);
          var n = this.options.rightToLeft ? -1 : 1;
          this.options.wrapAround && (i.x = i.x % this.slideableWidth);
          var o = this.dragStartPosition + i.x * n;
          if (!this.options.wrapAround && this.slides.length) {
            var r = Math.max(-this.slides[0].target, this.dragStartPosition);
            o = r < o ? 0.5 * (o + r) : o;
            var s = Math.min(
              -this.getLastSlide().target,
              this.dragStartPosition
            );
            o = o < s ? 0.5 * (o + s) : o;
          }
          (this.dragX = o),
            (this.dragMoveTime = new Date()),
            this.dispatchEvent("dragMove", e, [t, i]);
        }
      }),
      (n.dragEnd = function (e, t) {
        if (this.isDraggable) {
          this.options.freeScroll && (this.isFreeScrolling = !0);
          var i = this.dragEndRestingSelect();
          if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling =
              -n > this.slides[0].target && -n < this.getLastSlide().target;
          } else
            this.options.freeScroll ||
              i != this.selectedIndex ||
              (i += this.dragEndBoostSelect());
          delete this.previousDragX,
            (this.isDragSelect = this.options.wrapAround),
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", e, [t]);
        }
      }),
      (n.dragEndRestingSelect = function () {
        var e = this.getRestingPosition(),
          t = Math.abs(this.getSlideDistance(-e, this.selectedIndex)),
          i = this._getClosestResting(e, t, 1),
          n = this._getClosestResting(e, t, -1);
        return i.distance < n.distance ? i.index : n.index;
      }),
      (n._getClosestResting = function (e, t, i) {
        for (
          var n = this.selectedIndex,
            o = 1 / 0,
            r =
              this.options.contain && !this.options.wrapAround
                ? function (e, t) {
                    return e <= t;
                  }
                : function (e, t) {
                    return e < t;
                  };
          r(t, o) &&
          ((n += i), (o = t), null !== (t = this.getSlideDistance(-e, n)));

        )
          t = Math.abs(t);
        return { distance: o, index: n - i };
      }),
      (n.getSlideDistance = function (e, t) {
        var i = this.slides.length,
          n = this.options.wrapAround && 1 < i,
          o = n ? a.modulo(t, i) : t,
          r = this.slides[o];
        if (!r) return null;
        var s = n ? this.slideableWidth * Math.floor(t / i) : 0;
        return e - (r.target + s);
      }),
      (n.dragEndBoostSelect = function () {
        if (
          void 0 === this.previousDragX ||
          !this.dragMoveTime ||
          100 < new Date() - this.dragMoveTime
        )
          return 0;
        var e = this.getSlideDistance(-this.dragX, this.selectedIndex),
          t = this.previousDragX - this.dragX;
        return 0 < e && 0 < t ? 1 : e < 0 && t < 0 ? -1 : 0;
      }),
      (n.staticClick = function (e, t) {
        var i = this.getParentCell(e.target),
          n = i && i.element,
          o = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", e, [t, n, o]);
      }),
      (n.onscroll = function () {
        var e = l(),
          t = this.pointerDownScroll.x - e.x,
          i = this.pointerDownScroll.y - e.y;
        (3 < Math.abs(t) || 3 < Math.abs(i)) && this._pointerDone();
      }),
      e
    );
  }),
  (function (n, o) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/prev-next-button",
          ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"],
          function (e, t, i) {
            return o(n, e, t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = o(
          n,
          require("./flickity"),
          require("unipointer"),
          require("fizzy-ui-utils")
        ))
      : o(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
  })(window, function (e, t, i, n) {
    "use strict";
    var o = "http://www.w3.org/2000/svg";
    function r(e, t) {
      (this.direction = e), (this.parent = t), this._create();
    }
    ((r.prototype = Object.create(i.prototype))._create = function () {
      (this.isEnabled = !0), (this.isPrevious = -1 == this.direction);
      var e = this.parent.options.rightToLeft ? 1 : -1;
      this.isLeft = this.direction == e;
      var t = (this.element = document.createElement("button"));
      (t.className = "flickity-button flickity-prev-next-button"),
        (t.className += this.isPrevious ? " previous" : " next"),
        t.setAttribute("type", "button"),
        this.disable(),
        t.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
      var i = this.createSVG();
      t.appendChild(i),
        this.parent.on("select", this.update.bind(this)),
        this.on(
          "pointerDown",
          this.parent.childUIPointerDown.bind(this.parent)
        );
    }),
      (r.prototype.activate = function () {
        this.bindStartEvent(this.element),
          this.element.addEventListener("click", this),
          this.parent.element.appendChild(this.element);
      }),
      (r.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element),
          this.unbindStartEvent(this.element),
          this.element.removeEventListener("click", this);
      }),
      (r.prototype.createSVG = function () {
        var e = document.createElementNS(o, "svg");
        e.setAttribute("class", "flickity-button-icon"),
          e.setAttribute("viewBox", "0 0 100 100");
        var t = document.createElementNS(o, "path"),
          i = (function (e) {
            return "string" != typeof e
              ? "M " +
                  e.x0 +
                  ",50 L " +
                  e.x1 +
                  "," +
                  (e.y1 + 50) +
                  " L " +
                  e.x2 +
                  "," +
                  (e.y2 + 50) +
                  " L " +
                  e.x3 +
                  ",50  L " +
                  e.x2 +
                  "," +
                  (50 - e.y2) +
                  " L " +
                  e.x1 +
                  "," +
                  (50 - e.y1) +
                  " Z"
              : e;
          })(this.parent.options.arrowShape);
        return (
          t.setAttribute("d", i),
          t.setAttribute("class", "arrow"),
          this.isLeft ||
            t.setAttribute("transform", "translate(100, 100) rotate(180) "),
          e.appendChild(t),
          e
        );
      }),
      (r.prototype.handleEvent = n.handleEvent),
      (r.prototype.onclick = function () {
        if (this.isEnabled) {
          this.parent.uiChange();
          var e = this.isPrevious ? "previous" : "next";
          this.parent[e]();
        }
      }),
      (r.prototype.enable = function () {
        this.isEnabled || ((this.element.disabled = !1), (this.isEnabled = !0));
      }),
      (r.prototype.disable = function () {
        this.isEnabled && ((this.element.disabled = !0), (this.isEnabled = !1));
      }),
      (r.prototype.update = function () {
        var e = this.parent.slides;
        if (this.parent.options.wrapAround && 1 < e.length) this.enable();
        else {
          var t = e.length ? e.length - 1 : 0,
            i = this.isPrevious ? 0 : t;
          this[this.parent.selectedIndex == i ? "disable" : "enable"]();
        }
      }),
      (r.prototype.destroy = function () {
        this.deactivate(), this.allOff();
      }),
      n.extend(t.defaults, {
        prevNextButtons: !0,
        arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 },
      }),
      t.createMethods.push("_createPrevNextButtons");
    var s = t.prototype;
    return (
      (s._createPrevNextButtons = function () {
        this.options.prevNextButtons &&
          ((this.prevButton = new r(-1, this)),
          (this.nextButton = new r(1, this)),
          this.on("activate", this.activatePrevNextButtons));
      }),
      (s.activatePrevNextButtons = function () {
        this.prevButton.activate(),
          this.nextButton.activate(),
          this.on("deactivate", this.deactivatePrevNextButtons);
      }),
      (s.deactivatePrevNextButtons = function () {
        this.prevButton.deactivate(),
          this.nextButton.deactivate(),
          this.off("deactivate", this.deactivatePrevNextButtons);
      }),
      (t.PrevNextButton = r),
      t
    );
  }),
  (function (n, o) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/page-dots",
          ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"],
          function (e, t, i) {
            return o(n, e, t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = o(
          n,
          require("./flickity"),
          require("unipointer"),
          require("fizzy-ui-utils")
        ))
      : o(n, n.Flickity, n.Unipointer, n.fizzyUIUtils);
  })(window, function (e, t, i, n) {
    function o(e) {
      (this.parent = e), this._create();
    }
    ((o.prototype = Object.create(i.prototype))._create = function () {
      (this.holder = document.createElement("ol")),
        (this.holder.className = "flickity-page-dots"),
        (this.dots = []),
        (this.handleClick = this.onClick.bind(this)),
        this.on(
          "pointerDown",
          this.parent.childUIPointerDown.bind(this.parent)
        );
    }),
      (o.prototype.activate = function () {
        this.setDots(),
          this.holder.addEventListener("click", this.handleClick),
          this.bindStartEvent(this.holder),
          this.parent.element.appendChild(this.holder);
      }),
      (o.prototype.deactivate = function () {
        this.holder.removeEventListener("click", this.handleClick),
          this.unbindStartEvent(this.holder),
          this.parent.element.removeChild(this.holder);
      }),
      (o.prototype.setDots = function () {
        var e = this.parent.slides.length - this.dots.length;
        0 < e ? this.addDots(e) : e < 0 && this.removeDots(-e);
      }),
      (o.prototype.addDots = function (e) {
        for (
          var t = document.createDocumentFragment(),
            i = [],
            n = this.dots.length,
            o = n + e,
            r = n;
          r < o;
          r++
        ) {
          var s = document.createElement("li");
          (s.className = "dot"),
            s.setAttribute("aria-label", "Page dot " + (r + 1)),
            t.appendChild(s),
            i.push(s);
        }
        this.holder.appendChild(t), (this.dots = this.dots.concat(i));
      }),
      (o.prototype.removeDots = function (e) {
        this.dots.splice(this.dots.length - e, e).forEach(function (e) {
          this.holder.removeChild(e);
        }, this);
      }),
      (o.prototype.updateSelected = function () {
        this.selectedDot &&
          ((this.selectedDot.className = "dot"),
          this.selectedDot.removeAttribute("aria-current")),
          this.dots.length &&
            ((this.selectedDot = this.dots[this.parent.selectedIndex]),
            (this.selectedDot.className = "dot is-selected"),
            this.selectedDot.setAttribute("aria-current", "step"));
      }),
      (o.prototype.onTap = o.prototype.onClick =
        function (e) {
          var t = e.target;
          if ("LI" == t.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(t);
            this.parent.select(i);
          }
        }),
      (o.prototype.destroy = function () {
        this.deactivate(), this.allOff();
      }),
      (t.PageDots = o),
      n.extend(t.defaults, { pageDots: !0 }),
      t.createMethods.push("_createPageDots");
    var r = t.prototype;
    return (
      (r._createPageDots = function () {
        this.options.pageDots &&
          ((this.pageDots = new o(this)),
          this.on("activate", this.activatePageDots),
          this.on("select", this.updateSelectedPageDots),
          this.on("cellChange", this.updatePageDots),
          this.on("resize", this.updatePageDots),
          this.on("deactivate", this.deactivatePageDots));
      }),
      (r.activatePageDots = function () {
        this.pageDots.activate();
      }),
      (r.updateSelectedPageDots = function () {
        this.pageDots.updateSelected();
      }),
      (r.updatePageDots = function () {
        this.pageDots.setDots();
      }),
      (r.deactivatePageDots = function () {
        this.pageDots.deactivate();
      }),
      (t.PageDots = o),
      t
    );
  }),
  (function (e, n) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/player",
          ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"],
          function (e, t, i) {
            return n(e, t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          require("ev-emitter"),
          require("fizzy-ui-utils"),
          require("./flickity")
        ))
      : n(e.EvEmitter, e.fizzyUIUtils, e.Flickity);
  })(window, function (e, t, i) {
    function n(e) {
      (this.parent = e),
        (this.state = "stopped"),
        (this.onVisibilityChange = this.visibilityChange.bind(this)),
        (this.onVisibilityPlay = this.visibilityPlay.bind(this));
    }
    ((n.prototype = Object.create(e.prototype)).play = function () {
      "playing" != this.state &&
        (document.hidden
          ? document.addEventListener("visibilitychange", this.onVisibilityPlay)
          : ((this.state = "playing"),
            document.addEventListener(
              "visibilitychange",
              this.onVisibilityChange
            ),
            this.tick()));
    }),
      (n.prototype.tick = function () {
        if ("playing" == this.state) {
          var e = this.parent.options.autoPlay;
          e = "number" == typeof e ? e : 3e3;
          var t = this;
          this.clear(),
            (this.timeout = setTimeout(function () {
              t.parent.next(!0), t.tick();
            }, e));
        }
      }),
      (n.prototype.stop = function () {
        (this.state = "stopped"),
          this.clear(),
          document.removeEventListener(
            "visibilitychange",
            this.onVisibilityChange
          );
      }),
      (n.prototype.clear = function () {
        clearTimeout(this.timeout);
      }),
      (n.prototype.pause = function () {
        "playing" == this.state && ((this.state = "paused"), this.clear());
      }),
      (n.prototype.unpause = function () {
        "paused" == this.state && this.play();
      }),
      (n.prototype.visibilityChange = function () {
        this[document.hidden ? "pause" : "unpause"]();
      }),
      (n.prototype.visibilityPlay = function () {
        this.play(),
          document.removeEventListener(
            "visibilitychange",
            this.onVisibilityPlay
          );
      }),
      t.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
      i.createMethods.push("_createPlayer");
    var o = i.prototype;
    return (
      (o._createPlayer = function () {
        (this.player = new n(this)),
          this.on("activate", this.activatePlayer),
          this.on("uiChange", this.stopPlayer),
          this.on("pointerDown", this.stopPlayer),
          this.on("deactivate", this.deactivatePlayer);
      }),
      (o.activatePlayer = function () {
        this.options.autoPlay &&
          (this.player.play(),
          this.element.addEventListener("mouseenter", this));
      }),
      (o.playPlayer = function () {
        this.player.play();
      }),
      (o.stopPlayer = function () {
        this.player.stop();
      }),
      (o.pausePlayer = function () {
        this.player.pause();
      }),
      (o.unpausePlayer = function () {
        this.player.unpause();
      }),
      (o.deactivatePlayer = function () {
        this.player.stop(),
          this.element.removeEventListener("mouseenter", this);
      }),
      (o.onmouseenter = function () {
        this.options.pauseAutoPlayOnHover &&
          (this.player.pause(),
          this.element.addEventListener("mouseleave", this));
      }),
      (o.onmouseleave = function () {
        this.player.unpause(),
          this.element.removeEventListener("mouseleave", this);
      }),
      (i.Player = n),
      i
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/add-remove-cell",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (e, t) {
            return n(i, e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          i,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : n(i, i.Flickity, i.fizzyUIUtils);
  })(window, function (e, t, n) {
    var i = t.prototype;
    return (
      (i.insert = function (e, t) {
        var i = this._makeCells(e);
        if (i && i.length) {
          var n = this.cells.length;
          t = void 0 === t ? n : t;
          var o = (function (e) {
              var t = document.createDocumentFragment();
              return (
                e.forEach(function (e) {
                  t.appendChild(e.element);
                }),
                t
              );
            })(i),
            r = t == n;
          if (r) this.slider.appendChild(o);
          else {
            var s = this.cells[t].element;
            this.slider.insertBefore(o, s);
          }
          if (0 === t) this.cells = i.concat(this.cells);
          else if (r) this.cells = this.cells.concat(i);
          else {
            var a = this.cells.splice(t, n - t);
            this.cells = this.cells.concat(i).concat(a);
          }
          this._sizeCells(i), this.cellChange(t, !0);
        }
      }),
      (i.append = function (e) {
        this.insert(e, this.cells.length);
      }),
      (i.prepend = function (e) {
        this.insert(e, 0);
      }),
      (i.remove = function (e) {
        var t = this.getCells(e);
        if (t && t.length) {
          var i = this.cells.length - 1;
          t.forEach(function (e) {
            e.remove();
            var t = this.cells.indexOf(e);
            (i = Math.min(t, i)), n.removeFrom(this.cells, e);
          }, this),
            this.cellChange(i, !0);
        }
      }),
      (i.cellSizeChange = function (e) {
        var t = this.getCell(e);
        if (t) {
          t.getSize();
          var i = this.cells.indexOf(t);
          this.cellChange(i);
        }
      }),
      (i.cellChange = function (e, t) {
        var i = this.selectedElement;
        this._positionCells(e),
          this._getWrapShiftCells(),
          this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
          (this.selectedIndex = Math.min(
            this.slides.length - 1,
            this.selectedIndex
          )),
          this.emitEvent("cellChange", [e]),
          this.select(this.selectedIndex),
          t && this.positionSliderAtSelected();
      }),
      t
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/lazyload",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (e, t) {
            return n(i, e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(
          i,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : n(i, i.Flickity, i.fizzyUIUtils);
  })(window, function (e, t, r) {
    "use strict";
    t.createMethods.push("_createLazyload");
    var i = t.prototype;
    function o(e, t) {
      (this.img = e), (this.flickity = t), this.load();
    }
    return (
      (i._createLazyload = function () {
        this.on("select", this.lazyLoad);
      }),
      (i.lazyLoad = function () {
        var e = this.options.lazyLoad;
        if (e) {
          var t = "number" == typeof e ? e : 0,
            i = this.getAdjacentCellElements(t),
            n = [];
          i.forEach(function (e) {
            var t = (function (e) {
              if ("IMG" == e.nodeName) {
                var t = e.getAttribute("data-flickity-lazyload"),
                  i = e.getAttribute("data-flickity-lazyload-src"),
                  n = e.getAttribute("data-flickity-lazyload-srcset");
                if (t || i || n) return [e];
              }
              var o = e.querySelectorAll(
                "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"
              );
              return r.makeArray(o);
            })(e);
            n = n.concat(t);
          }),
            n.forEach(function (e) {
              new o(e, this);
            }, this);
        }
      }),
      (o.prototype.handleEvent = r.handleEvent),
      (o.prototype.load = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this);
        var e =
            this.img.getAttribute("data-flickity-lazyload") ||
            this.img.getAttribute("data-flickity-lazyload-src"),
          t = this.img.getAttribute("data-flickity-lazyload-srcset");
        (this.img.src = e),
          t && this.img.setAttribute("srcset", t),
          this.img.removeAttribute("data-flickity-lazyload"),
          this.img.removeAttribute("data-flickity-lazyload-src"),
          this.img.removeAttribute("data-flickity-lazyload-srcset");
      }),
      (o.prototype.onload = function (e) {
        this.complete(e, "flickity-lazyloaded");
      }),
      (o.prototype.onerror = function (e) {
        this.complete(e, "flickity-lazyerror");
      }),
      (o.prototype.complete = function (e, t) {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
          n = i && i.element;
        this.flickity.cellSizeChange(n),
          this.img.classList.add(t),
          this.flickity.dispatchEvent("lazyLoad", e, n);
      }),
      (t.LazyLoader = o),
      t
    );
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/index",
          [
            "./flickity",
            "./drag",
            "./prev-next-button",
            "./page-dots",
            "./player",
            "./add-remove-cell",
            "./lazyload",
          ],
          t
        )
      : "object" == typeof module &&
        module.exports &&
        (module.exports = t(
          require("./flickity"),
          require("./drag"),
          require("./prev-next-button"),
          require("./page-dots"),
          require("./player"),
          require("./add-remove-cell"),
          require("./lazyload")
        ));
  })(window, function (e) {
    return e;
  }),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(
          "flickity-as-nav-for/as-nav-for",
          ["flickity/js/index", "fizzy-ui-utils/utils"],
          t
        )
      : "object" == typeof module && module.exports
      ? (module.exports = t(require("flickity"), require("fizzy-ui-utils")))
      : (e.Flickity = t(e.Flickity, e.fizzyUIUtils));
  })(window, function (n, o) {
    n.createMethods.push("_createAsNavFor");
    var e = n.prototype;
    return (
      (e._createAsNavFor = function () {
        this.on("activate", this.activateAsNavFor),
          this.on("deactivate", this.deactivateAsNavFor),
          this.on("destroy", this.destroyAsNavFor);
        var e = this.options.asNavFor;
        if (e) {
          var t = this;
          setTimeout(function () {
            t.setNavCompanion(e);
          });
        }
      }),
      (e.setNavCompanion = function (e) {
        e = o.getQueryElement(e);
        var t = n.data(e);
        if (t && t != this) {
          this.navCompanion = t;
          var i = this;
          (this.onNavCompanionSelect = function () {
            i.navCompanionSelect();
          }),
            t.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0);
        }
      }),
      (e.navCompanionSelect = function (e) {
        var t = this.navCompanion && this.navCompanion.selectedCells;
        if (t) {
          var i = t[0],
            n = this.navCompanion.cells.indexOf(i),
            o = n + t.length - 1,
            r = Math.floor(
              (function (e, t, i) {
                return (t - e) * i + e;
              })(n, o, this.navCompanion.cellAlign)
            );
          if (
            (this.selectCell(r, !1, e),
            this.removeNavSelectedElements(),
            !(r >= this.cells.length))
          ) {
            var s = this.cells.slice(n, 1 + o);
            (this.navSelectedElements = s.map(function (e) {
              return e.element;
            })),
              this.changeNavSelectedClass("add");
          }
        }
      }),
      (e.changeNavSelectedClass = function (t) {
        this.navSelectedElements.forEach(function (e) {
          e.classList[t]("is-nav-selected");
        });
      }),
      (e.activateAsNavFor = function () {
        this.navCompanionSelect(!0);
      }),
      (e.removeNavSelectedElements = function () {
        this.navSelectedElements &&
          (this.changeNavSelectedClass("remove"),
          delete this.navSelectedElements);
      }),
      (e.onNavStaticClick = function (e, t, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n);
      }),
      (e.deactivateAsNavFor = function () {
        this.removeNavSelectedElements();
      }),
      (e.destroyAsNavFor = function () {
        this.navCompanion &&
          (this.navCompanion.off("select", this.onNavCompanionSelect),
          this.off("staticClick", this.onNavStaticClick),
          delete this.navCompanion);
      }),
      n
    );
  }),
  (function (t, i) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "imagesloaded/imagesloaded",
          ["ev-emitter/ev-emitter"],
          function (e) {
            return i(t, e);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = i(t, require("ev-emitter")))
      : (t.imagesLoaded = i(t, t.EvEmitter));
  })("undefined" != typeof window ? window : this, function (t, e) {
    var o = t.jQuery,
      r = t.console;
    function s(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    var a = Array.prototype.slice;
    function l(e, t, i) {
      if (!(this instanceof l)) return new l(e, t, i);
      var n = e;
      "string" == typeof e && (n = document.querySelectorAll(e)),
        n
          ? ((this.elements = (function (e) {
              return Array.isArray(e)
                ? e
                : "object" == typeof e && "number" == typeof e.length
                ? a.call(e)
                : [e];
            })(n)),
            (this.options = s({}, this.options)),
            "function" == typeof t ? (i = t) : s(this.options, t),
            i && this.on("always", i),
            this.getImages(),
            o && (this.jqDeferred = new o.Deferred()),
            setTimeout(this.check.bind(this)))
          : r.error("Bad element for imagesLoaded " + (n || e));
    }
    ((l.prototype = Object.create(e.prototype)).options = {}),
      (l.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (l.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          !0 === this.options.background && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && c[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var c = { 1: !0, 9: !0, 11: !0 };
    function i(e) {
      this.img = e;
    }
    function n(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    return (
      (l.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (l.prototype.addImage = function (e) {
        var t = new i(e);
        this.images.push(t);
      }),
      (l.prototype.addBackground = function (e, t) {
        var i = new n(e, t);
        this.images.push(i);
      }),
      (l.prototype.check = function () {
        var n = this;
        function t(e, t, i) {
          setTimeout(function () {
            n.progress(e, t, i);
          });
        }
        (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? this.images.forEach(function (e) {
                e.once("progress", t), e.check();
              })
            : this.complete();
      }),
      (l.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && r && r.log("progress: " + i, e, t);
      }),
      (l.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      ((i.prototype = Object.create(e.prototype)).check = function () {
        this.getIsImageComplete()
          ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            (this.proxyImage.src = this.img.src));
      }),
      (i.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (i.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (i.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (i.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (i.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (i.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      ((n.prototype = Object.create(i.prototype)).check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (n.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (n.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (l.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) &&
          ((o = e).fn.imagesLoaded = function (e, t) {
            return new l(this, e, t).jqDeferred.promise(o(this));
          });
      }),
      l.makeJQueryPlugin(),
      l
    );
  }),
  (function (i, n) {
    "function" == typeof define && define.amd
      ? define(
          ["flickity/js/index", "imagesloaded/imagesloaded"],
          function (e, t) {
            return n(i, e, t);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = n(i, require("flickity"), require("imagesloaded")))
      : (i.Flickity = n(i, i.Flickity, i.imagesLoaded));
  })(window, function (e, t, i) {
    "use strict";
    t.createMethods.push("_createImagesLoaded");
    var n = t.prototype;
    return (
      (n._createImagesLoaded = function () {
        this.on("activate", this.imagesLoaded);
      }),
      (n.imagesLoaded = function () {
        if (this.options.imagesLoaded) {
          var n = this;
          i(this.slider).on("progress", function (e, t) {
            var i = n.getParentCell(t.img);
            n.cellSizeChange(i && i.element),
              n.options.freeScroll || n.positionSliderAtSelected();
          });
        }
      }),
      t
    );
  }),
  (function (e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], e)
      : "undefined" != typeof module && module.exports
      ? (module.exports = e(require("jquery")))
      : e(jQuery);
  })(function (l) {
    function c(e) {
      return parseFloat(e) || 0;
    }
    function u(e) {
      var t = l(e),
        n = null,
        o = [];
      return (
        t.each(function () {
          var e = l(this),
            t = e.offset().top - c(e.css("margin-top")),
            i = 0 < o.length ? o[o.length - 1] : null;
          null === i
            ? o.push(e)
            : Math.floor(Math.abs(n - t)) <= 1
            ? (o[o.length - 1] = i.add(e))
            : o.push(e),
            (n = t);
        }),
        o
      );
    }
    function h(e) {
      var t = { byRow: !0, property: "height", target: null, remove: !1 };
      return "object" == typeof e
        ? l.extend(t, e)
        : ("boolean" == typeof e
            ? (t.byRow = e)
            : "remove" === e && (t.remove = !0),
          t);
    }
    var n = -1,
      o = -1,
      d = (l.fn.matchHeight = function (e) {
        var t = h(e);
        if (t.remove) {
          var i = this;
          return (
            this.css(t.property, ""),
            l.each(d._groups, function (e, t) {
              t.elements = t.elements.not(i);
            }),
            this
          );
        }
        return (
          (this.length <= 1 && !t.target) ||
            (d._groups.push({ elements: this, options: t }), d._apply(this, t)),
          this
        );
      });
    (d.version = "master"),
      (d._groups = []),
      (d._throttle = 80),
      (d._maintainScroll = !1),
      (d._beforeUpdate = null),
      (d._afterUpdate = null),
      (d._rows = u),
      (d._parse = c),
      (d._parseOptions = h),
      (d._apply = function (e, t) {
        var r = h(t),
          i = l(e),
          n = [i],
          o = l(window).scrollTop(),
          s = l("html").outerHeight(!0),
          a = i.parents().filter(":hidden");
        return (
          a.each(function () {
            var e = l(this);
            e.data("style-cache", e.attr("style"));
          }),
          a.css("display", "block"),
          r.byRow &&
            !r.target &&
            (i.each(function () {
              var e = l(this),
                t = e.css("display");
              "inline-block" !== t &&
                "flex" !== t &&
                "inline-flex" !== t &&
                (t = "block"),
                e.data("style-cache", e.attr("style")),
                e.css({
                  display: t,
                  "padding-top": "0",
                  "padding-bottom": "0",
                  "margin-top": "0",
                  "margin-bottom": "0",
                  "border-top-width": "0",
                  "border-bottom-width": "0",
                  height: "100px",
                  overflow: "hidden",
                });
            }),
            (n = u(i)),
            i.each(function () {
              var e = l(this);
              e.attr("style", e.data("style-cache") || "");
            })),
          l.each(n, function (e, t) {
            var i = l(t),
              o = 0;
            if (r.target) o = r.target.outerHeight(!1);
            else {
              if (r.byRow && i.length <= 1) return void i.css(r.property, "");
              i.each(function () {
                var e = l(this),
                  t = e.attr("style"),
                  i = e.css("display");
                "inline-block" !== i &&
                  "flex" !== i &&
                  "inline-flex" !== i &&
                  (i = "block");
                var n = { display: i };
                (n[r.property] = ""),
                  e.css(n),
                  e.outerHeight(!1) > o && (o = e.outerHeight(!1)),
                  t ? e.attr("style", t) : e.css("display", "");
              });
            }
            i.each(function () {
              var e = l(this),
                t = 0;
              (r.target && e.is(r.target)) ||
                ("border-box" !== e.css("box-sizing") &&
                  ((t +=
                    c(e.css("border-top-width")) +
                    c(e.css("border-bottom-width"))),
                  (t += c(e.css("padding-top")) + c(e.css("padding-bottom")))),
                e.css(r.property, o - t + "px"));
            });
          }),
          a.each(function () {
            var e = l(this);
            e.attr("style", e.data("style-cache") || null);
          }),
          d._maintainScroll &&
            l(window).scrollTop((o / s) * l("html").outerHeight(!0)),
          this
        );
      }),
      (d._applyDataApi = function () {
        var i = {};
        l("[data-match-height], [data-mh]").each(function () {
          var e = l(this),
            t = e.attr("data-mh") || e.attr("data-match-height");
          i[t] = t in i ? i[t].add(e) : e;
        }),
          l.each(i, function () {
            this.matchHeight(!0);
          });
      });
    function r(e) {
      d._beforeUpdate && d._beforeUpdate(e, d._groups),
        l.each(d._groups, function () {
          d._apply(this.elements, this.options);
        }),
        d._afterUpdate && d._afterUpdate(e, d._groups);
    }
    (d._update = function (e, t) {
      if (t && "resize" === t.type) {
        var i = l(window).width();
        if (i === n) return;
        n = i;
      }
      e
        ? -1 === o &&
          (o = setTimeout(function () {
            r(t), (o = -1);
          }, d._throttle))
        : r(t);
    }),
      l(d._applyDataApi);
    var e = l.fn.on ? "on" : "bind";
    l(window)[e]("load", function (e) {
      d._update(!1, e);
    }),
      l(window)[e]("resize orientationchange", function (e) {
        d._update(!0, e);
      });
  }),
  (function (i) {
    var n = {};
    function o(e) {
      if (n[e]) return n[e].exports;
      var t = (n[e] = { i: e, l: !1, exports: {} });
      return i[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
    }
    (o.m = i),
      (o.c = n),
      (o.d = function (e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function (t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (
          (o.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var n in t)
            o.d(
              i,
              n,
              function (e) {
                return t[e];
              }.bind(null, n)
            );
        return i;
      }),
      (o.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 10));
  })([
    ,
    ,
    function (e, t) {
      e.exports = function (e) {
        "complete" === document.readyState ||
        "interactive" === document.readyState
          ? e.call()
          : document.attachEvent
          ? document.attachEvent("onreadystatechange", function () {
              "interactive" === document.readyState && e.call();
            })
          : document.addEventListener &&
            document.addEventListener("DOMContentLoaded", e);
      };
    },
    function (i, e, t) {
      (function (e) {
        var t;
        (t =
          "undefined" != typeof window
            ? window
            : void 0 !== e
            ? e
            : "undefined" != typeof self
            ? self
            : {}),
          (i.exports = t);
      }).call(this, t(4));
    },
    function (e, t) {
      function i(e) {
        return (i =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" === ("undefined" == typeof window ? "undefined" : i(window)) &&
          (n = window);
      }
      e.exports = n;
    },
    ,
    ,
    ,
    ,
    ,
    function (e, t, i) {
      e.exports = i(11);
    },
    function (e, t, i) {
      "use strict";
      i.r(t);
      var n = i(2),
        o = i.n(n),
        r = i(3),
        s = i(12);
      function a(e) {
        return (a =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      var l = r.window.jarallax;
      if (
        ((r.window.jarallax = s.default),
        (r.window.jarallax.noConflict = function () {
          return (r.window.jarallax = l), this;
        }),
        void 0 !== r.jQuery)
      ) {
        var c = function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          Array.prototype.unshift.call(t, this);
          var n = s.default.apply(r.window, t);
          return "object" !== a(n) ? n : this;
        };
        c.constructor = s.default.constructor;
        var u = r.jQuery.fn.jarallax;
        (r.jQuery.fn.jarallax = c),
          (r.jQuery.fn.jarallax.noConflict = function () {
            return (r.jQuery.fn.jarallax = u), this;
          });
      }
      o()(function () {
        Object(s.default)(document.querySelectorAll("[data-jarallax]"));
      });
    },
    function (e, t, i) {
      "use strict";
      i.r(t);
      var n = i(2),
        o = i.n(n),
        v = i(3);
      function c(e, t) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(e) ||
          (function (e, t) {
            if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
              return;
            var i = [],
              n = !0,
              o = !1,
              r = void 0;
            try {
              for (
                var s, a = e[Symbol.iterator]();
                !(n = (s = a.next()).done) &&
                (i.push(s.value), !t || i.length !== t);
                n = !0
              );
            } catch (e) {
              (o = !0), (r = e);
            } finally {
              try {
                n || null == a.return || a.return();
              } finally {
                if (o) throw r;
              }
            }
            return i;
          })(e, t) ||
          (function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return r(e, t);
            var i = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === i && e.constructor && (i = e.constructor.name);
            if ("Map" === i || "Set" === i) return Array.from(e);
            if (
              "Arguments" === i ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
            )
              return r(e, t);
          })(e, t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      function r(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
        return n;
      }
      function u(e) {
        return (u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function s(e, t) {
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      var a,
        y,
        h = v.window.navigator,
        d =
          -1 < h.userAgent.indexOf("MSIE ") ||
          -1 < h.userAgent.indexOf("Trident/") ||
          -1 < h.userAgent.indexOf("Edge/"),
        l =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            h.userAgent
          ),
        f = (function () {
          for (
            var e = "transform WebkitTransform MozTransform".split(" "),
              t = document.createElement("div"),
              i = 0;
            i < e.length;
            i += 1
          )
            if (t && void 0 !== t.style[e[i]]) return e[i];
          return !1;
        })();
      function p() {
        y = l
          ? (!a &&
              document.body &&
              (((a = document.createElement("div")).style.cssText =
                "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;"),
              document.body.appendChild(a)),
            (a ? a.clientHeight : 0) ||
              v.window.innerHeight ||
              document.documentElement.clientHeight)
          : v.window.innerHeight || document.documentElement.clientHeight;
      }
      p(),
        v.window.addEventListener("resize", p),
        v.window.addEventListener("orientationchange", p),
        v.window.addEventListener("load", p),
        o()(function () {
          p();
        });
      var m = [];
      function g() {
        m.length &&
          (m.forEach(function (e, t) {
            var i = e.instance,
              n = e.oldData,
              o = i.$item.getBoundingClientRect(),
              r = {
                width: o.width,
                height: o.height,
                top: o.top,
                bottom: o.bottom,
                wndW: v.window.innerWidth,
                wndH: y,
              },
              s =
                !n ||
                n.wndW !== r.wndW ||
                n.wndH !== r.wndH ||
                n.width !== r.width ||
                n.height !== r.height,
              a = s || !n || n.top !== r.top || n.bottom !== r.bottom;
            (m[t].oldData = r), s && i.onResize(), a && i.onScroll();
          }),
          v.window.requestAnimationFrame(g));
      }
      function b(e, t) {
        ("object" ===
        ("undefined" == typeof HTMLElement ? "undefined" : u(HTMLElement))
          ? e instanceof HTMLElement
          : e &&
            "object" === u(e) &&
            null !== e &&
            1 === e.nodeType &&
            "string" == typeof e.nodeName) && (e = [e]);
        for (
          var i,
            n = e.length,
            o = 0,
            r = arguments.length,
            s = new Array(2 < r ? r - 2 : 0),
            a = 2;
          a < r;
          a++
        )
          s[a - 2] = arguments[a];
        for (; o < n; o += 1)
          if (
            ("object" === u(t) || void 0 === t
              ? e[o].jarallax || (e[o].jarallax = new w(e[o], t))
              : e[o].jarallax && (i = e[o].jarallax[t].apply(e[o].jarallax, s)),
            void 0 !== i)
          )
            return i;
        return e;
      }
      var _ = 0,
        w = (function () {
          function l(e, t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, l);
            var i = this;
            (i.instanceID = _),
              (_ += 1),
              (i.$item = e),
              (i.defaults = {
                type: "scroll",
                speed: 0.5,
                imgSrc: null,
                imgElement: ".jarallax-img",
                imgSize: "cover",
                imgPosition: "50% 50%",
                imgRepeat: "no-repeat",
                keepImg: !1,
                elementInViewport: null,
                zIndex: -100,
                disableParallax: !1,
                disableVideo: !1,
                videoSrc: null,
                videoStartTime: 0,
                videoEndTime: 0,
                videoVolume: 0,
                videoLoop: !0,
                videoPlayOnlyVisible: !0,
                videoLazyLoading: !0,
                onScroll: null,
                onInit: null,
                onDestroy: null,
                onCoverImage: null,
              });
            var n = i.$item.dataset || {},
              o = {};
            if (
              (Object.keys(n).forEach(function (e) {
                var t = e.substr(0, 1).toLowerCase() + e.substr(1);
                t && void 0 !== i.defaults[t] && (o[t] = n[e]);
              }),
              (i.options = i.extend({}, i.defaults, o, t)),
              (i.pureOptions = i.extend({}, i.options)),
              Object.keys(i.options).forEach(function (e) {
                "true" === i.options[e]
                  ? (i.options[e] = !0)
                  : "false" === i.options[e] && (i.options[e] = !1);
              }),
              (i.options.speed = Math.min(
                2,
                Math.max(-1, parseFloat(i.options.speed))
              )),
              "string" == typeof i.options.disableParallax &&
                (i.options.disableParallax = new RegExp(
                  i.options.disableParallax
                )),
              i.options.disableParallax instanceof RegExp)
            ) {
              var r = i.options.disableParallax;
              i.options.disableParallax = function () {
                return r.test(h.userAgent);
              };
            }
            if (
              ("function" != typeof i.options.disableParallax &&
                (i.options.disableParallax = function () {
                  return !1;
                }),
              "string" == typeof i.options.disableVideo &&
                (i.options.disableVideo = new RegExp(i.options.disableVideo)),
              i.options.disableVideo instanceof RegExp)
            ) {
              var s = i.options.disableVideo;
              i.options.disableVideo = function () {
                return s.test(h.userAgent);
              };
            }
            "function" != typeof i.options.disableVideo &&
              (i.options.disableVideo = function () {
                return !1;
              });
            var a = i.options.elementInViewport;
            a && "object" === u(a) && void 0 !== a.length && (a = c(a, 1)[0]);
            a instanceof Element || (a = null),
              (i.options.elementInViewport = a),
              (i.image = {
                src: i.options.imgSrc || null,
                $container: null,
                useImgTag: !1,
                position: /iPad|iPhone|iPod|Android/.test(h.userAgent)
                  ? "absolute"
                  : "fixed",
              }),
              i.initImg() && i.canInitParallax() && i.init();
          }
          return (
            (function (e, t, i) {
              t && s(e.prototype, t), i && s(e, i);
            })(l, [
              {
                key: "css",
                value: function (t, i) {
                  return "string" == typeof i
                    ? v.window.getComputedStyle(t).getPropertyValue(i)
                    : (i.transform && f && (i[f] = i.transform),
                      Object.keys(i).forEach(function (e) {
                        t.style[e] = i[e];
                      }),
                      t);
                },
              },
              {
                key: "extend",
                value: function (i) {
                  for (
                    var e = arguments.length,
                      n = new Array(1 < e ? e - 1 : 0),
                      t = 1;
                    t < e;
                    t++
                  )
                    n[t - 1] = arguments[t];
                  return (
                    (i = i || {}),
                    Object.keys(n).forEach(function (t) {
                      n[t] &&
                        Object.keys(n[t]).forEach(function (e) {
                          i[e] = n[t][e];
                        });
                    }),
                    i
                  );
                },
              },
              {
                key: "getWindowData",
                value: function () {
                  return {
                    width:
                      v.window.innerWidth ||
                      document.documentElement.clientWidth,
                    height: y,
                    y: document.documentElement.scrollTop,
                  };
                },
              },
              {
                key: "initImg",
                value: function () {
                  var e = this,
                    t = e.options.imgElement;
                  return (
                    t && "string" == typeof t && (t = e.$item.querySelector(t)),
                    t instanceof Element ||
                      (e.options.imgSrc
                        ? ((t = new Image()).src = e.options.imgSrc)
                        : (t = null)),
                    t &&
                      (e.options.keepImg
                        ? (e.image.$item = t.cloneNode(!0))
                        : ((e.image.$item = t),
                          (e.image.$itemParent = t.parentNode)),
                      (e.image.useImgTag = !0)),
                    !!e.image.$item ||
                      (null === e.image.src &&
                        ((e.image.src =
                          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
                        (e.image.bgImage = e.css(e.$item, "background-image"))),
                      !(!e.image.bgImage || "none" === e.image.bgImage))
                  );
                },
              },
              {
                key: "canInitParallax",
                value: function () {
                  return f && !this.options.disableParallax();
                },
              },
              {
                key: "init",
                value: function () {
                  var e = this,
                    t = {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    },
                    i = {
                      pointerEvents: "none",
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      willChange: "transform,opacity",
                    };
                  if (!e.options.keepImg) {
                    var n = e.$item.getAttribute("style");
                    if (
                      (n &&
                        e.$item.setAttribute(
                          "data-jarallax-original-styles",
                          n
                        ),
                      e.image.useImgTag)
                    ) {
                      var o = e.image.$item.getAttribute("style");
                      o &&
                        e.image.$item.setAttribute(
                          "data-jarallax-original-styles",
                          o
                        );
                    }
                  }
                  if (
                    ("static" === e.css(e.$item, "position") &&
                      e.css(e.$item, { position: "relative" }),
                    "auto" === e.css(e.$item, "z-index") &&
                      e.css(e.$item, { zIndex: 0 }),
                    (e.image.$container = document.createElement("div")),
                    e.css(e.image.$container, t),
                    e.css(e.image.$container, { "z-index": e.options.zIndex }),
                    d && e.css(e.image.$container, { opacity: 0.9999 }),
                    e.image.$container.setAttribute(
                      "id",
                      "jarallax-container-".concat(e.instanceID)
                    ),
                    e.$item.appendChild(e.image.$container),
                    e.image.useImgTag
                      ? (i = e.extend(
                          {
                            "object-fit": e.options.imgSize,
                            "object-position": e.options.imgPosition,
                            "font-family": "object-fit: "
                              .concat(e.options.imgSize, "; object-position: ")
                              .concat(e.options.imgPosition, ";"),
                            "max-width": "none",
                          },
                          t,
                          i
                        ))
                      : ((e.image.$item = document.createElement("div")),
                        e.image.src &&
                          (i = e.extend(
                            {
                              "background-position": e.options.imgPosition,
                              "background-size": e.options.imgSize,
                              "background-repeat": e.options.imgRepeat,
                              "background-image":
                                e.image.bgImage ||
                                'url("'.concat(e.image.src, '")'),
                            },
                            t,
                            i
                          ))),
                    ("opacity" !== e.options.type &&
                      "scale" !== e.options.type &&
                      "scale-opacity" !== e.options.type &&
                      1 !== e.options.speed) ||
                      (e.image.position = "absolute"),
                    "fixed" === e.image.position)
                  ) {
                    var r = (function (e) {
                      for (var t = []; null !== e.parentElement; )
                        1 === (e = e.parentElement).nodeType && t.push(e);
                      return t;
                    })(e.$item).filter(function (e) {
                      var t = v.window.getComputedStyle(e),
                        i =
                          t["-webkit-transform"] ||
                          t["-moz-transform"] ||
                          t.transform;
                      return (
                        (i && "none" !== i) ||
                        /(auto|scroll)/.test(
                          t.overflow + t["overflow-y"] + t["overflow-x"]
                        )
                      );
                    });
                    e.image.position = r.length ? "absolute" : "fixed";
                  }
                  (i.position = e.image.position),
                    e.css(e.image.$item, i),
                    e.image.$container.appendChild(e.image.$item),
                    e.onResize(),
                    e.onScroll(!0),
                    e.options.onInit && e.options.onInit.call(e),
                    "none" !== e.css(e.$item, "background-image") &&
                      e.css(e.$item, { "background-image": "none" }),
                    e.addToParallaxList();
                },
              },
              {
                key: "addToParallaxList",
                value: function () {
                  m.push({ instance: this }),
                    1 === m.length && v.window.requestAnimationFrame(g);
                },
              },
              {
                key: "removeFromParallaxList",
                value: function () {
                  var i = this;
                  m.forEach(function (e, t) {
                    e.instance.instanceID === i.instanceID && m.splice(t, 1);
                  });
                },
              },
              {
                key: "destroy",
                value: function () {
                  var e = this;
                  e.removeFromParallaxList();
                  var t = e.$item.getAttribute("data-jarallax-original-styles");
                  if (
                    (e.$item.removeAttribute("data-jarallax-original-styles"),
                    t
                      ? e.$item.setAttribute("style", t)
                      : e.$item.removeAttribute("style"),
                    e.image.useImgTag)
                  ) {
                    var i = e.image.$item.getAttribute(
                      "data-jarallax-original-styles"
                    );
                    e.image.$item.removeAttribute(
                      "data-jarallax-original-styles"
                    ),
                      i
                        ? e.image.$item.setAttribute("style", t)
                        : e.image.$item.removeAttribute("style"),
                      e.image.$itemParent &&
                        e.image.$itemParent.appendChild(e.image.$item);
                  }
                  e.$clipStyles &&
                    e.$clipStyles.parentNode.removeChild(e.$clipStyles),
                    e.image.$container &&
                      e.image.$container.parentNode.removeChild(
                        e.image.$container
                      ),
                    e.options.onDestroy && e.options.onDestroy.call(e),
                    delete e.$item.jarallax;
                },
              },
              {
                key: "clipContainer",
                value: function () {
                  if ("fixed" === this.image.position) {
                    var e = this,
                      t = e.image.$container.getBoundingClientRect(),
                      i = t.width,
                      n = t.height;
                    if (!e.$clipStyles)
                      (e.$clipStyles = document.createElement("style")),
                        e.$clipStyles.setAttribute("type", "text/css"),
                        e.$clipStyles.setAttribute(
                          "id",
                          "jarallax-clip-".concat(e.instanceID)
                        ),
                        (
                          document.head ||
                          document.getElementsByTagName("head")[0]
                        ).appendChild(e.$clipStyles);
                    var o = "#jarallax-container-"
                      .concat(e.instanceID, " {\n            clip: rect(0 ")
                      .concat(i, "px ")
                      .concat(n, "px 0);\n            clip: rect(0, ")
                      .concat(i, "px, ")
                      .concat(
                        n,
                        "px, 0);\n            -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);\n        }"
                      );
                    e.$clipStyles.styleSheet
                      ? (e.$clipStyles.styleSheet.cssText = o)
                      : (e.$clipStyles.innerHTML = o);
                  }
                },
              },
              {
                key: "coverImage",
                value: function () {
                  var e = this,
                    t = e.image.$container.getBoundingClientRect(),
                    i = t.height,
                    n = e.options.speed,
                    o =
                      "scroll" === e.options.type ||
                      "scroll-opacity" === e.options.type,
                    r = 0,
                    s = i,
                    a = 0;
                  return (
                    o &&
                      (n < 0
                        ? ((r = n * Math.max(i, y)),
                          y < i && (r -= n * (i - y)))
                        : (r = n * (i + y)),
                      1 < n
                        ? (s = Math.abs(r - y))
                        : n < 0
                        ? (s = r / n + Math.abs(r))
                        : (s += (y - i) * (1 - n)),
                      (r /= 2)),
                    (e.parallaxScrollDistance = r),
                    (a = o ? (y - s) / 2 : (i - s) / 2),
                    e.css(e.image.$item, {
                      height: "".concat(s, "px"),
                      marginTop: "".concat(a, "px"),
                      left:
                        "fixed" === e.image.position
                          ? "".concat(t.left, "px")
                          : "0",
                      width: "".concat(t.width, "px"),
                    }),
                    e.options.onCoverImage && e.options.onCoverImage.call(e),
                    { image: { height: s, marginTop: a }, container: t }
                  );
                },
              },
              {
                key: "isVisible",
                value: function () {
                  return this.isElementInViewport || !1;
                },
              },
              {
                key: "onScroll",
                value: function (e) {
                  var t = this,
                    i = t.$item.getBoundingClientRect(),
                    n = i.top,
                    o = i.height,
                    r = {},
                    s = i;
                  if (
                    (t.options.elementInViewport &&
                      (s = t.options.elementInViewport.getBoundingClientRect()),
                    (t.isElementInViewport =
                      0 <= s.bottom &&
                      0 <= s.right &&
                      s.top <= y &&
                      s.left <= v.window.innerWidth),
                    e || t.isElementInViewport)
                  ) {
                    var a = Math.max(0, n),
                      l = Math.max(0, o + n),
                      c = Math.max(0, -n),
                      u = Math.max(0, n + o - y),
                      h = Math.max(0, o - (n + o - y)),
                      d = Math.max(0, -n + y - o),
                      f = 1 - ((y - n) / (y + o)) * 2,
                      p = 1;
                    if (
                      (o < y
                        ? (p = 1 - (c || u) / o)
                        : l <= y
                        ? (p = l / y)
                        : h <= y && (p = h / y),
                      ("opacity" !== t.options.type &&
                        "scale-opacity" !== t.options.type &&
                        "scroll-opacity" !== t.options.type) ||
                        ((r.transform = "translate3d(0,0,0)"), (r.opacity = p)),
                      "scale" === t.options.type ||
                        "scale-opacity" === t.options.type)
                    ) {
                      var m = 1;
                      t.options.speed < 0
                        ? (m -= t.options.speed * p)
                        : (m += t.options.speed * (1 - p)),
                        (r.transform = "scale(".concat(
                          m,
                          ") translate3d(0,0,0)"
                        ));
                    }
                    if (
                      "scroll" === t.options.type ||
                      "scroll-opacity" === t.options.type
                    ) {
                      var g = t.parallaxScrollDistance * f;
                      "absolute" === t.image.position && (g -= n),
                        (r.transform = "translate3d(0,".concat(g, "px,0)"));
                    }
                    t.css(t.image.$item, r),
                      t.options.onScroll &&
                        t.options.onScroll.call(t, {
                          section: i,
                          beforeTop: a,
                          beforeTopEnd: l,
                          afterTop: c,
                          beforeBottom: u,
                          beforeBottomEnd: h,
                          afterBottom: d,
                          visiblePercent: p,
                          fromViewportCenter: f,
                        });
                  }
                },
              },
              {
                key: "onResize",
                value: function () {
                  this.coverImage(), this.clipContainer();
                },
              },
            ]),
            l
          );
        })();
      (b.constructor = w), (t.default = b);
    },
  ]),
  (function (i) {
    var n = {};
    function o(e) {
      if (n[e]) return n[e].exports;
      var t = (n[e] = { i: e, l: !1, exports: {} });
      return i[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
    }
    (o.m = i),
      (o.c = n),
      (o.d = function (e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function (t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (
          (o.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var n in t)
            o.d(
              i,
              n,
              function (e) {
                return t[e];
              }.bind(null, n)
            );
        return i;
      }),
      (o.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 0));
  })([
    function (e, t, i) {
      e.exports = i(1);
    },
    function (e, t, i) {
      "use strict";
      i.r(t);
      var n = i(2),
        o = i.n(n),
        r = i(3),
        s = i.n(r),
        a = i(5);
      Object(a.default)(),
        o()(function () {
          void 0 !== s.a.jarallax &&
            s.a.jarallax(document.querySelectorAll("[data-jarallax-element]"));
        });
    },
    function (e, t) {
      e.exports = function (e) {
        "complete" === document.readyState ||
        "interactive" === document.readyState
          ? e.call()
          : document.attachEvent
          ? document.attachEvent("onreadystatechange", function () {
              "interactive" === document.readyState && e.call();
            })
          : document.addEventListener &&
            document.addEventListener("DOMContentLoaded", e);
      };
    },
    function (i, e, t) {
      (function (e) {
        var t;
        (t =
          "undefined" != typeof window
            ? window
            : void 0 !== e
            ? e
            : "undefined" != typeof self
            ? self
            : {}),
          (i.exports = t);
      }).call(this, t(4));
    },
    function (e, t) {
      function i(e) {
        return (i =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" === ("undefined" == typeof window ? "undefined" : i(window)) &&
          (n = window);
      }
      e.exports = n;
    },
    function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, "default", function () {
          return r;
        });
      var n = i(3),
        o = i.n(n);
      function r() {
        var e =
          0 < arguments.length && void 0 !== arguments[0]
            ? arguments[0]
            : o.a.jarallax;
        if (void 0 !== e) {
          var t = e.constructor;
          [
            "initImg",
            "canInitParallax",
            "init",
            "destroy",
            "clipContainer",
            "coverImage",
            "isVisible",
            "onScroll",
            "onResize",
          ].forEach(function (m) {
            var g = t.prototype[m];
            t.prototype[m] = function () {
              var e = this;
              "initImg" === m &&
                null !== e.$item.getAttribute("data-jarallax-element") &&
                ((e.options.type = "element"),
                (e.pureOptions.speed =
                  e.$item.getAttribute("data-jarallax-element") ||
                  e.pureOptions.speed));
              for (
                var t = arguments.length, i = new Array(t), n = 0;
                n < t;
                n++
              )
                i[n] = arguments[n];
              if ("element" !== e.options.type) return g.apply(e, i);
              switch (
                ((e.pureOptions.threshold =
                  e.$item.getAttribute("data-threshold") || ""),
                m)
              ) {
                case "init":
                  var o = e.pureOptions.speed.split(" ");
                  (e.options.speed = e.pureOptions.speed || 0),
                    (e.options.speedY = o[0] ? parseFloat(o[0]) : 0),
                    (e.options.speedX = o[1] ? parseFloat(o[1]) : 0);
                  var r = e.pureOptions.threshold.split(" ");
                  (e.options.thresholdY = r[0] ? parseFloat(r[0]) : null),
                    (e.options.thresholdX = r[1] ? parseFloat(r[1]) : null),
                    g.apply(e, i);
                  var s = e.$item.getAttribute("data-jarallax-original-styles");
                  return s && e.$item.setAttribute("style", s), !0;
                case "onResize":
                  var a = e.css(e.$item, "transform");
                  e.css(e.$item, { transform: "" });
                  var l = e.$item.getBoundingClientRect();
                  (e.itemData = {
                    width: l.width,
                    height: l.height,
                    y: l.top + e.getWindowData().y,
                    x: l.left,
                  }),
                    e.css(e.$item, { transform: a });
                  break;
                case "onScroll":
                  var c = e.getWindowData(),
                    u =
                      (c.y +
                        c.height / 2 -
                        e.itemData.y -
                        e.itemData.height / 2) /
                      (c.height / 2),
                    h = u * e.options.speedY,
                    d = u * e.options.speedX,
                    f = h,
                    p = d;
                  null !== e.options.thresholdY &&
                    h > e.options.thresholdY &&
                    (f = 0),
                    null !== e.options.thresholdX &&
                      d > e.options.thresholdX &&
                      (p = 0),
                    e.css(e.$item, {
                      transform: "translate3d("
                        .concat(p, "px,")
                        .concat(f, "px,0)"),
                    });
                  break;
                case "initImg":
                case "isVisible":
                case "clipContainer":
                case "coverImage":
                  return !0;
              }
              return g.apply(e, i);
            };
          });
        }
      }
    },
  ]),
  (function (i) {
    var n = {};
    function o(e) {
      if (n[e]) return n[e].exports;
      var t = (n[e] = { i: e, l: !1, exports: {} });
      return i[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
    }
    (o.m = i),
      (o.c = n),
      (o.d = function (e, t, i) {
        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
      }),
      (o.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (o.t = function (t, e) {
        if ((1 & e && (t = o(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (
          (o.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var n in t)
            o.d(
              i,
              n,
              function (e) {
                return t[e];
              }.bind(null, n)
            );
        return i;
      }),
      (o.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return o.d(t, "a", t), t;
      }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (o.p = ""),
      o((o.s = 6));
  })([
    ,
    ,
    function (e, t) {
      e.exports = function (e) {
        "complete" === document.readyState ||
        "interactive" === document.readyState
          ? e.call()
          : document.attachEvent
          ? document.attachEvent("onreadystatechange", function () {
              "interactive" === document.readyState && e.call();
            })
          : document.addEventListener &&
            document.addEventListener("DOMContentLoaded", e);
      };
    },
    function (i, e, t) {
      (function (e) {
        var t;
        (t =
          "undefined" != typeof window
            ? window
            : void 0 !== e
            ? e
            : "undefined" != typeof self
            ? self
            : {}),
          (i.exports = t);
      }).call(this, t(4));
    },
    function (e, t) {
      function i(e) {
        return (i =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      var n;
      n = (function () {
        return this;
      })();
      try {
        n = n || new Function("return this")();
      } catch (e) {
        "object" === ("undefined" == typeof window ? "undefined" : i(window)) &&
          (n = window);
      }
      e.exports = n;
    },
    ,
    function (e, t, i) {
      e.exports = i(7);
    },
    function (e, t, i) {
      "use strict";
      i.r(t);
      var n = i(8),
        o = i(3),
        r = i.n(o),
        s = i(2),
        a = i.n(s),
        l = i(9);
      (r.a.VideoWorker = r.a.VideoWorker || n.default),
        Object(l.default)(),
        a()(function () {
          void 0 !== r.a.jarallax &&
            r.a.jarallax(document.querySelectorAll("[data-jarallax-video]"));
        });
    },
    function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, "default", function () {
          return m;
        });
      var n = i(3),
        u = i.n(n);
      function o(e) {
        return (o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              })(e);
      }
      function r(e, t) {
        for (var i = 0; i < t.length; i++) {
          var n = t[i];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function s() {
        (this.doneCallbacks = []), (this.failCallbacks = []);
      }
      s.prototype = {
        execute: function (e, t) {
          var i = e.length;
          for (t = Array.prototype.slice.call(t); i; )
            e[(i -= 1)].apply(null, t);
        },
        resolve: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          this.execute(this.doneCallbacks, t);
        },
        reject: function () {
          for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
          this.execute(this.failCallbacks, t);
        },
        done: function (e) {
          this.doneCallbacks.push(e);
        },
        fail: function (e) {
          this.failCallbacks.push(e);
        },
      };
      var a = 0,
        l = 0,
        c = 0,
        h = 0,
        d = 0,
        f = new s(),
        p = new s(),
        m = (function () {
          function n(e, t) {
            !(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, n);
            var i = this;
            (i.url = e),
              (i.options_default = {
                autoplay: !1,
                loop: !1,
                mute: !1,
                volume: 100,
                showContols: !0,
                startTime: 0,
                endTime: 0,
              }),
              (i.options = i.extend({}, i.options_default, t)),
              (i.videoID = i.parseURL(e)),
              i.videoID && ((i.ID = a), (a += 1), i.loadAPI(), i.init());
          }
          return (
            (function (e, t, i) {
              t && r(e.prototype, t), i && r(e, i);
            })(n, [
              {
                key: "extend",
                value: function () {
                  for (
                    var e = arguments.length, i = new Array(e), t = 0;
                    t < e;
                    t++
                  )
                    i[t] = arguments[t];
                  var n = i[0] || {};
                  return (
                    Object.keys(i).forEach(function (t) {
                      i[t] &&
                        Object.keys(i[t]).forEach(function (e) {
                          n[e] = i[t][e];
                        });
                    }),
                    n
                  );
                },
              },
              {
                key: "parseURL",
                value: function (e) {
                  var t,
                    i,
                    n,
                    o,
                    r,
                    s =
                      !(
                        !(t = e.match(
                          /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/
                        )) || 11 !== t[1].length
                      ) && t[1],
                    a =
                      !(
                        !(i = e.match(
                          /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/
                        )) || !i[3]
                      ) && i[3],
                    l =
                      ((n = e.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/)),
                      (o = {}),
                      (r = 0),
                      n.forEach(function (e) {
                        var t = e.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
                        t &&
                          t[1] &&
                          t[2] &&
                          ((o["ogv" === t[1] ? "ogg" : t[1]] = t[2]), (r = 1));
                      }),
                      !!r && o);
                  return s
                    ? ((this.type = "youtube"), s)
                    : a
                    ? ((this.type = "vimeo"), a)
                    : !!l && ((this.type = "local"), l);
                },
              },
              {
                key: "isValid",
                value: function () {
                  return !!this.videoID;
                },
              },
              {
                key: "on",
                value: function (e, t) {
                  (this.userEventsList = this.userEventsList || []),
                    (
                      this.userEventsList[e] || (this.userEventsList[e] = [])
                    ).push(t);
                },
              },
              {
                key: "off",
                value: function (i, n) {
                  var o = this;
                  this.userEventsList &&
                    this.userEventsList[i] &&
                    (n
                      ? this.userEventsList[i].forEach(function (e, t) {
                          e === n && (o.userEventsList[i][t] = !1);
                        })
                      : delete this.userEventsList[i]);
                },
              },
              {
                key: "fire",
                value: function (e) {
                  for (
                    var t = this,
                      i = arguments.length,
                      n = new Array(1 < i ? i - 1 : 0),
                      o = 1;
                    o < i;
                    o++
                  )
                    n[o - 1] = arguments[o];
                  this.userEventsList &&
                    void 0 !== this.userEventsList[e] &&
                    this.userEventsList[e].forEach(function (e) {
                      e && e.apply(t, n);
                    });
                },
              },
              {
                key: "play",
                value: function (e) {
                  var t = this;
                  t.player &&
                    ("youtube" === t.type &&
                      t.player.playVideo &&
                      (void 0 !== e && t.player.seekTo(e || 0),
                      u.a.YT.PlayerState.PLAYING !==
                        t.player.getPlayerState() && t.player.playVideo()),
                    "vimeo" === t.type &&
                      (void 0 !== e && t.player.setCurrentTime(e),
                      t.player.getPaused().then(function (e) {
                        e && t.player.play();
                      })),
                    "local" === t.type &&
                      (void 0 !== e && (t.player.currentTime = e),
                      t.player.paused && t.player.play()));
                },
              },
              {
                key: "pause",
                value: function () {
                  var t = this;
                  t.player &&
                    ("youtube" === t.type &&
                      t.player.pauseVideo &&
                      u.a.YT.PlayerState.PLAYING ===
                        t.player.getPlayerState() &&
                      t.player.pauseVideo(),
                    "vimeo" === t.type &&
                      t.player.getPaused().then(function (e) {
                        e || t.player.pause();
                      }),
                    "local" === t.type &&
                      (t.player.paused || t.player.pause()));
                },
              },
              {
                key: "mute",
                value: function () {
                  this.player &&
                    ("youtube" === this.type &&
                      this.player.mute &&
                      this.player.mute(),
                    "vimeo" === this.type &&
                      this.player.setVolume &&
                      this.player.setVolume(0),
                    "local" === this.type && (this.$video.muted = !0));
                },
              },
              {
                key: "unmute",
                value: function () {
                  var e = this;
                  e.player &&
                    ("youtube" === e.type && e.player.mute && e.player.unMute(),
                    "vimeo" === e.type &&
                      e.player.setVolume &&
                      e.player.setVolume(e.options.volume),
                    "local" === e.type && (e.$video.muted = !1));
                },
              },
              {
                key: "setVolume",
                value: function (e) {
                  var t = 0 < arguments.length && void 0 !== e && e;
                  this.player &&
                    t &&
                    ("youtube" === this.type &&
                      this.player.setVolume &&
                      this.player.setVolume(t),
                    "vimeo" === this.type &&
                      this.player.setVolume &&
                      this.player.setVolume(t),
                    "local" === this.type && (this.$video.volume = t / 100));
                },
              },
              {
                key: "getVolume",
                value: function (t) {
                  this.player
                    ? ("youtube" === this.type &&
                        this.player.getVolume &&
                        t(this.player.getVolume()),
                      "vimeo" === this.type &&
                        this.player.getVolume &&
                        this.player.getVolume().then(function (e) {
                          t(e);
                        }),
                      "local" === this.type && t(100 * this.$video.volume))
                    : t(!1);
                },
              },
              {
                key: "getMuted",
                value: function (t) {
                  this.player
                    ? ("youtube" === this.type &&
                        this.player.isMuted &&
                        t(this.player.isMuted()),
                      "vimeo" === this.type &&
                        this.player.getVolume &&
                        this.player.getVolume().then(function (e) {
                          t(!!e);
                        }),
                      "local" === this.type && t(this.$video.muted))
                    : t(null);
                },
              },
              {
                key: "getImageURL",
                value: function (t) {
                  var i = this;
                  if (i.videoImage) t(i.videoImage);
                  else {
                    if ("youtube" === i.type) {
                      var e = ["maxresdefault", "sddefault", "hqdefault", "0"],
                        n = 0,
                        o = new Image();
                      (o.onload = function () {
                        120 !== (this.naturalWidth || this.width) ||
                        n === e.length - 1
                          ? ((i.videoImage = "https://img.youtube.com/vi/"
                              .concat(i.videoID, "/")
                              .concat(e[n], ".jpg")),
                            t(i.videoImage))
                          : ((n += 1),
                            (this.src = "https://img.youtube.com/vi/"
                              .concat(i.videoID, "/")
                              .concat(e[n], ".jpg")));
                      }),
                        (o.src = "https://img.youtube.com/vi/"
                          .concat(i.videoID, "/")
                          .concat(e[n], ".jpg"));
                    }
                    if ("vimeo" === i.type) {
                      var r = new XMLHttpRequest();
                      r.open(
                        "GET",
                        "https://vimeo.com/api/v2/video/".concat(
                          i.videoID,
                          ".json"
                        ),
                        !0
                      ),
                        (r.onreadystatechange = function () {
                          if (
                            4 === this.readyState &&
                            200 <= this.status &&
                            this.status < 400
                          ) {
                            var e = JSON.parse(this.responseText);
                            (i.videoImage = e[0].thumbnail_large),
                              t(i.videoImage);
                          }
                        }),
                        r.send(),
                        (r = null);
                    }
                  }
                },
              },
              {
                key: "getIframe",
                value: function (e) {
                  this.getVideo(e);
                },
              },
              {
                key: "getVideo",
                value: function (l) {
                  var c = this;
                  c.$video
                    ? l(c.$video)
                    : c.onAPIready(function () {
                        var e, t;
                        if (
                          (c.$video ||
                            ((e = document.createElement("div")).style.display =
                              "none"),
                          "youtube" === c.type)
                        ) {
                          var i, n;
                          (c.playerOptions = {}),
                            (c.playerOptions.videoId = c.videoID),
                            (c.playerOptions.playerVars = {
                              autohide: 1,
                              rel: 0,
                              autoplay: 0,
                              playsinline: 1,
                            }),
                            c.options.showContols ||
                              ((c.playerOptions.playerVars.iv_load_policy = 3),
                              (c.playerOptions.playerVars.modestbranding = 1),
                              (c.playerOptions.playerVars.controls = 0),
                              (c.playerOptions.playerVars.showinfo = 0),
                              (c.playerOptions.playerVars.disablekb = 1)),
                            (c.playerOptions.events = {
                              onReady: function (t) {
                                if (
                                  (c.options.mute
                                    ? t.target.mute()
                                    : c.options.volume &&
                                      t.target.setVolume(c.options.volume),
                                  c.options.autoplay &&
                                    c.play(c.options.startTime),
                                  c.fire("ready", t),
                                  c.options.loop && !c.options.endTime)
                                ) {
                                  c.options.endTime =
                                    c.player.getDuration() - 0.1;
                                }
                                setInterval(function () {
                                  c.getVolume(function (e) {
                                    c.options.volume !== e &&
                                      ((c.options.volume = e),
                                      c.fire("volumechange", t));
                                  });
                                }, 150);
                              },
                              onStateChange: function (e) {
                                c.options.loop &&
                                  e.data === u.a.YT.PlayerState.ENDED &&
                                  c.play(c.options.startTime),
                                  i ||
                                    e.data !== u.a.YT.PlayerState.PLAYING ||
                                    ((i = 1), c.fire("started", e)),
                                  e.data === u.a.YT.PlayerState.PLAYING &&
                                    c.fire("play", e),
                                  e.data === u.a.YT.PlayerState.PAUSED &&
                                    c.fire("pause", e),
                                  e.data === u.a.YT.PlayerState.ENDED &&
                                    c.fire("ended", e),
                                  e.data === u.a.YT.PlayerState.PLAYING
                                    ? (n = setInterval(function () {
                                        c.fire("timeupdate", e),
                                          c.options.endTime &&
                                            c.player.getCurrentTime() >=
                                              c.options.endTime &&
                                            (c.options.loop
                                              ? c.play(c.options.startTime)
                                              : c.pause());
                                      }, 150))
                                    : clearInterval(n);
                              },
                              onError: function (e) {
                                c.fire("error", e);
                              },
                            });
                          var o = !c.$video;
                          if (o) {
                            var r = document.createElement("div");
                            r.setAttribute("id", c.playerID),
                              e.appendChild(r),
                              document.body.appendChild(e);
                          }
                          (c.player =
                            c.player ||
                            new u.a.YT.Player(c.playerID, c.playerOptions)),
                            o &&
                              ((c.$video = document.getElementById(c.playerID)),
                              (c.videoWidth =
                                parseInt(c.$video.getAttribute("width"), 10) ||
                                1280),
                              (c.videoHeight =
                                parseInt(c.$video.getAttribute("height"), 10) ||
                                720));
                        }
                        if ("vimeo" === c.type) {
                          if (
                            ((c.playerOptions = {
                              id: c.videoID,
                              autopause: 0,
                              transparent: 0,
                              autoplay: c.options.autoplay ? 1 : 0,
                              loop: c.options.loop ? 1 : 0,
                              muted: c.options.mute ? 1 : 0,
                            }),
                            c.options.volume &&
                              (c.playerOptions.volume = c.options.volume),
                            c.options.showContols ||
                              ((c.playerOptions.badge = 0),
                              (c.playerOptions.byline = 0),
                              (c.playerOptions.portrait = 0),
                              (c.playerOptions.title = 0),
                              (c.playerOptions.background = 1)),
                            !c.$video)
                          ) {
                            var s = "";
                            Object.keys(c.playerOptions).forEach(function (e) {
                              "" !== s && (s += "&"),
                                (s += ""
                                  .concat(e, "=")
                                  .concat(
                                    encodeURIComponent(c.playerOptions[e])
                                  ));
                            }),
                              (c.$video = document.createElement("iframe")),
                              c.$video.setAttribute("id", c.playerID),
                              c.$video.setAttribute(
                                "src",
                                "https://player.vimeo.com/video/"
                                  .concat(c.videoID, "?")
                                  .concat(s)
                              ),
                              c.$video.setAttribute("frameborder", "0"),
                              c.$video.setAttribute("mozallowfullscreen", ""),
                              c.$video.setAttribute("allowfullscreen", ""),
                              e.appendChild(c.$video),
                              document.body.appendChild(e);
                          }
                          var a;
                          (c.player =
                            c.player ||
                            new u.a.Vimeo.Player(c.$video, c.playerOptions)),
                            c.options.startTime &&
                              c.options.autoplay &&
                              c.player.setCurrentTime(c.options.startTime),
                            c.player.getVideoWidth().then(function (e) {
                              c.videoWidth = e || 1280;
                            }),
                            c.player.getVideoHeight().then(function (e) {
                              c.videoHeight = e || 720;
                            }),
                            c.player.on("timeupdate", function (e) {
                              a || (c.fire("started", e), (a = 1)),
                                c.fire("timeupdate", e),
                                c.options.endTime &&
                                  c.options.endTime &&
                                  e.seconds >= c.options.endTime &&
                                  (c.options.loop
                                    ? c.play(c.options.startTime)
                                    : c.pause());
                            }),
                            c.player.on("play", function (e) {
                              c.fire("play", e),
                                c.options.startTime &&
                                  0 === e.seconds &&
                                  c.play(c.options.startTime);
                            }),
                            c.player.on("pause", function (e) {
                              c.fire("pause", e);
                            }),
                            c.player.on("ended", function (e) {
                              c.fire("ended", e);
                            }),
                            c.player.on("loaded", function (e) {
                              c.fire("ready", e);
                            }),
                            c.player.on("volumechange", function (e) {
                              c.fire("volumechange", e);
                            }),
                            c.player.on("error", function (e) {
                              c.fire("error", e);
                            });
                        }
                        "local" === c.type &&
                          (c.$video ||
                            ((c.$video = document.createElement("video")),
                            c.options.showContols && (c.$video.controls = !0),
                            c.options.mute
                              ? (c.$video.muted = !0)
                              : c.$video.volume &&
                                (c.$video.volume = c.options.volume / 100),
                            c.options.loop && (c.$video.loop = !0),
                            c.$video.setAttribute("playsinline", ""),
                            c.$video.setAttribute("webkit-playsinline", ""),
                            c.$video.setAttribute("id", c.playerID),
                            e.appendChild(c.$video),
                            document.body.appendChild(e),
                            Object.keys(c.videoID).forEach(function (e) {
                              !(function (e, t, i) {
                                var n = document.createElement("source");
                                (n.src = t), (n.type = i), e.appendChild(n);
                              })(c.$video, c.videoID[e], "video/".concat(e));
                            })),
                          (c.player = c.player || c.$video),
                          c.player.addEventListener("playing", function (e) {
                            t || c.fire("started", e), (t = 1);
                          }),
                          c.player.addEventListener("timeupdate", function (e) {
                            c.fire("timeupdate", e),
                              c.options.endTime &&
                                c.options.endTime &&
                                this.currentTime >= c.options.endTime &&
                                (c.options.loop
                                  ? c.play(c.options.startTime)
                                  : c.pause());
                          }),
                          c.player.addEventListener("play", function (e) {
                            c.fire("play", e);
                          }),
                          c.player.addEventListener("pause", function (e) {
                            c.fire("pause", e);
                          }),
                          c.player.addEventListener("ended", function (e) {
                            c.fire("ended", e);
                          }),
                          c.player.addEventListener(
                            "loadedmetadata",
                            function () {
                              (c.videoWidth = this.videoWidth || 1280),
                                (c.videoHeight = this.videoHeight || 720),
                                c.fire("ready"),
                                c.options.autoplay &&
                                  c.play(c.options.startTime);
                            }
                          ),
                          c.player.addEventListener(
                            "volumechange",
                            function (e) {
                              c.getVolume(function (e) {
                                c.options.volume = e;
                              }),
                                c.fire("volumechange", e);
                            }
                          ),
                          c.player.addEventListener("error", function (e) {
                            c.fire("error", e);
                          }));
                        l(c.$video);
                      });
                },
              },
              {
                key: "init",
                value: function () {
                  this.playerID = "VideoWorker-".concat(this.ID);
                },
              },
              {
                key: "loadAPI",
                value: function () {
                  if (!l || !c) {
                    var e = "";
                    if (
                      ("youtube" !== this.type ||
                        l ||
                        ((l = 1), (e = "https://www.youtube.com/iframe_api")),
                      "vimeo" === this.type && !c)
                    ) {
                      if (((c = 1), void 0 !== u.a.Vimeo)) return;
                      e = "https://player.vimeo.com/api/player.js";
                    }
                    if (e) {
                      var t = document.createElement("script"),
                        i = document.getElementsByTagName("head")[0];
                      (t.src = e), i.appendChild(t), (t = i = null);
                    }
                  }
                },
              },
              {
                key: "onAPIready",
                value: function (e) {
                  if (
                    ("youtube" === this.type &&
                      ((void 0 !== u.a.YT && 0 !== u.a.YT.loaded) || h
                        ? "object" === o(u.a.YT) && 1 === u.a.YT.loaded
                          ? e()
                          : f.done(function () {
                              e();
                            })
                        : ((h = 1),
                          (window.onYouTubeIframeAPIReady = function () {
                            (window.onYouTubeIframeAPIReady = null),
                              f.resolve("done"),
                              e();
                          }))),
                    "vimeo" === this.type)
                  )
                    if (void 0 !== u.a.Vimeo || d)
                      void 0 !== u.a.Vimeo
                        ? e()
                        : p.done(function () {
                            e();
                          });
                    else {
                      d = 1;
                      var t = setInterval(function () {
                        void 0 !== u.a.Vimeo &&
                          (clearInterval(t), p.resolve("done"), e());
                      }, 20);
                    }
                  "local" === this.type && e();
                },
              },
            ]),
            n
          );
        })();
    },
    function (e, t, i) {
      "use strict";
      i.r(t),
        i.d(t, "default", function () {
          return o;
        });
      var s = i(8),
        n = i(3),
        l = i.n(n);
      function o() {
        var e =
          0 < arguments.length && void 0 !== arguments[0]
            ? arguments[0]
            : l.a.jarallax;
        if (void 0 !== e) {
          var t = e.constructor,
            n = t.prototype.onScroll;
          t.prototype.onScroll = function () {
            var i = this;
            n.apply(i),
              i.isVideoInserted ||
                !i.video ||
                (i.options.videoLazyLoading && !i.isElementInViewport) ||
                i.options.disableVideo() ||
                ((i.isVideoInserted = !0),
                i.video.getVideo(function (e) {
                  var t = e.parentNode;
                  i.css(e, {
                    position: i.image.position,
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    bottom: "0px",
                    width: "100%",
                    height: "100%",
                    maxWidth: "none",
                    maxHeight: "none",
                    pointerEvents: "none",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    willChange: "transform,opacity",
                    margin: 0,
                    zIndex: -1,
                  }),
                    (i.$video = e),
                    "local" === i.video.type &&
                      (i.image.src
                        ? i.$video.setAttribute("poster", i.image.src)
                        : i.image.$item &&
                          "IMG" === i.image.$item.tagName &&
                          i.image.$item.src &&
                          i.$video.setAttribute("poster", i.image.$item.src)),
                    i.image.$container.appendChild(e),
                    t.parentNode.removeChild(t);
                }));
          };
          var a = t.prototype.coverImage;
          t.prototype.coverImage = function () {
            var e = this,
              t = a.apply(e),
              i = !!e.image.$item && e.image.$item.nodeName;
            if (t && e.video && i && ("IFRAME" === i || "VIDEO" === i)) {
              var n = t.image.height,
                o = (n * e.image.width) / e.image.height,
                r = (t.container.width - o) / 2,
                s = t.image.marginTop;
              t.container.width > o &&
                ((n =
                  ((o = t.container.width) * e.image.height) / e.image.width),
                (r = 0),
                (s += (t.image.height - n) / 2)),
                "IFRAME" === i && ((n += 400), (s -= 200)),
                e.css(e.$video, {
                  width: "".concat(o, "px"),
                  marginLeft: "".concat(r, "px"),
                  height: "".concat(n, "px"),
                  marginTop: "".concat(s, "px"),
                });
            }
            return t;
          };
          var i = t.prototype.initImg;
          t.prototype.initImg = function () {
            var e = i.apply(this);
            return (
              this.options.videoSrc ||
                (this.options.videoSrc =
                  this.$item.getAttribute("data-jarallax-video") || null),
              this.options.videoSrc ? ((this.defaultInitImgResult = e), !0) : e
            );
          };
          var o = t.prototype.canInitParallax;
          t.prototype.canInitParallax = function () {
            var i = this,
              e = o.apply(i);
            if (!i.options.videoSrc) return e;
            var t = new s.default(i.options.videoSrc, {
              autoplay: !0,
              loop: i.options.videoLoop,
              showContols: !1,
              startTime: i.options.videoStartTime || 0,
              endTime: i.options.videoEndTime || 0,
              mute: i.options.videoVolume ? 0 : 1,
              volume: i.options.videoVolume || 0,
            });
            function n() {
              i.image.$default_item &&
                ((i.image.$item = i.image.$default_item),
                (i.image.$item.style.display = "block"),
                i.coverImage(),
                i.clipContainer(),
                i.onScroll());
            }
            if (t.isValid())
              if (
                (this.options.disableParallax() &&
                  ((e = !0),
                  (i.image.position = "absolute"),
                  (i.options.type = "scroll"),
                  (i.options.speed = 1)),
                e)
              ) {
                if (
                  (t.on("ready", function () {
                    if (i.options.videoPlayOnlyVisible) {
                      var e = i.onScroll;
                      i.onScroll = function () {
                        e.apply(i),
                          i.videoError ||
                            (!i.options.videoLoop &&
                              (i.options.videoLoop || i.videoEnded)) ||
                            (i.isVisible() ? t.play() : t.pause());
                      };
                    } else t.play();
                  }),
                  t.on("started", function () {
                    (i.image.$default_item = i.image.$item),
                      (i.image.$item = i.$video),
                      (i.image.width = i.video.videoWidth || 1280),
                      (i.image.height = i.video.videoHeight || 720),
                      i.coverImage(),
                      i.clipContainer(),
                      i.onScroll(),
                      i.image.$default_item &&
                        (i.image.$default_item.style.display = "none");
                  }),
                  t.on("ended", function () {
                    (i.videoEnded = !0), i.options.videoLoop || n();
                  }),
                  t.on("error", function () {
                    (i.videoError = !0), n();
                  }),
                  (i.video = t),
                  !i.defaultInitImgResult &&
                    ((i.image.src =
                      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
                    "local" !== t.type))
                )
                  return (
                    t.getImageURL(function (e) {
                      (i.image.bgImage = 'url("'.concat(e, '")')), i.init();
                    }),
                    !1
                  );
              } else
                i.defaultInitImgResult ||
                  t.getImageURL(function (e) {
                    var t = i.$item.getAttribute("style");
                    t &&
                      i.$item.setAttribute("data-jarallax-original-styles", t),
                      i.css(i.$item, {
                        "background-image": 'url("'.concat(e, '")'),
                        "background-position": "center",
                        "background-size": "cover",
                      });
                  });
            return e;
          };
          var r = t.prototype.destroy;
          t.prototype.destroy = function () {
            this.image.$default_item &&
              ((this.image.$item = this.image.$default_item),
              delete this.image.$default_item),
              r.apply(this);
          };
        }
      }
    },
  ]),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : ((e = e || self).Shuffle = t());
  })(this, function () {
    "use strict";
    function s(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function n(e, t) {
      for (var i = 0; i < t.length; i++) {
        var n = t[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    function e(e, t, i) {
      return t && n(e.prototype, t), i && n(e, i), e;
    }
    function o(e) {
      return (o = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          })(e);
    }
    function i(e, t) {
      return (i =
        Object.setPrototypeOf ||
        function (e, t) {
          return (e.__proto__ = t), e;
        })(e, t);
    }
    function a(e, t) {
      return !t || ("object" != typeof t && "function" != typeof t)
        ? (function (e) {
            if (void 0 === e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return e;
          })(e)
        : t;
    }
    function t() {}
    t.prototype = {
      on: function (e, t, i) {
        var n = this.e || (this.e = {});
        return (n[e] || (n[e] = [])).push({ fn: t, ctx: i }), this;
      },
      once: function (e, t, i) {
        var n = this;
        function o() {
          n.off(e, o), t.apply(i, arguments);
        }
        return (o._ = t), this.on(e, o, i);
      },
      emit: function (e) {
        for (
          var t = [].slice.call(arguments, 1),
            i = ((this.e || (this.e = {}))[e] || []).slice(),
            n = 0,
            o = i.length;
          n < o;
          n++
        )
          i[n].fn.apply(i[n].ctx, t);
        return this;
      },
      off: function (e, t) {
        var i = this.e || (this.e = {}),
          n = i[e],
          o = [];
        if (n && t)
          for (var r = 0, s = n.length; r < s; r++)
            n[r].fn !== t && n[r].fn._ !== t && o.push(n[r]);
        return o.length ? (i[e] = o) : delete i[e], this;
      },
    };
    var l = t,
      r = t;
    l.TinyEmitter = r;
    var c = "undefined" != typeof Element ? Element.prototype : {},
      u =
        c.matches ||
        c.matchesSelector ||
        c.webkitMatchesSelector ||
        c.mozMatchesSelector ||
        c.msMatchesSelector ||
        c.oMatchesSelector,
      h = function (e, t) {
        if (!e || 1 !== e.nodeType) return !1;
        if (u) return u.call(e, t);
        for (var i = e.parentNode.querySelectorAll(t), n = 0; n < i.length; n++)
          if (i[n] == e) return !0;
        return !1;
      };
    function d(e, t) {
      var i,
        n,
        o,
        r,
        s = 0;
      return function () {
        (i = this), (n = arguments);
        var e = new Date() - s;
        return r || (t <= e ? a() : (r = setTimeout(a, t - e))), o;
      };
      function a() {
        (r = 0), (s = +new Date()), (o = e.apply(i, n)), (n = i = null);
      }
    }
    function f() {}
    function p(e) {
      return parseFloat(e) || 0;
    }
    var m = (function () {
        function i(e, t) {
          s(this, i), (this.x = p(e)), (this.y = p(t));
        }
        return (
          e(i, null, [
            {
              key: "equals",
              value: function (e, t) {
                return e.x === t.x && e.y === t.y;
              },
            },
          ]),
          i
        );
      })(),
      g = (function () {
        function r(e, t, i, n, o) {
          s(this, r),
            (this.id = o),
            (this.left = e),
            (this.top = t),
            (this.width = i),
            (this.height = n);
        }
        return (
          e(r, null, [
            {
              key: "intersects",
              value: function (e, t) {
                return (
                  e.left < t.left + t.width &&
                  t.left < e.left + e.width &&
                  e.top < t.top + t.height &&
                  t.top < e.top + e.height
                );
              },
            },
          ]),
          r
        );
      })(),
      v = {
        BASE: "shuffle",
        SHUFFLE_ITEM: "shuffle-item",
        VISIBLE: "shuffle-item--visible",
        HIDDEN: "shuffle-item--hidden",
      },
      y = 0,
      b = (function () {
        function t(e) {
          s(this, t),
            (y += 1),
            (this.id = y),
            (this.element = e),
            (this.isVisible = !0),
            (this.isHidden = !1);
        }
        return (
          e(t, [
            {
              key: "show",
              value: function () {
                (this.isVisible = !0),
                  this.element.classList.remove(v.HIDDEN),
                  this.element.classList.add(v.VISIBLE),
                  this.element.removeAttribute("aria-hidden");
              },
            },
            {
              key: "hide",
              value: function () {
                (this.isVisible = !1),
                  this.element.classList.remove(v.VISIBLE),
                  this.element.classList.add(v.HIDDEN),
                  this.element.setAttribute("aria-hidden", !0);
              },
            },
            {
              key: "init",
              value: function () {
                this.addClasses([v.SHUFFLE_ITEM, v.VISIBLE]),
                  this.applyCss(t.Css.INITIAL),
                  (this.scale = t.Scale.VISIBLE),
                  (this.point = new m());
              },
            },
            {
              key: "addClasses",
              value: function (e) {
                var t = this;
                e.forEach(function (e) {
                  t.element.classList.add(e);
                });
              },
            },
            {
              key: "removeClasses",
              value: function (e) {
                var t = this;
                e.forEach(function (e) {
                  t.element.classList.remove(e);
                });
              },
            },
            {
              key: "applyCss",
              value: function (t) {
                var i = this;
                Object.keys(t).forEach(function (e) {
                  i.element.style[e] = t[e];
                });
              },
            },
            {
              key: "dispose",
              value: function () {
                this.removeClasses([v.HIDDEN, v.VISIBLE, v.SHUFFLE_ITEM]),
                  this.element.removeAttribute("style"),
                  (this.element = null);
              },
            },
          ]),
          t
        );
      })();
    (b.Css = {
      INITIAL: {
        position: "absolute",
        top: 0,
        left: 0,
        visibility: "visible",
        willChange: "transform",
      },
      VISIBLE: {
        before: { opacity: 1, visibility: "visible" },
        after: { transitionDelay: "" },
      },
      HIDDEN: {
        before: { opacity: 0 },
        after: { visibility: "hidden", transitionDelay: "" },
      },
    }),
      (b.Scale = { VISIBLE: 1, HIDDEN: 0.001 });
    function _() {
      if (null !== w) return w;
      var e = document.body || document.documentElement,
        t = document.createElement("div");
      return (
        (t.style.cssText = "width:10px;padding:2px;box-sizing:border-box;"),
        e.appendChild(t),
        (w = "10px" === window.getComputedStyle(t, null).width),
        e.removeChild(t),
        w
      );
    }
    var w = null;
    function x(e, t, i) {
      var n =
          2 < arguments.length && void 0 !== i
            ? i
            : window.getComputedStyle(e, null),
        o = p(n[t]);
      return (
        _() || "width" !== t
          ? _() ||
            "height" !== t ||
            (o +=
              p(n.paddingTop) +
              p(n.paddingBottom) +
              p(n.borderTopWidth) +
              p(n.borderBottomWidth))
          : (o +=
              p(n.paddingLeft) +
              p(n.paddingRight) +
              p(n.borderLeftWidth) +
              p(n.borderRightWidth)),
        o
      );
    }
    var E = {
      reverse: !1,
      by: null,
      compare: null,
      randomize: !1,
      key: "element",
    };
    function S(e, t) {
      var o = Object.assign({}, E, t),
        i = Array.from(e),
        r = !1;
      return e.length
        ? o.randomize
          ? (function (e) {
              for (var t = e.length; t; ) {
                t -= 1;
                var i = Math.floor(Math.random() * (t + 1)),
                  n = e[i];
                (e[i] = e[t]), (e[t] = n);
              }
              return e;
            })(e)
          : ("function" == typeof o.by
              ? e.sort(function (e, t) {
                  if (r) return 0;
                  var i = o.by(e[o.key]),
                    n = o.by(t[o.key]);
                  return void 0 === i && void 0 === n
                    ? ((r = !0), 0)
                    : i < n || "sortFirst" === i || "sortLast" === n
                    ? -1
                    : n < i || "sortLast" === i || "sortFirst" === n
                    ? 1
                    : 0;
                })
              : "function" == typeof o.compare && e.sort(o.compare),
            r ? i : (o.reverse && e.reverse(), e))
        : [];
    }
    var C = {},
      T = "transitionend",
      k = 0;
    function A(e) {
      return (
        !!C[e] &&
        (C[e].element.removeEventListener(T, C[e].listener), !(C[e] = null))
      );
    }
    function D(e, t) {
      function i(e) {
        e.currentTarget === e.target && (A(n), t(e));
      }
      var n = T + (k += 1);
      return e.addEventListener(T, i), (C[n] = { element: e, listener: i }), n;
    }
    function I(e) {
      return Math.max.apply(Math, e);
    }
    function L(e, t, i, n) {
      var o = e / t;
      return (
        Math.abs(Math.round(o) - o) < n && (o = Math.round(o)),
        Math.min(Math.ceil(o), i)
      );
    }
    function P(e, t, i) {
      if (1 === t) return e;
      for (var n = [], o = 0; o <= i - t; o++) n.push(I(e.slice(o, o + t)));
      return n;
    }
    function j(e, t) {
      for (
        var i = (function (e) {
            return Math.min.apply(Math, e);
          })(e),
          n = 0,
          o = e.length;
        n < o;
        n++
      )
        if (e[n] >= i - t && e[n] <= i + t) return n;
      return 0;
    }
    function N(e, u) {
      var h = {};
      e.forEach(function (e) {
        h[e.top] ? h[e.top].push(e) : (h[e.top] = [e]);
      });
      var d = [],
        f = [],
        p = [];
      return (
        Object.keys(h).forEach(function (e) {
          var t = h[e];
          f.push(t);
          var n,
            i = t[t.length - 1],
            o = i.left + i.width,
            r = Math.round((u - o) / 2),
            s = t,
            a = !1;
          if (0 < r) {
            var l = [];
            (a = t.every(function (e) {
              var t = new g(e.left + r, e.top, e.width, e.height, e.id),
                i = !d.some(function (e) {
                  return g.intersects(t, e);
                });
              return l.push(t), i;
            })) && (s = l);
          }
          if (
            !a &&
            t.some(function (i) {
              return d.some(function (e) {
                var t = g.intersects(i, e);
                return t && (n = e), t;
              });
            })
          ) {
            var c = p.findIndex(function (e) {
              return e.includes(n);
            });
            p.splice(c, 1, f[c]);
          }
          (d = d.concat(s)), p.push(s);
        }),
        [].concat
          .apply([], p)
          .sort(function (e, t) {
            return e.id - t.id;
          })
          .map(function (e) {
            return new m(e.left, e.top);
          })
      );
    }
    function O(e) {
      return Array.from(new Set(e));
    }
    var M = 0,
      z = (function () {
        function r(e) {
          var t,
            i =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          s(this, r),
            ((t = a(this, o(r).call(this))).options = Object.assign(
              {},
              r.options,
              i
            )),
            t.options.delimeter && (t.options.delimiter = t.options.delimeter),
            (t.lastSort = {}),
            (t.group = r.ALL_ITEMS),
            (t.lastFilter = r.ALL_ITEMS),
            (t.isEnabled = !0),
            (t.isDestroyed = !1),
            (t.isInitialized = !1),
            (t._transitions = []),
            (t.isTransitioning = !1),
            (t._queue = []);
          var n = t._getElementOption(e);
          if (!n)
            throw new TypeError(
              "Shuffle needs to be initialized with an element."
            );
          return (
            (t.element = n),
            (t.id = "shuffle_" + M),
            (M += 1),
            t._init(),
            (t.isInitialized = !0),
            t
          );
        }
        return (
          (function (e, t) {
            if ("function" != typeof t && null !== t)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && i(e, t);
          })(r, l),
          e(
            r,
            [
              {
                key: "_init",
                value: function () {
                  if (
                    ((this.items = this._getItems()),
                    (this.options.sizer = this._getElementOption(
                      this.options.sizer
                    )),
                    this.element.classList.add(r.Classes.BASE),
                    this._initItems(this.items),
                    (this._onResize = this._getResizeFunction()),
                    window.addEventListener("resize", this._onResize),
                    "complete" !== document.readyState)
                  ) {
                    var t = this.layout.bind(this);
                    window.addEventListener("load", function e() {
                      window.removeEventListener("load", e), t();
                    });
                  }
                  var e = window.getComputedStyle(this.element, null),
                    i = r.getSize(this.element).width;
                  this._validateStyles(e),
                    this._setColumns(i),
                    this.filter(this.options.group, this.options.initialSort),
                    this.element.offsetWidth,
                    this.setItemTransitions(this.items),
                    (this.element.style.transition = "height "
                      .concat(this.options.speed, "ms ")
                      .concat(this.options.easing));
                },
              },
              {
                key: "_getResizeFunction",
                value: function () {
                  var e = this._handleResize.bind(this);
                  return this.options.throttle
                    ? this.options.throttle(e, this.options.throttleTime)
                    : e;
                },
              },
              {
                key: "_getElementOption",
                value: function (e) {
                  return "string" == typeof e
                    ? this.element.querySelector(e)
                    : e && e.nodeType && 1 === e.nodeType
                    ? e
                    : e && e.jquery
                    ? e[0]
                    : null;
                },
              },
              {
                key: "_validateStyles",
                value: function (e) {
                  "static" === e.position &&
                    (this.element.style.position = "relative"),
                    "hidden" !== e.overflow &&
                      (this.element.style.overflow = "hidden");
                },
              },
              {
                key: "_filter",
                value: function (e, t) {
                  var i =
                      0 < arguments.length && void 0 !== e
                        ? e
                        : this.lastFilter,
                    n = 1 < arguments.length && void 0 !== t ? t : this.items,
                    o = this._getFilteredSets(i, n);
                  return (
                    this._toggleFilterClasses(o),
                    "string" == typeof (this.lastFilter = i) &&
                      (this.group = i),
                    o
                  );
                },
              },
              {
                key: "_getFilteredSets",
                value: function (t, e) {
                  var i = this,
                    n = [],
                    o = [];
                  return (
                    t === r.ALL_ITEMS
                      ? (n = e)
                      : e.forEach(function (e) {
                          i._doesPassFilter(t, e.element)
                            ? n.push(e)
                            : o.push(e);
                        }),
                    { visible: n, hidden: o }
                  );
                },
              },
              {
                key: "_doesPassFilter",
                value: function (e, t) {
                  if ("function" == typeof e) return e.call(t, t, this);
                  var i = t.getAttribute("data-" + r.FILTER_ATTRIBUTE_KEY),
                    n = this.options.delimiter
                      ? i.split(this.options.delimiter)
                      : JSON.parse(i);
                  function o(e) {
                    return n.includes(e);
                  }
                  return Array.isArray(e)
                    ? this.options.filterMode === r.FilterMode.ANY
                      ? e.some(o)
                      : e.every(o)
                    : n.includes(e);
                },
              },
              {
                key: "_toggleFilterClasses",
                value: function (e) {
                  var t = e.visible,
                    i = e.hidden;
                  t.forEach(function (e) {
                    e.show();
                  }),
                    i.forEach(function (e) {
                      e.hide();
                    });
                },
              },
              {
                key: "_initItems",
                value: function (e) {
                  e.forEach(function (e) {
                    e.init();
                  });
                },
              },
              {
                key: "_disposeItems",
                value: function (e) {
                  e.forEach(function (e) {
                    e.dispose();
                  });
                },
              },
              {
                key: "_updateItemCount",
                value: function () {
                  this.visibleItems = this._getFilteredItems().length;
                },
              },
              {
                key: "setItemTransitions",
                value: function (e) {
                  var t = this.options,
                    i = t.speed,
                    n = t.easing,
                    o = this.options.useTransforms
                      ? ["transform"]
                      : ["top", "left"],
                    r = Object.keys(b.Css.HIDDEN.before).map(function (e) {
                      return (function (e) {
                        return e.replace(/([A-Z])/g, function (e, t) {
                          return "-".concat(t.toLowerCase());
                        });
                      })(e);
                    }),
                    s = o.concat(r).join();
                  e.forEach(function (e) {
                    (e.element.style.transitionDuration = i + "ms"),
                      (e.element.style.transitionTimingFunction = n),
                      (e.element.style.transitionProperty = s);
                  });
                },
              },
              {
                key: "_getItems",
                value: function () {
                  var t = this;
                  return Array.from(this.element.children)
                    .filter(function (e) {
                      return h(e, t.options.itemSelector);
                    })
                    .map(function (e) {
                      return new b(e);
                    });
                },
              },
              {
                key: "_mergeNewItems",
                value: function (e) {
                  var t = Array.from(this.element.children);
                  return S(this.items.concat(e), {
                    by: function (e) {
                      return t.indexOf(e);
                    },
                  });
                },
              },
              {
                key: "_getFilteredItems",
                value: function () {
                  return this.items.filter(function (e) {
                    return e.isVisible;
                  });
                },
              },
              {
                key: "_getConcealedItems",
                value: function () {
                  return this.items.filter(function (e) {
                    return !e.isVisible;
                  });
                },
              },
              {
                key: "_getColumnSize",
                value: function (e, t) {
                  var i;
                  return (
                    0 ===
                      (i =
                        "function" == typeof this.options.columnWidth
                          ? this.options.columnWidth(e)
                          : this.options.sizer
                          ? r.getSize(this.options.sizer).width
                          : this.options.columnWidth
                          ? this.options.columnWidth
                          : 0 < this.items.length
                          ? r.getSize(this.items[0].element, !0).width
                          : e) && (i = e),
                    i + t
                  );
                },
              },
              {
                key: "_getGutterSize",
                value: function (e) {
                  return "function" == typeof this.options.gutterWidth
                    ? this.options.gutterWidth(e)
                    : this.options.sizer
                    ? x(this.options.sizer, "marginLeft")
                    : this.options.gutterWidth;
                },
              },
              {
                key: "_setColumns",
                value: function (e) {
                  var t =
                      0 < arguments.length && void 0 !== e
                        ? e
                        : r.getSize(this.element).width,
                    i = this._getGutterSize(t),
                    n = this._getColumnSize(t, i),
                    o = (t + i) / n;
                  Math.abs(Math.round(o) - o) < this.options.columnThreshold &&
                    (o = Math.round(o)),
                    (this.cols = Math.max(Math.floor(o || 0), 1)),
                    (this.containerWidth = t),
                    (this.colWidth = n);
                },
              },
              {
                key: "_setContainerSize",
                value: function () {
                  this.element.style.height = this._getContainerSize() + "px";
                },
              },
              {
                key: "_getContainerSize",
                value: function () {
                  return I(this.positions);
                },
              },
              {
                key: "_getStaggerAmount",
                value: function (e) {
                  return Math.min(
                    e * this.options.staggerAmount,
                    this.options.staggerAmountMax
                  );
                },
              },
              {
                key: "_dispatch",
                value: function (e, t) {
                  var i = 1 < arguments.length && void 0 !== t ? t : {};
                  this.isDestroyed || (i.shuffle = this).emit(e, i);
                },
              },
              {
                key: "_resetCols",
                value: function () {
                  var e = this.cols;
                  for (this.positions = []; e; )
                    (e -= 1), this.positions.push(0);
                },
              },
              {
                key: "_layout",
                value: function (e) {
                  var o = this,
                    r = this._getNextPositions(e),
                    s = 0;
                  e.forEach(function (e, t) {
                    function i() {
                      e.applyCss(b.Css.VISIBLE.after);
                    }
                    if (m.equals(e.point, r[t]) && !e.isHidden)
                      return e.applyCss(b.Css.VISIBLE.before), void i();
                    (e.point = r[t]),
                      (e.scale = b.Scale.VISIBLE),
                      (e.isHidden = !1);
                    var n = o.getStylesForTransition(e, b.Css.VISIBLE.before);
                    (n.transitionDelay = o._getStaggerAmount(s) + "ms"),
                      o._queue.push({ item: e, styles: n, callback: i }),
                      (s += 1);
                  });
                },
              },
              {
                key: "_getNextPositions",
                value: function (e) {
                  var o = this;
                  if (this.options.isCentered) {
                    var t = e.map(function (e, t) {
                      var i = r.getSize(e.element, !0),
                        n = o._getItemPosition(i);
                      return new g(n.x, n.y, i.width, i.height, t);
                    });
                    return this.getTransformedPositions(t, this.containerWidth);
                  }
                  return e.map(function (e) {
                    return o._getItemPosition(r.getSize(e.element, !0));
                  });
                },
              },
              {
                key: "_getItemPosition",
                value: function (e) {
                  return (function (e) {
                    for (
                      var t = e.itemSize,
                        i = e.positions,
                        n = e.gridSize,
                        o = e.total,
                        r = e.threshold,
                        s = e.buffer,
                        a = L(t.width, n, o, r),
                        l = P(i, a, o),
                        c = j(l, s),
                        u = new m(n * c, l[c]),
                        h = l[c] + t.height,
                        d = 0;
                      d < a;
                      d++
                    )
                      i[c + d] = h;
                    return u;
                  })({
                    itemSize: e,
                    positions: this.positions,
                    gridSize: this.colWidth,
                    total: this.cols,
                    threshold: this.options.columnThreshold,
                    buffer: this.options.buffer,
                  });
                },
              },
              {
                key: "getTransformedPositions",
                value: function (e, t) {
                  return N(e, t);
                },
              },
              {
                key: "_shrink",
                value: function (e) {
                  var n = this,
                    t =
                      0 < arguments.length && void 0 !== e
                        ? e
                        : this._getConcealedItems(),
                    o = 0;
                  t.forEach(function (e) {
                    function t() {
                      e.applyCss(b.Css.HIDDEN.after);
                    }
                    if (e.isHidden)
                      return e.applyCss(b.Css.HIDDEN.before), void t();
                    (e.scale = b.Scale.HIDDEN), (e.isHidden = !0);
                    var i = n.getStylesForTransition(e, b.Css.HIDDEN.before);
                    (i.transitionDelay = n._getStaggerAmount(o) + "ms"),
                      n._queue.push({ item: e, styles: i, callback: t }),
                      (o += 1);
                  });
                },
              },
              {
                key: "_handleResize",
                value: function () {
                  this.isEnabled && !this.isDestroyed && this.update();
                },
              },
              {
                key: "getStylesForTransition",
                value: function (e, t) {
                  var i = Object.assign({}, t);
                  if (this.options.useTransforms) {
                    var n = this.options.roundTransforms
                        ? Math.round(e.point.x)
                        : e.point.x,
                      o = this.options.roundTransforms
                        ? Math.round(e.point.y)
                        : e.point.y;
                    i.transform = "translate("
                      .concat(n, "px, ")
                      .concat(o, "px) scale(")
                      .concat(e.scale, ")");
                  } else
                    (i.left = e.point.x + "px"), (i.top = e.point.y + "px");
                  return i;
                },
              },
              {
                key: "_whenTransitionDone",
                value: function (e, t, i) {
                  var n = D(e, function (e) {
                    t(), i(null, e);
                  });
                  this._transitions.push(n);
                },
              },
              {
                key: "_getTransitionFunction",
                value: function (t) {
                  var i = this;
                  return function (e) {
                    t.item.applyCss(t.styles),
                      i._whenTransitionDone(t.item.element, t.callback, e);
                  };
                },
              },
              {
                key: "_processQueue",
                value: function () {
                  this.isTransitioning && this._cancelMovement();
                  var e = 0 < this.options.speed,
                    t = 0 < this._queue.length;
                  t && e && this.isInitialized
                    ? this._startTransitions(this._queue)
                    : (t && this._styleImmediately(this._queue),
                      this._dispatch(r.EventType.LAYOUT)),
                    (this._queue.length = 0);
                },
              },
              {
                key: "_startTransitions",
                value: function (e) {
                  var t = this;
                  (this.isTransitioning = !0),
                    (function (e, i, n) {
                      n ||
                        ("function" == typeof i
                          ? ((n = i), (i = null))
                          : (n = f));
                      var o = e && e.length;
                      if (!o) return n(null, []);
                      var r = !1,
                        s = new Array(o);
                      function a(i) {
                        return function (e, t) {
                          if (!r) {
                            if (e) return n(e, s), void (r = !0);
                            (s[i] = t), --o || n(null, s);
                          }
                        };
                      }
                      e.forEach(
                        i
                          ? function (e, t) {
                              e.call(i, a(t));
                            }
                          : function (e, t) {
                              e(a(t));
                            }
                      );
                    })(
                      e.map(function (e) {
                        return t._getTransitionFunction(e);
                      }),
                      this._movementFinished.bind(this)
                    );
                },
              },
              {
                key: "_cancelMovement",
                value: function () {
                  this._transitions.forEach(A),
                    (this._transitions.length = 0),
                    (this.isTransitioning = !1);
                },
              },
              {
                key: "_styleImmediately",
                value: function (e) {
                  if (e.length) {
                    var t = e.map(function (e) {
                      return e.item.element;
                    });
                    r._skipTransitions(t, function () {
                      e.forEach(function (e) {
                        e.item.applyCss(e.styles), e.callback();
                      });
                    });
                  }
                },
              },
              {
                key: "_movementFinished",
                value: function () {
                  (this._transitions.length = 0),
                    (this.isTransitioning = !1),
                    this._dispatch(r.EventType.LAYOUT);
                },
              },
              {
                key: "filter",
                value: function (e, t) {
                  this.isEnabled &&
                    ((!e || (e && 0 === e.length)) && (e = r.ALL_ITEMS),
                    this._filter(e),
                    this._shrink(),
                    this._updateItemCount(),
                    this.sort(t));
                },
              },
              {
                key: "sort",
                value: function (e) {
                  var t =
                    0 < arguments.length && void 0 !== e ? e : this.lastSort;
                  if (this.isEnabled) {
                    this._resetCols();
                    var i = S(this._getFilteredItems(), t);
                    this._layout(i),
                      this._processQueue(),
                      this._setContainerSize(),
                      (this.lastSort = t);
                  }
                },
              },
              {
                key: "update",
                value: function (e) {
                  var t = 0 < arguments.length && void 0 !== e && e;
                  this.isEnabled && (t || this._setColumns(), this.sort());
                },
              },
              {
                key: "layout",
                value: function () {
                  this.update(!0);
                },
              },
              {
                key: "add",
                value: function (e) {
                  var i = this,
                    t = O(e).map(function (e) {
                      return new b(e);
                    });
                  this._initItems(t), this._resetCols();
                  function n(e) {
                    return t.includes(e);
                  }
                  function o(e) {
                    (e.scale = b.Scale.HIDDEN),
                      (e.isHidden = !0),
                      e.applyCss(b.Css.HIDDEN.before),
                      e.applyCss(b.Css.HIDDEN.after);
                  }
                  var r = S(this._mergeNewItems(t), this.lastSort),
                    s = this._filter(this.lastFilter, r),
                    a = this._getNextPositions(s.visible);
                  s.visible.forEach(function (e, t) {
                    n(e) &&
                      ((e.point = a[t]),
                      o(e),
                      e.applyCss(i.getStylesForTransition(e, {})));
                  }),
                    s.hidden.forEach(function (e) {
                      n(e) && o(e);
                    }),
                    this.element.offsetWidth,
                    this.setItemTransitions(t),
                    (this.items = this._mergeNewItems(t)),
                    this.filter(this.lastFilter);
                },
              },
              {
                key: "disable",
                value: function () {
                  this.isEnabled = !1;
                },
              },
              {
                key: "enable",
                value: function (e) {
                  var t = !(0 < arguments.length && void 0 !== e) || e;
                  (this.isEnabled = !0), t && this.update();
                },
              },
              {
                key: "remove",
                value: function (e) {
                  var t = this;
                  if (e.length) {
                    var i = O(e),
                      n = i
                        .map(function (e) {
                          return t.getItemByElement(e);
                        })
                        .filter(function (e) {
                          return !!e;
                        });
                    this._toggleFilterClasses({ visible: [], hidden: n }),
                      this._shrink(n),
                      this.sort(),
                      (this.items = this.items.filter(function (e) {
                        return !n.includes(e);
                      })),
                      this._updateItemCount(),
                      this.once(r.EventType.LAYOUT, function () {
                        t._disposeItems(n),
                          i.forEach(function (e) {
                            e.parentNode.removeChild(e);
                          }),
                          t._dispatch(r.EventType.REMOVED, { collection: i });
                      });
                  }
                },
              },
              {
                key: "getItemByElement",
                value: function (t) {
                  return this.items.find(function (e) {
                    return e.element === t;
                  });
                },
              },
              {
                key: "resetItems",
                value: function () {
                  var e = this;
                  this._disposeItems(this.items),
                    (this.isInitialized = !1),
                    (this.items = this._getItems()),
                    this._initItems(this.items),
                    this.once(r.EventType.LAYOUT, function () {
                      e.setItemTransitions(e.items), (e.isInitialized = !0);
                    }),
                    this.filter(this.lastFilter);
                },
              },
              {
                key: "destroy",
                value: function () {
                  this._cancelMovement(),
                    window.removeEventListener("resize", this._onResize),
                    this.element.classList.remove("shuffle"),
                    this.element.removeAttribute("style"),
                    this._disposeItems(this.items),
                    (this.items.length = 0),
                    (this._transitions.length = 0),
                    (this.options.sizer = null),
                    (this.element = null),
                    (this.isDestroyed = !0),
                    (this.isEnabled = !1);
                },
              },
            ],
            [
              {
                key: "getSize",
                value: function (e, t) {
                  var i = 1 < arguments.length && void 0 !== t && t,
                    n = window.getComputedStyle(e, null),
                    o = x(e, "width", n),
                    r = x(e, "height", n);
                  i &&
                    ((o += x(e, "marginLeft", n) + x(e, "marginRight", n)),
                    (r += x(e, "marginTop", n) + x(e, "marginBottom", n)));
                  return { width: o, height: r };
                },
              },
              {
                key: "_skipTransitions",
                value: function (e, t) {
                  var i = e.map(function (e) {
                    var t = e.style,
                      i = t.transitionDuration,
                      n = t.transitionDelay;
                    return (
                      (t.transitionDuration = "0ms"),
                      (t.transitionDelay = "0ms"),
                      { duration: i, delay: n }
                    );
                  });
                  t(),
                    e[0].offsetWidth,
                    e.forEach(function (e, t) {
                      (e.style.transitionDuration = i[t].duration),
                        (e.style.transitionDelay = i[t].delay);
                    });
                },
              },
            ]
          ),
          r
        );
      })();
    return (
      (z.ShuffleItem = b),
      (z.ALL_ITEMS = "all"),
      (z.FILTER_ATTRIBUTE_KEY = "groups"),
      (z.EventType = { LAYOUT: "shuffle:layout", REMOVED: "shuffle:removed" }),
      (z.Classes = v),
      (z.FilterMode = { ANY: "any", ALL: "all" }),
      (z.options = {
        group: z.ALL_ITEMS,
        speed: 250,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        itemSelector: "*",
        sizer: null,
        gutterWidth: 0,
        columnWidth: 0,
        delimiter: null,
        buffer: 0,
        columnThreshold: 0.01,
        initialSort: null,
        throttle: d,
        throttleTime: 300,
        staggerAmount: 15,
        staggerAmountMax: 150,
        useTransforms: !0,
        filterMode: z.FilterMode.ANY,
        isCentered: !1,
        roundTransforms: !0,
      }),
      (z.Point = m),
      (z.Rect = g),
      (z.__sorter = S),
      (z.__getColumnSpan = L),
      (z.__getAvailablePositions = P),
      (z.__getShortColumn = j),
      (z.__getCenteredPositions = N),
      z
    );
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : (e.StickySidebar = t());
  })(this, function () {
    "use strict";
    "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self && self;
    function e(e) {
      return e &&
        e.__esModule &&
        Object.prototype.hasOwnProperty.call(e, "default")
        ? e.default
        : e;
    }
    function t(e, t) {
      return e((t = { exports: {} }), t.exports), t.exports;
    }
    var i = t(function (e, t) {
      (function (e) {
        function n(e, t) {
          for (var i = 0; i < t.length; i++) {
            var n = t[i];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        Object.defineProperty(e, "__esModule", { value: !0 });
        var c,
          o,
          t =
            ((o = {
              topSpacing: 0,
              bottomSpacing: 0,
              containerSelector: !(c = ".stickySidebar"),
              innerWrapperSelector: ".inner-wrapper-sticky",
              stickyClass: "is-affixed",
              resizeSensor: !0,
              minWidth: !1,
            }),
            (function (e, t, i) {
              return t && n(e.prototype, t), i && n(e, i), e;
            })(
              u,
              [
                {
                  key: "initialize",
                  value: function () {
                    var i = this;
                    if (
                      (this._setSupportFeatures(),
                      this.options.innerWrapperSelector &&
                        ((this.sidebarInner = this.sidebar.querySelector(
                          this.options.innerWrapperSelector
                        )),
                        null === this.sidebarInner && (this.sidebarInner = !1)),
                      !this.sidebarInner)
                    ) {
                      var e = document.createElement("div");
                      for (
                        e.setAttribute("class", "inner-wrapper-sticky"),
                          this.sidebar.appendChild(e);
                        this.sidebar.firstChild != e;

                      )
                        e.appendChild(this.sidebar.firstChild);
                      this.sidebarInner = this.sidebar.querySelector(
                        ".inner-wrapper-sticky"
                      );
                    }
                    if (this.options.containerSelector) {
                      var t = document.querySelectorAll(
                        this.options.containerSelector
                      );
                      if (
                        ((t = Array.prototype.slice.call(t)).forEach(function (
                          e,
                          t
                        ) {
                          e.contains(i.sidebar) && (i.container = e);
                        }),
                        !t.length)
                      )
                        throw new Error(
                          "The container does not contains on the sidebar."
                        );
                    }
                    "function" != typeof this.options.topSpacing &&
                      (this.options.topSpacing =
                        parseInt(this.options.topSpacing) || 0),
                      "function" != typeof this.options.bottomSpacing &&
                        (this.options.bottomSpacing =
                          parseInt(this.options.bottomSpacing) || 0),
                      this._widthBreakpoint(),
                      this.calcDimensions(),
                      this.stickyPosition(),
                      this.bindEvents(),
                      (this._initialized = !0);
                  },
                },
                {
                  key: "bindEvents",
                  value: function () {
                    window.addEventListener("resize", this, {
                      passive: !0,
                      capture: !1,
                    }),
                      window.addEventListener("scroll", this, {
                        passive: !0,
                        capture: !1,
                      }),
                      this.sidebar.addEventListener("update" + c, this),
                      this.options.resizeSensor &&
                        "undefined" != typeof ResizeSensor &&
                        (new ResizeSensor(this.sidebarInner, this.handleEvent),
                        new ResizeSensor(this.container, this.handleEvent));
                  },
                },
                {
                  key: "handleEvent",
                  value: function (e) {
                    this.updateSticky(e);
                  },
                },
                {
                  key: "calcDimensions",
                  value: function () {
                    if (!this._breakpoint) {
                      var e = this.dimensions;
                      (e.containerTop = u.offsetRelative(this.container).top),
                        (e.containerHeight = this.container.clientHeight),
                        (e.containerBottom =
                          e.containerTop + e.containerHeight),
                        (e.sidebarHeight = this.sidebarInner.offsetHeight),
                        (e.sidebarWidth = this.sidebarInner.offsetWidth),
                        (e.viewportHeight = window.innerHeight),
                        (e.maxTranslateY = e.containerHeight - e.sidebarHeight),
                        this._calcDimensionsWithScroll();
                    }
                  },
                },
                {
                  key: "_calcDimensionsWithScroll",
                  value: function () {
                    var e = this.dimensions;
                    (e.sidebarLeft = u.offsetRelative(this.sidebar).left),
                      (e.viewportTop =
                        document.documentElement.scrollTop ||
                        document.body.scrollTop),
                      (e.viewportBottom = e.viewportTop + e.viewportHeight),
                      (e.viewportLeft =
                        document.documentElement.scrollLeft ||
                        document.body.scrollLeft),
                      (e.topSpacing = this.options.topSpacing),
                      (e.bottomSpacing = this.options.bottomSpacing),
                      "function" == typeof e.topSpacing &&
                        (e.topSpacing =
                          parseInt(e.topSpacing(this.sidebar)) || 0),
                      "function" == typeof e.bottomSpacing &&
                        (e.bottomSpacing =
                          parseInt(e.bottomSpacing(this.sidebar)) || 0),
                      "VIEWPORT-TOP" === this.affixedType
                        ? e.topSpacing < e.lastTopSpacing &&
                          ((e.translateY += e.lastTopSpacing - e.topSpacing),
                          (this._reStyle = !0))
                        : "VIEWPORT-BOTTOM" === this.affixedType &&
                          e.bottomSpacing < e.lastBottomSpacing &&
                          ((e.translateY +=
                            e.lastBottomSpacing - e.bottomSpacing),
                          (this._reStyle = !0)),
                      (e.lastTopSpacing = e.topSpacing),
                      (e.lastBottomSpacing = e.bottomSpacing);
                  },
                },
                {
                  key: "isSidebarFitsViewport",
                  value: function () {
                    var e = this.dimensions,
                      t =
                        "down" === this.scrollDirection
                          ? e.lastBottomSpacing
                          : e.lastTopSpacing;
                    return (
                      this.dimensions.sidebarHeight + t <
                      this.dimensions.viewportHeight
                    );
                  },
                },
                {
                  key: "observeScrollDir",
                  value: function () {
                    var e = this.dimensions;
                    if (e.lastViewportTop !== e.viewportTop) {
                      var t = "down" === this.direction ? Math.min : Math.max;
                      e.viewportTop === t(e.viewportTop, e.lastViewportTop) &&
                        (this.direction =
                          "down" === this.direction ? "up" : "down");
                    }
                  },
                },
                {
                  key: "getAffixType",
                  value: function () {
                    this._calcDimensionsWithScroll();
                    var e = this.dimensions,
                      t = e.viewportTop + e.topSpacing,
                      i = this.affixedType;
                    return (
                      (i =
                        t <= e.containerTop ||
                        e.containerHeight <= e.sidebarHeight
                          ? ((e.translateY = 0), "STATIC")
                          : "up" === this.direction
                          ? this._getAffixTypeScrollingUp()
                          : this._getAffixTypeScrollingDown()),
                      (e.translateY = Math.max(0, e.translateY)),
                      (e.translateY = Math.min(
                        e.containerHeight,
                        e.translateY
                      )),
                      (e.translateY = Math.round(e.translateY)),
                      (e.lastViewportTop = e.viewportTop),
                      i
                    );
                  },
                },
                {
                  key: "_getAffixTypeScrollingDown",
                  value: function () {
                    var e = this.dimensions,
                      t = e.sidebarHeight + e.containerTop,
                      i = e.viewportTop + e.topSpacing,
                      n = e.viewportBottom - e.bottomSpacing,
                      o = this.affixedType;
                    return (
                      this.isSidebarFitsViewport()
                        ? e.sidebarHeight + i >= e.containerBottom
                          ? ((e.translateY = e.containerBottom - t),
                            (o = "CONTAINER-BOTTOM"))
                          : i >= e.containerTop &&
                            ((e.translateY = i - e.containerTop),
                            (o = "VIEWPORT-TOP"))
                        : e.containerBottom <= n
                        ? ((e.translateY = e.containerBottom - t),
                          (o = "CONTAINER-BOTTOM"))
                        : t + e.translateY <= n
                        ? ((e.translateY = n - t), (o = "VIEWPORT-BOTTOM"))
                        : e.containerTop + e.translateY <= i &&
                          0 !== e.translateY &&
                          e.maxTranslateY !== e.translateY &&
                          (o = "VIEWPORT-UNBOTTOM"),
                      o
                    );
                  },
                },
                {
                  key: "_getAffixTypeScrollingUp",
                  value: function () {
                    var e = this.dimensions,
                      t = e.sidebarHeight + e.containerTop,
                      i = e.viewportTop + e.topSpacing,
                      n = e.viewportBottom - e.bottomSpacing,
                      o = this.affixedType;
                    return (
                      i <= e.translateY + e.containerTop
                        ? ((e.translateY = i - e.containerTop),
                          (o = "VIEWPORT-TOP"))
                        : e.containerBottom <= n
                        ? ((e.translateY = e.containerBottom - t),
                          (o = "CONTAINER-BOTTOM"))
                        : this.isSidebarFitsViewport() ||
                          (e.containerTop <= i &&
                            0 !== e.translateY &&
                            e.maxTranslateY !== e.translateY &&
                            (o = "VIEWPORT-UNBOTTOM")),
                      o
                    );
                  },
                },
                {
                  key: "_getStyle",
                  value: function (e) {
                    if (void 0 !== e) {
                      var t = { inner: {}, outer: {} },
                        i = this.dimensions;
                      switch (e) {
                        case "VIEWPORT-TOP":
                          t.inner = {
                            position: "fixed",
                            top: i.topSpacing,
                            left: i.sidebarLeft - i.viewportLeft,
                            width: i.sidebarWidth,
                          };
                          break;
                        case "VIEWPORT-BOTTOM":
                          t.inner = {
                            position: "fixed",
                            top: "auto",
                            left: i.sidebarLeft,
                            bottom: i.bottomSpacing,
                            width: i.sidebarWidth,
                          };
                          break;
                        case "CONTAINER-BOTTOM":
                        case "VIEWPORT-UNBOTTOM":
                          var n = this._getTranslate(0, i.translateY + "px");
                          t.inner = n
                            ? { transform: n }
                            : {
                                position: "absolute",
                                top: i.translateY,
                                width: i.sidebarWidth,
                              };
                      }
                      switch (e) {
                        case "VIEWPORT-TOP":
                        case "VIEWPORT-BOTTOM":
                        case "VIEWPORT-UNBOTTOM":
                        case "CONTAINER-BOTTOM":
                          t.outer = {
                            height: i.sidebarHeight,
                            position: "relative",
                          };
                      }
                      return (
                        (t.outer = u.extend(
                          { height: "", position: "" },
                          t.outer
                        )),
                        (t.inner = u.extend(
                          {
                            position: "relative",
                            top: "",
                            left: "",
                            bottom: "",
                            width: "",
                            transform: "",
                          },
                          t.inner
                        )),
                        t
                      );
                    }
                  },
                },
                {
                  key: "stickyPosition",
                  value: function (e) {
                    if (!this._breakpoint) {
                      (e = this._reStyle || e || !1),
                        this.options.topSpacing,
                        this.options.bottomSpacing;
                      var t = this.getAffixType(),
                        i = this._getStyle(t);
                      if ((this.affixedType != t || e) && t) {
                        var n =
                          "affix." +
                          t.toLowerCase().replace("viewport-", "") +
                          c;
                        for (var o in (u.eventTrigger(this.sidebar, n),
                        "STATIC" === t
                          ? u.removeClass(
                              this.sidebar,
                              this.options.stickyClass
                            )
                          : u.addClass(this.sidebar, this.options.stickyClass),
                        i.outer)) {
                          var r = "number" == typeof i.outer[o] ? "px" : "";
                          this.sidebar.style[o] = i.outer[o] + r;
                        }
                        for (var s in i.inner) {
                          var a = "number" == typeof i.inner[s] ? "px" : "";
                          this.sidebarInner.style[s] = i.inner[s] + a;
                        }
                        var l =
                          "affixed." +
                          t.toLowerCase().replace("viewport-", "") +
                          c;
                        u.eventTrigger(this.sidebar, l);
                      } else
                        this._initialized &&
                          (this.sidebarInner.style.left = i.inner.left);
                      this.affixedType = t;
                    }
                  },
                },
                {
                  key: "_widthBreakpoint",
                  value: function () {
                    window.innerWidth <= this.options.minWidth
                      ? ((this._breakpoint = !0),
                        (this.affixedType = "STATIC"),
                        this.sidebar.removeAttribute("style"),
                        u.removeClass(this.sidebar, this.options.stickyClass),
                        this.sidebarInner.removeAttribute("style"))
                      : (this._breakpoint = !1);
                  },
                },
                {
                  key: "updateSticky",
                  value: function (e) {
                    var t,
                      i = this,
                      n = 0 < arguments.length && void 0 !== e ? e : {};
                    this._running ||
                      ((this._running = !0),
                      (t = n.type),
                      requestAnimationFrame(function () {
                        switch (t) {
                          case "scroll":
                            i._calcDimensionsWithScroll(),
                              i.observeScrollDir(),
                              i.stickyPosition();
                            break;
                          case "resize":
                          default:
                            i._widthBreakpoint(),
                              i.calcDimensions(),
                              i.stickyPosition(!0);
                        }
                        i._running = !1;
                      }));
                  },
                },
                {
                  key: "_setSupportFeatures",
                  value: function () {
                    var e = this.support;
                    (e.transform = u.supportTransform()),
                      (e.transform3d = u.supportTransform(!0));
                  },
                },
                {
                  key: "_getTranslate",
                  value: function (e, t, i) {
                    var n = 0 < arguments.length && void 0 !== e ? e : 0,
                      o = 1 < arguments.length && void 0 !== t ? t : 0,
                      r = 2 < arguments.length && void 0 !== i ? i : 0;
                    return this.support.transform3d
                      ? "translate3d(" + n + ", " + o + ", " + r + ")"
                      : !!this.support.translate &&
                          "translate(" + n + ", " + o + ")";
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    window.removeEventListener("resize", this, { capture: !1 }),
                      window.removeEventListener("scroll", this, {
                        capture: !1,
                      }),
                      this.sidebar.classList.remove(this.options.stickyClass),
                      (this.sidebar.style.minHeight = ""),
                      this.sidebar.removeEventListener("update" + c, this);
                    var e = { inner: {}, outer: {} };
                    for (var t in ((e.inner = {
                      position: "",
                      top: "",
                      left: "",
                      bottom: "",
                      width: "",
                      transform: "",
                    }),
                    (e.outer = { height: "", position: "" }),
                    e.outer))
                      this.sidebar.style[t] = e.outer[t];
                    for (var i in e.inner)
                      this.sidebarInner.style[i] = e.inner[i];
                    this.options.resizeSensor &&
                      "undefined" != typeof ResizeSensor &&
                      (ResizeSensor.detach(this.sidebarInner, this.handleEvent),
                      ResizeSensor.detach(this.container, this.handleEvent));
                  },
                },
              ],
              [
                {
                  key: "supportTransform",
                  value: function (e) {
                    var i = !1,
                      t = e ? "perspective" : "transform",
                      n = t.charAt(0).toUpperCase() + t.slice(1),
                      o = document.createElement("support").style;
                    return (
                      (t + " " + ["Webkit", "Moz", "O", "ms"].join(n + " ") + n)
                        .split(" ")
                        .forEach(function (e, t) {
                          if (void 0 !== o[e]) return (i = e), !1;
                        }),
                      i
                    );
                  },
                },
                {
                  key: "eventTrigger",
                  value: function (e, t, i) {
                    try {
                      var n = new CustomEvent(t, { detail: i });
                    } catch (e) {
                      (n = document.createEvent("CustomEvent")).initCustomEvent(
                        t,
                        !0,
                        !0,
                        i
                      );
                    }
                    e.dispatchEvent(n);
                  },
                },
                {
                  key: "extend",
                  value: function (e, t) {
                    var i = {};
                    for (var n in e)
                      void 0 !== t[n] ? (i[n] = t[n]) : (i[n] = e[n]);
                    return i;
                  },
                },
                {
                  key: "offsetRelative",
                  value: function (e) {
                    var t = { left: 0, top: 0 };
                    do {
                      var i = e.offsetTop,
                        n = e.offsetLeft;
                      isNaN(i) || (t.top += i),
                        isNaN(n) || (t.left += n),
                        (e =
                          "BODY" === e.tagName
                            ? e.parentElement
                            : e.offsetParent);
                    } while (e);
                    return t;
                  },
                },
                {
                  key: "addClass",
                  value: function (e, t) {
                    u.hasClass(e, t) ||
                      (e.classList
                        ? e.classList.add(t)
                        : (e.className += " " + t));
                  },
                },
                {
                  key: "removeClass",
                  value: function (e, t) {
                    u.hasClass(e, t) &&
                      (e.classList
                        ? e.classList.remove(t)
                        : (e.className = e.className.replace(
                            new RegExp(
                              "(^|\\b)" + t.split(" ").join("|") + "(\\b|$)",
                              "gi"
                            ),
                            " "
                          )));
                  },
                },
                {
                  key: "hasClass",
                  value: function (e, t) {
                    return e.classList
                      ? e.classList.contains(t)
                      : new RegExp("(^| )" + t + "( |$)", "gi").test(
                          e.className
                        );
                  },
                },
                {
                  key: "defaults",
                  get: function () {
                    return o;
                  },
                },
              ]
            ),
            u);
        function u(e) {
          var t = this,
            i =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          if (
            ((function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, u),
            (this.options = u.extend(o, i)),
            (this.sidebar =
              "string" == typeof e ? document.querySelector(e) : e),
            void 0 === this.sidebar)
          )
            throw new Error("There is no specific sidebar element.");
          (this.sidebarInner = !1),
            (this.container = this.sidebar.parentElement),
            (this.affixedType = "STATIC"),
            (this.direction = "down"),
            (this.support = { transform: !1, transform3d: !1 }),
            (this._initialized = !1),
            (this._reStyle = !1),
            (this._breakpoint = !1),
            (this.dimensions = {
              translateY: 0,
              maxTranslateY: 0,
              topSpacing: 0,
              lastTopSpacing: 0,
              bottomSpacing: 0,
              lastBottomSpacing: 0,
              sidebarHeight: 0,
              sidebarWidth: 0,
              containerTop: 0,
              containerHeight: 0,
              viewportHeight: 0,
              viewportTop: 0,
              lastViewportTop: 0,
            }),
            ["handleEvent"].forEach(function (e) {
              t[e] = t[e].bind(t);
            }),
            this.initialize();
        }
        (e.default = t), (window.StickySidebar = t);
      })(t);
    });
    return (
      e(i),
      e(
        t(function (e, t) {
          (function (e) {
            var t,
              r = (t = e) && t.__esModule ? t : { default: t };
            !(function () {
              if ("undefined" != typeof window) {
                var n = window.$ || window.jQuery || window.Zepto,
                  o = "stickySidebar";
                if (n) {
                  (n.fn.stickySidebar = function (i) {
                    return this.each(function () {
                      var e = n(this),
                        t = n(this).data(o);
                      if (
                        (t ||
                          ((t = new r.default(this, "object" == typeof i && i)),
                          e.data(o, t)),
                        "string" == typeof i)
                      ) {
                        if (
                          void 0 === t[i] &&
                          -1 === ["destroy", "updateSticky"].indexOf(i)
                        )
                          throw new Error('No method named "' + i + '"');
                        t[i]();
                      }
                    });
                  }),
                    (n.fn.stickySidebar.Constructor = r.default);
                  var e = n.fn.stickySidebar;
                  n.fn.stickySidebar.noConflict = function () {
                    return (n.fn.stickySidebar = e), this;
                  };
                }
              }
            })();
          })(i);
        })
      )
    );
  });
