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

var outer_flag = 0;//placement
var filled = 0;
var any_grey = false;
let btn_pressed = false;//placement
let btn_pressed_movement = false;

let node_list = [
    ["node1", "grey"],
    ["node2", "grey"],
    ["node3", "grey"],
    ["node4", "grey"],
    ["node5", "grey"],
    ["node6", "grey"],
    ["node7", "grey"],
    ["node8", "grey"],
    ["node9", "grey"],
    ["node10", "grey"],
    ["node11", "grey"],
    ["node12", "grey"],
    ["node13", "grey"],
    ["node14", "grey"],
    ["node15", "grey"],
    ["node16", "grey"],
    ["node17", "grey"],
    ["node18", "grey"]
];

function set_node_color(id, color) {
    update_color(id, color);
    update_node_list(id, color);
}

function update_color(id, color) {
    const node = document.getElementById(id);
    node.style.backgroundColor = color;
}

function update_node_list(id, color) {
    node_list.forEach(node => {
        if (node[0] == id) {
            node[1] = color;
        }
    })
}

function get_color(id) {
    let x;
    for (let node of node_list) {
        if (node[0] == id) {
            x = node[1];
        }
    }
    return x;
}

let history_array = [];
// let redo_array = [];

function history_display(entry) {
    const history_moves_list = document.getElementById("history_moves_list");

    history_array.push(entry);
    const text_history_array = history_array.map(item => item.text);
    history_moves_list.textContent = text_history_array.join("\n");
    history_moves_list.style.color = "white";
    history_moves_list.scrollTop = history_moves_list.scrollHeight;
}

function history_placement(id, color) {
    let player;
    if (color === "tomato") {
        player = "Player1";
    }
    else if (color === "lightblue") {
        player = "Player2";
    }
    const entry = {
        type: "placement",
        player: player,
        to: id,
        text: `# ${player} places titan at ${id}`
    };

    history_display(entry);
}

function history_movement(source, dest, player_color) {
    let player;
    if (player_color === "tomato") {
        player = "Player1";
    }
    else if (player_color === "lightblue") {
        player = "Player2";
    }
    const entry = {
        type: "movement",
        player: player,
        from: source,
        to: dest,
        text: `# ${player} moves the titan from ${source} to ${dest}`
    };
    history_display(entry);
}

function history_elimination(player_color, node_id) {
    let player;
    if (player_color === "tomato") {
        player = "Player2";
    }
    else if (player_color === "lightblue") {
        player = "Player1";
    }
    const entry = {
        type: "elimination",
        player: player,
        to: node_id,
        text: `# ${player} eliminated the titan at ${node_id}`
    };
    history_display(entry);
}

function update_history() {
    const history_moves_list = document.getElementById("history_moves_list");
    const text_history_array = history_array.map(item => item.text);
    history_moves_list.textContent = text_history_array.join("\n");
    history_moves_list.style.color = "black";
    history_moves_list.scrollTop = history_moves_list.scrollHeight;
}

// function undo_move() {
//     if (history_array.length === 0) {
//         return;
//     }
//     let last_move = history_array.pop();
//     redo_array.push(last_move);

//     if (last_move.type === "placement") {
//         if (any_grey === false) {
//             outer_flag--;
//         }
//         undo_placement(last_move.to, last_move.player);
//     }
//     else if (last_move.type === "movement") {
//         undo_movement(last_move.to, last_move.from, last_move.player);
//     }
//     else if (last_move.type === "elimination") {
//         undo_elimination(last_move.player, last_move.to);
//         while (history_array.length > 0 && history_array[history_array.length - 1].type === "elimination") {
//             last_move = history_array.pop();
//             redo_array.push(last_move);
//             undo_elimination(last_move.player, last_move.to);
//         }
//     }
// }

