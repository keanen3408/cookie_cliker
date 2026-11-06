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

// NIEUW: PLASTIC SEA OPRUIM UPGRADE

class PlasticCleanupUpgrade {
    constructor() {
        this.name = "Plastic opruim upgrade";
        this.price = 10;
        this.count = 0;
        this.maxUpgrades = 100;
        this.productionBonus = 0;
    }

    buy(game) {
        if (this.count >= this.maxUpgrades) return;
        if (game.specialCoins < this.price) return;

        game.specialCoins -= this.price;
        this.count++;

        // Iedere upgrade geeft 1 miljoen extra CPS
        this.productionBonus += 1000000;

        // De prijs wordt steeds hoger
        this.price = Math.ceil(this.price * 1.2);

        // Na 100 upgrades wordt Plastic Sea Clean Sea
        if (this.count >= this.maxUpgrades) {
            game.plasticSeaClean = true;

            const plasticSea = game.extraFactories.find(
                factory => factory.buttonId === "plastic-sea"
            );

            if (plasticSea) {
                plasticSea.name = "Clean Sea";
            }
        }

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

        this.ElonMusk = new Factory("Elon Musk", 10, 1,
            "elon-musk", "elon-musk-count", "elon-musk-cps");

        this.micheal = new Factory("Micheal Jackson", 100, 10,
            "micheal-jackson", "micheal-count", "micheal-cps");

        this.rKelly = new Factory("R. Kelly", 1000, 100,
            "r-kelly", "r-kelly-count", "r-kelly-cps");

        this.trump = new Factory("Donald Trump", 1000000, 100000,
            "donald-trump", "trump-count", "trump-cps");

        this.ElonMuskUpgrade = new Upgrade("Elon Musk", 2,
            "elon-musk-upgrade", this.ElonMusk);

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

        this.setupEvents();
        this.updateDisplay();
    }

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
        return this.ElonMusk.getCps() +
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

