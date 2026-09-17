let count = 0;
let cookiesPerSecond = 0;

let clickCount = 0;
let specialCoins = 10000;

// Cookies per klik
let clickPower = 1;

// Prijzen fabrieken
let upgradePrice = 10;
let michealJacksonPrice = 100;
let rKellyPrice = 1000;

// Aantallen fabrieken
let epsteinCount = 0;
let michealJacksonCount = 0;
let rKellyCount = 0;

// Aantallen upgrades
let epsteinUpgradeCount = 0;
let michealUpgradeCount = 0;
let rKellyUpgradeCount = 0;

// Upgrade prijzen speciale coins
let epsteinUpgradePrice = 2;
let michealUpgradePrice = 4;
let rKellyUpgradePrice = 6;

// Speciale upgrades
let goldenCount = 0;
let superCount = 0;

// Epstein Island
let islandCount = 0;
let islandBought = false;

// Crosshair
let crosshairCount = 0;
let crosshairPrice = 1;

// Elementen
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

const epsteinCpsDisplay =
    document.getElementById("epstein-cps");

const michealCpsDisplay =
    document.getElementById("micheal-cps");

const rKellyCpsDisplay =
    document.getElementById("r-kelly-cps");

const specialUpgrade =
    document.getElementById("special-upgrade");

const specialUpgrade2 =
    document.getElementById("special-upgrade-2");

const goldenCountDisplay =
    document.getElementById("golden-count");

const superCountDisplay =
    document.getElementById("super-count");

// Crosshair elementen
const crosshairUpgrade =
    document.getElementById("crosshair-upgrade");

const crosshairCountDisplay =
    document.getElementById("crosshair-count");

const clickPowerDisplay =
    document.getElementById("click-power");

const clickPowerDisplay2 =
    document.getElementById("click-power-display");

// Island elementen
const islandUpgrade =
    document.getElementById("epstein-island");

const islandCountDisplay =
    document.getElementById("island-count");

const islandCpsDisplay =
    document.getElementById("island-cps");

// Upgrade counts
const epsteinUpgradeCountDisplay =
    document.getElementById("epstein-upgrade-count");

const michealUpgradeCountDisplay =
    document.getElementById("micheal-upgrade-count");

const rKellyUpgradeCountDisplay =
    document.getElementById("r-kelly-upgrade-count");


// Display bijwerken
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

    epsteinCpsDisplay.textContent =
        epsteinCount *
        (1 + epsteinUpgradeCount);

    michealCpsDisplay.textContent =
        michealJacksonCount *
        10 *
        (1 + michealUpgradeCount);

    rKellyCpsDisplay.textContent =
        rKellyCount *
        100 *
        (1 + rKellyUpgradeCount);

    goldenCountDisplay.textContent =
        goldenCount;

    superCountDisplay.textContent =
        superCount;

    crosshairCountDisplay.textContent =
        crosshairCount;

    clickPowerDisplay.textContent =
        clickPower;

    clickPowerDisplay2.textContent =
        clickPower;

    epsteinUpgradeCountDisplay.textContent =
        epsteinUpgradeCount;

    michealUpgradeCountDisplay.textContent =
        michealUpgradeCount;

    rKellyUpgradeCountDisplay.textContent =
        rKellyUpgradeCount;

    islandCountDisplay.textContent =
        islandCount;

    islandCpsDisplay.textContent =
        islandCount * 10000;

}


// Cookie klikken
button.addEventListener("click", function() {

    count += clickPower;

    clickCount++;

    // Speciale coin bij elke 1000 clicks.
    // ClickPower telt mee, dus meer click kracht
    // betekent sneller speciale coins verdienen.
    if (clickCount % 1000 === 0) {

        specialCoins++;

    }

    updateDisplay();

});


// Epstein fabriek kopen
upgrade.addEventListener("click", function() {

    if (count >= upgradePrice) {

        count -= upgradePrice;

        epsteinCount++;

        cookiesPerSecond += 1;

        upgradePrice *= 1.5;

        upgrade.textContent =
            "Epstein fabriek (" +
            Math.ceil(upgradePrice) +
            " cookies)";

        updateDisplay();

    }

});