// function undo_placement(id, player) {
//     for (let node of node_list) {
//         if (node[0] === id) {
//             node[1] = "grey";
//             set_node_color(node[0], node[1]);
//             document.getElementById(id).onclick = null;
//         }
//     }
//     if (player === "Player1") {
//         p1 = true;
//         p2 = false;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer1, 1000);
//         time3=30;
//         key2 = setInterval(timer3, 1000);
//     }
//     else if (player === "Player2") {
//         p1 = false;
//         p2 = true;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer2, 1000);
//         time4=30;
//         key2 = setInterval(timer4, 1000);
//     }
//     update_history();
//     if (outer_flag === 0) {
//         placement_outer_condition();
//     }
//     else if (outer_flag === 1) {
//         if (middle_nodes.includes(id)) {
//             filled--;
//         }
//         placement_inner_condition();
//     }
//     else if (outer_flag === 2) {
//         filled--;
//         node_list.forEach(node => {
//             const node_element = document.getElementById(node[0]);
//             if (node_element.classList.contains("green_highlight")) {
//                 node_element.classList.remove("green_highlight");
//                 node_element.style.border = "2px solid black";
//                 node_element.style.transform = "scale(1)";
//                 node_element.style.cursor = "default";
//                 node_element.style.backgroundColor = "grey";
//                 node_element.style.boxShadow = "none";
//             }
//         });
//         console.log(`filled in undo_placement: ${filled}`);
//         btn_pressed = false;
//         placement_inner_condition();
//     }
// }

// function undo_movement(to, from, player) {
//     if (player === "Player1") {
//         for (let node of node_list) {
//             if (node[0] === to) {
//                 node[1] = "grey";
//                 set_node_color(node[0], node[1]);
//             }
//             if (node[0] === from) {
//                 node[1] = "tomato";
//                 set_node_color(node[0], node[1]);
//             }
//         }
//         p1 = true;
//         p2 = false;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer1, 1000);
//         key2 = setInterval(timer3, 1000);
//     }
//     else if (player === "Player2") {
//         for (let node of node_list) {
//             if (node[0] === to) {
//                 node[1] = "grey";
//                 set_node_color(node[0], node[1]);
//             }
//             if (node[0] === from) {
//                 node[1] = "lightblue";
//                 set_node_color(node[0], node[1]);
//             }
//         }
//         p1 = false;
//         p2 = true;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer2, 1000);
//         key2 = setInterval(timer4, 1000);
//     }
//     update_history();
//     if (player === "Player1") {
//         highlight1(found);
//     }
//     else if (player === "Player2") {
//         highlight2(found);
//     }
// }

// function undo_elimination(player, node_id) {
//     if (player === "Player2") {
//         set_node_color(node_id, "tomato");
//         if (p1) {
//             highlight1(found);
//         }
//         else if (p2) {
//             highlight2(found);
//         }
//     }
//     else if (player === "Player1") {
//         set_node_color(node_id, "lightblue");
//         if (p2) {
//             highlight2(found);
//         }
//         else if (p1) {
//             highlight1(found);
//         }
//     }
//     update_history();
//     addscore();
// }

// function redo_move() {
//     if (redo_array.length === 0) {
//         return;
//     }
//     let last_move = redo_array.pop();
//     history_array.push(last_move);

//     if (last_move.type === "placement") {
//         if(any_grey===true){
//             outer_flag++;
//             redo_placement(last_move.to, last_move.player);
//         }
//     }
//     else if (last_move.type === "movement") {
//         redo_movement(last_move.from, last_move.to, last_move.player);
//     }
// }

// function redo_placement(to, player) {
//     if (player === "Player1") {
//         for (const node of node_list) {
//             if (node[0] === to) {
//                 node[1] = "tomato";
//                 set_node_color(node[0], node[1]);
//             }
//         }
//         p1 = false;
//         p2 = true;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer2, 1000);
//         key2 = setInterval(timer4, 1000);
//     }
//     else if (player === "Player2") {
//         for (const node of node_list) {
//             if (node[0] === to) {
//                 node[1] = "lightblue";
//                 set_node_color(node[0], node[1]);
//             }
//         }
//         p1 = true;
//         p2 = false;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer1, 1000);
//         key2 = setInterval(timer3, 1000);
//     }
//     update_history();
//     if (outer_flag === 0) {
//         placement_outer_condition();
//     }
//     else if (outer_flag === 1) {
//         placement_inner_condition();
//     }
// }

