let puzzleArr = [];
let gridObj = document.getElementById('gameGrid');
let lrow, lcol;

function genGrid(row, col) {
    lrow = row;
    lcol = col;
    let gridStr = '<table>';

    for (let i = 0; i < row; i++) {
        gridStr += '<tr>';
        for (let j = 0; j < col; j++) {
            gridStr += '<td id="' + 'r' + parseInt(i) + 'c' + parseInt(j) + '">';
            gridStr += '</td>'
        }
        gridStr += '</tr>'
    }
    gridStr += '</table>';
    gridObj.innerHTML = gridStr;
}

gridObj.onclick = function (event) {
    let target = event.target;

    if (target.tagName != 'TD' || target.classList.contains('hint'))
        return;
    fillIt(target);
};

function fillIt(td) {
    td.classList.toggle('filled')
}

function createPuzzleArray() {
    let puzzleStr = '[';
    for (let i = 0; i < lrow; i++) {
        puzzleStr += '['
        for (let j = 0; j < lcol; j++) {
            if (document.getElementById('r' + i + 'c' + j).classList.contains('filled')) {
                puzzleStr += '1 ';
                if (lcol - 1 != j) {
                    puzzleStr += ','
                } 
            } else {
                puzzleStr += '0'
                if (lcol - 1 != j) {
                    puzzleStr += ','
                } 
            };
        }
        puzzleStr += ']'
        if (lrow - 1 != i) {
            puzzleStr += ','
        }

    }
    puzzleStr += ']'
    console.log('puzzleArr=' + puzzleStr + ';');
    document.getElementById('arrOP').innerText = 'puzzleArr=' + puzzleStr + ';';
}