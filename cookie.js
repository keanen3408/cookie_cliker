
/* =========================================
   FACTORY CLASS
========================================= */
 
class Factory {

    constructor(name, price, production, buttonId, countId, cpsId) {

        this.name = name;
        this.price = price;
        this.production = production;

        this.buttonId = buttonId;
        this.countId = countId;
        this.cpsId = cpsId;

        this.count = 0;
        this.upgradeCount = 0;
    }


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

        return this.count *
            this.production *
            (1 + this.upgradeCount);
    }
}



/* =========================================
   UPGRADE CLASS
========================================= */

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

        if (game.specialCoins >= this.price) {

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

}



/* =========================================
   SPEL STARTEN
========================================= */

const game = new Game();

game.startProduction();

game.startSpecialCoins();