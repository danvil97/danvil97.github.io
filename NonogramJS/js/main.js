let puzzleArr;

let startTime;
let endTime;
let gridObj = document.getElementById('gameGrid');
let curScore;
let hintsV = new Array();
let hintsH = new Array();

gridObj.onclick = function (event) {
    let target = event.target; // где был клик?

    if (target.tagName != 'TD' || target.classList.contains('hint'))
        return; // не на TD? тогда не интересует
    fillIt(target); // подсветить TD
};

gridObj.oncontextmenu = function (event) {
    let target = event.target; // где был клик?
    if (event)
        event.preventDefault();
    if (target.tagName != 'TD' || target.classList.contains('hint'))
        return; // не на TD? тогда не интересует
    crossIt(target); // подсветить TD
};

function fillIt(td) {
    td.classList.toggle('filled')
    checkWinCond();
}

function crossIt(td) {
    td.classList.toggle('crossed')
}

function setHintStr() {
    for (j = 0; j < puzzleArr.length; j++) {
        count = 1;
        prev = 0;
        hint = "";
        for (i = 0; i < puzzleArr.length; i++) {
            if (puzzleArr[i][j]) {
                if (prev) {
                    count++;
                } else {
                    count = 1;
                }
                if (i == puzzleArr.length - 1) {
                    hint += count + '<br>';
                }
            } else {
                if (prev) {
                    hint += count + '<br>';
                }
            }
            prev = puzzleArr[i][j];
        }
        if (hint.length == 0) hint = "0";
        hintsV.push(hint);
    }

    for (i = 0; i < puzzleArr.length; i++) {
        count = 1;
        prev = 0;
        hint = "";
        for (j = 0; j < puzzleArr.length; j++) {
            //alert("Current:"+grid[i][j]+" Prev:"+prev+" Cnt:"+count);
            if (puzzleArr[i][j]) {
                if (prev) { //Curr:1 Prev:1
                    count++;
                } else { //Curr:1 Prev:0
                    count = 1;
                }
                if (j == puzzleArr.length - 1) {
                    hint += count + " ";
                    //alert("break:"+count);
                }
            } else {
                if (prev) { //Curr:0 Prev:1
                    hint += count + " ";
                    //alert("break:"+count);
                }
            }
            prev = puzzleArr[i][j];
        }

        if (hint.length == 0) hint = "0";
        hintsH.push(hint);
    }
}

function startGame(level) {
    resetGame();
    console.log(level);
    switch (level) {
        case '1':
            puzzleArr = [
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ];
            break;
        case '2':
            puzzleArr = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
                [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0]
            ];
            break;
        case '3':
            puzzleArr = [
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 0]
            ];
            break;
        case '4':
            puzzleArr = [
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 1, 0],
                [1, 0, 1, 0, 1, 0, 1, 0, 1]
            ];
            break;
        case 'rand':
            puzzleArr = [];
            for (let j = 0; j < 5; j++) {
                puzzleArr[j] = [];
                for (let n = 0; n < 5; n++) {
                    puzzleArr[j][n] = getRandomBit(2);
                }
            }
            break;
    }
    createGrid();
}

function getRandomBit(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createGrid() {

    setHintStr();
    let gridStr = '<table>';
    let sClass = '';

    for (let i = 0; i <= puzzleArr.length; i++) {
        gridStr += '<tr>';
        for (let j = 0; j <= puzzleArr.length; j++) {
            if (!i || !j) {
                sClass = 'hint';
            } else {
                sClass = 'cell'
            }
            gridStr += '<td class="' + sClass + '" id="' + 'r' + parseInt(i - 1) + 'c' + parseInt(j - 1) + '">';
            if (!i && j) {
                gridStr += hintsV[j - 1];
            } else if (!j && i) {
                gridStr += hintsH[i - 1];
            }
            gridStr += '</td>'
        }
        gridStr += '</tr>'
    }
    gridStr += '</table>';
    gridObj.innerHTML = gridStr;
    startTime = new Date();
}

function checkWinCond() {
    let curCells = '';
    for (let j = 0; j < puzzleArr.length; j++) {
        for (let n = 0; n < puzzleArr.length; n++) {
            if (document.getElementById('r' + j + 'c' + n).classList.contains('filled'))
                curCells += '1';
            else
                curCells += '0'
        }
    }
    if (curCells == puzzleArr.toString().replace(/\D+/g, '')) {
        alert('w0w');
        endTime = new Date();
        curScore = Math.ceil((Math.abs(endTime.getTime() - startTime.getTime())) / 1000);
        addNewScore(curScore);
    }
}

function addNewScore(Score) {
    let name = prompt('What is your name? You solved this gram in ' + Score + ' seconds!');
    localStorage.setItem(localStorage.length + 1, '!' + name + '%' + Score);
}

function resetGame() {
    puzzleArr = [];
    gridObj.innerHTML = '';
    hintsV = [];
    hintsH = [];
}

function clearLS() {
    localStorage.clear();
}

function changeCS(scheme) {
    document.getElementById('colorScheme').href = 'css/colorSchemes/' + scheme + '.css';
}