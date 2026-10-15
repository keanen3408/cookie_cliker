
class Factory {
    constructor(name, price, production, buttonId, countId, cpsId) {
        Object.assign(this, { name, price, production, buttonId, countId, cpsId });
        this.count = 0;
        this.upgradeCount = 0;
    }

    buy(game) {
        if (game.cookies < this.price) return;
        game.cookies -= this.price;
        this.count++;
        this.price = Math.ceil(this.price * 1.5);
        game.updateDisplay();
    }

    getCps() {
        return this.count * this.production * (1 + this.upgradeCount);
    }
}

class Upgrade {
    constructor(name, price, buttonId, factory = null, type = "factory") {
        Object.assign(this, { name, price, buttonId, factory, type });
        this.count = 0;
    }

    buy(game) {
        if (game.specialCoins < this.price) return;
        if (this.factory && this.factory.count === 0) return;

        game.specialCoins -= this.price;
        this.count++;

        if (this.factory) this.factory.upgradeCount++;
        if (this.type === "golden") game.bonusCps += 5;
        if (this.type === "super") game.bonusCps += 50;

        this.price = Math.ceil(this.price * 1.2);
        game.updateDisplay();
    }
}

class CrosshairUpgrade extends Upgrade {
    constructor() {
        super("Crosshair", 1, "crosshair-upgrade");
        this.cookiePrice = 1;
    }

    buy(game) {
        if (game.cookies < this.cookiePrice) return;
        game.cookies -= this.cookiePrice;
        this.count++;
        game.clickPower *= 2;
        this.cookiePrice = Math.ceil(this.cookiePrice * 2.5);
        game.updateDisplay();
    }
}

class Island {
    constructor() {
        this.count = 0;
        this.price = 1;
        this.production = 10000;
        this.bought = false;
    }

    buy(game) {
        if (this.bought || game.epsteinUpgrade.count < 10 ||
            game.specialCoins < this.price) return;

        game.specialCoins -= this.price;
        this.count = 1;
        this.bought = true;
        game.updateDisplay();
    }

    getCps() {
        return this.count * this.production;
    }
}

class SpecialBuilding {
    constructor(name, buttonId, countId, cpsId, requirementId,
                requirement, cost, production) {
        Object.assign(this, {
            name, buttonId, countId, cpsId, requirementId,
            requirement, cost, production
        });
        this.count = 0;
    }

    buy(game) {
        if (this.count || this.requirement() < 50 ||
            game.specialCoins < this.cost) return;

        game.specialCoins -= this.cost;
        this.count = 1;
        game.updateDisplay();
    }
}

class Game {
    constructor() {
        this.cookies = 0;
        this.specialCoins = 0;
        this.clickCount = 0;
        this.clickPower = 1;
        this.bonusCps = 0;

        this.epstein = new Factory("Epstein", 10, 1,
            "epstein", "epstein-count", "epstein-cps");
        this.micheal = new Factory("Micheal Jackson", 100, 10,
            "micheal-jackson", "micheal-count", "micheal-cps");
        this.rKelly = new Factory("R. Kelly", 1000, 100,
            "r-kelly", "r-kelly-count", "r-kelly-cps");
        this.trump = new Factory("Donald Trump", 1000000, 100000,
            "donald-trump", "trump-count", "trump-cps");

        this.epsteinUpgrade = new Upgrade("Epstein", 2,
            "epstein-upgrade", this.epstein);
        this.michealUpgrade = new Upgrade("Micheal Jackson", 4,
            "micheal-upgrade", this.micheal);
        this.rKellyUpgrade = new Upgrade("R. Kelly", 6,
            "r-kelly-upgrade", this.rKelly);
        this.trumpUpgrade = new Upgrade("Donald Trump", 25,
            "trump-upgrade", this.trump);

        this.golden = new Upgrade("Gouden cookie", 5,
            "special-upgrade", null, "golden");
        this.superFactory = new Upgrade("Super fabriek", 10,
            "special-upgrade-2", null, "super");

        this.crosshair = new CrosshairUpgrade();
        this.island = new Island();

        this.specialBuildings = [
            new SpecialBuilding("Neverland", "neverland",
                "neverland-count", "neverland-cps",
                "neverland-requirement", () => this.michealUpgrade.count,
                2, 11000),
            new SpecialBuilding("Recording Studio", "recording-studio",
                "studio-count", "studio-cps",
                "studio-requirement", () => this.rKellyUpgrade.count,
                3, 12000),
            new SpecialBuilding("American Border", "american-border",
                "border-count", "border-cps",
                "border-requirement", () => this.trumpUpgrade.count,
                5, 14000),
            new SpecialBuilding("White House", "white-house",
                "white-house-count", "white-house-cps",
                "white-house-requirement", () => this.trumpUpgrade.count,
                6, 15000)
        ];

        this.setupEvents();
        this.updateDisplay();
    }

    // Grote getallen afkorten naar k, M, B, T, Qa en Qi.
    formatNumber(number) {
        if (!Number.isFinite(number)) return "0";

        const units = ["k", "M", "B", "T", "Qa", "Qi"];
        const sign = number < 0 ? "-" : "";
        number = Math.abs(number);

        if (number < 1000) {
            return sign + (Number.isInteger(number)
                ? number
                : number.toFixed(1));
        }

        let index = -1;

        do {
            number /= 1000;
            index++;
        } while (number >= 1000 && index < units.length - 1);

        return sign + number.toFixed(1).replace(/\.0$/, "") + units[index];
    }