        if (element) {
            element.addEventListener("click", callback);
        }
    }

    setText(id, value) {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }
    }

    setupEvents() {
        this.on("cookie", () => this.clickCookie());

        [this.ElonMusk, this.micheal, this.rKelly, this.trump]
            .forEach(factory =>
                this.on(factory.buttonId, () => factory.buy(this))
            );

        [
            this.ElonMuskUpgrade,
            this.michealUpgrade,
            this.rKellyUpgrade,
            this.trumpUpgrade,
            this.golden,
            this.superFactory,
            this.crosshair
        ].forEach(upgrade =>
            this.on(upgrade.buttonId, () => upgrade.buy(this))
        );

        this.on("elon-musk-island", () => this.island.buy(this));

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

        [this.ElonMusk, this.micheal, this.rKelly, this.trump]
            .forEach(factory => this.updateFactory(factory));

        [
            [this.ElonMuskUpgrade, "Elon Musk"],
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

        this.setText("elon-musk-island", this.island.bought
            ? "Elon Musk Island gekocht"
            : "Koop Elon Musk Island (1 speciale coin; 10 Elon Musk-upgrades nodig)");

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

game.extraFactories = [
    new Factory("Indonesië", 5000000, 250000,
        "indonesia", "indonesia-count", "indonesia-cps"),

    new Factory("Israël", 25000000, 1000000,
        "israel", "israel-count", "israel-cps"),

    new Factory("China", 100000000, 5000000,
        "china", "china-count", "china-cps"),

    new Factory("Plastic Sea", 500000000, 25000000,
        "plastic-sea", "plastic-sea-count", "plastic-sea-cps")
];

// NIEUW: DE PLASTIC OPRUIM UPGRADE
game.plasticCleanup = new PlasticCleanupUpgrade();
game.plasticSeaClean = false;

game.extraUpgrades = game.extraFactories.map((factory, i) =>
    new Upgrade(
        factory.name,
        [8, 12, 18, 25][i],
        factory.buttonId + "-upgrade",
        factory
    )
);

const extraPanel = document.createElement("section");
extraPanel.id = "extra-game-panel";

extraPanel.innerHTML = `
    <h2>🍪 Extra eenheden</h2>
    <div class="extra-units-grid"></div>

    <div class="theme-box">
        <h2>🌊 Plastic Sea opruimen</h2>

        <p>Plastic verwijderd:
            <span id="plastic-cleanup-count">0</span>/100
        </p>

        <p id="plastic-sea-status">
            Plastic Sea zit nog vol plastic!
        </p>

        <button id="plastic-cleanup-upgrade">
            Plastic opruim upgrade (10 speciale coins)
        </button>
    </div>

    <div class="theme-box">
        <h2>🎨 Thema's</h2>

        <p id="theme-status">
            Je begint zonder thema. Koop een thema met cookies.
        </p>

        <div class="theme-buttons">
            <button data-theme="normal" data-cost="0">
                Normaal thema
            </button>

            <button data-theme="blossem" data-cost="500">
                Blossom (500 cookies)
            </button>

            <button data-theme="ocean" data-cost="5000">
                Ocean (5.000 cookies)
            </button>

            <button data-theme="gold" data-cost="50000">
                Gold (50.000 cookies)
            </button>
        </div>
    </div>
`;

(
    document.querySelector(".factories-panel") ||
    document.querySelector(".upgrades-panel") ||
    document.querySelector("main") ||
    document.body
).appendChild(extraPanel);

const extraGrid = extraPanel.querySelector(".extra-units-grid");

game.extraFactories.forEach((factory, i) => {
    const card = document.createElement("div");

    card.className = "extra-unit-card";

    card.innerHTML = `
        <h3>${factory.name}</h3>

        <p>Bezit:
            <span id="${factory.countId}">0</span>
        </p>

        <p>Productie:
            <span id="${factory.cpsId}">0</span> cookies/sec
        </p>

        <button id="${factory.buttonId}"></button>

        <p>Upgrades:
            <span id="${factory.buttonId}-upgrade-count">0</span>
        </p>

        <button id="${factory.buttonId}-upgrade"></button>
    `;

    extraGrid.appendChild(card);

    document.getElementById(factory.buttonId)
        .addEventListener("click", () => factory.buy(game));

    document.getElementById(factory.buttonId + "-upgrade")
        .addEventListener("click", () =>
            game.extraUpgrades[i].buy(game)
        );
});

// NIEUW: EVENT VOOR PLASTIC OPRUIMEN
document.getElementById("plastic-cleanup-upgrade")
    .addEventListener("click", () =>
        game.plasticCleanup.buy(game)
    );

const originalGetCps = game.getCps.bind(game);

game.getCps = function () {
    return originalGetCps() +
        this.extraFactories.reduce(
            (sum, factory) => sum + factory.getCps(), 0
        ) +
        this.plasticCleanup.productionBonus;
};

let unlockedThemes = [];

function applyTheme(theme) {
    if (theme === "normal") {
        document.body.removeAttribute("data-theme");
        return;
    }

    document.body.dataset.theme = theme;
}

function updateThemeUnlocks() {
    document.querySelectorAll("button[data-theme]").forEach(button => {
        const theme = button.dataset.theme;
        const cost = Number(button.dataset.cost);

        const owned = theme === "normal" ||
            unlockedThemes.includes(theme);

        button.disabled = !owned && game.cookies < cost;

        const names = {
            blossem: "Blossom",
            ocean: "Ocean",
            gold: "Gold"
        };

        if (theme === "normal") {
            button.textContent = "🏠 Normaal thema";
        } else if (owned) {
            button.textContent = names[theme] + " — gekocht";
        } else {
            button.textContent =
                "Koop " + names[theme] +
                " (" + game.formatNumber(cost) + " cookies)";
        }
    });

    const status = document.getElementById("theme-status");

    if (status) {
        status.textContent = unlockedThemes.length
            ? "Gekochte thema's: " + unlockedThemes.join(", ")
            : "Je begint zonder thema. Koop een thema met cookies.";
    }
}

function updatePurchaseButtonStates() {
    function check(id, affordable) {
        const button = document.getElementById(id);

        if (button) {
            button.disabled = !affordable;
        }
    }

    [
        game.ElonMusk,
        game.micheal,
        game.rKelly,
        game.trump,
        ...game.extraFactories
    ].forEach(factory => {
        check(
            factory.buttonId,
            game.cookies >= factory.price
        );
    });

    [
        game.ElonMuskUpgrade,
        game.michealUpgrade,
        game.rKellyUpgrade,
        game.trumpUpgrade,
        ...game.extraUpgrades
    ].forEach(upgrade => {
        check(
            upgrade.buttonId,
            game.specialCoins >= upgrade.price &&
            upgrade.factory.count > 0
        );
    });

    check(
        "special-upgrade",
        game.specialCoins >= game.golden.price
    );

    check(
        "special-upgrade-2",
        game.specialCoins >= game.superFactory.price
    );

    check(
        "crosshair-upgrade",
        game.cookies >= game.crosshair.cookiePrice
    );

    check(
        "elon-musk-island",
        !game.island.bought &&
        game.ElonMuskUpgrade.count >= 10 &&
        game.specialCoins >= game.island.price
    );

    game.specialBuildings.forEach(building => {
        check(
            building.buttonId,
            !building.count &&
            building.requirement() >= 50 &&
            game.specialCoins >= building.cost
        );
    });

    // NIEUW: PLASTIC OPRUIM KNOP
    check(
        "plastic-cleanup-upgrade",
        game.specialCoins >= game.plasticCleanup.price &&
        game.plasticCleanup.count < 100
    );

    updateThemeUnlocks();
}

const originalUpdateDisplay = game.updateDisplay.bind(game);

game.updateDisplay = function () {
    originalUpdateDisplay();

    this.extraFactories.forEach((factory, i) => {
        this.updateFactory(factory);

        const upgrade = this.extraUpgrades[i];

        this.setText(
            upgrade.buttonId + "-count",
            this.formatNumber(upgrade.count)
        );

        this.updateUpgrade(
            upgrade,
            "Upgrade " + factory.name
        );

        // Verander de titel van Plastic Sea in Clean Sea
        if (factory.buttonId === "plastic-sea") {
            const title = document.querySelector(
                "#plastic-sea"
            )?.parentElement.querySelector("h3");

            if (title) {
                title.textContent = this.plasticSeaClean
                    ? "Clean Sea"
                    : "Plastic Sea";
            }
        }
    });

    // NIEUW: PLASTIC OPRUIM WEERGAVE
    this.setText(
        "plastic-cleanup-count",
        this.plasticCleanup.count
    );

    this.setText(
        "plastic-cleanup-upgrade",
        this.plasticCleanup.count >= 100
            ? "Clean Sea bereikt!"
            : `Plastic opruim upgrade (${this.formatNumber(
                this.plasticCleanup.price
            )} speciale coins)`
    );

    this.setText(
        "plastic-sea-status",
        this.plasticSeaClean
            ? "🌊 Clean Sea! Al het plastic is verwijderd!"
            : "Plastic Sea zit nog vol plastic!"
    );

    updatePurchaseButtonStates();
};

function showFlyingCookie() {
    const cookie = document.getElementById("cookie");

    if (!cookie) return;

    const rect = cookie.getBoundingClientRect();
    const crumb = document.createElement("span");

    crumb.className = "flying-cookie";
    crumb.textContent = "🍪";

    crumb.style.left =
        (rect.left + rect.width / 2 +
        (Math.random() * 70 - 35)) + "px";

    crumb.style.top =
        (rect.top + rect.height / 2 +
        (Math.random() * 30 - 15)) + "px";

    document.body.appendChild(crumb);

    setTimeout(() => crumb.remove(), 900);
}

const originalClickCookie = game.clickCookie.bind(game);

game.clickCookie = function () {
    originalClickCookie();

    for (let i = 0; i < 5; i++) {
        showFlyingCookie();
    }
};

document.querySelectorAll("button[data-theme]").forEach(button => {
    button.addEventListener("click", () => {
        const theme = button.dataset.theme;
        const cost = Number(button.dataset.cost);

        if (theme === "normal") {
            applyTheme("normal");
            game.updateDisplay();
            return;
        }

        if (!unlockedThemes.includes(theme)) {
            if (game.cookies < cost) return;

            game.cookies -= cost;
            unlockedThemes.push(theme);
        }

        applyTheme(theme);
        game.updateDisplay();
    });
});

document.body.removeAttribute("data-theme");

game.updateDisplay();

game.startProduction();
game.startSpecialCoins();