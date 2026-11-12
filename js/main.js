(function () {
  "use strict";

  var CONTACT = { phone: "087 298 7717", email: "dsrefrigeration.ie@gmail.com" };
  var GROUPS = [
    { id: "all", name: "All equipment" },
    { id: "refrigeration", name: "Refrigeration" },
    { id: "catering", name: "Catering" },
    { id: "air", name: "Air conditioning" }
  ];
  var state = { group: "all", picked: [] };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(id) { return document.getElementById(id); }
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function byId(id) { return window.EQUIPMENT.filter(function (e) { return e.id === id; })[0]; }
  function icon(name) {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><ellipse cx="60" cy="112" rx="34" ry="4.5" fill="rgba(8,32,47,.2)"/><use href="#' + name + '"/></svg>';
  }
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toast.h);
    toast.h = setTimeout(function () { t.classList.remove("on"); }, 1900);
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
      var on = state.picked.indexOf(e.id) >= 0;
      return '<article class="card" style="--i:' + i + '">' +
        '<div class="pic"><span class="tag">' + e.note + "</span>" + icon(e.icon) + "</div>" +
        '<div class="body"><h3>' + e.name + "</h3><p>" + e.blurb + "</p>" +
        '<div class="row"><span class="poa">Price on request</span>' +
        '<button type="button" class="btn small primary' + (on ? " added" : "") + '" data-pick="' + e.id + '">' + (on ? "✓ In enquiry" : "+ Add to enquiry") + "</button></div></div></article>";
    }).join("");
  }

  /* Enquiry list */
  function syncPicked(bump) {
    var n = state.picked.length;
    var badge = $("enq-n");
    badge.hidden = n === 0;
    badge.textContent = n;
    if (bump) { badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump"); }
    all("[data-pick]").forEach(function (b) {
      var on = state.picked.indexOf(b.getAttribute("data-pick")) >= 0;
      b.classList.toggle("added", on);
      b.textContent = on ? "✓ In enquiry" : "+ Add to enquiry";
    });
    $("picked").innerHTML = n ? state.picked.map(function (id) {
      var e = byId(id);
      return '<span class="pk">' + e.name + '<button type="button" data-unpick="' + id + '" aria-label="Remove ' + e.name + '">×</button></span>';
    }).join("") : '<span class="empty">Nothing added yet. Pick equipment above, or just describe what you need.</span>';
  }

  function toggle(id) {
    var i = state.picked.indexOf(id);
    if (i >= 0) { state.picked.splice(i, 1); toast("Removed from your enquiry"); }
    else { state.picked.push(id); toast("Added to your enquiry"); }
    syncPicked(i < 0);
  }

  /* Events */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("button");
    if (!t) return;
    if (t.hasAttribute("data-group")) {
      state.group = t.getAttribute("data-group");
      renderChips();
      renderGrid();
      syncPicked(false);
    } else if (t.hasAttribute("data-pick")) {
      toggle(t.getAttribute("data-pick"));
    } else if (t.hasAttribute("data-unpick")) {
      toggle(t.getAttribute("data-unpick"));
    }
  });

  $("enq-btn").addEventListener("click", function () {
    $("contact").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  });

  $("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var items = state.picked.map(function (id) { return byId(id).name; });
    var lines = [
      "Name: " + f.elements.name.value,
      "Business: " + f.elements.business.value,
      "Phone: " + f.elements.phone.value,
      "Email: " + f.elements.email.value,
      "Enquiry type: " + f.elements.type.value,
      "Equipment: " + (items.length ? items.join(", ") : "—"),
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
  var sectors = ["Restaurants", "Hotels", "Bars", "Cafés", "Shops", "Takeaways", "Commercial kitchens", "Hospitals"];
  var row = sectors.map(function (s) { return "<span>" + s + "</span>"; }).join("");
  mq.innerHTML = row;
  $("year").textContent = new Date().getFullYear();
  renderChips();
  renderGrid();
  syncPicked(false);
})();
