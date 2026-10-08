
<<<<<<< HEAD
let clickCount = 0;
let specialCoins = 0;
=======
/* =========================================
   FACTORY CLASS
========================================= */
 
class Factory {
>>>>>>> origin/main

    constructor(name, price, production, buttonId, countId, cpsId) {

<<<<<<< HEAD
// Prijzen fabrieken
let upgradePrice = 10;
let michealJacksonPrice = 100;
let rKellyPrice = 1000;
let donaldTrumpPrice = 1000000;

// Aantallen fabrieken
let epsteinCount = 0;
let michealJacksonCount = 0;
let rKellyCount = 0;
let donaldTrumpCount = 0;

// Aantallen upgrades
let epsteinUpgradeCount = 0;
let michealUpgradeCount = 0;
let rKellyUpgradeCount = 0;
let donaldTrumpUpgradeCount = 0;

// Upgrade prijzen speciale coins
let epsteinUpgradePrice = 2;
let michealUpgradePrice = 4;
let rKellyUpgradePrice = 6;
let donaldTrumpUpgradePrice = 25;

class SpecialBuilding {
    constructor(
        name,
        buttonId,
        countId,
        cpsId,
        requirementId,
        upgradeCount,
        cost,
        production
    ) {
        this.name = name;
        this.buttonId = buttonId;
        this.countId = countId;
        this.cpsId = cpsId;
        this.requirementId = requirementId;
        this.upgradeCount = upgradeCount;
        this.cost = cost;
        this.production = production;
        this.count = 0;
    }
}

const specialBuildings = [
    new SpecialBuilding(
        "Neverland",
        "neverland",
        "neverland-count",
        "neverland-cps",
        "neverland-requirement",
        () => michealUpgradeCount,
        2,
        11000
    ),
    new SpecialBuilding(
        "Recording Studio",
        "recording-studio",
        "studio-count",
        "studio-cps",
        "studio-requirement",
        () => rKellyUpgradeCount,
        3,
        12000
    ),
    new SpecialBuilding(
        "American Border",
        "american-border",
        "border-count",
        "border-cps",
        "border-requirement",
        () => donaldTrumpUpgradeCount,
        5,
        14000
    ),
    new SpecialBuilding(
        "White House",
        "white-house",
        "white-house-count",
        "white-house-cps",
        "white-house-requirement",
        () => donaldTrumpUpgradeCount,
        6,
        15000
    )
];

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
const donaldTrumpUpgrade =
    document.getElementById("donald-trump");

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
=======
        this.name = name;
        this.price = price;
        this.production = production;

        this.buttonId = buttonId;
        this.countId = countId;
        this.cpsId = cpsId;

        this.count = 0;
        this.upgradeCount = 0;
    }
>>>>>>> origin/main


    // Fabriek kopen
    buy(game) {

        if (game.cookies >= this.price) {

            game.cookies -= this.price;

            this.count++;

            // Volgende fabriek wordt 1.5x duurder
            this.price *= 1.5;

            game.updateDisplay();
        }
    }


    // Productie berekenen
    getCps() {

<<<<<<< HEAD
    document.getElementById("trump-count").textContent =
        donaldTrumpCount;

    epsteinCpsDisplay.textContent =
        epsteinCount *
        (1 + epsteinUpgradeCount);
=======
        return this.count *
            this.production *
            (1 + this.upgradeCount);
    }
}
>>>>>>> origin/main



<<<<<<< HEAD
    document.getElementById("trump-cps").textContent =
        donaldTrumpCount *
        100000 *
        (1 + donaldTrumpUpgradeCount);

    goldenCountDisplay.textContent =
        goldenCount;
=======
/* =========================================
   UPGRADE CLASS
========================================= */
>>>>>>> origin/main

class Upgrade {

    constructor(name, price, buttonId, factory = null) {

        this.name = name;
        this.price = price;
        this.buttonId = buttonId;

        this.factory = factory;

        this.count = 0;
    }


