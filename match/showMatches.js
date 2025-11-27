(() => {
    let fn = () => {
        const cardContainer = document.querySelector('#__next > :nth-child(2) > :nth-child(2)');
        const fiberName = Object.keys(cardContainer).find(c => c.startsWith('__reactFiber$'));
        const fiber = cardContainer[fiberName];
        const opts = fiber.return?.return?.return?.memoizedProps?.matchingQuestions?.options;
        if (!opts) return setTimeout(fn, 10);

        const RANDOM_COLORS = [
            '#FF007F',
            '#FFAA1D',
            '#FFF000',
            '#66FF00',
            '#08E8DE',
            '#1974D2'
        ];

        const setData = JSON.parse(__NEXT_DATA__.props.pageProps.dehydratedReduxStateKey);
        const cards = setData.studyModesCommon.studiableData.studiableItems.map(c => c.cardSides);

        const cardParents = [...cardContainer.children].map(e => [...[...e.children][0].children]).flat(1);

        const knownIndexes = new Set();

        opts.map(({ attributes }, i) => {
            const isText = attributes[1].type === 'AudioAttribute';
            const theCard = cards.findIndex((card) => {
                if (isText) return card.some(side => side.media[0].plainText === attributes[0].plainText);
                return card.some(side => side.media[1]?.url === attributes[1].url);
            });

            const parent = cardParents[i];
            parent.setAttribute('data-cardIndex', theCard);
            parent.setAttribute('data-isCard', 'true');

            knownIndexes.add(theCard);
        });

        [...knownIndexes].map((index, i) => {
            const matchingCards = cardParents.filter(c => parseInt(c.getAttribute('data-cardIndex')) === index);
            if (matchingCards.length !== 2) console.warn('could not find matching cards for index', index);

            const color = RANDOM_COLORS[i];
            matchingCards.forEach(card => card.style.border = `3px solid ${color}`);
        });
    };

    fn();
})();
