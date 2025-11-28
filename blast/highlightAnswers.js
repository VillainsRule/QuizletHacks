(() => setInterval(() => {
    const parent = document.querySelector('#parent > div');
    if (!parent) return;

    const customElements = [...parent.children].filter(e => e.tagName === 'DIV');
    
    const wrapper = document.querySelector('#__next > :nth-child(3) > :nth-child(2)');
    if (!wrapper) return;
    
    const fiber = wrapper[Object.keys(wrapper).find(k => k.startsWith('__reactFiber$'))];
    const props = fiber.return.return.return.memoizedProps.children[0].props;
    if (!props.currentQuestion) return;

    const answerSide = props.currentQuestion.cardSides[props.options.answerWith === 'definition' ? 1 : 0];
    const answerElement = customElements.find(e => e.innerText === answerSide.media[0].plainText);
    if (answerElement) answerElement.style.color = 'lime';
}, 75))();