    // Upgrade kopen
    buy(game) {

<<<<<<< HEAD
    document.getElementById("trump-upgrade-count").textContent =
        donaldTrumpUpgradeCount;
    donaldTrumpUpgrade.textContent =
        "Donald Trump (" +
        Math.ceil(donaldTrumpPrice) +
        " cookies)";
    document.getElementById("trump-upgrade").textContent =
        "Upgrade Donald Trump (" +
        Math.ceil(donaldTrumpUpgradePrice) +
        " speciale coins)";

    islandCountDisplay.textContent =
        islandCount;
=======
        if (game.specialCoins >= this.price) {
>>>>>>> origin/main

            // Speciale coins betalen
            game.specialCoins -= this.price;

            // Upgrade aantal verhogen
            this.count++;

            // Fabriek sterker maken
            if (this.factory !== null) {

                this.factory.upgradeCount++;
            }

            // Volgende upgrade wordt 1.2x duurder
            this.price *= 1.2;

            game.updateDisplay();
        }
    }
}



/* =========================================
   CROSSHAIR UPGRADE CLASS
   ERFT VAN UPGRADE
========================================= */

class CrosshairUpgrade extends Upgrade {

    constructor() {

        super(
            "Crosshair",
            1,
            "crosshair-upgrade"
        );

        this.cookiePrice = 1;
    }


    buy(game) {

        if (game.cookies >= this.cookiePrice) {

            // Cookies betalen
            game.cookies -= this.cookiePrice;

            // Upgrade aantal verhogen
            this.count++;

            // Cookies per klik verdubbelen
            game.clickPower *= 2;

            // Volgende upgrade wordt 1.5x duurder
            this.cookiePrice *= 2.5;

            game.updateDisplay();
        }
    }
}



/* =========================================
   EPSTEIN ISLAND CLASS
========================================= */

class Island {

    constructor() {

        this.count = 0;

        this.price = 1;

        this.production = 10000;

        this.bought = false;
    }


    buy(game) {

        if (
            game.epstein.upgradeCount >= 10 &&
            game.specialCoins >= this.price &&
            this.bought === false
        ) {

            game.specialCoins -= this.price;

            this.count++;

            this.bought = true;

            game.updateDisplay();
        }
    }


    getCps() {

        return this.count * this.production;
    }
}



/* =========================================
   GAME CLASS
========================================= */

class Game {

    constructor() {

        // Cookies
        this.cookies = 0;

        // Speciale coins
        this.specialCoins = 10000;

        // Klikken
        this.clickCount = 0;

        this.clickPower = 1;


        /* =================================
           FABRIEKEN
        ================================= */

        this.epstein = new Factory(
            "Epstein",
            10,
            1,
            "epstein",
            "epstein-count",
            "epstein-cps"
        );


        this.micheal = new Factory(
            "Micheal Jackson",
            100,
            10,
            "micheal-jackson",
            "micheal-count",
            "micheal-cps"
        );


        this.rKelly = new Factory(
            "R. Kelly",
            1000,
            100,
            "r-kelly",
            "r-kelly-count",
            "r-kelly-cps"
        );



        /* =================================
           FABRIEK UPGRADES
        ================================= */

        this.epsteinUpgrade = new Upgrade(
            "Epstein Upgrade",
            2,
            "epstein-upgrade",
            this.epstein
        );


        this.michealUpgrade = new Upgrade(
            "Micheal Upgrade",
            4,
            "micheal-upgrade",
            this.micheal
        );


        this.rKellyUpgrade = new Upgrade(
            "R. Kelly Upgrade",
            6,
            "r-kelly-upgrade",
            this.rKelly
        );



        /* =================================
           SPECIALE UPGRADES
        ================================= */

        this.golden = new Upgrade(
            "Gouden cookie",
            5,
            "special-upgrade"
        );


        this.superFactory = new Upgrade(
            "Super fabriek",
            10,
            "special-upgrade-2"
        );



        /* =================================
           CROSSHAIR
        ================================= */

        this.crosshair = new CrosshairUpgrade();



        /* =================================
           ISLAND
        ================================= */

        this.island = new Island();



        // Events koppelen
        this.setupEvents();

        // Display starten
        this.updateDisplay();
    }



