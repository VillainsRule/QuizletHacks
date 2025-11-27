// works 90% of the time, use solveInTime for a 100% working version
// if it doesn't show the correct matches, reload the tab and paste in the script again

(() => {
    const hack = () => {
        if (document.querySelectorAll('.FormattedText').length != 12) return setTimeout(hack, 50);

        let setData = JSON.parse(__NEXT_DATA__.props.pageProps.dehydratedReduxStateKey);
        let cards = setData.studyModesCommon.studiableData.studiableItems;

        let blacklist = [];

        let find = (ig) => [...document.querySelectorAll('.FormattedText')].find((i) => ig.startsWith(i.innerText.replace('…', '')));

        const colors = [
            '#FF007F',
            '#FFAA1D',
            '#FFF000',
            '#66FF00',
            '#08E8DE',
            '#1974D2'
        ];

        let colorIndex = 0;

        for (let i = 0; i < 12; i++) {
            let node = document.querySelectorAll('.FormattedText')[i];
            if (blacklist.includes(node)) continue;

            let text = node.innerText;

            let needStartsWith = text.endsWith('…');

            let card = cards.find((card) => card.cardSides.some((side) => {
                if (needStartsWith) return side.media[0].plainText.startsWith(text.replace('…', ''))
                else return side.media[0].plainText == text
            }));

            let termSide = card.cardSides.find((side) => side.label == 'word');
            let definSide = card.cardSides.find((side) => side.label == 'definition');

            let term = termSide.media[0].plainText;
            let defin = definSide.media[0].plainText;

            let isTerm = term == text;
            let isDef = defin == text;

            find(term).style.border = `2px solid ${colors[colorIndex]}`;
            find(defin).style.border = `2px solid ${colors[colorIndex]}`;

            find(term).style.borderRadius = '15px';
            find(defin).style.borderRadius = '15px';

            colorIndex++;

            if (isTerm) blacklist.push(defin);
            else if (isDef) blacklist.push(term);
        }
    }

    hack();
})();
