let p1 = true;
let p2 = false;
let minute;
let second;
let time1 = 2 * 60;
let time2 = 2 * 60;
let time3 = 30;
let time4 = 30;
let key1 = null;
let key2 = null;
let red_score;
let blue_score;


function diagonal_lines(n1, n2) {

    const btn1 = document.getElementById(`node${n1}`);
    const btn2 = document.getElementById(`node${n2}`);
    const linesContainer = document.getElementById("lines_container");


    const rect1 = btn1.getBoundingClientRect();
    const rect2 = btn2.getBoundingClientRect();
    const containerRect = linesContainer.getBoundingClientRect();


    // console.log(rect1, rect2);

    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
    const y1 = rect1.top + rect1.height / 2 - containerRect.top;

    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
    const y2 = rect2.top + rect2.height / 2 - containerRect.top;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    const line = document.createElement('div');
    line.style.position = "absolute";
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
    line.style.height = `2px`;
    line.style.width = `${length}px`;
    line.style.backgroundColor = "white";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.zIndex = "0";

    document.getElementById("lines_container").appendChild(line);
}
function drawLines() {
    const container = document.getElementById("lines_container");
    container.innerHTML = '';

    diagonal_lines(4, 2);
    diagonal_lines(5, 3);
    diagonal_lines(7, 8);
    diagonal_lines(10, 11);
    diagonal_lines(15, 13);
    diagonal_lines(18, 16);
}
window.addEventListener('load', drawLines);

window.addEventListener('resize', drawLines);

const edges = [

    { n1: 1, n2: 2, weight: 1 },
    { n1: 1, n2: 7, weight: 2 },
    { n1: 2, n2: 4, weight: 1 },
    { n1: 2, n2: 12, weight: 2 },
    { n1: 3, n2: 4, weight: 6 },
    { n1: 3, n2: 5, weight: 1 },
    { n1: 3, n2: 8, weight: 5 },
    { n1: 4, n2: 11, weight: 4 },
    { n1: 5, n2: 6, weight: 8 },
    { n1: 5, n2: 9, weight: 8 },
    { n1: 6, n2: 10, weight: 9 },
    { n1: 7, n2: 8, weight: 1 },
    { n1: 7, n2: 17, weight: 3 },
    { n1: 8, n2: 15, weight: 4 },
    { n1: 9, n2: 13, weight: 9 },
    { n1: 10, n2: 11, weight: 1 },
    { n1: 10, n2: 14, weight: 8 },
    { n1: 11, n2: 16, weight: 5 },
    { n1: 12, n2: 18, weight: 1 },
    { n1: 13, n2: 14, weight: 8 },
    { n1: 13, n2: 15, weight: 1 },
    { n1: 15, n2: 16, weight: 6 },
    { n1: 16, n2: 18, weight: 6 },
    { n1: 17, n2: 18, weight: 1 },

];

function weights(n1, n2, x) {
    const btn1 = document.getElementById(`node${n1}`);
    const btn2 = document.getElementById(`node${n2}`);
    const weightsContainer = document.getElementById("weights_container");


    const rect1 = btn1.getBoundingClientRect();
    const rect2 = btn2.getBoundingClientRect();
    const containerRect = weightsContainer.getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
    const y1 = rect1.top + rect1.height / 2 - containerRect.top;

    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
    const y2 = rect2.top + rect2.height / 2 - containerRect.top;

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    const weight = document.createElement("div");
    weight.textContent = `${x}`;
    weight.style.color = "orange";
    weight.style.backgroundColor = "black"
    weight.style.position = "absolute";
    weight.style.left = `${midX}px`;
    weight.style.top = `${midY}px`;
    weight.style.zIndex = "100000";
    weight.style.fontSize = "1em"

    weightsContainer.appendChild(weight);

}

