!function (e, n) {
    "use strict";

    function t(e) {
        for (var n = e; n;) {
            if (n.className && n.className.indexOf("hljs-ln-code") !== -1) return !0;
            n = n.parentNode
        }
        return !1
    }

    function r(e) {
        for (var n = e; "TABLE" !== n.nodeName;) n = n.parentNode;
        return n
    }

    function o(e) {
        for (var n = e.toString(), t = e.anchorNode; "TD" !== t.nodeName;) t = t.parentNode;
        for (var o = e.focusNode; "TD" !== o.nodeName;) o = o.parentNode;
        var a = parseInt(t.dataset.lineNumber), i = parseInt(o.dataset.lineNumber);
        if (a != i) {
            var l = t.textContent, s = o.textContent;
            if (a > i) {
                var c = a;
                a = i, i = c, c = l, l = s, s = c
            }
            for (; 0 !== n.indexOf(l);) l = l.slice(1);
            for (; n.lastIndexOf(s) === -1;) s = s.slice(0, -1);
            for (var d = l, u = r(t), f = a + 1; f < i; ++f) {
                var h = m('.{0}[{1}="{2}"]', [b, T, f]), v = u.querySelector(h);
                d += "\n" + v.textContent
            }
            return d += "\n" + s
        }
        return n
    }

    function a() {
        var e = n.createElement("style");
        e.type = "text/css", e.innerHTML = m(".{0}{border-collapse:collapse}.{0} td{padding:0}.{1}:before{content:attr({2})}", [N, y, T]), n.getElementsByTagName("head")[0].appendChild(e)
    }

    function i(t) {
        "interactive" === n.readyState || "complete" === n.readyState ? l(t) : e.addEventListener("DOMContentLoaded", function () {
            l(t)
        })
    }

    function l(t) {
        try {
            var r = n.querySelectorAll("code.hljs,code.nohighlight");
            for (var o in r) r.hasOwnProperty(o) && s(r[o], t)
        } catch (a) {
            e.console.error("LineNumbers error: ", a)
        }
    }

    function s(e, n) {
        "object" == typeof e && g(function () {
            e.innerHTML = d(e, n)
        })
    }

    function c(e, n) {
        if ("string" == typeof e) {
            var t = document.createElement("code");
            return t.innerHTML = e, d(t, n)
        }
    }

    function d(e, n) {
        n = n || {singleLine: !1};
        var t = n.singleLine ? 0 : 1;
        return f(e), u(e.innerHTML, t)
    }

    function u(e, n) {
        var t = v(e);
        if ("" === t[t.length - 1].trim() && t.pop(), t.length > n) {
            for (var r = "", o = 0, a = t.length; o < a; o++) r += m('<tr><td class="{0} {1}" {3}="{5}"><div class="{2}" {3}="{5}"></div></td><td class="{0} {4}" {3}="{5}">{6}</td></tr>', [L, j, y, T, b, o + 1, t[o].length > 0 ? t[o] : " "]);
            return m('<table class="{0}">{1}</table>', [N, r])
        }
        return e
    }

    function f(e) {
        var n = e.childNodes;
        for (var t in n) if (n.hasOwnProperty(t)) {
            var r = n[t];
            p(r.textContent) > 0 && (r.childNodes.length > 0 ? f(r) : h(r.parentNode))
        }
    }

    function h(e) {
        var n = e.className;
        if (/hljs-/.test(n)) {
            for (var t = v(e.innerHTML), r = 0, o = ""; r < t.length; r++) {
                var a = t[r].length > 0 ? t[r] : " ";
                o += m('<span class="{0}">{1}</span>\n', [n, a])
            }
            e.innerHTML = o.trim()
        }
    }

    function v(e) {
        return 0 === e.length ? [] : e.split(x)
    }

    function p(e) {
        return (e.trim().match(x) || []).length
    }

    function g(n) {
        e.setTimeout(n, 0)
    }

    function m(e, n) {
        return e.replace(/\{(\d+)\}/g, function (e, t) {
            return n[t] ? n[t] : e
        })
    }

    var N = "hljs-ln", L = "hljs-ln-line", b = "hljs-ln-code", j = "hljs-ln-numbers", y = "hljs-ln-n",
        T = "data-line-number", x = /\r\n|\r|\n/g;
    e.hljs ? (e.hljs.initLineNumbersOnLoad = i, e.hljs.lineNumbersBlock = s, e.hljs.lineNumbersValue = c, a()) : e.console.error("highlight.js not detected!"), document.addEventListener("copy", function (e) {
        var n = window.getSelection();
        if (t(n.anchorNode)) {
            var r;
            r = window.navigator.userAgent.indexOf("Edge") !== -1 ? o(n) : n.toString(), e.clipboardData.setData("text/plain", r), e.preventDefault()
        }
    })
}(window, document);