// function redo_movement(from, to, player) {
//     if (player === "Player1") {
//         for (let node of node_list) {
//             if (node[0] === from) {
//                 node[1] = "tomato";
//                 set_node_color(node[0], node[1]);
//             }
//             if (node[0] === to) {
//                 node[1] = "grey";
//                 set_node_color(node[0], node[1]);
//             }
//         }
//         p1 = false;
//         p2 = true;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer2, 1000);
//         key2 = setInterval(timer4, 1000);
//     }
//     else if (player === "Player2") {
//         for (let node of node_list) {
//             if (node[0] === from) {
//                 node[1] = "lightblue";
//                 set_node_color(node[0], node[1]);
//             }
//             if (node[0] === to) {
//                 node[1] = "grey";
//                 set_node_color(node[0], node[1]);
//             }
//         }
//         p1 = true;
//         p2 = false;
//         clearInterval(key1);
//         clearInterval(key2);
//         key1 = setInterval(timer1, 1000);
//         key2 = setInterval(timer3, 1000);
//     }
//     update_history();
//     check_win_condition();
// }

function switch_player() {
    if (p1) {
        p1 = false;
        p2 = true;
        clear_interval();
        set_timer_interval(timer2, timer4);
    }
    else if (p2) {
        p1 = true;
        p2 = false;
        clear_interval();
        set_timer_interval(timer1, timer3);
    }
}

function clear_interval() {
    clearInterval(key1);
    clearInterval(key2);
}

function set_timer_interval(main_timer, move_timer) {
    key1 = setInterval(main_timer, 1000);
    key2 = setInterval(move_timer, 1000);
}
const outer_nodes = ["node1", "node2", "node12", "node17", "node18", "node7"];
const middle_nodes = ["node3", "node4", "node11", "node16", "node15", "node8"];
const inner_nodes = ["node5", "node6", "node9", "node10", "node13", "node14"];

function play_next_circuit_unlock() {
    const next_circuit_unlock = document.getElementById("next_circuit_unlock");
    next_circuit_unlock.playbackRate = 1;
    next_circuit_unlock.play();
}

function play_click() {
    const click = document.getElementById("click");
    click.playbackRate = 1.25;
    click.play();
}

function play_select_click() {
    const select_click = document.getElementById("select_click");
    select_click.playbackRate = 1;
    select_click.play();
}

function play_movement() {
    const movement = document.getElementById("movement");
    movement.playbackRate = 1;
    movement.play();
}

function play_winning_notification() {
    const winning_notification = document.getElementById("winning_notification");
    winning_notification.playbackRate = 1;
    winning_notification.play();
}

function play_select() {
    const select = document.getElementById("select");
    select.playbackRate = 1;
    select.play();
}

function play_lose() {
    const lose = document.getElementById("lose");
    lose.playbackRate = 1;
    lose.play();
}