function addweights() {
    const container = document.getElementById("weights_container");
    container.innerHTML = '';
    edges.forEach(({ n1, n2, weight }) => {
        weights(n1, n2, weight);
    });
}
function addscore() {
    red_score = 0;
    blue_score = 0;


    edges.forEach(({ n1, n2, weight }) => {
        const btn1 = document.getElementById(`node${n1}`);
        const btn2 = document.getElementById(`node${n2}`);
        const color1 = btn1.style.backgroundColor;
        const color2 = btn2.style.backgroundColor;

        if (color1 === color2) {
            if (color1 === "red") {
                red_score += weight;
            }
            else if (color1 === "blue") {
                blue_score += weight;
            }
        }
    })
    const red_score_element = document.getElementById("red_score");
    const blue_score_element = document.getElementById("blue_score");
    red_score_element.textContent = "Red:" + red_score;
    blue_score_element.textContent = "Blue:" + blue_score;

}

window.addEventListener('load', addweights);

window.addEventListener('resize', addweights);

const graph = {
    node1: ['node2', 'node7'],
    node2: ['node1', 'node4', 'node12'],
    node3: ['node5', 'node4', 'node8'],
    node4: ['node2', 'node3', 'node11'],
    node5: ['node3', 'node6', 'node9'],
    node6: ['node5', 'node10'],
    node7: ['node1', 'node17', 'node8'],
    node8: ['node7', 'node3', 'node15'],
    node9: ['node5', 'node13'],
    node10: ['node6', 'node14', 'node11'],
    node11: ['node4', 'node10', 'node16'],
    node12: ['node2', 'node18'],
    node13: ['node9', 'node14', 'node15'],
    node14: ['node10', 'node13'],
    node15: ['node8', 'node13', 'node16'],
    node16: ['node11', 'node15', 'node18'],
    node17: ['node7', 'node18'],
    node18: ['node12', 'node16', 'node17']
};
let count1 = 0;
let count2 = 0;
let filled = 0;
const outer_btns = document.querySelectorAll(".playable1");
const middle_btns = document.querySelectorAll(".playable2");
const outer_middle_btns = document.querySelectorAll(".playable");

outer_btns.forEach(btn1 => {

    console.log(outer_middle_btns);
    btn1.onclick = function () {
        const check1 = btn1.style.backgroundColor === "red";
        const check2 = btn1.style.backgroundColor === "blue";
        if ((count1 < 3 || count2 < 3) && p1 && !check1 && !check2) {
            btn1.style.backgroundColor = "red";
            count1++;
            filled++;
            p1 = false;
            p2 = true;

            clearInterval(key1);
            clearInterval(key2);
            key1 = setInterval(timer2, 1000);
            time4 = 30;
            document.getElementById("stopwatch1").textContent = `${time4 < 10 ? '0' + time4 : time4}`;
            key2 = setInterval(timer4, 1000);
            addscore();
        }
        else if ((count2 < 3 || count1 < 3) && p2 && !check2 && !check1) {
            btn1.style.backgroundColor = "blue";
            count2++;
            filled++;
            p2 = false;
            p1 = true;

            clearInterval(key1);
            clearInterval(key2);
            key1 = setInterval(timer1, 1000);
            time3 = 30;
            document.getElementById("stopwatch2").textContent = `${time3 < 10 ? '0' + time3 : time3}`;
            key2 = setInterval(timer3, 1000);
            addscore();
        }
        console.log(filled);
    }

})

middle_btns.forEach(btn2 => {
    btn2.onclick = function () {
        const check1 = btn2.style.backgroundColor === "red";
        const check2 = btn2.style.backgroundColor === "blue";
        if (filled >= 6 && filled < 8) {

            if ((count1 < 4 || count2 < 4) && p1 && !check1 && !check2) {
                btn2.style.backgroundColor = "red";
                count1++;
                p1 = false;
                p2 = true;
                filled++;

                clearInterval(key1);
                clearInterval(key2);
                key1 = setInterval(timer2, 1000);
                time4 = 30;
                document.getElementById("stopwatch1").textContent = `${time4 < 10 ? '0' + time4 : time4}`;
                key2 = setInterval(timer4, 1000);
                addscore();
            }
            else if ((count2 < 4 || count1 < 4) && p2 && !check1 && !check2) {
                btn2.style.backgroundColor = "blue";
                count2++;
                p1 = true;
                p2 = false;
                filled++;

                clearInterval(key1);
                clearInterval(key2);
                key1 = setInterval(timer1, 1000);
                time3 = 30;
                document.getElementById("stopwatch2").textContent = `${time3 < 10 ? '0' + time3 : time3}`;
                key2 = setInterval(timer3, 1000);
                addscore();
            }
            console.log(count1);
            console.log(count2);
            console.log(filled);
        }
        if (filled === 8) {
            movement();
        }
    }
})

