/* =====================================================================
   CLARENCE THUNDER - SIGNUP TRACKER (Google Apps Script)
   ---------------------------------------------------------------------
   Turns a Google Sheet into the tracker for website form signups.
   Setup (one time, ~5 min) - full steps in the site README, "Tracking signups":
     1. New Google Sheet -> Extensions -> Apps Script -> paste this file, save.
     2. Run the `setup` function once and approve permissions.
     3. Deploy -> New deployment -> Web app (Execute as: Me, Access: Anyone).
     4. Paste the web app URL into siteConfig.sheetEndpoint in assets/js/data.js.
   ===================================================================== */

// Email a note for every signup? Leave "" if Formspree already emails you.
var NOTIFY_EMAIL = "";
var TICKET_PRICE = 20;

// Columns for the wine tasting signups. The last three are filled in by hand.
var WINE_HEADERS = [
  "Submitted", "Name", "Email", "Phone", "Tickets", "Total Due",
  "Payment (as submitted)", "Guest Names", "Notes", "Paid?", "Amount Received", "Checked In"
];
var CHECKBOX_COLS = ["Paid?", "Checked In"];

/* ---------- run once ---------- */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = tab_(ss, "wine-tasting");
  var summary = ss.getSheetByName("Summary") || ss.insertSheet("Summary", 0);
  summary.clear();
  var rows = [
    ["Wine Tasting at Addy's - live totals", ""],
    ["", ""],
    ["Signups",            "=COUNTA('wine-tasting'!B2:B)"],
    ["Tickets sold",       "=SUM('wine-tasting'!E2:E)"],
    ["Money expected",     "=SUM('wine-tasting'!F2:F)"],
    ["Signups marked paid","=COUNTIF('wine-tasting'!J2:J,TRUE)"],
    ["Money received",     "=SUM('wine-tasting'!K2:K)"],
    ["Still outstanding",  "=B5-B7"],
    ["Checked in",         "=COUNTIF('wine-tasting'!L2:L,TRUE)"],
    ["", ""],
    ["Ticket price", TICKET_PRICE]
  ];
  summary.getRange(1, 1, rows.length, 2).setValues(rows);
  summary.getRange("A1").setFontWeight("bold").setFontSize(14);
  summary.getRange("A3:A11").setFontWeight("bold");
  summary.getRange("B5:B8").setNumberFormat("$#,##0");
  summary.getRange("B11").setNumberFormat("$#,##0");
  summary.setColumnWidth(1, 220);
  summary.setColumnWidth(2, 120);
  SpreadsheetApp.flush();
  Logger.log("Ready. Now deploy as a web app and paste the URL into data.js.");
}

/* ---------- the website POSTs here ---------- */
function doPost(e) {
  var p = (e && e.parameter) || {};
  var form = String(p.form || "other").replace(/[^a-z0-9-]/gi, "").toLowerCase() || "other";
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = tab_(ss, form);
    var row;
    if (form === "wine-tasting") {
      var tickets = parseInt(p.tickets, 10) || 0;
      row = [
        new Date(), p.name || "", p.email || "", p.phone || "", tickets, tickets * TICKET_PRICE,
        p.payment || "", p.guest_names || "", p.notes || "", false, "", false
      ];
      // "Already paid" is self-reported - leave Paid? unticked until the treasurer confirms.
    } else {
      // Generic form: one column per field, in the order they arrived.
      var headers = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0];
      var keys = Object.keys(p).filter(function (k) { return k !== "form" && k !== "page"; });
      keys.forEach(function (k) { if (headers.indexOf(k) < 0) { headers.push(k); } });
      if (headers[0] !== "Submitted") headers.unshift("Submitted");
      sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
      row = headers.map(function (h) { return h === "Submitted" ? new Date() : (p[h] || ""); });
    }
    sh.appendRow(row);
    var r = sh.getLastRow();
    sh.getRange(r, 1).setNumberFormat("M/d/yyyy h:mm am/pm");
    if (form === "wine-tasting") {
      sh.getRange(r, 10).insertCheckboxes();
      sh.getRange(r, 12).insertCheckboxes();
      sh.getRange(r, 6).setNumberFormat("$#,##0");
      sh.getRange(r, 11).setNumberFormat("$#,##0");
    }
    notify_(form, p, row);
    return json_({ ok: true, row: r });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the URL in a browser just confirms it's alive.
function doGet() {
  return ContentService.createTextOutput("Clarence Thunder signup tracker is running.");
}

/* ---------- helpers ---------- */
function tab_(ss, name) {
  var sh = ss.getSheetByName(name);
  if (sh) return sh;
  sh = ss.insertSheet(name);
  if (name === "wine-tasting") {
    sh.getRange(1, 1, 1, WINE_HEADERS.length).setValues([WINE_HEADERS]).setFontWeight("bold");
    sh.setFrozenRows(1);
    sh.setColumnWidths(1, 1, 150);
    sh.setColumnWidths(2, 2, 170);
    sh.setColumnWidths(8, 2, 240);
    sh.getRange("J1:L1").setBackground("#FFF3C4");
  } else {
    sh.getRange(1, 1).setValue("Submitted").setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify_(form, p, row) {
  if (!NOTIFY_EMAIL) return;
  var subject, body;
  if (form === "wine-tasting") {
    subject = "Wine Tasting signup - " + (p.name || "?") + " - " + row[4] + " ticket(s) ($" + row[5] + ")";
    body = "Name: " + p.name + "\nEmail: " + p.email + "\nPhone: " + (p.phone || "-") +
      "\nTickets: " + row[4] + "  ($" + row[5] + ")\nPayment: " + (p.payment || "-") +
      "\nGuests: " + (p.guest_names || "-") + "\nNotes: " + (p.notes || "-") +
      "\n\nSheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl();
  } else {
    subject = "Website form: " + form;
    body = Object.keys(p).map(function (k) { return k + ": " + p[k]; }).join("\n");
  }
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
