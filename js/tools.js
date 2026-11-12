/* DS Refrigeration & Catering: interactive tools. (c) Leo. All rights reserved. Indicative guidance only. */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var PHONE = "087 298 7717";

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

  /* ---------- Tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tabs [role=tab]"));
  function selectTab(t) {
    tabs.forEach(function (b) {
      var on = b === t;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
      $(b.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(function (b, i) {
    b.addEventListener("click", function () { selectTab(b); });
    b.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      var n = tabs[(i + d + tabs.length) % tabs.length]; selectTab(n); n.focus();
    });
  });

  /* ---------- Send to enquiry form ---------- */
  function sendToForm(type, text) {
    var sel = $("f-type"), msg = $("f-message");
    if (sel) for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text.indexOf(type) === 0) sel.selectedIndex = i;
    if (msg) msg.value = (msg.value ? msg.value + "\n\n" : "") + text;
    var c = $("contact"); if (c) c.scrollIntoView({ behavior: "smooth" });
    setTimeout(function () { var n = $("f-name"); if (n) n.focus({ preventScroll: true }); }, 600);
  }

  /* ---------- 1. Cold room sizer ---------- */
  var SIZES = [[1.2,1.2],[1.5,1.2],[1.5,1.5],[1.8,1.5],[1.8,1.8],[2.4,1.8],[2.4,2.4],[3.0,2.4],[3.0,3.0],[3.6,3.0],[4.2,3.0]];
  var H = 2.0, DENS = { chilled: 160, frozen: 220 };
  var roomLast = "";
  function room() {
    var kind = document.querySelector("input[name=rk]:checked").value;
    var kg = parseInt($("rkg").value, 10);
    $("rkg-v").textContent = kg.toLocaleString("en-IE") + " kg";
    var need = kg / DENS[kind], pick = null;
    for (var i = 0; i < SIZES.length; i++) { if (SIZES[i][0] * SIZES[i][1] * H >= need) { pick = SIZES[i]; break; } }
    var big = !pick; if (big) pick = SIZES[SIZES.length - 1];
    var vol = pick[0] * pick[1] * H, cap = Math.round(vol * DENS[kind] / 10) * 10;
    var label = big ? "Custom, larger than 4.2 × 3.0 m" : pick[0].toFixed(1) + " × " + pick[1].toFixed(1) + " m";
    $("room-size").innerHTML = label + " <small>internal footprint</small>";
    $("room-vol").textContent = vol.toFixed(1) + " m³";
    $("room-cap").textContent = "≈ " + cap.toLocaleString("en-IE") + " kg";
    $("room-temp").textContent = kind === "chilled" ? "0 to 4 °C" : "−18 to −22 °C";
    var r = document.querySelector("#plan .room"), s = 36;
    var w = pick[0] * s, d = pick[1] * s, x = (180 - w) / 2 + 10, y = (130 - d) / 2 + 4;
    r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", w); r.setAttribute("height", d);
    var dr = document.querySelector("#plan .door"); dr.setAttribute("x", x + w * .5 - 10); dr.setAttribute("y", y + d - 2);
    var ev = document.querySelector("#plan .evap"); ev.setAttribute("x", x + 6); ev.setAttribute("y", y + 6); ev.setAttribute("width", Math.min(w - 12, 34));
    $("plan-w").setAttribute("x", 100); $("plan-w").setAttribute("y", y + d + 24); $("plan-w").textContent = pick[0].toFixed(1) + " m";
    $("plan-d").setAttribute("x", x + w + 10); $("plan-d").setAttribute("y", y + d / 2 + 4); $("plan-d").textContent = pick[1].toFixed(1) + " m";
    $("room-notes").innerHTML = (kind === "frozen" ? "<li>Frozen rooms need an insulated floor or floor protection against frost heave.</li>" : "<li>A chilled room normally uses a medium-temperature system.</li>") +
      "<li>Internal height assumed " + H.toFixed(1) + " m. Panel thickness, door type and shelving are set at survey.</li>" +
      (big ? "<li>This stock level needs a custom design. We will survey it with you.</li>" : "");
    roomLast = "Cold room enquiry (from website sizer): " + (kind === "chilled" ? "chilled" : "frozen") + ", around " + kg + " kg of stock. Suggested size: " + label + " internal, about " + vol.toFixed(1) + " m³.";
  }
  ["rk", "rkg"].forEach(function (n) {
    Array.prototype.forEach.call(document.getElementsByName(n).length ? document.getElementsByName(n) : [$(n)], function (el) { el.addEventListener("input", room); });
  });
  $("room-go").addEventListener("click", function () { sendToForm("Commercial Refrigeration", roomLast); });
  room();

  /* ---------- 2. F-Gas check ---------- */
  var FG = {
    hi: { b: "Review recommended", c: "hi", t: "Your equipment is likely to be affected by the F-Gas rules. High-GWP refrigerants are being phased down, which can mean limited or costly servicing gas and a case for planned replacement." },
    md: { b: "Worth checking", c: "md", t: "Your equipment may be affected over the coming years. A quick check now helps you plan servicing and avoid a forced replacement." },
    lo: { b: "Low concern", c: "lo", t: "Your equipment appears to use a lower-impact refrigerant or is relatively new. Keep servicing records up to date." },
    na: { b: "Need to check", c: "na", t: "We cannot tell from this. The refrigerant is printed on the equipment nameplate, and we can read it for you." }
  };
  function fgas() {
    var g = function (n) { var e = document.querySelector("input[name=" + n + "]:checked"); return e ? e.value : ""; };
    var gas = g("fg-gas"), age = g("fg-age"), log = g("fg-log");
    var lvl = "na";
    if (gas === "high") lvl = "hi";
    else if (gas === "mid") lvl = age === "old" ? "md" : "lo";
    else if (gas === "nat") lvl = "lo";
    else if (gas === "unk") lvl = "na";
    var items = [];
    if (gas === "high") items.push("R404A and R507 have a very high global warming potential. They are the most exposed gases under the EU rules.");
    if (gas === "mid") items.push("Gases such as R134a, R407A/F and R410A are being phased down, so supply tightens over time.");
    if (age === "old") items.push("Older equipment is more likely to leak and to need a decision on repair versus replacement.");
    if (log === "no" || log === "unk") items.push("Larger systems need regular leak checks with records kept. Ask us to confirm what applies to yours.");
    items.push("Only F-Gas certified engineers may service this equipment. DS is F-Gas registered.");
    var o = FG[lvl];
    $("fg-res").innerHTML = '<span class="badge ' + o.c + '">' + o.b + '</span><p>' + o.t + '</p><ul>' + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + '</ul><button type="button" class="btn primary" id="fg-go">Book a compliance check</button><p class="disc">General guidance only, not legal advice. Rules depend on the refrigerant, charge size and equipment type.</p>';
    $("fg-go").addEventListener("click", function () {
      sendToForm("Other Enquiry", "F-Gas compliance check request. Equipment type: " + g("fg-type") + "; refrigerant: " + document.querySelector("input[name=fg-gas]:checked").parentNode.textContent.trim() + "; age: " + document.querySelector("input[name=fg-age]:checked").parentNode.textContent.trim() + ".");
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll("#panel-fgas input"), function (i) { i.addEventListener("change", fgas); });
  fgas();

  /* ---------- 3. Equipment down? ---------- */
  var FT = {
    nocool: ["Not cooling / too warm", ["Check the unit has power and the plug or isolator is on.", "Check the thermostat or controller has not been knocked or reset.", "Make sure doors are fully closed and seals are not torn.", "Clear anything blocking air vents inside, and check the condenser grille is not blocked by dust or boxes."]],
    freeze: ["Freezing food / too cold", ["Check the thermostat setting is correct.", "Make sure products are not pressed against the back wall or the air outlet.", "Look for a stuck door switch or a probe moved out of position."]],
    ice: ["Ice or frost build-up", ["Check the door is closing properly and seals are intact.", "Avoid leaving the door open during stock handling.", "If frost is heavy on the coil, the defrost may have failed. Switch off and let it thaw, but expect it to return."]],
    water: ["Water leaking", ["Check the drain outlet or tray is not blocked.", "Make sure the unit is level.", "Wipe up the water so nobody slips."]],
    noise: ["Noisy or running non-stop", ["Check nothing is touching the unit or the fan guard.", "Check condenser grille and surrounding space are clear for airflow.", "A very hot room makes units run continuously, so check ventilation."]],
    ice_m: ["Ice machine not making ice", ["Check the water supply is on and the filter is not blocked.", "Check the bin is not full and the unit has power.", "Switch off for a few minutes and restart once."]],
    alarm: ["Controller alarm or error code", ["Note the code shown on the display.", "Switch off at the wall for a minute, then restart once.", "Do not repeat resets. Tell us the code when you call."]]
  };
  function fault() {
    var k = $("ft-sym").value, o = FT[k];
    $("ft-res").innerHTML = '<span class="badge na">Quick checks</span><ul>' + o[1].map(function (i) { return "<li>" + i + "</li>"; }).join("") + '</ul><p class="disc">Never open electrical panels or handle refrigerant. Switch off at the wall before cleaning. Chilled food should stay at 5 °C or below, so if stock is at risk, call now.</p><div class="sos-big"><div><small>Still not working? Emergency call-out</small><a class="num" href="tel:+353872987717">' + PHONE + '</a></div><a class="btn alert" href="tel:+353872987717">Call now</a></div>';
  }
  $("ft-sym").addEventListener("change", fault);
  fault();
})();
