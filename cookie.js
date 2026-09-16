let count = 0;
let cookiesPerSecond = 0;

let clickCount = 0;
let specialCoins = 0;


let upgradePrice = 10;
let michealJacksonPrice = 100;


let epsteinCount = 0;
let michealJacksonCount = 0;


let goldenCount = 0;
let superCount = 0;


const button = document.getElementById("cookie");
const counter = document.getElementById("counter");
const cpsDisplay = document.getElementById("cps");

const upgrade = document.getElementById("epstein");
const michealJacksonUpgrade =
    document.getElementById("micheal-jackson");

const specialCoinsDisplay =
    document.getElementById("special-coins");

const clickCountDisplay =
    document.getElementById("click-count");

const epsteinCountDisplay =
    document.getElementById("epstein-count");

const michealCountDisplay =
    document.getElementById("micheal-count");

const specialUpgrade =
    document.getElementById("special-upgrade");

const specialUpgrade2 =
    document.getElementById("special-upgrade-2");

const goldenCountDisplay =
    document.getElementById("golden-count");

const superCountDisplay =
    document.getElementById("super-count");



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

    goldenCountDisplay.textContent =
        goldenCount;

    superCountDisplay.textContent =
        superCount;

}



button.addEventListener("click", function() {

    count++;

    clickCount++;

    
    if (clickCount % 1000 === 0) {

        specialCoins++;

      
    }

    updateDisplay();

});



upgrade.addEventListener("click", function() {

    if (count >= upgradePrice) {

        count -= upgradePrice;

        cookiesPerSecond += 1;

        epsteinCount++;

        upgradePrice *= 1.5;

        upgrade.textContent =
            "Epstein fabriek (" +
            Math.ceil(upgradePrice) +
            " cookies)";

        updateDisplay();

    }

});



michealJacksonUpgrade.addEventListener(
    "click",
    function() {

        if (count >= michealJacksonPrice) {

            count -= michealJacksonPrice;

            cookiesPerSecond += 10;

            michealJacksonCount++;

            michealJacksonPrice *= 1.5;

            michealJacksonUpgrade.textContent =
                "Micheal Jackson fabriek (" +
                Math.ceil(michealJacksonPrice) +
                " cookies)";

            updateDisplay();

        }

    }
);



setInterval(function() {

    specialCoins++;


    updateDisplay();

}, 600000);



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


setInterval(function() {

    count += cookiesPerSecond;

    updateDisplay();

}, 1000);



updateDisplay();