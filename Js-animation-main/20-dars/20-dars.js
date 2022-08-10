// battery icon
const battery = document.querySelector("#battery");

// envelope icon
const envelope = document.querySelector("#envelope");

// heart icon
const  heart = document.querySelector("#heart");

// hourglass icon
const hourglass = document.querySelector("#hourglass");

// lock icon
const lock = document.querySelector("#lock");

// minus icon
const minus = document.querySelector("#minus");

// play icon
const play = document.querySelector("#play");

// thermometer icon
const thermometer = document.querySelector("#thermometer");

// toggle icon
const toggle = document.querySelector("#toggle");

// volume icon
const volume = document.querySelector("#volume");

// batterycharge animation
function chargeBattery() {
  battery.innerHTML = "&#xf244;";

  setTimeout(function() {
    battery.innerHTML = "&#xf243;";
  }, 1000);

  setTimeout(function() {
    battery.innerHTML = "&#xf242;";
  }, 2000);

  setTimeout(function() {
    battery.innerHTML = "&#xf241;";
  }, 3000);

  setTimeout(function() {
    battery.innerHTML = "&#xf240;";
  }, 4000);

  setInterval(chargeBattery, 5000);
};

// Call the charge battery function
chargeBattery();

// ----------------------------------------------------------------------------------------

// envelope open-close animation
function envelopeOpen() {
  envelope.innerHTML = "&#xf003;";

  setTimeout(function() {
    envelope.innerHTML = "&#xf2b7;";
  }, 1000);

  setInterval(envelopeOpen, 2000);
};

// Call the envelope open function
envelopeOpen();

// ----------------------------------------------------------------------------------------

// heart animation
function heartBlink() {
  heart.innerHTML = "&#xf08a;";

  setTimeout(function() {
    heart.innerHTML = "&#xf004;";
  }, 1000);

  setInterval(heartBlink, 2000);
};

// Call the heart function
heartBlink();

// ----------------------------------------------------------------------------------------

// hourglass animation
function glass() {
  hourglass.innerHTML = "&#xf251;";

  setTimeout(function() {
    hourglass.innerHTML = "&#xf252;";
  }, 1000);

  setTimeout(function() {
    hourglass.innerHTML = "&#xf253;";
  }, 2000);

  setInterval(glass, 3000);
}

// Call the glass function
glass();

// ----------------------------------------------------------------------------------------

// lock animation
function lockOpen() {
  lock.innerHTML = "&#xf023;";

  setTimeout(function() {
    lock.innerHTML = "&#xf13e;";
  }, 1000);

  setInterval(lockOpen, 2000);
}

// Call lockOpen function
lockOpen();

// ----------------------------------------------------------------------------------------

// minusPlus animation
function minusPlus() {
  minus.innerHTML = "&#xf068;";

  setTimeout(function() {
    minus.innerHTML = "&#xf067;";
  }, 1000);

  setInterval(minusPlus, 2000);
}

// Call minusPlus function
minusPlus();

// ----------------------------------------------------------------------------------------

// play animation
function playStart() {
  play.innerHTML = "&#xf04d;";

  setTimeout(function() {
    play.innerHTML = "&#xf04b;";
  }, 1000);

  setTimeout(function() {
    play.innerHTML = "&#xf04c;";
  }, 2000);

  setInterval(playStart, 3000);
}

// Call playStart function
playStart();

// ----------------------------------------------------------------------------------------

// thermometer temperature animation
function temperature() {
  thermometer.innerHTML = "&#xf2cb;";

  setTimeout(function() {
    thermometer.innerHTML = "&#xf2ca;";
  }, 1000);

  setTimeout(function() {
    thermometer.innerHTML = "&#xf2c9;";
  }, 2000);

  setTimeout(function() {
    thermometer.innerHTML = "&#xf2c8;";
  }, 3000);

  setTimeout(function() {
    thermometer.innerHTML = "&#xf2c7;";
  }, 4000);

  setInterval(temperature, 5000);
}

// Call temperature function
temperature();

// ----------------------------------------------------------------------------------------

// switch toggle animation
function switchToggle() {
  toggle.innerHTML = "&#xf204;";

  setTimeout(function() {
    toggle.innerHTML = "&#xf205;";
  }, 1000);

  setInterval(switchToggle, 2000);
}

// Call minusPlus function
switchToggle();

// ----------------------------------------------------------------------------------------

// switch toggle animation
function switchToggle() {
  toggle.innerHTML = "&#xf204;";

  setTimeout(function() {
    toggle.innerHTML = "&#xf205;";
  }, 1000);

  setInterval(switchToggle, 2000);
}

// Call minusPlus function
switchToggle();

// ----------------------------------------------------------------------------------------

// volume animation
function changeVolume() {
  volume.innerHTML = "&#xf026;";

  setTimeout(function() {
    volume.innerHTML = "&#xf027;";
  }, 1000);

  setTimeout(function() {
    volume.innerHTML = "&#xf028;";
  }, 2000);

  setInterval(changeVolume, 3000);
}

// Call minusPlus function
changeVolume();

// ----------------------------------------------------------------------------------------
