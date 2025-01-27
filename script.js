const strips = [...document.querySelectorAll(".strip")];
const numberSize = "4"; // in rem

var lastTime = new Array(-1, -1, -1)

// highlight number i on strip s for 1 second
function highlight(strip, d) {
    strips[strip]
        .querySelector(`.number:nth-of-type(${d + 1})`)
        .classList.add("pop");

    setTimeout(() => {
        strips[strip]
            .querySelector(`.number:nth-of-type(${d + 1})`)
            .classList.remove("pop");
    }, 950); // causes ticking
}

function stripSlider(strip, id, number) {
    let d1 = Math.floor(number / 10);
    let d2 = number % 10;

    if (lastTime[id] == -1 || lastTime[id] != number) {
        strips[strip].style.transform = `translateY(${d1 * -numberSize}rem)`;
        strips[strip + 1].style.transform = `translateY(${d2 * -numberSize}rem)`;

        lastTime[id] = number;
    }

    highlight(strip, d1);
    highlight(strip + 1, d2);
}

function updateClock() {
    // get new time
    const time = new Date();

    // get h,m,s
    const hours = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();

    // slide strips
    stripSlider(0, 0, hours);
    stripSlider(2, 1, mins);
    stripSlider(4, 2, secs);
}

// set Timer for clock-update
setInterval(updateClock, 1000);

updateClock();
