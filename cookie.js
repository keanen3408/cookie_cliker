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
        this.production = 1000;
        this.bought = false;
    }

    buy(game) {
        if (this.bought || game.ElonMuskUpgrade.count < 10 ||
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

        this.plasticCleanCount = 0;
        this.plasticCleanPrice = 10;
        this.plasticSeaClean = false;
        this.plasticProductionBonus = 0;

        this.factories = [
            new Factory("Elon Musk", 10, 1,
                "elon-musk", "elon-musk-count", "elon-musk-cps"),

            new Factory("Michael Jackson", 100, 10,
                "micheal-jackson", "micheal-count", "micheal-cps"),

            new Factory("R. Kelly", 1000, 100,
                "r-kelly", "r-kelly-count", "r-kelly-cps"),

            new Factory("Donald Trump", 1000000, 100000,
                "donald-trump", "trump-count", "trump-cps")
        ];

        [
            this.ElonMusk,
            this.micheal,
            this.rKelly,
            this.trump
        ] = this.factories;

        this.upgrades = [
            new Upgrade("Elon Musk", 2, "elon-musk-upgrade", this.ElonMusk),
            new Upgrade("Michael Jackson", 4, "micheal-upgrade", this.micheal),
            new Upgrade("R. Kelly", 6, "r-kelly-upgrade", this.rKelly),
            new Upgrade("Donald Trump", 25, "trump-upgrade", this.trump),
            new Upgrade("Gouden cookie", 5, "special-upgrade", null, "golden"),
            new Upgrade("Super fabriek", 10, "special-upgrade-2", null, "super")
        ];

        [
            this.ElonMuskUpgrade,
            this.michealUpgrade,
            this.rKellyUpgrade,
            this.trumpUpgrade,
            this.golden,
            this.superFactory
        ] = this.upgrades;

        this.crosshair = new CrosshairUpgrade();
        this.island = new Island();

        this.specialBuildings = [
            new SpecialBuilding("Neverland", "neverland",
                "neverland-count", "neverland-cps",
                "neverland-requirement", () => this.michealUpgrade.count,
                2, 10000),

            new SpecialBuilding("Recording Studio", "recording-studio",
                "studio-count", "studio-cps",
                "studio-requirement", () => this.rKellyUpgrade.count,
                3, 100000),

            new SpecialBuilding("Dollar", "Dollar",
                "Dollar-count", "Dollar-cps",
                "Dollar-requirement", () => this.trumpUpgrade.count,
                5, 1000000),

            new SpecialBuilding("White House", "white-house",
                "white-house-count", "white-house-cps",
                "white-house-requirement", () => this.trumpUpgrade.count,
                6, 10000000)
        ];

        this.extraFactories = [
            new Factory("Indonesië", 5000000, 250000,
                "indonesia", "indonesia-count", "indonesia-cps"),

            new Factory("Israël", 25000000, 1000000,
                "israel", "israel-count", "israel-cps"),

            new Factory("China", 100000000, 5000000,
                "china", "china-count", "china-cps"),

            new Factory("Plastic Sea", 500000000, 25000000,
                "plastic-sea", "plastic-sea-count", "plastic-sea-cps")
        ];

        this.extraUpgrades = this.extraFactories.map((factory, i) =>
            new Upgrade(factory.name, [8, 12, 18, 25][i],
                factory.buttonId + "-upgrade", factory)
        );

        this.unlockedThemes = [];

        // Laad het laatst opgeslagen spel voordat de knoppen worden gemaakt.
        this.loadGame();

        this.setupEvents();
        this.createExtraPanel();

        this.on("plastic-cleanup-upgrade", () => this.buyPlasticUpgrade());

        this.extraFactories.forEach(factory => {
            this.on(factory.buttonId, () => factory.buy(this));
        });

        this.extraUpgrades.forEach(upgrade => {
            this.on(upgrade.buttonId, () => upgrade.buy(this));
        });

        this.updateDisplay();
    }

    // SPEL OPSLAAN
    saveGame() {
        const data = {
            cookies: this.cookies,
            specialCoins: this.specialCoins,
            clickCount: this.clickCount,
            clickPower: this.clickPower,
            bonusCps: this.bonusCps,

            factories: this.factories.map(factory => ({
                count: factory.count,
                price: factory.price,
                upgradeCount: factory.upgradeCount
            })),

            upgrades: this.upgrades.map(upgrade => ({
                count: upgrade.count,
                price: upgrade.price
            })),

            extraFactories: this.extraFactories.map(factory => ({
                count: factory.count,
                price: factory.price,
                upgradeCount: factory.upgradeCount
            })),

            extraUpgrades: this.extraUpgrades.map(upgrade => ({
                count: upgrade.count,
                price: upgrade.price
            })),

            crosshair: {
                count: this.crosshair.count,
                cookiePrice: this.crosshair.cookiePrice
            },

            island: {
                count: this.island.count,
                bought: this.island.bought
            },

            specialBuildings: this.specialBuildings.map(building => ({
                count: building.count
            })),

            plasticCleanCount: this.plasticCleanCount,
            plasticCleanPrice: this.plasticCleanPrice,
            plasticSeaClean: this.plasticSeaClean,
            plasticProductionBonus: this.plasticProductionBonus,

            unlockedThemes: this.unlockedThemes,
            theme: document.body.dataset.theme || "normal"
        };

        try {
            localStorage.setItem("cookieClickerSave", JSON.stringify(data));
            this.setText("save-status", "Spel opgeslagen!");
        } catch (error) {
            this.setText("save-status", "Opslaan is niet gelukt.");
            console.log("Opslaan mislukt:", error);
        }
    }

    // OPGESLAGEN SPEL LADEN
    loadGame() {
        try {
            const savedGame = localStorage.getItem("cookieClickerSave");

            if (!savedGame) return;

            const data = JSON.parse(savedGame);

            this.cookies = data.cookies ?? 0;
            this.specialCoins = data.specialCoins ?? 0;
            this.clickCount = data.clickCount ?? 0;
            this.clickPower = data.clickPower ?? 1;
            this.bonusCps = data.bonusCps ?? 0;

            data.factories?.forEach((saved, i) => {
                if (this.factories[i]) {
                    this.factories[i].count = saved.count;
                    this.factories[i].price = saved.price;
                    this.factories[i].upgradeCount = saved.upgradeCount;
                }
            });

            data.upgrades?.forEach((saved, i) => {
                if (this.upgrades[i]) {
                    this.upgrades[i].count = saved.count;
                    this.upgrades[i].price = saved.price;
                }
            });

            data.extraFactories?.forEach((saved, i) => {
                if (this.extraFactories[i]) {
                    this.extraFactories[i].count = saved.count;
                    this.extraFactories[i].price = saved.price;
                    this.extraFactories[i].upgradeCount = saved.upgradeCount;
                }
            });

            data.extraUpgrades?.forEach((saved, i) => {
                if (this.extraUpgrades[i]) {
                    this.extraUpgrades[i].count = saved.count;
                    this.extraUpgrades[i].price = saved.price;
                }
            });

            if (data.crosshair) {
                this.crosshair.count = data.crosshair.count;
                this.crosshair.cookiePrice = data.crosshair.cookiePrice;
            }

            if (data.island) {
                this.island.count = data.island.count;
                this.island.bought = data.island.bought;
            }

            data.specialBuildings?.forEach((saved, i) => {
                if (this.specialBuildings[i]) {
                    this.specialBuildings[i].count = saved.count;
                }
            });

            this.plasticCleanCount = data.plasticCleanCount ?? 0;
            this.plasticCleanPrice = data.plasticCleanPrice ?? 10;
            this.plasticSeaClean = data.plasticSeaClean ?? false;
            this.plasticProductionBonus = data.plasticProductionBonus ?? 0;

            this.unlockedThemes = data.unlockedThemes ?? [];

            if (this.plasticSeaClean) {
                this.extraFactories[3].name = "Clean Sea";
            }

            if (data.theme && data.theme !== "normal") {
                document.body.dataset.theme = data.theme;
            } else {
                document.body.removeAttribute("data-theme");
            }

            this.setText("save-status", "Opgeslagen spel geladen!");
        } catch (error) {
            console.log("Laden mislukt:", error);
            this.setText("save-status", "Opslaan laden is niet gelukt.");
        }
    }

    formatNumber(number) {
        if (!Number.isFinite(number)) return "0";

        const units = ["k", "M", "B", "T", "Qa", "Qi"];

        if (number < 1000) {
            return Number.isInteger(number) ? String(number) : number.toFixed(1);
        }

        let index = -1;

        do {
            number /= 1000;
            index++;
        } while (number >= 1000 && index < units.length - 1);

        return number.toFixed(1).replace(/\.0$/, "") + units[index];
    }

    getCps() {
        const normal = this.factories.reduce(
            (sum, factory) => sum + factory.getCps(), 0
        );

        const extra = this.extraFactories.reduce(
            (sum, factory) => sum + factory.getCps(), 0
        );

        const buildings = this.specialBuildings.reduce(
            (sum, building) => sum + building.count * building.production, 0
        );

        return normal + extra + buildings + this.island.getCps() +
            this.bonusCps + this.plasticProductionBonus;
    }

    clickCookie() {
        this.cookies += this.clickPower;
        this.clickCount += this.clickPower;

        while (this.clickCount >= 1000) {
            this.specialCoins++;
            this.clickCount -= 1000;
        }

        this.updateDisplay();
        this.showFlyingCookies();
    }

    buyPlasticUpgrade() {
        if (this.plasticCleanCount >= 100 ||
            this.specialCoins < this.plasticCleanPrice) return;

        this.specialCoins -= this.plasticCleanPrice;
        this.plasticCleanCount++;
        this.plasticCleanPrice = Math.ceil(this.plasticCleanPrice * 1.2);
        this.plasticProductionBonus += 1000000;

        if (this.plasticCleanCount >= 100) {
            this.plasticSeaClean = true;
            this.extraFactories[3].name = "Clean Sea";
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

        // Save-knop
        this.on("save-game", () => this.saveGame());

        [...this.factories, ...this.extraFactories].forEach(factory =>
            this.on(factory.buttonId, () => factory.buy(this))
        );

        [...this.upgrades, ...this.extraUpgrades, this.crosshair]
            .forEach(upgrade =>
                this.on(upgrade.buttonId, () => upgrade.buy(this))
            );

        this.on("elon-musk-island", () => this.island.buy(this));
        this.on("plastic-cleanup-upgrade", () => this.buyPlasticUpgrade());

        this.specialBuildings.forEach(building =>
            this.on(building.buttonId, () => building.buy(this))
        );
    }

    createExtraPanel() {
        const panel = document.createElement("section");
        panel.id = "extra-game-panel";

        panel.innerHTML = `
            <h2>🍪 Extra eenheden</h2>
            <div class="extra-units-grid"></div>

            <div class="theme-box">
                <h2>🌊 Plastic Sea opruimen</h2>
                <p>Plastic verwijderd: <span id="plastic-cleanup-count">0</span>/100</p>
                <p id="plastic-sea-status">Plastic Sea zit nog vol plastic!</p>
                <button id="plastic-cleanup-upgrade"></button>
            </div>

            <div class="theme-box">
                <h2>🎨 Thema's</h2>
                <p id="theme-status">Je begint zonder thema. Koop een thema met cookies.</p>
                <div class="theme-buttons">
                    <button data-theme="normal" data-cost="0">Normaal thema</button>
                    <button data-theme="blossem" data-cost="500">Blossom</button>
                    <button data-theme="ocean" data-cost="5000">Ocean</button>
                    <button data-theme="gold" data-cost="50000">Gold</button>
                </div>
            </div>
        `;

        document.querySelector(".upgrades-panel").appendChild(panel);

        const grid = panel.querySelector(".extra-units-grid");

        this.extraFactories.forEach(factory => {
            const card = document.createElement("div");
            card.className = "extra-unit-card";

            card.innerHTML = `
                <h3 id="${factory.buttonId}-title">${factory.name}</h3>
                <p>Bezit: <span id="${factory.countId}">0</span></p>
                <p>Productie: <span id="${factory.cpsId}">0</span> cookies/sec</p>
                <button id="${factory.buttonId}"></button>
                <p>Upgrades: <span id="${factory.buttonId}-upgrade-count">0</span></p>
                <button id="${factory.buttonId}-upgrade"></button>
            `;

            grid.appendChild(card);
        });

        panel.querySelectorAll("button[data-theme]").forEach(button => {
            button.addEventListener("click", () => this.buyTheme(button));
        });
    }

    buyTheme(button) {
        const theme = button.dataset.theme;
        const cost = Number(button.dataset.cost);

        if (theme === "normal") {
            document.body.removeAttribute("data-theme");
            return this.updateDisplay();
        }

        if (!this.unlockedThemes.includes(theme)) {
            if (this.cookies < cost) return;

            this.cookies -= cost;
            this.unlockedThemes.push(theme);
        }

        document.body.dataset.theme = theme;
        this.updateDisplay();
    }

    updateFactory(factory) {
        this.setText(factory.countId, this.formatNumber(factory.count));
        this.setText(factory.cpsId, this.formatNumber(factory.getCps()));

        this.setText(factory.buttonId,
            `${factory.name} fabriek (${this.formatNumber(factory.price)} cookies)`);
    }

    updateDisplay() {
        this.setText("counter", this.formatNumber(Math.floor(this.cookies)));
        this.setText("cps", this.formatNumber(this.getCps()));
        this.setText("special-coins", this.formatNumber(this.specialCoins));
        this.setText("click-count", this.formatNumber(this.clickCount));
        this.setText("click-power", this.formatNumber(this.clickPower));
        this.setText("click-power-display", this.formatNumber(this.clickPower));

        this.factories.forEach(factory => this.updateFactory(factory));
        this.extraFactories.forEach(factory => this.updateFactory(factory));

        this.upgrades.forEach(upgrade => {
            this.setText(upgrade.buttonId + "-count", upgrade.count);

            this.setText(upgrade.buttonId,
                `${upgrade.name} upgrade (${this.formatNumber(upgrade.price)} speciale coins)`);
        });

        this.extraUpgrades.forEach(upgrade => {
            this.setText(upgrade.buttonId + "-count", upgrade.count);

            this.setText(upgrade.buttonId,
                `Upgrade ${upgrade.name} (${this.formatNumber(upgrade.price)} speciale coins)`);
        });

        this.setText("golden-count", this.golden.count);
        this.setText("super-count", this.superFactory.count);

        this.setText("special-upgrade",
            `Gouden cookie (${this.golden.price} speciale coins)`);

        this.setText("special-upgrade-2",
            `Super fabriek (${this.superFactory.price} speciale coins)`);

        this.setText("crosshair-count", this.crosshair.count);

        this.setText("crosshair-upgrade",
            `Cursor upgrade (${this.formatNumber(this.crosshair.cookiePrice)} cookies)`);

        this.setText("island-count", this.island.count);
        this.setText("island-cps", this.island.getCps());

        this.setText("elon-musk-island", this.island.bought
            ? "Elon Musk Island gekocht"
            : "Koop Elon Musk Island (1 speciale coin; 10 Elon Musk-upgrades nodig)");

        this.specialBuildings.forEach(building => {
            this.setText(building.countId, building.count);

            this.setText(building.cpsId,
                this.formatNumber(building.count * building.production));

            this.setText(building.requirementId,
                `${building.name}: ${building.requirement()}/50 vereiste upgrades`);

            this.setText(building.buttonId, building.count
                ? `${building.name} gekocht`
                : `Koop ${building.name} (${building.cost} speciale coins)`);
        });

        this.setText("plastic-cleanup-count", this.plasticCleanCount);

        this.setText("plastic-cleanup-upgrade",
            this.plasticCleanCount >= 100
                ? "Clean Sea bereikt!"
                : `Plastic opruim upgrade (${this.formatNumber(this.plasticCleanPrice)} speciale coins)`
        );

        this.setText("plastic-sea-status", this.plasticSeaClean
            ? "🌊 Clean Sea! Al het plastic is verwijderd!"
            : "Plastic Sea zit nog vol plastic!");

        this.setText("plastic-sea-title",
            this.plasticSeaClean ? "Clean Sea" : "Plastic Sea");

        this.setText("theme-status",
            this.unlockedThemes.length
                ? "Gekochte thema's: " + this.unlockedThemes.join(", ")
                : "Je begint zonder thema. Koop een thema met cookies.");

        this.updateButtons();
    }

    updateButtons() {
        const check = (id, allowed) => {
            const button = document.getElementById(id);
            if (button) button.disabled = !allowed;
        };

        [...this.factories, ...this.extraFactories].forEach(factory =>
            check(factory.buttonId, this.cookies >= factory.price)
        );

        [...this.upgrades, ...this.extraUpgrades].forEach(upgrade =>
            check(upgrade.buttonId,
                this.specialCoins >= upgrade.price &&
                (!upgrade.factory || upgrade.factory.count > 0))
        );

        check("crosshair-upgrade", this.cookies >= this.crosshair.cookiePrice);

        check("elon-musk-island", !this.island.bought &&
            this.ElonMuskUpgrade.count >= 10 &&
            this.specialCoins >= this.island.price);

        check("plastic-cleanup-upgrade",
            this.specialCoins >= this.plasticCleanPrice &&
            this.plasticCleanCount < 100);

        this.specialBuildings.forEach(building =>
            check(building.buttonId,
                !building.count &&
                building.requirement() >= 50 &&
                this.specialCoins >= building.cost)
        );

        document.querySelectorAll("button[data-theme]").forEach(button => {
            const theme = button.dataset.theme;
            const cost = Number(button.dataset.cost);

            const owned = theme === "normal" ||
                this.unlockedThemes.includes(theme);

            button.disabled = !owned && this.cookies < cost;

            if (theme !== "normal") {
                button.textContent = owned
                    ? theme + " — gekocht"
                    : `Koop ${theme} (${this.formatNumber(cost)} cookies)`;
            }
        });
    }

    showFlyingCookies() {
        const cookie = document.getElementById("cookie");
        if (!cookie) return;

        const rect = cookie.getBoundingClientRect();

        for (let i = 0; i < 5; i++) {
            const crumb = document.createElement("span");

            crumb.className = "flying-cookie";
            crumb.textContent = "🍪";

            crumb.style.left = rect.left + rect.width / 2 +
                (Math.random() * 70 - 35) + "px";

            crumb.style.top = rect.top + rect.height / 2 +
                (Math.random() * 30 - 15) + "px";

            document.body.appendChild(crumb);

            setTimeout(() => crumb.remove(), 900);
        }
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