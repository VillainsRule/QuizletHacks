(() => setInterval(() => {
    const element = document.querySelector('article');
    if (!element) return;

    const fiber = element[Object.keys(element).find(k => k.startsWith('__reactFiber$'))];
    const question = fiber.return.return.return.return?.memoizedProps?.question || fiber.return.return.return.memoizedProps.question;
    if (!question?.type) return;

    if (question.type === 'MultipleChoiceQuestion') {
        const answerIndex = question.metadata.optionGenerationSource.findIndex(k => k === 'key');
        const answerElement = document.querySelector('[data-testid="MCQ Answers"]').children[answerIndex];
        const answerText = answerElement.querySelector('section > :nth-child(2)');
        answerText.style.color = 'lime';
    } else if (question.type === 'WrittenQuestion') {
        const allCards = __NEXT_DATA__.props.pageProps.studyModesCommon.studiableDocumentData.studiableItems;
        const card = allCards.find(c => c.id === question.metadata.studiableItemId);
        const otherSide = card.cardSides[question.metadata.answerSide === 'definition' ? 1 : 0];
        const existingAnswerElement = document.querySelector('#x-answer');
        if (existingAnswerElement) existingAnswerElement.innerText = `correct answer: ${otherSide.media[0].plainText}`;
        else document.querySelector('form').parentElement.insertAdjacentHTML('afterbegin', `<p style="color: lime; padding-bottom: 10px;" id="x-answer">correct answer: ${otherSide.media[0].plainText}</p>`);
    }
}, 100))();