// Michael Jackson fabriek kopen
michealJacksonUpgrade.addEventListener(
    "click",
    function() {

        if (count >= michealJacksonPrice) {

            count -= michealJacksonPrice;

            michealJacksonCount++;

            cookiesPerSecond += 10;

            michealJacksonPrice *= 1.5;

            michealJacksonUpgrade.textContent =
                "Micheal Jackson fabriek (" +
                Math.ceil(michealJacksonPrice) +
                " cookies)";

            updateDisplay();

        }

    }
);


// R. Kelly fabriek kopen
rKellyUpgrade.addEventListener(
    "click",
    function() {

        if (count >= rKellyPrice) {

            count -= rKellyPrice;

            rKellyCount++;

            cookiesPerSecond += 100;

            rKellyPrice *= 1.5;

            rKellyUpgrade.textContent =
                "R. Kelly fabriek (" +
                Math.ceil(rKellyPrice) +
                " cookies)";

            updateDisplay();

        }

    }
);


// Epstein speciale coin upgrade
document.getElementById("epstein-upgrade")
.addEventListener("click", function() {

    if (
        specialCoins >= epsteinUpgradePrice &&
        epsteinCount > 0
    ) {

        specialCoins -= epsteinUpgradePrice;

        epsteinUpgradeCount++;

        // Upgrade verdubbelt de productie
        cookiesPerSecond += epsteinCount;

        epsteinUpgradePrice *= 1.2;

        this.textContent =
            "Upgrade Epstein (" +
            Math.ceil(epsteinUpgradePrice) +
            " speciale coins)";

        updateDisplay();

    }

});


// Michael speciale coin upgrade
document.getElementById("micheal-upgrade")
.addEventListener("click", function() {

    if (
        specialCoins >= michealUpgradePrice &&
        michealJacksonCount > 0
    ) {

        specialCoins -= michealUpgradePrice;

        michealUpgradeCount++;

        cookiesPerSecond +=
            michealJacksonCount * 10;

        michealUpgradePrice *= 1.2;

        this.textContent =
            "Upgrade Micheal Jackson (" +
            Math.ceil(michealUpgradePrice) +
            " speciale coins)";

        updateDisplay();

    }

});


// R. Kelly speciale coin upgrade
document.getElementById("r-kelly-upgrade")
.addEventListener("click", function() {

    if (
        specialCoins >= rKellyUpgradePrice &&
        rKellyCount > 0
    ) {

        specialCoins -= rKellyUpgradePrice;

        rKellyUpgradeCount++;

        cookiesPerSecond +=
            rKellyCount * 100;

        rKellyUpgradePrice *= 1.2;

        this.textContent =
            "Upgrade R. Kelly (" +
            Math.ceil(rKellyUpgradePrice) +
            " speciale coins)";

        updateDisplay();

    }

});


// Epstein Island kopen
islandUpgrade.addEventListener("click", function() {

    if (
        epsteinUpgradeCount >= 10 &&
        specialCoins >= 1 &&
        islandBought === false
    ) {

        specialCoins--;

        islandCount++;

        islandBought = true;

        cookiesPerSecond += 10000;

        islandUpgrade.textContent =
            "Epstein Island gekocht";

        updateDisplay();

    }

});


// Crosshair upgrade

crosshairUpgrade.addEventListener(
    "click",
    function() {

        // Crosshair kost cookies
        if (count >= crosshairPrice) {

            count -= crosshairPrice;

            crosshairCount++;

            // Elke upgrade verdubbelt de cookies per klik
            clickPower *= 2;

            // Prijs wordt 1.5x duurder
            crosshairPrice *= 1.5;

            crosshairUpgrade.textContent =
                "Crosshair upgrade (" +
                Math.ceil(crosshairPrice) +
                " cookies)";

            updateDisplay();

        }

    }
);


// Gouden cookie
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


// Super fabriek
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


// Elke 10 minuten een speciale coin
setInterval(function() {

    specialCoins++;

    updateDisplay();

}, 600000);


// Automatische productie
setInterval(function() {

    count += cookiesPerSecond;

    updateDisplay();

}, 1000);


// Start display
updateDisplay();