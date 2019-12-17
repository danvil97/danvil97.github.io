bStr = '';
bStr += '<table id="btable"><tr><td>Name</td><td>Score</td>';
 for (let i = 1; i <= localStorage.length; i++) {
     bStr += '<tr><td>' + localStorage.getItem(i).slice(localStorage.getItem(i).indexOf('!') + 1, localStorage.getItem(i).indexOf('%')) + '</td><td>' + localStorage.getItem(i).substr(localStorage.getItem(i).indexOf('%') + 1) + '</td></tr>';
 }
bStr += '</table>';
document.getElementById('board').innerHTML = bStr;