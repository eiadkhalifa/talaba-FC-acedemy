/* Talaba-FC Academy — visitor-facing behaviour, not decoration */

var kitLocked = false;

function highlightKit(kitName, price, note) {
  var box = document.getElementById("kit-info");
  if (!box) {
    return;
  }
  kitLocked = false;
  box.innerHTML =
    "<strong>" +
    kitName +
    "</strong> — " +
    price +
    ". " +
    note;
}

function resetKit() {
  var box = document.getElementById("kit-info");
  if (!box || kitLocked) {
    return;
  }
  box.innerHTML =
    "Hover over a kit to see sizes, price and when it is worn. Click a kit to keep that information on screen.";
}

function lockKit(kitName, price, note) {
  highlightKit(kitName, price, note);
  kitLocked = true;
}

function showNextTrial() {
  var banner = document.getElementById("trial-banner");
  if (!banner) {
    return;
  }
  banner.innerHTML =
    "Next open trial: <strong>Saturday 7 November 2026, 09:30–11:00</strong> at Riverside Sports Ground. Bring boots, shin pads and a water bottle. Places are limited to 24 players.";
}

function pickSession(button, summary) {
  var slots = document.getElementsByClassName("session-slot");
  var i;
  for (i = 0; i < slots.length; i = i + 1) {
    slots[i].className = "session-slot";
  }
  button.className = "session-slot picked";

  var info = document.getElementById("session-choice");
  if (info) {
    info.innerHTML = "You have selected: <strong>" + summary + "</strong>. Use the Contact page to book this slot.";
  }
}

function suggestGroup() {
  var ageBox = document.getElementById("age");
  var hint = document.getElementById("age-hint");
  if (!ageBox || !hint) {
    return;
  }

  var age = Number(ageBox.value);
  if (ageBox.value === "") {
    hint.textContent = "Enter an age between 8 and 18.";
    return;
  }
  if (age < 8 || age > 18) {
    hint.textContent = "Talaba-FC takes players from 8 to 18 only.";
    return;
  }
  if (age <= 10) {
    hint.textContent = "That age sits in Foundations (U8–U10).";
  } else if (age <= 13) {
    hint.textContent = "That age sits in Development (U11–U13).";
  } else if (age <= 16) {
    hint.textContent = "That age sits in Performance (U14–U16).";
  } else {
    hint.textContent = "That age sits in Pathway (U17–U18).";
  }
}

function setError(id, message) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = message;
  }
}

function validateForm() {
  var nameValue = document.getElementById("fullname").value.trim();
  var emailValue = document.getElementById("email").value.trim();
  var ageValue = document.getElementById("age").value.trim();
  var pathwayValue = document.getElementById("pathway").value;
  var messageValue = document.getElementById("message").value.trim();
  var weekday = document.getElementById("session-weekday");
  var saturday = document.getElementById("session-saturday");
  var status = document.getElementById("form-status");
  var ok = true;

  setError("err-fullname", "");
  setError("err-email", "");
  setError("err-age", "");
  setError("err-pathway", "");
  setError("err-session", "");
  setError("err-message", "");
  status.textContent = "";
  status.className = "";

  if (nameValue === "") {
    setError("err-fullname", "Please enter the player or parent name.");
    ok = false;
  } else if (nameValue.length < 3) {
    setError("err-fullname", "Name must be at least 3 characters.");
    ok = false;
  }

  if (emailValue === "") {
    setError("err-email", "Please enter an email address so we can reply.");
    ok = false;
  }

  if (ageValue === "") {
    setError("err-age", "Please enter the player's age.");
    ok = false;
  } else {
    var ageNumber = Number(ageValue);
    if (ageNumber < 8 || ageNumber > 18) {
      setError("err-age", "Age must be between 8 and 18.");
      ok = false;
    }
  }

  if (pathwayValue === "") {
    setError("err-pathway", "Please choose a training group.");
    ok = false;
  }

  if (!weekday.checked && !saturday.checked) {
    setError("err-session", "Please choose a preferred session.");
    ok = false;
  }

  if (messageValue === "") {
    setError("err-message", "Please tell us a little about the player.");
    ok = false;
  }

  if (!ok) {
    status.textContent = "Check the highlighted fields, then try again.";
    return false;
  }

  status.className = "ok";
  status.textContent =
    "Thanks, " +
    nameValue +
    ". Your enquiry has been checked and is ready to send. A coach will reply to " +
    emailValue +
    " within two working days.";
  return false;
}
