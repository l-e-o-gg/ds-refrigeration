/* (c) 2026 Leo. All rights reserved. Opening-hours indicator (Europe/Dublin, Mon to Fri 09:00 to 17:00). */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  /* ---------- Open now (Europe/Dublin) ---------- */
  function openState() {
    var parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Dublin", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var day = o.weekday, mins = parseInt(o.hour, 10) % 24 * 60 + parseInt(o.minute, 10);
    var wk = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day) > -1;
    if (wk && mins >= 540 && mins < 1020) return { on: true, txt: "Office open now · until 17:00" };
    var next = (day === "Fri" && mins >= 1020) || day === "Sat" || day === "Sun" ? "Monday 09:00" : (wk && mins < 540 ? "today 09:00" : "tomorrow 09:00");
    return { on: false, txt: "Office closed · reopens " + next };
  }
  function paintOpen() {
    var s = openState(), el = $("open-pill");
    if (!el) return;
    el.className = "open-pill " + (s.on ? "on" : "off");
    el.querySelector("span").textContent = s.txt;
  }
  paintOpen(); setInterval(paintOpen, 60000);

})();