function timer1() {
    if (time1 < 0) {
        clearInterval(key1);
        clearInterval(key2);
        alert("Player 2 WON!!!");
        location.reload();
    }

    else {
        let minute1 = Math.floor(time1 / 60);
        let second1 = Math.floor((time1 - (minute1 * 60)));
        if (second1 < 10) {
            second1 = "0" + second1;
        }
        document.getElementById("timer1").textContent = minute1 + ":" + second1;
        time1--;
    }
}

function timer2() {
    if (time2 < 0) {
        clearInterval(key1);
        clearInterval(key2);
        alert("Player 1 WON!!!");
        location.reload();
    }
    else {
        let minute2 = Math.floor(time2 / 60);
        let second2 = Math.floor((time2 - (minute2 * 60)));
        if (second2 < 10) {
            second2 = "0" + second2;
        }
        document.getElementById("timer2").textContent = minute2 + ":" + second2;
        time2--;
    }
}

function timer3() {
    if (time3 < 0) {
        clearInterval(key1);
        clearInterval(key2);
        if (p1) {
            alert("Player 2 WON!!!");
        }
        else {
            alert("Player 1 WON!!!");
        }
        location.reload();
    }
    else {
        document.getElementById("stopwatch1").textContent = `${time3 < 10 ? '0' + time3 : time3}`;
        time3--;
    }
}

function timer4() {
    if (time4 < 0) {
        clearInterval(key1);
        clearInterval(key2);
        if (p1) {
            alert("Player 2 WON!!!");
        }
        else {
            alert("Player 1 WON!!!");
        }
        location.reload();
    }
    else {
        document.getElementById("stopwatch2").textContent = `${time4 < 10 ? '0' + time4 : time4}`;
        time4--;
    }
}

const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const reset = document.getElementById("reset");

if (document.getElementById("timer1").textContent == `2:00` && p1) {
    key1 = setInterval(timer1, 1000);
    key2 = setInterval(timer3, 1000);
}

pause.onclick = function () {
    pause_timer();
}

resume.onclick = function () {
    resume_timer();
}

reset.onclick = function () {
    reset_timer();
}

function pause_timer() {
    clearInterval(key1);
    key1 = null;
    clearInterval(key2);
    key2 = null;
}

function resume_timer() {
    if (key1 == null && key2 == null) {
        if (p1 && time1 > 0) {
            key1 = setInterval(timer1, 1000);
            key2 = setInterval(timer3, 1000);
        }
        else if (p2 && time2 > 0) {
            key1 = setInterval(timer2, 1000);
            key2 = setInterval(timer4, 1000);
        }
    }

}

function reset_timer() {
    clearInterval(key1);
    key1 = null;
    clearInterval(key2);
    key2 = null;
    time1 = 2 * 60;
    time2 = 2 * 60;
    time3 = 30;
    time4 = 30;
    minute1 = Math.floor(time1 / 60);
    second1 = Math.floor((time1 - (minute1 * 60)));
    document.getElementById("timer1").textContent = `${minute1}:${second1 < 10 ? '0' + second1 : second1}`;
    document.getElementById("timer2").textContent = `${minute1}:${second1 < 10 ? '0' + second1 : second1}`;
    document.getElementById("stopwatch1").textContent = `${time3 < 10 ? '0' + time3 : time3}`;
    document.getElementById("stopwatch2").textContent = `${time4 < 10 ? '0' + time4 : time4}`;
    location.reload();
}


function movement() {
    p1 = true;
    p2 = false;
    clearInterval(key1);
    clearInterval(key2);
    key1 = setInterval(timer1, 1000);
    key2 = setInterval(timer3, 1000);
    check_win_condition();

}

