(() => setInterval(() => {
    const prompt = document.querySelector('[data-testid="normalPrompt"]');
    if (!prompt) return;

    const target = prompt.parentElement;
    const fiberKey = Object.keys(target || {}).find(k => k.startsWith('__reactFiber$'));
    if (!fiberKey) return;

    let fiber = target[fiberKey];
    let props = null;

    for (let i = 0; fiber && i < 20; i++, fiber = fiber.return) {
        const p = fiber.memoizedProps || fiber.pendingProps;
        if (p?.currentQuestion?.cardSides) {
            props = p;
            break;
        }
    }

    if (!props?.currentQuestion?.cardSides) return;

    const question = props.currentQuestion;
    const answerWithDef = props.options?.answerWith === 'definition';
    const sideIndex = answerWithDef ? 1 : 0;
    const side = question.cardSides[sideIndex];
    if (!side) return;

    // Media array can contain text, photo, audio in any order
    const mediaList = Array.isArray(side.media) ? side.media : (Array.isArray(side) ? side : []);
    
    // Find text and image objects across all media slots
    const textObj = mediaList.find(m => m?.plainText || m?.text);
    const imageObj = mediaList.find(m => m?.url || m?.languageCode === 'photo');

    const normalize = text =>
        String(text || '')
            .normalize('NFKC')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();

    const correctAnswerText = normalize(textObj?.plainText || textObj?.text);

    // Locate visible answer cards
    const promptParent = prompt.parentElement;
    const answerContainer = promptParent?.children?.[1];
    const cards = answerContainer
        ? [...answerContainer.children]
        : [...document.querySelectorAll('[data-testid="normalPrompt"] ~ div button, [data-testid="normalPrompt"] ~ div [role="button"]')];

    if (!cards.length) return;

    // Match text options
    if (correctAnswerText) {
        const correctCard = cards.find(card => {
            const cardText = normalize(card.innerText);
            return cardText === correctAnswerText || cardText.includes(correctAnswerText) || correctAnswerText.includes(cardText);
        });

        if (correctCard) {
            cards.forEach(card => {
                const isCorrect = card === correctCard;
                card.style.color = isCorrect ? 'lime' : 'red';
                card.style.border = isCorrect ? '3px solid lime' : '3px solid red';
                card.style.borderRadius = '4px';
            });
            return;
        }
    }

    // Match image options
    if (imageObj?.url) {
        const imgElements = document.querySelectorAll('.Image-image, img');
        imgElements.forEach(img => {
            const style = img.getAttribute('style') || '';
            const src = img.getAttribute('src') || '';
            const isCorrect = style.includes(imageObj.url) || src.includes(imageObj.url);
            img.style.border = isCorrect ? '3px solid lime' : '3px solid red';
            img.style.borderRadius = '4px';
        });
        return;
    }

    console.log('Answer not matched:', {
        correctAnswerText,
        mediaList,
        choices: cards.map(c => c.innerText)
    });
}, 100))();