    getCps() {
        return this.epstein.getCps() +
            this.micheal.getCps() +
            this.rKelly.getCps() +
            this.trump.getCps() +
            this.island.getCps() +
            this.bonusCps +
            this.specialBuildings.reduce(
                (total, building) =>
                    total + building.count * building.production, 0
            );
    }

    clickCookie() {
        this.cookies += this.clickPower;
        this.clickCount += this.clickPower;

        while (this.clickCount >= 1000) {
            this.specialCoins++;
            this.clickCount -= 1000;
        }

        this.updateDisplay();
    }

    on(id, callback) {
        const element = document.getElementById(id);
        if (element) element.addEventListener("click", callback);
    }

    setText(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    setupEvents() {
        this.on("cookie", () => this.clickCookie());

        [this.epstein, this.micheal, this.rKelly, this.trump]
            .forEach(factory =>
                this.on(factory.buttonId, () => factory.buy(this))
            );

        [
            this.epsteinUpgrade,
            this.michealUpgrade,
            this.rKellyUpgrade,
            this.trumpUpgrade,
            this.golden,
            this.superFactory,
            this.crosshair
        ].forEach(upgrade =>
            this.on(upgrade.buttonId, () => upgrade.buy(this))
        );

        this.on("epstein-island", () => this.island.buy(this));

        this.specialBuildings.forEach(building =>
            this.on(building.buttonId, () => building.buy(this))
        );
    }

    updateFactory(factory) {
        this.setText(factory.countId,
            this.formatNumber(factory.count));

        this.setText(factory.cpsId,
            this.formatNumber(factory.getCps()));

        this.setText(factory.buttonId,
            `${factory.name} fabriek (${this.formatNumber(
                Math.ceil(factory.price)
            )} cookies)`);
    }

    updateUpgrade(upgrade, label) {
        this.setText(upgrade.buttonId,
            `${label} (${this.formatNumber(
                Math.ceil(upgrade.price)
            )} speciale coins)`);
    }

    updateDisplay() {
        this.setText("counter",
            this.formatNumber(Math.floor(this.cookies)));

        this.setText("cps",
            this.formatNumber(this.getCps()));

        this.setText("special-coins",
            this.formatNumber(this.specialCoins));

        this.setText("click-count",
            this.formatNumber(this.clickCount));

        this.setText("click-power",
            this.formatNumber(this.clickPower));

        this.setText("click-power-display",
            this.formatNumber(this.clickPower));

        [this.epstein, this.micheal, this.rKelly, this.trump]
            .forEach(factory => this.updateFactory(factory));

        [
            [this.epsteinUpgrade, "Epstein"],
            [this.michealUpgrade, "Micheal Jackson"],
            [this.rKellyUpgrade, "R. Kelly"],
            [this.trumpUpgrade, "Donald Trump"]
        ].forEach(([upgrade, name]) => {
            this.setText(upgrade.buttonId + "-count",
                this.formatNumber(upgrade.count));

            this.updateUpgrade(upgrade, "Upgrade " + name);
        });

        this.setText("golden-count",
            this.formatNumber(this.golden.count));

        this.setText("super-count",
            this.formatNumber(this.superFactory.count));

        this.setText("special-upgrade",
            `Gouden cookie (${this.formatNumber(
                this.golden.price
            )} speciale coins)`);

        this.setText("special-upgrade-2",
            `Super fabriek (${this.formatNumber(
                this.superFactory.price
            )} speciale coins)`);

        this.setText("crosshair-count",
            this.formatNumber(this.crosshair.count));

        this.setText("crosshair-upgrade",
            `Crosshair upgrade (${this.formatNumber(
                this.crosshair.cookiePrice
            )} cookies)`);

        this.setText("island-count",
            this.formatNumber(this.island.count));

        this.setText("island-cps",
            this.formatNumber(this.island.getCps()));

        this.setText("epstein-island", this.island.bought
            ? "Epstein Island gekocht"
            : "Koop Epstein Island (1 speciale coin; 10 Epstein-upgrades nodig)");

        this.specialBuildings.forEach(building => {
            this.setText(building.countId,
                this.formatNumber(building.count));

            this.setText(building.cpsId,
                this.formatNumber(
                    building.count * building.production
                ));

            const requirement =
                document.getElementById(building.requirementId);

            if (requirement) {
                requirement.textContent =
                    `${building.name}: ${this.formatNumber(
                        building.requirement()
                    )}/50 vereiste upgrades`;
            }

            this.setText(building.buttonId, building.count
                ? `${building.name} gekocht`
                : `Koop ${building.name} (${this.formatNumber(
                    building.cost
                )} speciale coins)`);
        });
    }

    startProduction() {
        setInterval(() => {
            this.cookies += this.getCps();
            this.updateDisplay();
        }, 1000);
    }

    startSpecialCoins() {
        setInterval(() => {
            this.specialCoins++;
            this.updateDisplay();
        }, 600000);
    }
}

const game = new Game();
game.startProduction();
game.startSpecialCoins();