function check_win_condition() {
    const innerNodes = document.querySelectorAll(".playable3");
    let all_grey = true;
    innerNodes.forEach(node => {
        if (node.style.backgroundColor !== "blue" && node.style.backgroundColor !== "red") {
            all_grey = false;
        }
    })
    if (all_grey) {
        setTimeout(() => {
            if (red_score > blue_score) {
                alert("Player 1 WON!!!");
            }
            else if (red_score < blue_score) {
                alert("Player 2 WON!!!");
            }
            else {
                alert("Draw!!!");
            }
            location.reload();
        }, 1000);
    }
    else {
        if (p1) {
            highlight1();
        }
        else if (p2) {
            highlight2();
        }
    }
}

function highlight1() {
    const all_nodes = document.querySelectorAll(".node");
    all_nodes.forEach(node => {
        if (node.style.backgroundColor === "red" && p1) {
            node.onclick = function () {
                all_nodes.forEach(n => {
                    if (n.style.backgroundColor === "green") {
                        n.style.backgroundColor = "grey";
                        n.onclick = null;
                    }
                });

                const neighbours = graph[node.id];
                neighbours.forEach(neighbourbtn => {
                    const btn = document.getElementById(neighbourbtn);
                    const check1 = btn.style.backgroundColor === "red";
                    const check2 = btn.style.backgroundColor === "blue";
                    if (!check1 && !check2 && p1) {
                        btn.style.backgroundColor = "green";
                        btn.onclick = null;
                        btn.onclick = function () {
                            movement1(btn.id, node.id);
                            addscore();
                        }
                    }
                })
            }
        }
    })
}

function highlight2() {
    const all_nodes = document.querySelectorAll(".node");
    all_nodes.forEach(node => {
        if (node.style.backgroundColor === "blue" && p2) {
            node.onclick = function () {
                all_nodes.forEach(n => {
                    if (n.style.backgroundColor === "green") {
                        n.style.backgroundColor = "grey";
                        n.onclick = null;
                    }
                })
                const neighbours = graph[node.id];
                neighbours.forEach(neighbourbtn => {
                    const btn = document.getElementById(neighbourbtn);
                    const check1 = btn.style.backgroundColor === "red";
                    const check2 = btn.style.backgroundColor === "blue";
                    if (!check1 && !check2 && p2) {
                        btn.style.backgroundColor = "green";
                        btn.onclick = null;
                        btn.onclick = function () {
                            movement2(btn.id, node.id);
                            addscore();
                        }
                    }
                })
            }
        }
    })
}

function movement1(btn, node) {
    const dest = document.getElementById(btn);
    const source = document.getElementById(node);
    source.style.backgroundColor = "grey";
    dest.style.backgroundColor = "red";

    document.querySelectorAll(".node").forEach(n => {
        if (n.style.backgroundColor === "green") {
            n.style.backgroundColor = "grey";
            n.onclick = null;
            addscore();
        }
    })

    p1 = false;
    p2 = true;

    clearInterval(key1);
    clearInterval(key2);
    key1 = setInterval(timer2, 1000);
    time3 = 30;
    document.getElementById("stopwatch1").textContent = `${time3 < 10 ? "0" + time3 : time3}`;
    key2 = setInterval(timer4, 1000);

    check_win_condition();
}

function movement2(btn, node) {
    const dest = document.getElementById(btn);
    const source = document.getElementById(node);
    source.style.backgroundColor = "grey";
    dest.style.backgroundColor = "blue";

    document.querySelectorAll(".node").forEach(n => {
        if (n.style.backgroundColor === "green") {
            n.style.backgroundColor = "grey";
            n.onclick = null;
            addscore();
        }
    })

    p1 = true;
    p2 = false;

    clearInterval(key1);
    clearInterval(key2);
    key1 = setInterval(timer1, 1000);
    time4 = 30;
    document.getElementById("stopwatch2").textContent = `${time4 < 10 ? "0" + time4 : time4}`;
    key2 = setInterval(timer3, 1000);
    check_win_condition();
}
