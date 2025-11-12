// this script automatically solves the match and puts you on the leaderboard
// with a time that YOU get to select (it could even be 1 second)

(() => {
    const encodeData = (data) => {
        let str = JSON.stringify(data);
        let encodedParts = [];

        for (let i = 0; i < str.length; i++) {
            let modifiedCharCode = str.charCodeAt(i) + (77 % (i + 1));
            encodedParts.push(modifiedCharCode);
        }

        return encodedParts.join("-");
    }

    const convertScore = (s) => {
        if (s.includes(".")) return parseInt(s.replace(".", ""), 10);
        return parseInt(s + "0", 10);
    };

    let inputNum = prompt('what do you want your match time to be? enter in the format "5.1":');
    if (isNaN(inputNum)) alert('uhh might be wrong but that doesn\'t look very numberlike');
    if (inputNum.includes('.') && ((inputNum.indexOf('.') + 2) !== inputNum.length)) alert('scores cannot have more than one decimal place');

    const num = convertScore(inputNum);

    let data = encodeData({
        previous_record: 0,
        score: num,
        selectedOnly: false,
        time_started: Date.now() - (num * 100) - 1500,
        too_small: 0
    });

    let token = document.cookie.split('qtkn=')[1].split(';')[0];
    let setId = __NEXT_DATA__.query.setId;

    fetch(`https://quizlet.com/${setId}/scatter/highscores`, {
        headers: {
            'content-type': 'application/json',
            'cs-token': token,
            'x-quizlet-api-security-id': token,
            'x-requested-with': 'XMLHttpRequest'
        },
        body: JSON.stringify({ data }),
        method: 'POST'
    }).then(r => {
        if (!r.ok) alert('they might\'ve fixed the cheat, open an issue @ https://github.com/VillainsRule/QuizletHacks');
    });
})();
