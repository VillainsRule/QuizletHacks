(() => setInterval(() => {
    const target = document.querySelector('[data-testid="normalPrompt"]')?.parentElement;
    if (!target) return;
    const targetFiber = target[Object.keys(target).find(e => e.startsWith('__reactFiber$'))];
    const stateNode = targetFiber.child.pendingProps;
    const cardSides = stateNode.currentQuestion.cardSides.map(e => e.media[0]);
    const questionType = stateNode.options.answerWith;

    const side1 = cardSides[0].plainText;
    const side2 = cardSides[1].plainText;

    const side1IsQuestion = questionType === 'definition';
    const answerText = side1IsQuestion ? side2 : side1;

    let answerOpts = document.querySelector('div[data-testid="normalPrompt"]').parentElement.children[1];

    let answerCard = [...answerOpts.children].find((opt) => opt.children[0].innerText === answerText);
    let wrongCards = [...answerOpts.children].filter(a => a !== answerCard);

    if (answerCard) answerCard.style.color = 'lime';
    wrongCards.forEach((card) => card.style.color = 'red');
}, 100))();