    /* =================================
       TOTALE COOKIES PER SECOND
    ================================= */

    getCps() {

        return (

            this.epstein.getCps() +

            this.micheal.getCps() +

            this.rKelly.getCps() +

            this.island.getCps() +

            this.golden.count * 5 +

            this.superFactory.count * 50

        );
    }



    /* =================================
       COOKIE KLIKKEN
    ================================= */

    clickCookie() {

        // Cookies toevoegen
        this.cookies += this.clickPower;


        // ClickPower telt mee voor speciale coins
        this.clickCount += this.clickPower;


        // Elke 1000 klikken = 1 speciale coin
        while (this.clickCount >= 1000) {

            this.specialCoins++;

            this.clickCount -= 1000;
        }


        this.updateDisplay();
    }



    /* =================================
       EVENTS
    ================================= */

    setupEvents() {


        // Cookie klikken
        document.getElementById("cookie")
            .addEventListener("click", () => {

                this.clickCookie();

            });



        // Epstein fabriek
        document.getElementById("epstein")
            .addEventListener("click", () => {

                this.epstein.buy(this);

            });



        // Micheal Jackson fabriek
        document.getElementById("micheal-jackson")
            .addEventListener("click", () => {

                this.micheal.buy(this);

            });



        // R. Kelly fabriek
        document.getElementById("r-kelly")
            .addEventListener("click", () => {

                this.rKelly.buy(this);

            });



        // Epstein upgrade
        document.getElementById("epstein-upgrade")
            .addEventListener("click", () => {

                this.epsteinUpgrade.buy(this);

            });



        // Micheal Jackson upgrade
        document.getElementById("micheal-upgrade")
            .addEventListener("click", () => {

                this.michealUpgrade.buy(this);

            });



        // R. Kelly upgrade
        document.getElementById("r-kelly-upgrade")
            .addEventListener("click", () => {

                this.rKellyUpgrade.buy(this);

            });



        // Gouden cookie
        document.getElementById("special-upgrade")
            .addEventListener("click", () => {

                this.golden.buy(this);

            });



        // Super fabriek
        document.getElementById("special-upgrade-2")
            .addEventListener("click", () => {

                this.superFactory.buy(this);

            });



        // Crosshair
        document.getElementById("crosshair-upgrade")
            .addEventListener("click", () => {

                this.crosshair.buy(this);

            });



        // Epstein Island
        document.getElementById("epstein-island")
            .addEventListener("click", () => {

                this.island.buy(this);

            });

    }



    /* =================================
       DISPLAY BIJWERKEN
    ================================= */

    updateDisplay() {


        // Cookies
        document.getElementById("counter").textContent =
            Math.floor(this.cookies);


        // Cookies per seconde
        document.getElementById("cps").textContent =
            this.getCps().toFixed(1);


        // Speciale coins
        document.getElementById("special-coins").textContent =
            this.specialCoins;


        // Klikken
        document.getElementById("click-count").textContent =
            this.clickCount;


        // Klik kracht
        document.getElementById("click-power").textContent =
            this.clickPower;


        document.getElementById("click-power-display").textContent =
            this.clickPower;



        /* ================================
           FABRIEKEN
        ================================= */


        this.updateFactory(this.epstein);

        this.updateFactory(this.micheal);

        this.updateFactory(this.rKelly);



        /* ================================
           FABRIEK UPGRADES
        ================================= */


        document.getElementById("epstein-upgrade-count").textContent =
            this.epsteinUpgrade.count;


        document.getElementById("micheal-upgrade-count").textContent =
            this.michealUpgrade.count;


        document.getElementById("r-kelly-upgrade-count").textContent =
            this.rKellyUpgrade.count;



        // Epstein upgrade knop
        document.getElementById("epstein-upgrade").textContent =

            `Upgrade Epstein (${Math.ceil(this.epsteinUpgrade.price)} speciale coins)`;



        // Micheal upgrade knop
        document.getElementById("micheal-upgrade").textContent =

            `Upgrade Micheal Jackson (${Math.ceil(this.michealUpgrade.price)} speciale coins)`;



        // R. Kelly upgrade knop
        document.getElementById("r-kelly-upgrade").textContent =

            `Upgrade R. Kelly (${Math.ceil(this.rKellyUpgrade.price)} speciale coins)`;



        /* ================================
           SPECIALE UPGRADES
        ================================= */


        document.getElementById("golden-count").textContent =
            this.golden.count;


        document.getElementById("super-count").textContent =
            this.superFactory.count;



        /* ================================
           CROSSHAIR
        ================================= */


        document.getElementById("crosshair-count").textContent =
            this.crosshair.count;


        document.getElementById("crosshair-upgrade").textContent =

            `Crosshair upgrade (${Math.ceil(this.crosshair.cookiePrice)} cookies)`;



        /* ================================
           ISLAND
        ================================= */


        document.getElementById("island-count").textContent =
            this.island.count;


        document.getElementById("island-cps").textContent =
            this.island.getCps();


        document.getElementById("epstein-island").textContent =

            this.island.bought

                ? "Epstein Island gekocht"

                : "Koop Epstein Island (1 speciale coin)";

    }



