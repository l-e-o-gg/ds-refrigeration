/* (c) 2026 Leo. All rights reserved. Proposal for DS Refrigeration & Catering Ltd. Not licensed for reuse or redistribution. */
/* Equipment range shown in the catalogue.
   Categories come from the current website (dsrefrigerationservices.ie).
   There are no prices on purpose: the business quotes on request.
   To add or edit an item, copy a line and change the fields.
   group: "refrigeration" | "catering" | "air"
   icon: id of an SVG symbol in index.html (see the <symbol> list)
   note: short label shown on the image */
window.EQUIPMENT = [
  { id: "fridges",  group: "refrigeration", name: "Commercial fridges",       blurb: "Reach-in and upright refrigeration for kitchens, bars and shops.", icon: "s-fridge",   note: "New & used" },
  { id: "freezers", group: "refrigeration", name: "Freezers",                 blurb: "Commercial freezers for kitchens, stores and food service.",      icon: "s-freezer",  note: "New & used" },
  { id: "display",  group: "refrigeration", name: "Display refrigeration",    blurb: "Chilled display units that show your products at their best.",    icon: "s-display",  note: "New & used" },
  { id: "bottle",   group: "refrigeration", name: "Bottle coolers",           blurb: "Back-bar coolers for pubs, bars, restaurants and cafés.",         icon: "s-bottle",   note: "New & used" },
  { id: "prep",     group: "refrigeration", name: "Preparation refrigeration", blurb: "Refrigerated counters for fast, safe food preparation.",          icon: "s-prep",     note: "New & used" },
  { id: "ice",      group: "refrigeration", name: "Ice machines",             blurb: "Ice makers for bars, hotels, restaurants and food service.",      icon: "s-ice",      note: "New & used" },
  { id: "coldroom", group: "refrigeration", name: "Cold rooms & walk-ins",    blurb: "Cold-storage solutions and walk-in rooms for larger operations.", icon: "s-coldroom", note: "Supply & fit" },
  { id: "combi",    group: "catering",      name: "Combi ovens",              blurb: "Combi ovens for professional kitchens.",                          icon: "s-combi",    note: "New & second-hand" },
  { id: "cooking",  group: "catering",      name: "Cooking equipment",        blurb: "Commercial ovens, fryers and cooking equipment.",                 icon: "s-cooking",  note: "New & second-hand" },
  { id: "tables",   group: "catering",      name: "Preparation tables",       blurb: "Stainless steel preparation tables for commercial kitchens.",     icon: "s-table",    note: "New & second-hand" },
  { id: "steel",    group: "catering",      name: "Stainless steel fabrication", blurb: "Stainless steel counters and fabricated kitchen work.",        icon: "s-counter",  note: "Made to suit" },
  { id: "split",    group: "air",           name: "Wall-mounted split units", blurb: "Split air conditioning for offices, shops, hospitality and homes.", icon: "s-split",   note: "Supply & fit" },
  { id: "cassette", group: "air",           name: "Ceiling cassette units",   blurb: "Ceiling cassette systems for larger commercial spaces.",          icon: "s-cassette", note: "Supply & fit" }
];
