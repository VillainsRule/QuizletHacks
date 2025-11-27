(() => setInterval(() => {
    const target = document.querySelector('[data-testid="normalPrompt"]')?.parentElement;
    if (!target) return;
    const targetFiber = target[Object.keys(target).find(e => e.startsWith('__reactFiber$'))];
    const stateNode = targetFiber.child.pendingProps;
    const cardSides = stateNode.currentQuestion.cardSides.map(e => e.media);
    const questionType = stateNode.options.answerWith;

    const side1IsQuestion = questionType === 'definition';
    const answerSide = side1IsQuestion ? cardSides[1] : cardSides[0];
    const answerIsImage = answerSide[0].languageCode === 'photo';

    if (answerIsImage) {
        const answerOpts = document.querySelectorAll('.Image-image');
        answerOpts.forEach((opt) => {
            const isCorrect = opt.getAttribute('style').includes(answerSide[1].url);
            opt.style.border = isCorrect ? '3px solid lime' : '3px solid red';
            opt.style.borderRadius = '3px';
        });
    } else {
        const answerOpts = document.querySelector('div[data-testid="normalPrompt"]').parentElement.children[1];

        const answerCard = [...answerOpts.children].find((opt) => opt.children[0].innerText === answerSide[0].plainText);
        const wrongCards = [...answerOpts.children].filter(a => a !== answerCard);

        if (answerCard) answerCard.style.color = 'lime';
        wrongCards.forEach((card) => card.style.color = 'red');
    }
}, 50))();
