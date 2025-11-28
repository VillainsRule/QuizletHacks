(() => setInterval(() => {
    const cardParentParent = document.querySelector('#__next > :nth-child(2) > :nth-child(3) > :nth-child(1)');
    if (!cardParentParent) return;

    const cardParent = [...cardParentParent.children];
    const allCards = cardParent.map(c => [...c.children[0].children]).flat(1);
    if (!allCards || !allCards[0]) return;

    const fiberName = Object.keys(allCards[0]).find(k => k.startsWith('__reactFiber$'));

    const knownIds = new Set();

    const RANDOM_COLORS = [
        '#FF007F',
        '#FFAA1D',
        '#FFF000',
        '#66FF00',
        '#08E8DE',
        '#1974D2'
    ];

    allCards.forEach((cardElement) => {
        const keyParts = cardElement[fiberName].return.return.return.key.split('-');
        const key = keyParts[keyParts.length - 1];
        cardElement.setAttribute('data-key', key);
        knownIds.add(key);
    });

    [...knownIds].map((index, i) => {
        const matchingCards = allCards.filter(c => c.getAttribute('data-key') === index);
        if (matchingCards.length !== 2) console.warn('could not find matching cards for index', index);

        const color = RANDOM_COLORS[i];
        matchingCards.forEach(card => {
            if (card.children[0]) {
                card.children[0].style.border = `3px solid ${color}`;
                card.children[0].style.borderRadius = '3px';
            }
        });
    });
}, 100))();
