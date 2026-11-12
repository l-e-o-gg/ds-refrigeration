/* (c) 2026 Leo. All rights reserved. Proposal for DS Refrigeration & Catering Ltd. Not licensed for reuse or redistribution. */
(function () {
  "use strict";

  var CONTACT = { phone: "087 298 7717", email: "dsrefrigeration.ie@gmail.com" };
  var GROUPS = [
    { id: "all", name: "All equipment" },
    { id: "refrigeration", name: "Refrigeration" },
    { id: "catering", name: "Catering" },
    { id: "air", name: "Air conditioning" }
  ];
  var state = { group: "all" };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) { return document.getElementById(id); }
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function icon(name) {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="112" rx="34" ry="4.5" fill="rgba(8,32,47,.2)"/><use href="#' + name + '"/></svg>';
  }

  /* Catalogue */
  function renderChips() {
    $("chips").innerHTML = GROUPS.map(function (g) {
      return '<button type="button" class="chip" data-group="' + g.id + '" aria-pressed="' + (state.group === g.id) + '">' + g.name + "</button>";
    }).join("");
  }

  function renderGrid() {
    var list = window.EQUIPMENT.filter(function (e) { return state.group === "all" || e.group === state.group; });
    $("grid").innerHTML = list.map(function (e, i) {
      return '<article class="card" style="--i:' + i + '">' +
        '<div class="pic">' + icon(e.icon) + "</div>" +
        '<div class="body"><h3>' + e.name + "</h3><p>" + e.blurb + "</p>" +
        '<div class="row"><span class="poa">Price on request</span>' +
        '<a class="btn small primary" href="#contact">Request a quote</a></div></div></article>';
    }).join("");
  }

  /* Events */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    if (t.hasAttribute("data-group")) {
      state.group = t.getAttribute("data-group");
      renderChips();
      renderGrid();
    }
  });

  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var lines = [
      "Name: " + f.elements.name.value,
      "Business: " + f.elements.business.value,
      "Phone: " + f.elements.phone.value,
      "Email: " + f.elements.email.value,
      "Enquiry type: " + f.elements.type.value,
      "",
      f.elements.message.value
    ];
    var href = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Website enquiry: " + f.elements.type.value) + "&body=" + encodeURIComponent(lines.join("\n"));
    $("ok").classList.add("on");
    /* This draft has no server. In production, post the form to a service (e.g. Formspree) or to the host's form handler. */
    try { window.location.href = href; } catch (err) { /* ignore */ }
  });

  window.addEventListener("scroll", function () {
    $("top").classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  /* Mobile menu */
  var mb = $("menu-btn"), nv = $("nav-main");
  mb.addEventListener("click", function () {
    var on = nv.classList.toggle("open");
    mb.setAttribute("aria-expanded", on ? "true" : "false");
  });
  nv.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nv.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }
  });

  /* Init */
  var mq = $("mq");
  var sectors = ["Restaurants", "Hotels", "Bars", "Cafés", "Takeaways", "Commercial kitchens"];
  var row = sectors.map(function (s) { return "<span>" + s + "</span>"; }).join("");
  mq.innerHTML = row;
  $("year").textContent = new Date().getFullYear();
  renderChips();
  renderGrid();
})();
