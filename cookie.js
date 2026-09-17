
let count = 0;
let cookiesPerSecond = 0;

let clickCount = 0;
let specialCoins = 100;


// ==========================
// FABRIEK PRIJZEN
// ==========================

let upgradePrice = 10;
let michealJacksonPrice = 100;
let rKellyPrice = 1000;


// ==========================
// AANTAL FABRIEKEN
// ==========================

let epsteinCount = 0;
let michealJacksonCount = 0;
let rKellyCount = 0;


// ==========================
// PRODUCTIE PER FABRIEK
// ==========================

let epsteinProduction = 1;
let michealJacksonProduction = 10;
let rKellyProduction = 50;


// ==========================
// SPECIALE UPGRADE PRIJZEN
// ==========================

let epsteinUpgradePrice = 2;
let michealUpgradePrice = 4;
let rKellyUpgradePrice = 6;


// ==========================
// AANTAL SPECIALE UPGRADES
// ==========================

let epsteinUpgradeCount = 0;
let michealUpgradeCount = 0;
let rKellyUpgradeCount = 0;


// ==========================
// ALGEMENE UPGRADES
// ==========================

let goldenCount = 0;
let superCount = 0;


// ==========================
// HTML ELEMENTEN
// ==========================

const button = document.getElementById("cookie");
const counter = document.getElementById("counter");
const cpsDisplay = document.getElementById("cps");

const upgrade = document.getElementById("epstein");

const michealJacksonUpgrade =
    document.getElementById("micheal-jackson");

const rKellyUpgrade =
    document.getElementById("r-kelly");

const specialCoinsDisplay =
    document.getElementById("special-coins");

const clickCountDisplay =
    document.getElementById("click-count");

const epsteinCountDisplay =
    document.getElementById("epstein-count");

const michealCountDisplay =
    document.getElementById("micheal-count");

const rKellyCountDisplay =
    document.getElementById("r-kelly-count");

const specialUpgrade =
    document.getElementById("special-upgrade");

const specialUpgrade2 =
    document.getElementById("special-upgrade-2");

const goldenCountDisplay =
    document.getElementById("golden-count");

const superCountDisplay =
    document.getElementById("super-count");


// Fabriek upgrades
const epsteinUpgradeButton =
    document.getElementById("epstein-upgrade");

const michealUpgradeButton =
    document.getElementById("micheal-upgrade");

const rKellyUpgradeButton =
    document.getElementById("r-kelly-upgrade");


// Productie displays
const epsteinCpsDisplay =
    document.getElementById("epstein-cps");

const michealCpsDisplay =
    document.getElementById("micheal-cps");

const rKellyCpsDisplay =
    document.getElementById("r-kelly-cps");


// Upgrade tellers
const epsteinUpgradeCountDisplay =
    document.getElementById("epstein-upgrade-count");

const michealUpgradeCountDisplay =
    document.getElementById("micheal-upgrade-count");

const rKellyUpgradeCountDisplay =
    document.getElementById("r-kelly-upgrade-count");


// ==========================
// TOTALE PRODUCTIE BEREKENEN
// ==========================

function calculateCps() {

    cookiesPerSecond =
        (epsteinCount * epsteinProduction) +
        (michealJacksonCount * michealJacksonProduction) +
        (rKellyCount * rKellyProduction);

}


// ==========================
// DISPLAY UPDATEN
// ==========================

function updateDisplay() {

    counter.textContent = Math.floor(count);

    cpsDisplay.textContent =
        cookiesPerSecond.toFixed(1);

    specialCoinsDisplay.textContent =
        specialCoins;

    clickCountDisplay.textContent =
        clickCount;

    epsteinCountDisplay.textContent =
        epsteinCount;

    michealCountDisplay.textContent =
        michealJacksonCount;

    rKellyCountDisplay.textContent =
        rKellyCount;

    goldenCountDisplay.textContent =
        goldenCount;

    superCountDisplay.textContent =
        superCount;


    // Productie per fabriek
    epsteinCpsDisplay.textContent =
        epsteinCount * epsteinProduction;

    michealCpsDisplay.textContent =
        michealJacksonCount * michealJacksonProduction;

    rKellyCpsDisplay.textContent =
        rKellyCount * rKellyProduction;


    // Upgrade tellers
    epsteinUpgradeCountDisplay.textContent =
        epsteinUpgradeCount;

    michealUpgradeCountDisplay.textContent =
        michealUpgradeCount;

    rKellyUpgradeCountDisplay.textContent =
        rKellyUpgradeCount;

}


// ==========================
// KOEKJE KLIKKEN
// ==========================