    /* =================================
       FABRIEK DISPLAY
    ================================= */

    updateFactory(factory) {


        document.getElementById(factory.countId).textContent =
            factory.count;


        document.getElementById(factory.cpsId).textContent =
            factory.getCps();


        document.getElementById(factory.buttonId).textContent =

            `${factory.name} fabriek (${Math.ceil(factory.price)} cookies)`;

    }



    /* =================================
       AUTOMATISCHE PRODUCTIE
    ================================= */

    startProduction() {

        setInterval(() => {

            this.cookies += this.getCps();

            this.updateDisplay();

        }, 1000);

    }



    /* =================================
       SPECIALE COINS TIMER
    ================================= */

    startSpecialCoins() {

        setInterval(() => {

            this.specialCoins++;

            this.updateDisplay();

        }, 600000);

    }

    specialBuildings.forEach(function(building) {
        const button = document.getElementById(building.buttonId);
        const requirement =
            document.getElementById(building.requirementId);
        document.getElementById(building.countId).textContent =
            building.count;
        document.getElementById(building.cpsId).textContent =
            building.count * building.production;
        requirement.hidden = building.upgradeCount() >= 50;
        button.textContent = building.count > 0
            ? building.name + " gekocht"
            : "Koop " +
                building.name +
                " (" +
                building.cost +
                " speciale coins)";
        button.disabled = building.count > 0;
    });

}



/* =========================================
   SPEL STARTEN
========================================= */

const game = new Game();

game.startProduction();

<<<<<<< HEAD
        specialCoins++;

        clickCount -= 1000;

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

// Donald Trump factory kopen
donaldTrumpUpgrade.addEventListener("click", function() {
    if (count >= donaldTrumpPrice) {
        count -= donaldTrumpPrice;
        donaldTrumpCount++;
        cookiesPerSecond += 100000;
        donaldTrumpPrice *= 1.5;
        updateDisplay();
    }
});


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

// Donald Trump speciale coin upgrade
document.getElementById("trump-upgrade")
.addEventListener("click", function() {
    if (
        specialCoins >= donaldTrumpUpgradePrice &&
        donaldTrumpCount > 0
    ) {
        specialCoins -= donaldTrumpUpgradePrice;
        donaldTrumpUpgradeCount++;
        cookiesPerSecond += donaldTrumpCount * 100000;
        donaldTrumpUpgradePrice *= 1.2;
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

specialBuildings.forEach(function(building) {
    const button = document.getElementById(building.buttonId);
    button.addEventListener("click", function() {
        if (
            building.count === 0 &&
            building.upgradeCount() >= 50 &&
            specialCoins >= building.cost
        ) {
            specialCoins -= building.cost;
            building.count = 1;
            cookiesPerSecond += building.production;
            updateDisplay();
        }
    });
});


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
=======
game.startSpecialCoins();
>>>>>>> origin/main