function diagonal_lines(n1, n2) {

    const btn1 = document.getElementById(`node${n1}`);
    const btn2 = document.getElementById(`node${n2}`);
    const linesContainer = document.getElementById("lines_container");


    const rect1 = btn1.getBoundingClientRect();
    const rect2 = btn2.getBoundingClientRect();
    const containerRect = linesContainer.getBoundingClientRect();

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
    line.style.backgroundColor = "black";
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.zIndex = "0";

    document.getElementById("lines_container").appendChild(line);
}
function drawLines() {
    const container = document.getElementById("lines_container");
    container.innerHTML = '';

    diagonal_lines(18, 16);
    diagonal_lines(4, 2);
    diagonal_lines(7, 8);
    diagonal_lines(5, 3);
    diagonal_lines(10, 11);
    diagonal_lines(15, 13);
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
    weight.style.color = "tomato";
    weight.style.position = "absolute";
    weight.style.backgroundColor = "white";
    weight.style.left = `${midX}px`;
    weight.style.top = `${midY}px`;
    weight.style.zIndex = "1";
    weight.style.fontSize = "1em";
    weight.style.fontWeight = "bold";

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

        const color1 = get_color(btn1.id);
        const color2 = get_color(btn2.id);

        if (color1 === color2) {
            if (color1 === "tomato") {
                red_score += weight;
            }
            else if (color1 === "lightblue") {
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

var filled = 0;
const outer_btns = document.querySelectorAll(".playable1");
const middle_btns = document.querySelectorAll(".playable2");
const outer_middle_btns = document.querySelectorAll(".playable");

function placement(btn1) {
    if (p1) {
        set_node_color(btn1.id, "tomato");
        history_placement(btn1.id, "tomato");
        switch_player();
        addscore();

        time4 = 30;
        document.getElementById("stopwatch1").textContent = `${time4 < 10 ? '0' + time4 : time4}`;
    }

    else if (p2) {
        set_node_color(btn1.id, "lightblue");
        history_placement(btn1.id, "lightblue");
        switch_player();
        addscore();

        time3 = 30;
        document.getElementById("stopwatch2").textContent = `${time3 < 10 ? '0' + time3 : time3}`;
    }

    placement_outer_condition();
}

function placement_inner_condition() {
    if (filled < 2) {
        middle_btns.forEach(btn2 => {

            btn2.onclick = function () {
                play_click();
                const check1 = get_color(btn2.id) === "tomato";
                const check2 = get_color(btn2.id) === "lightblue";

                if (!check1 && !check2) {
                    if (p1) {
                        set_node_color(btn2.id, "tomato");
                        history_placement(btn2.id, "tomato");
                        switch_player();
                    }
                    else {
                        set_node_color(btn2.id, "lightblue");
                        history_placement(btn2.id, "lightblue");
                        switch_player();
                    }
                    addscore();
                    filled++;
                    outer_flag++;
                    // console.log(`filled in placement_inner_condition: ${filled}`);
                    // check_undo_placement();
                    // console.log(`after check_undo_placement: ${filled}`);
                    if (filled == 2) {
                        check_titan_elimination();
                        middle_btns.forEach(btn2 => {
                            btn2.onclick = null;
                        })
                        movement();
                    }
                }
            }
        })
    }
}

placement_outer_condition();

function placement_outer_condition() {
    any_grey = false;
    for (let outer_node of outer_nodes) {
        const btn = document.getElementById(outer_node);
        const bg = get_color(btn.id);

        if (bg === "grey") {
            any_grey = true;
        }
    }
    if (any_grey === true) {
        outer_btns.forEach(btn1 => {

            btn1.onclick = function () {
                play_click();
                const check1 = get_color(btn1.id) === "tomato";
                const check2 = get_color(btn1.id) === "lightblue";
                if (!check1 && !check2) {
                    placement(btn1);
                }
            }

        })

    }
    if (any_grey === false) {
        outer_flag++;
        play_next_circuit_unlock();
        placement_inner_condition();
    }

}
// function check_undo_placement() {
//     if (filled == 2 && btn_pressed == true) {
//         undo_move();
//     }
// }
var minute1;
var second1;

function timer1() {
    if (time1 < 0) {
        clear_interval();
        play_winning_notification();
        setTimeout(() => {
            alert("Player 2 WON!!!");
            location.reload();
        }, 300);
    }

    else {
        minute1 = Math.floor(time1 / 60);
        second1 = Math.floor((time1 - (minute1 * 60)));
        if (second1 < 10) {
            second1 = "0" + second1;
        }
        document.getElementById("timer1").textContent = minute1 + ":" + second1;
        time1--;
    }
}

function timer2() {
    if (time2 < 0) {
        clear_interval();
        play_winning_notification();
        setTimeout(() => {
            alert("Player 1 WON!!!");
            location.reload();
        }, 300);
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
        clear_interval();
        play_winning_notification();
        setTimeout(() => {
            if (p1) {
                alert("Player 2 WON!!!");
            }
            else {
                alert("Player 1 WON!!!");
            }
            location.reload();
        }, 300);
    }
    else {
        document.getElementById("stopwatch1").textContent = `${time3 < 10 ? '0' + time3 : time3}`;
        time3--;
    }
}

function timer4() {
    if (time4 < 0) {
        clear_interval();
        play_winning_notification();
        setTimeout(() => {
            if (p1) {
                alert("Player 2 WON!!!");
            }
            else {
                alert("Player 1 WON!!!");
            }
            location.reload();
        }, 300);
    }
    else {
        document.getElementById("stopwatch2").textContent = `${time4 < 10 ? '0' + time4 : time4}`;
        time4--;
    }
}

const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const reset = document.getElementById("reset");
// const undo = document.getElementById("undo");
// const redo = document.getElementById("redo");
const history = document.getElementById("history");

if (document.getElementById("timer1").textContent == `2:00` && p1) {
    set_timer_interval(timer1, timer3);
}

pause.onclick = function () {
    play_select();
    pause_timer();
}

resume.onclick = function () {
    play_select();
    resume_timer();
}

reset.onclick = function () {
    play_select();
    setTimeout(() => {
        reset_timer();
    }, 300);
}
// undo.onclick = function () {
//     node_list.forEach(node => {
//         const btn = document.getElementById(node[0]);
//         if (btn.classList.contains("green_highlight") && btn_pressed_movement) {
//             node[1] = "grey";
//             set_node_color(node[0], node[1]);
//             btn.classList.remove("green_highlight");
//             btn.style.boxShadow = "none";
//         }
//     })
//     undo_btn_pressed = true;
//     play_select();
//     undo_move();
// }

// redo.onclick = function () {
//     play_select();
//     redo_move();
// }

history.onclick = function () {
    console.log("history");
    play_select();
    show_history();
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
            set_timer_interval(timer1, timer3);
        }
        else if (p2 && time2 > 0) {
            set_timer_interval(timer2, timer4);
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

function show_history() {
    const history_moves = document.getElementById("history_moves");
    if (history_moves.style.display === "none") {
        history_moves.style.display = "block";
        update_history();
    }
    else {
        history_moves.style.display = "none";
    }
}


function movement() {
    p1 = true;
    p2 = false;
    clear_interval();
    set_timer_interval(timer1, timer3);
    check_win_condition();

}

function check_win_condition() {
    const innerNodes = document.querySelectorAll(".playable3");
    let all_coloured = true;

    innerNodes.forEach(node => {
        if (get_color(node.id) !== "lightblue" && get_color(node.id) !== "tomato") {
            all_coloured = false;
        }
    })

    check_if_all_died();

    if (all_coloured) {
        play_winning_notification();
        setTimeout(() => {
            if (red_score > blue_score) {
                alert("Player 1 WON!!!");
            }
            else if (red_score < blue_score) {
                alert("Player 2 WON!!!");
            }
            else if (red_score === blue_score) {
                alert("Draw!!!");
            }
            location.reload();
        }, 1000);
        return;
    }
    else {
        check_titan_elimination();
        check_middle_nodes();
    }
}

function remove_green_highlight() {
    const all_nodes = document.querySelectorAll(".node");
    all_nodes.forEach(node => {
        node.classList.remove("green_highlight");
        node.style.boxShadow = "none";
    })
}

function check_titan_elimination() {
    const all_nodes = document.querySelectorAll(".node");

    all_nodes.forEach(node => {

        if (get_color(node.id) === "tomato") {
            const neighbours = graph[node.id];
            let all_blue = true;

            neighbours.forEach(neighbour => {
                const neighbour_btn = document.getElementById(neighbour);

                if (get_color(neighbour_btn.id) !== "lightblue") {
                    all_blue = false;
                }

            })

            if (all_blue) {
                // node.style.transition = "background-color 0.5s ease-in-out";
                play_lose();
                set_node_color(node.id, "grey");
                remove_green_highlight();
                node.onclick = null;
                history_elimination("tomato", node.id);
            }

        }
        else if (get_color(node.id) === "lightblue") {
            const neighbours = graph[node.id];
            let all_red = true;

            neighbours.forEach(neighbour => {
                const neighbour_btn = document.getElementById(neighbour);

                if (get_color(neighbour_btn.id) !== "tomato") {
                    all_red = false;
                }

            })

            if (all_red) {
                play_lose();
                set_node_color(node.id, "grey");
                remove_green_highlight();
                node.onclick = null;
                history_elimination("lightblue", node.id);
            }

        }
        check_if_all_died();
    })
}

let game_over_flag = false;

function check_if_all_died() {
    if(game_over_flag){
        return;
    }

    let all_died_red = true;
    let all_died_blue = true;

    for (let node of node_list) {
        if (node[1] === "tomato") {
            all_died_red = false;
        }
        if (node[1] === "lightblue") {
            all_died_blue = false;
        }
    }

    if (all_died_red || all_died_blue) {
        game_over_flag = true;
        play_winning_notification();
        clear_interval();
        setTimeout(() => {
            if (all_died_red) {
                alert("Player 2 WON!!!");
            }
            else {
                alert("Player 1 WON!!!");
            }
            location.reload();
        }, 1000);
    }

}

let flag = false;
let found = false;
let audio_flag = true;

function check_middle_nodes() {
    let middle_nodes_full = true;

    middle_nodes.forEach(middle_node => {
        const bg = get_color(middle_node);
        if (bg != "lightblue" && bg != "tomato") {
            middle_nodes_full = false;
        }
    })

    if (!middle_nodes_full) {
        if (p1) {
            highlight1(found);
        }
        else if (p2) {
            highlight2(found);
        }
    }

    else if (middle_nodes_full || flag === true) {
        flag = true;
        found = true;
        if (p1) {
            highlight1(found);
        }
        else if (p2) {
            highlight2(found);
        }
    }
    
    if (middle_nodes_full && audio_flag) {
        play_next_circuit_unlock();
        audio_flag = false;
    }

}

function highlight1(found) {
    btn_pressed_movement = false;
    const all_nodes = document.querySelectorAll(".node");

    all_nodes.forEach(n => {
        if (get_color(n.id) === "lightgreen") {
            set_node_color(n.id, "grey");
        }
        remove_green_highlight();
        n.onclick = null;
    });

    all_nodes.forEach(btn => {
        if (get_color(btn.id) === "tomato") {

            btn.onclick = function () {
                play_select_click();

                all_nodes.forEach(n => {
                    if (get_color(n.id) === "lightgreen") {
                        set_node_color(n.id, "grey");
                        remove_green_highlight();
                        n.onclick = null;
                    }
                });

                const neighbours = graph[btn.id];
                const new_neighbours = [...neighbours];

                if (!found) {
                    for (let neighbour of neighbours) {
                        if (inner_nodes.includes(neighbour)) {
                            const i = new_neighbours.indexOf(neighbour);
                            if (i !== -1) {
                                new_neighbours.splice(i, 1);
                            }
                        }
                    }
                }

                new_neighbours.forEach(neighbourbtn => {
                    const n_btn = document.getElementById(neighbourbtn);
                    const check1 = get_color(n_btn.id) === "tomato";
                    const check2 = get_color(n_btn.id) === "lightblue";
                    if (!check1 && !check2 && p1) {
                        n_btn.classList.add("green_highlight");
                        n_btn.style.boxShadow = "0 0 10px red";
                        set_node_color(n_btn.id, "lightgreen");
                        btn_pressed_movement = true;
                        n_btn.onclick = null;
                        n_btn.onclick = function () {
                            play_movement();
                            movement1(n_btn.id, btn.id);
                            new_neighbours.forEach(n => {
                                const n_btn = document.getElementById(n);
                                remove_green_highlight();
                            })
                            addscore();
                        }
                    }
                })
            }
        }
    })
}
function highlight2(found) {
    btn_pressed_movement = false;
    const all_nodes = document.querySelectorAll(".node");
    all_nodes.forEach(n => {
        if (get_color(n.id) === "lightgreen") {
            set_node_color(n.id, "grey");
        }
        remove_green_highlight();
        n.onclick = null;
    });
    all_nodes.forEach(node => {
        if (get_color(node.id) === "lightblue" && p2) {
            node.onclick = function () {
                play_select_click();
                all_nodes.forEach(n => {
                    if (get_color(n.id) === "lightgreen") {
                        set_node_color(n.id, "grey");
                        remove_green_highlight();
                        n.onclick = null;
                    }
                });

                const neighbours = graph[node.id];
                const new_neighbours = [...neighbours];

                if (!found) {

                    for (let neighbour of neighbours) {
                        if (inner_nodes.includes(neighbour)) {
                            const i = new_neighbours.indexOf(neighbour);
                            if (i !== -1) {
                                new_neighbours.splice(i, 1);
                            }
                        }
                    }
                }

                new_neighbours.forEach(neighbourbtn => {
                    const btn = document.getElementById(neighbourbtn);
                    const check1 = get_color(btn.id) === "tomato";
                    const check2 = get_color(btn.id) === "lightblue";
                    if (!check1 && !check2 && p2) {
                        set_node_color(btn.id, "lightgreen");
                        btn.classList.add("green_highlight");
                        btn.style.boxShadow = "0 0 15px rgb(10, 10, 255)";
                        btn_pressed_movement = true;
                        btn.onclick = null;
                        btn.onclick = function () {
                            play_movement();
                            movement2(btn.id, node.id);
                            new_neighbours.forEach(n => {
                                const n_btn = document.getElementById(n);
                                remove_green_highlight();
                            })
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

    btn_pressed_movement = false;
    remove_green_highlight();

    update_node_list(source.id, "grey");
    update_node_list(dest.id, "tomato");
    history_movement(source.id, dest.id, "tomato");

    setTimeout(() => {
        dest.style.transition = "background-color 0.5s ease-in-out";
        source.style.transition = "background-color 0.5s ease-in-out";

        update_color(source.id, "grey");
        update_color(dest.id, "tomato");
    }, 200);

    document.querySelectorAll(".node").forEach(n => {
        if (get_color(n.id) === "lightgreen") {
            set_node_color(n.id, "grey");
            n.onclick = null;
            addscore();
        }
    })

    switch_player();
    clear_interval();
    set_timer_interval(timer2, timer4);

    time3 = 30;
    document.getElementById("stopwatch1").textContent = `${time3 < 10 ? "0" + time3 : time3}`;

    console.log(node_list);
    check_win_condition();
}

function movement2(btn, node) {
    const dest = document.getElementById(btn);
    const source = document.getElementById(node);

    btn_pressed_movement = false;

    update_node_list(source.id, "grey");
    update_node_list(dest.id, "lightblue");
    history_movement(source.id, dest.id, "lightblue");

    setTimeout(() => {
        dest.style.transition = "background-color 0.5s ease-in-out";
        source.style.transition = "background-color 0.5s ease-in-out";
        update_color(source.id, "grey");
        update_color(dest.id, "lightblue");
    }, 200);

    document.querySelectorAll(".node").forEach(n => {
        if (get_color(n.id) === "lightgreen") {
            set_node_color(n.id, "grey");
            n.onclick = null;
            addscore();
        }
    })

    switch_player();
    clear_interval();
    set_timer_interval(timer1, timer3);

    time4 = 30;
    document.getElementById("stopwatch2").textContent = `${time4 < 10 ? "0" + time4 : time4}`;
    check_win_condition();
}