button.addEventListener("click", function() {

    count++;
    clickCount++;

    // Elke 1000 klikken = 1 speciale coin
    if (clickCount % 1000 === 0) {
        specialCoins++;
    }

    updateDisplay();

});


// ==========================
// EPSTEIN FABRIEK KOPEN
// ==========================

upgrade.addEventListener("click", function() {

    if (count >= upgradePrice) {

        count -= upgradePrice;

        epsteinCount++;

        upgradePrice *= 1.5;

        upgrade.textContent =
            "Epstein fabriek (" +
            Math.ceil(upgradePrice) +
            " cookies)";

        calculateCps();
        updateDisplay();

    }

});


// ==========================
// MICHEAL JACKSON FABRIEK KOPEN
// ==========================

michealJacksonUpgrade.addEventListener(
    "click",
    function() {

        if (count >= michealJacksonPrice) {

            count -= michealJacksonPrice;

            michealJacksonCount++;

            michealJacksonPrice *= 1.5;

            michealJacksonUpgrade.textContent =
                "Micheal Jackson fabriek (" +
                Math.ceil(michealJacksonPrice) +
                " cookies)";

            calculateCps();
            updateDisplay();

        }

    }
);


// ==========================
// R. KELLY FABRIEK KOPEN
// ==========================

rKellyUpgrade.addEventListener(
    "click",
    function() {

        if (count >= rKellyPrice) {

            count -= rKellyPrice;

            rKellyCount++;

            rKellyPrice *= 1.5;

            rKellyUpgrade.textContent =
                "R. Kelly fabriek (" +
                Math.ceil(rKellyPrice) +
                " cookies)";

            calculateCps();
            updateDisplay();

        }

    }
);


// ==========================
// EPSTEIN SPECIALE UPGRADE
// ==========================

epsteinUpgradeButton.addEventListener(
    "click",
    function() {

        if (specialCoins >= epsteinUpgradePrice) {

            specialCoins -= epsteinUpgradePrice;

            epsteinUpgradeCount++;

            // Epstein productie x2
            epsteinProduction *= 2;

            // Prijs x1.2
            epsteinUpgradePrice *= 1.2;

            epsteinUpgradeButton.textContent =
                "Upgrade Epstein (" +
                Math.ceil(epsteinUpgradePrice) +
                " speciale coins)";

            calculateCps();
            updateDisplay();

        }

    }
);


// ==========================
// MICHEAL JACKSON SPECIALE UPGRADE
// ==========================

michealUpgradeButton.addEventListener(
    "click",
    function() {

        if (specialCoins >= michealUpgradePrice) {

            specialCoins -= michealUpgradePrice;

            michealUpgradeCount++;

            // Micheal Jackson productie x2
            michealJacksonProduction *= 2;

            // Prijs x1.2
            michealUpgradePrice *= 1.2;

            michealUpgradeButton.textContent =
                "Upgrade Micheal Jackson (" +
                Math.ceil(michealUpgradePrice) +
                " speciale coins)";

            calculateCps();
            updateDisplay();

        }

    }
);


// ==========================
// R. KELLY SPECIALE UPGRADE
// ==========================

rKellyUpgradeButton.addEventListener(
    "click",
    function() {

        if (specialCoins >= rKellyUpgradePrice) {

            specialCoins -= rKellyUpgradePrice;

            rKellyUpgradeCount++;

            // R. Kelly productie x2
            rKellyProduction *= 2;

            // Prijs x1.2
            rKellyUpgradePrice *= 1.2;

            rKellyUpgradeButton.textContent =
                "Upgrade R. Kelly (" +
                Math.ceil(rKellyUpgradePrice) +
                " speciale coins)";

            calculateCps();
            updateDisplay();

        }

    }
);


// ==========================
// SPECIALE COINS TIJD
// ==========================

// Elke 10 minuten 1 speciale coin
setInterval(function() {

    specialCoins++;

    updateDisplay();

}, 600000);


// ==========================
// GOUDEN COOKIE
// ==========================

specialUpgrade.addEventListener(
    "click",
    function() {

        if (specialCoins >= 5) {

            specialCoins -= 5;

            goldenCount++;

            cookiesPerSecond += 5;

            updateDisplay();

        }

    }
);


// ==========================
// SUPER FABRIEK
// ==========================

specialUpgrade2.addEventListener(
    "click",
    function() {

        if (specialCoins >= 10) {

            specialCoins -= 10;

            superCount++;

            cookiesPerSecond += 50;

            updateDisplay();

        }

    }
);


// ==========================
// AUTOMATISCHE PRODUCTIE
// ==========================

setInterval(function() {

    count += cookiesPerSecond;

    updateDisplay();

}, 1000);


// Beginwaarden tonen
updateDisplay();