bStr = '';
leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
bStr += '<table id="btable"><tr><td>Name</td><td>Score</td>';
for (let i = 0; i < leaderboard.length; i++) {
    bStr += '<tr><td>' + leaderboard[i].slice(leaderboard[i].indexOf('!') + 1, leaderboard[i].indexOf('%')) + '</td><td>' + leaderboard[i].substr(leaderboard[i].indexOf('%') + 1) + '</td></tr>';
}
bStr += '</table>';
document.getElementById('board').innerHTML = bStr;